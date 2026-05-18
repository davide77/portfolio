import { cx } from "@/components/cx";

type MarqueeProps = {
  items: readonly string[];
  separator?: string;
  className?: string;
  ariaLabel?: string;
};

/** Accessible auto-scroll band. Pauses on hover and focus-within. */
export function Marquee({
  items,
  separator = " · ",
  className,
  ariaLabel = "Scrolling list",
}: MarqueeProps) {
  const text = items.join(separator);
  const doubled = `${text}${separator}${text}`;

  return (
    <div className={cx("marquee", className)} aria-label={ariaLabel}>
      <div className={"marquee__track"}>
        <span className={"marquee__content"}>{doubled}</span>
        <span className={"marquee__content"} aria-hidden>
          {doubled}
        </span>
      </div>
    </div>
  );
}
