"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Color, type Group, type MeshBasicMaterial } from "three";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { useVisibility } from "@/hooks/useVisibility";
import {
  BRAND_ORB_MAIN,
  BRAND_ORB_SATELLITES,
  BRAND_ORB_SCENE,
} from "@/constants/content/brand-orbs";

type BrandOrbClusterProps = {
  /** Word refracted through the main glass orb. Stays soft + illegible-by-design. */
  word?: string;
  /** Wrapper class. The canvas fills 100% of this. */
  className?: string;
  /** Optional ARIA label - the canvas is decorative by default. */
  ariaLabel?: string;
};

/**
 * One main glass orb that carries a word, plus a pool of small satellites that
 * pop in and out around it with random lifecycles - so at any moment one or
 * two are visible, never the same two times in a row. Canvas is transparent,
 * so the cluster sits on whatever section it's dropped into.
 *
 * R3F port of Monopo Saigon's `*_web3dasset` loops, redrawn against the
 * {@link brand.md} Orb ramp. Pauses when off-screen / tab hidden, and
 * respects `prefers-reduced-motion: reduce`.
 */
export function BrandOrbCluster({
  word = BRAND_ORB_MAIN.defaultWord,
  className,
  ariaLabel,
}: BrandOrbClusterProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const reduceMotion = useReducedMotion();
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const frameloop = visible && tabVisible ? "always" : "never";

  return (
    <div ref={wrapRef} className={className} aria-hidden={!ariaLabel}>
      <Canvas
        dpr={[1, BRAND_ORB_SCENE.maxDevicePixelRatio]}
        frameloop={frameloop}
        camera={{
          position: [...BRAND_ORB_SCENE.cameraPosition] as [number, number, number],
          fov: BRAND_ORB_SCENE.cameraFov,
        }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <BrandOrbScene word={word} reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

type BrandOrbSceneProps = {
  word: string;
  reduceMotion: boolean;
};

function BrandOrbScene({ word, reduceMotion }: BrandOrbSceneProps) {
  const groupRef = useRef<Group>(null);

  // Very slow ambient sway on the whole cluster. Off for reduced-motion users.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state) => {
    if (reduceMotion) return;
    const t = state.clock.elapsedTime;
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(t * 0.08) * 0.06;
    group.rotation.x = Math.cos(t * 0.05) * 0.03;
  });

  const { lightformers, rimLight, fillLight, environmentIntensity } = BRAND_ORB_SCENE;

  // Stable slot indices so each satellite keeps its own random RNG seed.
  const satelliteSlots = useMemo(
    () => Array.from({ length: BRAND_ORB_SATELLITES.slotCount }, (_, i) => i),
    [],
  );

  return (
    <>
      <ambientLight intensity={0.35} />

      {/*
        Point lights produce the bright focal rim that bloom then expands
        into the warm collar halo around the orbs - the look from the early
        cream-background prototype that disappeared when I dropped them.
      */}
      <pointLight
        position={rimLight.position}
        color={rimLight.color}
        intensity={rimLight.intensity}
      />
      <pointLight
        position={fillLight.position}
        color={fillLight.color}
        intensity={fillLight.intensity}
      />

      {/*
        The environment underneath gives the glass *body* - soft reflections
        across the whole sphere surface so it doesn't go invisible on the
        transparent canvas. `frames={1}` bakes it once (it never animates).
      */}
      <Environment frames={1} resolution={512} environmentIntensity={environmentIntensity}>
        {lightformers.map((lf, i) => (
          <Lightformer
            key={i}
            form={lf.form}
            color={lf.color}
            intensity={lf.intensity}
            position={[...lf.position] as [number, number, number]}
            scale={[...lf.scale] as [number, number, number]}
            rotation={[...lf.rotation] as [number, number, number]}
          />
        ))}
      </Environment>

      {/* World-fixed glowing word the lens magnifies. Deliberately OUTSIDE
          the orb group so the orb drifts over it and refracts it. */}
      <BackgroundWord word={word} />

      <group ref={groupRef}>
        <MainOrb reduceMotion={reduceMotion} />
        {satelliteSlots.map((i) => (
          <FloatingSatellite key={i} slotIndex={i} reduceMotion={reduceMotion} />
        ))}
      </group>

      <EffectComposer>
        <Bloom
          intensity={BRAND_ORB_SCENE.bloom.intensity}
          luminanceThreshold={BRAND_ORB_SCENE.bloom.luminanceThreshold}
          luminanceSmoothing={BRAND_ORB_SCENE.bloom.luminanceSmoothing}
          mipmapBlur={BRAND_ORB_SCENE.bloom.mipmapBlur}
        />
      </EffectComposer>
    </>
  );
}

type BackgroundWordProps = { word: string };

/**
 * Large emissive word fixed on the BACKGROUND plane behind the lens (NOT
 * parented to the orb). It glows on its own, soft-bloomed, and slowly
 * drifts left/right + bobs on its own slow cycle so different glyphs sweep
 * under the clear glass orb and get magnified + inverted by it - the real
 * Monopo `*_web3dasset` lens effect, confirmed against the source video.
 * Colour cross-fades through the orb ramp on a slow loop.
 */
function BackgroundWord({ word }: BackgroundWordProps) {
  const { backgroundWord } = BRAND_ORB_SCENE;
  const matRef = useRef<MeshBasicMaterial>(null);
  const groupRef = useRef<Group>(null);

  const glyphs = word.slice(0, backgroundWord.glyphCount);

  // Pre-build the HDR colour stops once (colour x emissive multiplier).
  const stops = useMemo(
    () =>
      backgroundWord.colorCycle.map((hex) =>
        new Color(hex).multiplyScalar(backgroundWord.emissiveIntensity),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Slow colour cross-fade + a gentle independent drift so the lens sweeps
  // across different letters over time.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state) => {
    const mat = matRef.current;
    const grp = groupRef.current;
    const t = state.clock.elapsedTime;

    if (mat) {
      const n = stops.length;
      const phase = ((t / backgroundWord.cycleSeconds) % 1) * n;
      const i = Math.floor(phase);
      const f = phase - i;
      mat.color.copy(stops[i]).lerp(stops[(i + 1) % n], f);
    }
    if (grp) {
      grp.position.x =
        Math.sin(t * backgroundWord.driftSpeed) * backgroundWord.driftX;
      grp.position.y =
        Math.cos(t * backgroundWord.driftSpeed * 0.7) * backgroundWord.driftY;
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0, 0, backgroundWord.zOffset]}
        fontSize={backgroundWord.fontSize}
        anchorX="center"
        anchorY="middle"
        letterSpacing={backgroundWord.letterSpacing}
        outlineWidth={0}
      >
        {glyphs}
        <meshBasicMaterial ref={matRef} toneMapped={false} />
      </Text>
    </group>
  );
}

type MainOrbProps = { reduceMotion: boolean };

function MainOrb({ reduceMotion }: MainOrbProps) {
  const { glass } = BRAND_ORB_SCENE;
  const temporalDistortion = reduceMotion ? 0 : glass.temporalDistortion;
  const distortion = reduceMotion ? 0 : glass.distortion;
  const radius = BRAND_ORB_MAIN.radius;

  // Near-invisible clear lens: just the glass sphere, no inner content.
  // The bright magnified+inverted letter you see inside it is the
  // world-fixed BackgroundWord refracted through the body.
  const content: ReactNode = (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <MeshTransmissionMaterial
        color={BRAND_ORB_MAIN.glassTint}
        samples={BRAND_ORB_SCENE.transmissionSamples}
        resolution={BRAND_ORB_SCENE.transmissionResolution}
        transmission={glass.transmission}
        thickness={glass.thickness}
        roughness={glass.roughness}
        ior={glass.ior}
        chromaticAberration={glass.chromaticAberration}
        anisotropy={glass.anisotropy}
        attenuationDistance={glass.attenuationDistance}
        distortion={distortion}
        distortionScale={glass.distortionScale}
        temporalDistortion={temporalDistortion}
      />
    </mesh>
  );

  if (reduceMotion) return content;

  return (
    <Float
      speed={BRAND_ORB_MAIN.floatSpeed}
      rotationIntensity={0.15}
      floatIntensity={BRAND_ORB_MAIN.floatIntensity}
    >
      {content}
    </Float>
  );
}

type FloatingSatelliteProps = { slotIndex: number; reduceMotion: boolean };

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * Continuous orbital motion + breathing scale wave per satellite. Both slots
 * stay alive at all times; their phases and speeds are randomised so they
 * rarely peak together, producing the "sometimes one, sometimes two" feel
 * the brief asked for without ever fully disappearing.
 */
function FloatingSatellite({ slotIndex, reduceMotion }: FloatingSatelliteProps) {
  const groupRef = useRef<Group>(null);

  // Stable random params per slot - the orbit, scale wave, and rotation all
  // get their own random rate + phase so the two satellites desync naturally.
  const params = useMemo(() => {
    const cfg = BRAND_ORB_SATELLITES;
    return {
      baseRadius: rand(...cfg.baseRadiusRange),
      orbitRadius: rand(...cfg.orbitRadiusRange),
      // Alternate orbit direction per slot so they pass each other.
      orbitSpeed: rand(...cfg.orbitSpeedRange) * (slotIndex % 2 === 0 ? 1 : -1),
      orbitPhase: Math.random() * Math.PI * 2,
      yLag: rand(...cfg.orbitYLagRange),
      zBobAmp: rand(...cfg.zBobAmpRange),
      zBobSpeed: rand(...cfg.zBobSpeedRange),
      waxSpeed: rand(...cfg.waxSpeedRange),
      // Anti-phase the wax so when one is full the other tends to be small.
      waxPhase: slotIndex * Math.PI + Math.random() * 0.5,
    };
  }, [slotIndex]);

  // Per-frame orbital + breathing. Mutating ref + Object3D in useFrame is the
  // canonical r3f pattern; the compiler immutability rule doesn't model it.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (reduceMotion) {
      // Static layout for reduced-motion users: park each satellite at its
      // orbit start angle, mid-scale, so the composition still reads.
      const x = Math.cos(params.orbitPhase) * params.orbitRadius;
      const y = Math.sin(params.orbitPhase) * params.orbitRadius * params.yLag;
      group.position.set(x, y, 0);
      group.scale.setScalar(params.baseRadius * 0.85);
      group.rotation.set(0, 0, 0);
      return;
    }

    const t = state.clock.elapsedTime;

    const orbitAngle = t * params.orbitSpeed + params.orbitPhase;
    const x = Math.cos(orbitAngle) * params.orbitRadius;
    const y = Math.sin(orbitAngle) * params.orbitRadius * params.yLag;
    const z = Math.sin(t * params.zBobSpeed + params.orbitPhase) * params.zBobAmp;
    group.position.set(x, y, z);

    // Clamped breathing: the lower `hiddenCutoff` fraction of the sine maps
    // to scale 0 (fully gone), the rest ramps 0 -> full. Anti-phased slots
    // mean the visible count changes - sometimes two, sometimes one,
    // briefly none.
    const waveRaw = (Math.sin(t * params.waxSpeed + params.waxPhase) + 1) / 2;
    const { hiddenCutoff } = BRAND_ORB_SATELLITES;
    const visibleWave =
      waveRaw <= hiddenCutoff
        ? 0
        : (waveRaw - hiddenCutoff) / (1 - hiddenCutoff);
    group.scale.setScalar(params.baseRadius * visibleWave);

    group.rotation.x = t * 0.08;
    group.rotation.y = t * 0.12;
  });

  const { satelliteGlass } = BRAND_ORB_SCENE;

  return (
    <group ref={groupRef}>
      {/* Pure glass bubble - no inner content. Satellites are decorative
          glass next to the main orb, like the smaller orbs in the Monopo
          reference. The warm rim halo comes from the directional rim light
          and lightformers. */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          color={BRAND_ORB_SATELLITES.glassTint}
          samples={BRAND_ORB_SCENE.transmissionSamples}
          resolution={BRAND_ORB_SCENE.transmissionResolution}
          transmission={satelliteGlass.transmission}
          thickness={satelliteGlass.thickness}
          roughness={satelliteGlass.roughness}
          ior={satelliteGlass.ior}
          chromaticAberration={satelliteGlass.chromaticAberration}
          anisotropy={satelliteGlass.anisotropy}
          attenuationDistance={satelliteGlass.attenuationDistance}
          distortion={satelliteGlass.distortion}
          distortionScale={satelliteGlass.distortionScale}
          temporalDistortion={satelliteGlass.temporalDistortion}
        />
      </mesh>
    </group>
  );
}
