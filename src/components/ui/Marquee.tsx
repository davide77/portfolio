import { cx } from "@/components/cx";

type MarqueeProps = {
  items: readonly string[];
  /** Divider glyph rendered between items in its own accent-coloured span. */
  separator?: string;
  className?: string;
  ariaLabel?: string;
};

/** Accessible auto-scroll band. Pauses on hover and focus-within. */
export function Marquee({
  items,
  separator = "·",
  className,
  ariaLabel = "Scrolling list",
}: MarqueeProps) {
  // Each item is followed by its own separator span - including the last -
  // so the seam between the two copies (and the -50% loop wrap point)
  // always shows the divider, never running two names together. The dot
  // lives in its own span so it can be coloured apart from the names.
  const unit = (
    <>
      {items.map((item, i) => (
        <span key={i}>
          {item}
          <span className="marquee__sep" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className={cx("marquee", className)} aria-label={ariaLabel}>
      <div className={"marquee__track"}>
        <span className={"marquee__content"}>{unit}</span>
        <span className={"marquee__content"} aria-hidden>
          {unit}
        </span>
      </div>
    </div>
  );
}
