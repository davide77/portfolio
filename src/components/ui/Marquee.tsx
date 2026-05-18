import { cx } from "@/components/cx";
import styles from "./Marquee.module.scss";

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
    <div className={cx(styles.root, className)} aria-label={ariaLabel}>
      <div className={styles.track}>
        <span className={styles.content}>{doubled}</span>
        <span className={styles.content} aria-hidden>
          {doubled}
        </span>
      </div>
    </div>
  );
}
