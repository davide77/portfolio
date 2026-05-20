"use client";

import { Text } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Color, type Group, type Mesh } from "three";
import { LENS_ONLY_LAYER } from "@/components/lab/monopo/lensLayers";

type LensTextBackdropProps = {
  text: string;
  /** Font size in scene units. */
  size?: number;
  color?: string;
  background?: string;
  /** How far behind the lens the text plane sits. */
  zOffset?: number;
  /** Hide the coloured background plane from the main camera. Both the bg
   * plane and the text live only on the lens layer - the canvas is fully
   * transparent and only the lens reveals anything. */
  transparent?: boolean;
};

/**
 * Flat coloured backdrop with a single word printed across it. The text is
 * placed on a dedicated layer so the main camera ignores it; only the cube
 * camera (which renders into the refraction texture) sees it. Effect: the
 * word is invisible except where the lens passes over it.
 */
export function LensTextBackdrop({
  text,
  size = 0.35,
  color = "#1a1d22",
  background = "#f3efe7",
  zOffset = 0.6,
  transparent = false,
}: LensTextBackdropProps) {
  const bg = useMemo(() => new Color(background), [background]);
  const textRef = useRef<Group>(null);
  const planeRef = useRef<Mesh>(null);

  useEffect(() => {
    textRef.current?.traverse((obj) => obj.layers.set(LENS_ONLY_LAYER));
    if (transparent) {
      planeRef.current?.layers.set(LENS_ONLY_LAYER);
    } else {
      planeRef.current?.layers.set(0);
    }
  });

  return (
    <group position={[0, 0, -zOffset]}>
      <mesh ref={planeRef}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial color={bg} />
      </mesh>
      <group ref={textRef} scale={[-1, 1, 1]}>
        <Text
          position={[0, 0, 0.01]}
          fontSize={size}
          color={color}
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.02}
          fontWeight={800}
        >
          {text}
        </Text>
      </group>
    </group>
  );
}
