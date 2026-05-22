import { cx } from "@/components/cx";

type EyebrowSurface = "ink" | "paper";

type EyebrowLabelProps = {
  children: string;
  surface?: EyebrowSurface;
  className?: string;
};

// Pulls a leading "01" / "03" off the eyebrow string so it can render
// in the orange accent slot. The remainder becomes the muted label.
function splitEyebrow(raw: string): { num: string | null; label: string } {
  const match = raw.match(/^(\d{1,3})\s*[·•\-]?\s*(.+)$/);
  if (!match) return { num: null, label: raw };
  return { num: match[1], label: match[2] };
}

/** Numbered eyebrow row (JetBrains Mono caps), mirrors Figma section head. */
export function EyebrowLabel({ children, surface = "ink", className }: EyebrowLabelProps) {
  const { num, label } = splitEyebrow(children);
  return (
    <p className={cx("eyebrow-label", `eyebrow-label--${surface}`, className)}>
      {num && <span className="eyebrow-label__num">{num}</span>}
      <span className="eyebrow-label__text">{label}</span>
    </p>
  );
}
