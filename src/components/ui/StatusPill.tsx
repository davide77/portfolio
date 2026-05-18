import { cx } from "@/components/cx";
import styles from "./StatusPill.module.scss";

type StatusPillProps = {
  label: string;
  className?: string;
};

/** Animated availability indicator. */
export function StatusPill({ label, className }: StatusPillProps) {
  return (
    <span className={cx(styles.root, "text-xs has-font-medium", className)}>
      <span className={styles.dot} aria-hidden />
      {label}
    </span>
  );
}
