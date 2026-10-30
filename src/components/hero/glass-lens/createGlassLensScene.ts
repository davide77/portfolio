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
};

export type GlassLensScene = {
  setRunning: (running: boolean) => void;
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

/**
 * Where the two Ds sit for a given aspect. The camera looks down +z, so +x is
 * the left of the screen. Wide screens put one either side of the headline,
 * the left one a touch further back; tall screens stack them above and below.
 */
function layout(aspect: number, camera: PerspectiveCamera) {
  const halfTan = Math.tan((camera.fov * Math.PI) / 360);
  if (aspect >= 1.2) {
    const halfW = 3 * halfTan * aspect;
    // Sized and spread so the headline, centred between them, only grazes the bowls.
    const scale = Math.min(0.8, (0.42 * halfW) / 1.08);
    const x = 0.68 * halfW;
    return { scale, positions: [new Vector3(x * 1.04, 0.05, -0.8), new Vector3(-x, 0.05, -0.9)] };
  }
  // Each D about a quarter of the height, clear of the nav above and of the
  // headline, which sits a little below centre.
  const halfH = 3 * halfTan;
  const halfW = halfH * aspect;
  const scale = Math.min(0.42, (1.2 * halfW) / 1.08);
  return {
    scale,
    positions: [new Vector3(0, halfH * 0.52, -0.8), new Vector3(0, -halfH * 0.6, -0.9)],
  };
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
  const letterGeo = letterGeometry(L.letterHeight);
  const letters = [0, 1].map((i) => {
    const mesh = new Mesh(letterGeo, glassMaterial);
    mesh.userData.phase = i * 2.1;
    mesh.userData.base = new Vector3();
    scene.add(mesh);
    return mesh;
  });
  let letterScale = 1;
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

    const { scale, positions } = layout(camera.aspect, camera);
    letterScale = scale;
    letters.forEach((m, i) => m.userData.base.copy(positions[i]));
    cubeCentre.copy(positions[0]).add(positions[1]).multiplyScalar(0.5);
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
    cubeTarget.dispose();
    screenTarget.dispose();
    composer.dispose();
    renderer.dispose();
  };

  return { setRunning, dispose };
}
