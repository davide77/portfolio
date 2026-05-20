"use client";

import {
  Canvas,
  createPortal,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  useFBO,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Color, Scene, type Group, type Texture } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";

import { BRAND_COLORS } from "@/constants/brand-colors";
import { cx } from "@/components/cx";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { useVisibility } from "@/hooks/useVisibility";
import {
  BLOB_COMPOSITIONS,
  BLOB_FONT_URL,
  DISC_ATTENUATION,
  DISC_FLAT_SCALE,
  DISC_LENS_FBO,
  DISC_TINTS,
  DISC_TRANSMISSION,
  SCENE,
  type BlobComposition,
  type DiscConfig,
  type LetterformConfig,
} from "@/constants/blob-compositions";

type BlobAccentProps = {
  composition: "A" | "B" | "C";
  className?: string;
};

/**
 * Monopo-style static glass disc magnifier. Emissive letters sit in an
 * off-screen buffer; a fixed thin disc samples that buffer (react-bits
 * fluid-glass pattern) so the type refracts and magnifies without the
 * lens orbiting. Only the letter drifts, like the *_web3dasset loops.
 */
export function BlobAccent({ composition, className }: BlobAccentProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const reduceMotion = useReducedMotion();
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const comp = BLOB_COMPOSITIONS[composition];
  const frameloop = visible && tabVisible ? "always" : "never";

  if (reduceMotion) {
    return (
      <div
        ref={wrapRef}
        className={cx("blob-accent blob-accent--static", className)}
        aria-hidden
      />
    );
  }

  return (
    <div ref={wrapRef} className={cx("blob-accent", className)} aria-hidden>
      <Canvas
        dpr={[1, SCENE.maxDevicePixelRatio]}
        frameloop={frameloop}
        camera={{ position: [0, 0, SCENE.cameraZ], fov: SCENE.cameraFov }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 1);
          gl.toneMappingExposure = SCENE.toneMappingExposure;
        }}
      >
        <Suspense fallback={null}>
          <DiscLensScene comp={comp} />
        </Suspense>
      </Canvas>
    </div>
  );
}

type DiscLensSceneProps = { comp: BlobComposition };

function DiscLensScene({ comp }: DiscLensSceneProps) {
  const buffer = useFBO(DISC_LENS_FBO.width, DISC_LENS_FBO.height);
  const portalScene = useMemo(() => new Scene(), []);

  useFrame((state) => {
    const { gl, camera } = state;
    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 1);
    gl.clear();
    gl.render(portalScene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 1);
  });

  return (
    <>
      {createPortal(
        <>
          <ambientLight intensity={0.15} />
          <pointLight
            position={[-2.5, 2, 2]}
            color={BRAND_COLORS.orbFlare}
            intensity={6}
          />
          <Letterform config={comp.letterform} />
        </>,
        portalScene,
      )}

      <Environment frames={1} resolution={512} environmentIntensity={1.1}>
        <Lightformer
          form="rect"
          color={BRAND_COLORS.orbFlare}
          intensity={5}
          position={[-2, 2, 3]}
          scale={[5, 5, 1]}
          rotation={[0, Math.PI / 6, 0]}
        />
        <Lightformer
          form="ring"
          color={BRAND_COLORS.orbAmber}
          intensity={3}
          position={[2.5, -1, 2.5]}
          scale={[4, 4, 1]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </Environment>

      {comp.discs.map((disc, i) => (
        <StaticGlassDisc key={i} config={disc} bufferTexture={buffer.texture} />
      ))}

      <EffectComposer multisampling={4}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

type LetterformProps = { config: LetterformConfig };

/** Extruded emissive letters rendered into the FBO behind the static disc. */
function Letterform({ config }: LetterformProps) {
  const font = useLoader(FontLoader, BLOB_FONT_URL) as Font;
  const groupRef = useRef<Group>(null);

  const geometry = useMemo(() => {
    const geo = new TextGeometry(config.text, {
      font,
      size: config.fontSize,
      depth: config.extrudeDepth,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 4,
    });
    geo.center();
    return geo;
  }, [font, config.text, config.fontSize, config.extrudeDepth]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const emissive = useMemo(() => new Color(config.emissive), [config.emissive]);
  const baseColor = useMemo(
    () => new Color(config.emissive).multiplyScalar(0.15),
    [config.emissive],
  );

  // eslint-disable-next-line react-hooks/immutability
  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    group.position.set(
      config.position[0] + Math.sin(t * config.driftSpeed) * config.driftX,
      config.position[1] + Math.cos(t * config.driftSpeed * 0.85) * config.driftY,
      config.position[2],
    );
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={baseColor}
          emissive={emissive}
          emissiveIntensity={config.emissiveIntensity}
          roughness={0.3}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

type StaticGlassDiscProps = {
  config: DiscConfig;
  bufferTexture: Texture;
};

/** Fixed thin disc. Samples the letter FBO like react-bits fluid glass lens mode. */
function StaticGlassDisc({ config, bufferTexture }: StaticGlassDiscProps) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const tint = DISC_TINTS[config.palette];
  const attenuationDistance = DISC_ATTENUATION[config.palette];
  const isPrimary = config.role !== "satellite";
  const tx = isPrimary ? DISC_TRANSMISSION.primary : DISC_TRANSMISSION.satellite;

  // eslint-disable-next-line react-hooks/immutability
  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    group.position.set(...config.position);
    group.lookAt(camera.position);
  });

  return (
    <group
      ref={groupRef}
      scale={[
        config.radius,
        config.radius,
        config.radius * DISC_FLAT_SCALE,
      ]}
    >
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          buffer={bufferTexture}
          color="#ffffff"
          samples={tx.samples}
          resolution={tx.resolution}
          transmission={1}
          thickness={isPrimary ? 2.8 : 2.2}
          roughness={0}
          ior={1.52}
          chromaticAberration={isPrimary ? 0.06 : 0.03}
          anisotropy={0.04}
          attenuationColor={tint}
          attenuationDistance={attenuationDistance}
          distortion={0}
          distortionScale={0}
          temporalDistortion={0}
        />
      </mesh>
    </group>
  );
}
