import {
  BackSide,
  BufferGeometry,
  Clock,
  CubeCamera,
  ExtrudeGeometry,
  HalfFloatType,
  LinearMipmapLinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  Path,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Shape,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLCubeRenderTarget,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import fieldVert from "@/components/hero/shaders/lens-field.vert.glsl";
import fieldFrag from "@/components/hero/shaders/lens-field.frag.glsl";
import glassVert from "@/components/hero/shaders/lens-glass.vert.glsl";
import glassFrag from "@/components/hero/shaders/lens-glass.frag.glsl";
import grainFrag from "@/components/hero/shaders/lens-grain.frag.glsl";
import { HERO_GLASS_LENS as L, HERO_GLASS_LENS_PALETTE } from "@/constants/hero-webgl";

type Options = {
  reduceMotion: boolean;
  isMobile: boolean;
  maxDpr: number;
  /** Called once, after the first frame has been drawn. */
  onFirstFrame?: () => void;
  /** The headline's box, so the Ds can be laid out around it. */
  getAvoidRect?: () => AvoidRect | null;
};

export type GlassLensScene = {
  setRunning: (running: boolean) => void;
  /** Re-run the layout, e.g. when the headline changes size. */
  relayout: () => void;
  dispose: () => void;
};

const rgb = (c: readonly number[]) => new Vector3(c[0] / 255, c[1] / 255, c[2] / 255);
const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

/** A geometric D: straight spine, semicircular bowl, inset counter. */
function dShape(H: number, stroke: number): Shape {
  const r = H / 2;
  const s = H * 0.22; // straight run along top and bottom before the bowl
  // No explicit closing points: duplicates make the bevel spike.
  const outer = new Shape();
  outer.moveTo(0, 0);
  outer.lineTo(0, H);
  outer.absarc(s, r, r, Math.PI / 2, -Math.PI / 2, true);

  // Inner corners slightly rounded so the bevel doesn't pinch them.
  const rc = H * 0.035;
  const counter = new Path();
  counter.moveTo(stroke, stroke + rc);
  counter.quadraticCurveTo(stroke, stroke, stroke + rc, stroke);
  counter.absarc(s, r, r - stroke, -Math.PI / 2, Math.PI / 2, false);
  counter.lineTo(stroke + rc, H - stroke);
  counter.quadraticCurveTo(stroke, H - stroke, stroke, H - stroke - rc);
  outer.holes.push(counter);
  return outer;
}

function letterGeometry(H: number): BufferGeometry {
  const stroke = H * 0.17;
  let geo: BufferGeometry = new ExtrudeGeometry(dShape(H, stroke), {
    depth: H * 0.03,
    curveSegments: 128,
    bevelEnabled: true,
    bevelThickness: H * 0.1,
    bevelSize: stroke * 0.3,
    bevelSegments: 32,
  });
  // Extrude output is flat-shaded per triangle; weld it so normals are smooth,
  // otherwise the refraction jumps facet to facet.
  geo.deleteAttribute("normal");
  geo.deleteAttribute("uv");
  geo = mergeVertices(geo, 1e-4);
  geo.computeVertexNormals();
  geo.center();
  return geo;
}

/** A box to keep clear, as fractions of the canvas (0,0 top-left, 1,1 bottom-right). */
export type AvoidRect = { left: number; top: number; right: number; bottom: number };

/** Letter width over cap height, bevel included. */
const D_ASPECT = 0.8;
/** Screen fraction kept clear for the nav along the top. */
const NAV_CLEARANCE = 0.11;

/**
 * Where the Ds sit. The camera looks down +z, so +x is the left of the screen.
 *
 * Two Ds, one either side of the headline, when they fit beside it touching at
 * most the edge of their bowls. Otherwise a layered DD monogram, the left D in
 * front of and overlapping the right, centred in the space above the headline;
 * only if even that is too cramped does it sit behind the headline.
 */
function layout(aspect: number, camera: PerspectiveCamera, avoid: AvoidRect | null) {
  const halfTan = Math.tan((camera.fov * Math.PI) / 360);

  // Pair: the left D sits a touch further back than the right one.
  const pairHalfW = 3 * halfTan * aspect;
  const pairScale = Math.min(0.8, (0.42 * pairHalfW) / 1.08);
  const pairX = 0.68 * pairHalfW;
  const pairW = L.letterHeight * D_ASPECT * pairScale;
  const innerEdge = 0.5 - (pairX - pairW / 2) / (2 * pairHalfW);
  // How far the left D's inner edge reaches into the headline (both mirror).
  const overlap = avoid ? innerEdge - avoid.left : 0;
  const pairFits = aspect >= 1.2 && overlap <= 0.3 * (pairW / (2 * pairHalfW));
  if (pairFits) {
    return {
      scale: pairScale,
      layered: false,
      positions: [new Vector3(pairX * 1.04, 0.05, -0.8), new Vector3(-pairX, 0.05, -0.9)],
    };
  }

  // Layered DD, sized in screen fractions at its mid depth.
  const z = -0.8;
  const fullH = 2 * (z - camera.position.z) * halfTan;
  const fullW = fullH * aspect;
  // The back D peeks out by half a letter, so the pair is 1.5 letters wide.
  const fitWidth = (h: number) => Math.min(h, (0.8 * fullW) / (1.5 * D_ASPECT * fullH));
  // Left D in front, right D behind, far enough apart in depth that the sway
  // never touches. Each is placed at the same screen height for its own depth
  // (perspective would otherwise lift the nearer one), and sized so the front
  // one, which reads larger, is the one that fits.
  const frontZ = z - 0.2;
  const backZ = z + 0.2;
  const fullHAt = (depthZ: number) => 2 * (depthZ - camera.position.z) * halfTan;
  const monogram = (h: number, fy: number) => {
    const scale = (h * fullHAt(frontZ)) / L.letterHeight;
    const shift = 0.25 * L.letterHeight * D_ASPECT * scale;
    return {
      scale,
      layered: true,
      positions: [
        new Vector3(shift, (0.5 - fy) * fullHAt(frontZ), frontZ),
        new Vector3(-shift, (0.5 - fy) * fullHAt(backZ), backZ),
      ],
    };
  };

  const headTop = avoid ? avoid.top : 0.4;
  const space = headTop - 0.04 - NAV_CLEARANCE;
  // 80% of the gap, so it breathes between the nav and the headline.
  if (space >= 0.17) return monogram(fitWidth(Math.min(space * 0.8, 0.4)), NAV_CLEARANCE + space / 2);
  return monogram(fitWidth(0.55), avoid ? (avoid.top + avoid.bottom) / 2 : 0.5);
}

export function createGlassLensScene(canvas: HTMLCanvasElement, opts: Options): GlassLensScene {
  const { reduceMotion, isMobile } = opts;

  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  // Colours go to the screen as written: the palette values are what you see.
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.maxDpr));

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 20);
  camera.position.set(0, 0, -4);
  camera.lookAt(0, 0, 0);

  // ---- Field ----------------------------------------------------------------
  const fieldUniforms = {
    uTime: { value: 0 },
    uColorA: { value: rgb(HERO_GLASS_LENS_PALETTE.sage) },
    uColorB: { value: rgb(HERO_GLASS_LENS_PALETTE.amber) },
    uShadow: { value: rgb(HERO_GLASS_LENS_PALETTE.shadow) },
    uShadowAmount: { value: L.shadowAmount },
    uFreq: { value: L.frequency },
    uZoom: { value: isMobile ? L.zoomMobile : L.zoom },
    uOpacity: { value: 0 },
    uReveal: { value: 0 },
    uRes: { value: new Vector2(1, 1) },
  };
  const fieldMaterial = new ShaderMaterial({
    uniforms: fieldUniforms,
    vertexShader: fieldVert,
    fragmentShader: fieldFrag,
    side: BackSide,
    transparent: true,
    depthWrite: false,
  });
  const fieldGeometry = new SphereGeometry(1, 64, 64);
  const field = new Mesh(fieldGeometry, fieldMaterial);
  scene.add(field);

  // ---- Glass ----------------------------------------------------------------
  const envSize = isMobile ? L.envResolutionMobile : L.envResolution;
  const cubeTarget = new WebGLCubeRenderTarget(envSize, {
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });
  const cubeCamera = new CubeCamera(0.1, 10, cubeTarget);
  const screenTarget = new WebGLRenderTarget(1, 1, { type: HalfFloatType });
  // Layered DD only: the field plus the back D, for the front D to refract.
  const screenTargetBack = new WebGLRenderTarget(1, 1, { type: HalfFloatType });

  const glassUniforms = {
    uScreen: { value: screenTarget.texture },
    uEnv: { value: cubeTarget.texture },
    uRes: { value: new Vector2(1, 1) },
    uStrength: { value: L.refraction },
    uDispersion: { value: L.dispersion },
    uMagnify: { value: L.magnify },
    uBody: { value: L.body },
    uOpacity: { value: 0 },
  };
  const glassMaterial = new ShaderMaterial({
    uniforms: glassUniforms,
    vertexShader: glassVert,
    fragmentShader: glassFrag,
    transparent: true,
  });
  // Same uniforms, except it sees the back D through itself.
  const frontMaterial = new ShaderMaterial({
    uniforms: { ...glassUniforms, uScreen: { value: screenTargetBack.texture } },
    vertexShader: glassVert,
    fragmentShader: glassFrag,
    transparent: true,
  });
  const letterGeo = letterGeometry(L.letterHeight);
  const letters = [0, 1].map((i) => {
    const mesh = new Mesh(letterGeo, glassMaterial);
    mesh.userData.phase = i * 2.1;
    mesh.userData.base = new Vector3();
    scene.add(mesh);
    return mesh;
  });
  let letterScale = 1;
  let layered = false;
  const cubeCentre = new Vector3();

  // ---- Grain ----------------------------------------------------------------
  // Multisampled target: the renderer's own antialias is lost once we post-process.
  const composer = new EffectComposer(
    renderer,
    new WebGLRenderTarget(1, 1, { samples: isMobile ? 4 : 8, type: HalfFloatType }),
  );
  composer.addPass(new RenderPass(scene, camera));
  const grainPass = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uSeed: { value: 0 }, uAmount: { value: L.grain } },
    vertexShader:
      "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: grainFrag,
  });
  composer.addPass(grainPass);

  const placeLetters = () => {
    const result = layout(camera.aspect, camera, opts.getAvoidRect?.() ?? null);
    letterScale = result.scale;
    layered = result.layered;
    letters.forEach((m, i) => m.userData.base.copy(result.positions[i]));
    letters[0].material = layered ? frontMaterial : glassMaterial;
    cubeCentre.copy(result.positions[0]).add(result.positions[1]).multiplyScalar(0.5);
  };

  // ---- Size -----------------------------------------------------------------
  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const fitH = 2 * camera.position.length() * Math.tan((camera.fov * Math.PI) / 360);
    field.scale.set(fitH * camera.aspect, fitH, fitH);
    field.lookAt(camera.position);

    const buffer = renderer.getDrawingBufferSize(new Vector2());
    fieldUniforms.uRes.value.copy(buffer);
    glassUniforms.uRes.value.copy(buffer);
    screenTarget.setSize(buffer.x, buffer.y);
    screenTargetBack.setSize(buffer.x, buffer.y);

    placeLetters();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // ---- Pointer ----------------------------------------------------------------
  const pointer = new Vector2();
  const eased = new Vector2();
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const onPointer = (e: PointerEvent) => {
    pointer.set(2 * (e.clientX / window.innerWidth - 0.5), 2 * (e.clientY / window.innerHeight - 0.5));
  };
  if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

  // ---- Loop -------------------------------------------------------------------
  const clock = new Clock(false);
  let noiseTime = 0;
  let elapsed = 0;
  let firstFrame = true;
  let running = false;

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.1);
    elapsed += dt;
    const t = elapsed;
    const intro = reduceMotion ? 1 : Math.min(1, t / L.introSec);
    const glassIn = reduceMotion ? 1 : Math.min(1, Math.max(0, (t - L.introSec * 0.4) / 2));
    const motion = reduceMotion ? 0 : 1;

    noiseTime += dt * L.speed * (reduceMotion ? 0.2 : 1 + L.introSpeedBoost * (1 - easeInOut(intro)));
    fieldUniforms.uTime.value = noiseTime;
    fieldUniforms.uOpacity.value = L.brightness * easeInOut(Math.min(1, intro * 1.5));
    fieldUniforms.uReveal.value = easeInOut(intro);
    glassUniforms.uOpacity.value = easeOut(glassIn);
    grainPass.uniforms.uSeed.value = (t * 60) % 1000;

    eased.lerp(pointer, L.parallax.lerp);
    camera.position.x = -eased.x * L.parallax.x;
    camera.position.y = -eased.y * L.parallax.y;
    camera.lookAt(0, 0, 0);

    for (const m of letters) {
      const ph = m.userData.phase as number;
      const base = m.userData.base as Vector3;
      m.scale.setScalar(letterScale * (0.85 + 0.15 * easeOut(glassIn)));
      // Turned round to face the camera, then a slow sway and a lean toward the pointer.
      m.rotation.y = Math.PI + (Math.sin(t * 0.35 + ph) * 0.15 + eased.x * 0.12) * motion;
      m.rotation.x = (Math.sin(t * 0.27 + ph) * 0.08 - eased.y * 0.08) * motion;
      m.position.set(base.x, base.y + Math.sin(t * 0.5 + ph) * 0.04 * motion, base.z);
    }

    // The glass samples the scene without itself: a reflection cube and a screen copy.
    letters.forEach((m) => (m.visible = false));
    cubeCamera.position.copy(cubeCentre);
    cubeCamera.update(renderer, scene);
    renderer.setRenderTarget(screenTarget);
    renderer.render(scene, camera);
    if (layered) {
      letters[1].visible = true;
      renderer.setRenderTarget(screenTargetBack);
      renderer.render(scene, camera);
    }
    renderer.setRenderTarget(null);
    letters.forEach((m) => (m.visible = true));

    composer.render();

    if (firstFrame) {
      firstFrame = false;
      opts.onFirstFrame?.();
    }
  };

  const setRunning = (next: boolean) => {
    if (next === running) return;
    running = next;
    if (running) {
      clock.start();
      renderer.setAnimationLoop(frame);
    } else {
      clock.stop();
      renderer.setAnimationLoop(null);
    }
  };

  const dispose = () => {
    setRunning(false);
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    fieldGeometry.dispose();
    fieldMaterial.dispose();
    letterGeo.dispose();
    glassMaterial.dispose();
    frontMaterial.dispose();
    screenTargetBack.dispose();
    cubeTarget.dispose();
    screenTarget.dispose();
    composer.dispose();
    renderer.dispose();
  };

  return { setRunning, relayout: placeLetters, dispose };
}
