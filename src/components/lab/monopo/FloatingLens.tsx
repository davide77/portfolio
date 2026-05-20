"use client";

import { type CSSProperties } from "react";
import { LensTextBackdrop } from "@/components/lab/monopo/LensTextBackdrop";
import { MonopoLabCanvas } from "@/components/lab/monopo/MonopoLabCanvas";
import { cx } from "@/components/cx";

type FloatingLensProps = {
  /** The hidden word the lens reveals as it drifts past. */
  word: string;
  /** Word colour inside the lens. */
  wordColor?: string;
  /** Backdrop colour seen inside the lens behind the word. Use a contrasting
   * shade of the section's bg so the lens reads as a glass disc, not a hole. */
  wordBackground?: string;
  /** Font size of the hidden word, in scene units (~0.18-0.35 is readable). */
  wordSize?: number;
  /** Pixel size of the lens canvas (square). Set via CSS variable so SCSS
   * controls it; this is a sensible default. */
  size?: number;
  /** CSS positioning - drop the lens anywhere over its parent. The parent
   * must be `position: relative`. */
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  /** Lens marble scale within the canvas. */
  lensScale?: number;
  /** Drift amplitude. */
  floatStrength?: number;
  className?: string;
  /** Accessible label - what this lens is for. */
  ariaLabel?: string;
};

/**
 * Drop-anywhere floating glass marble that refracts a hidden word. The canvas
 * is transparent; the host section's background shows through. Mouse-track
 * the lens within the canvas, slow drift on idle.
 *
 * Parent must be `position: relative`. Example:
 * ```tsx
 * <section className="hero">
 *   <h1>Heading</h1>
 *   <FloatingLens word="DESIGN" top="20%" right="8%" size={240} />
 * </section>
 * ```
 */
export function FloatingLens({
  word,
  wordColor = "#f5f1ea",
  wordBackground = "#1a1d22",
  wordSize = 0.25,
  size = 220,
  top,
  right,
  bottom,
  left,
  lensScale = 0.55,
  floatStrength = 4,
  className,
  ariaLabel,
}: FloatingLensProps) {
  const positionStyle = {
    "--floating-lens-size": `${size}px`,
    top,
    right,
    bottom,
    left,
  } as CSSProperties;

  return (
    <div
      className={cx("floating-lens", className)}
      style={positionStyle}
      aria-label={ariaLabel ?? `Floating lens revealing the word ${word}`}
      role="img"
    >
      <MonopoLabCanvas
        className="floating-lens__canvas"
        transparent
        lensShape="sphere"
        lensScale={lensScale}
        idleFloat
        floatStrength={floatStrength}
        fresnelBias={0.25}
        fresnelScale={2.8}
        fresnelPower={2.2}
        backdrop={
          <LensTextBackdrop
            text={word}
            color={wordColor}
            background={wordBackground}
            size={wordSize}
            transparent
          />
        }
      />
    </div>
  );
}
