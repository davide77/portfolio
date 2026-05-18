import { cx } from "@/components/cx";
import styles from "./EyebrowLabel.module.scss";

type EyebrowLabelProps = {
  children: string;
  className?: string;
};

/** Numbered section indicator, e.g. "01 — Selected work". */
export function EyebrowLabel({ children, className }: EyebrowLabelProps) {
  return (
    <p className={cx(styles.root, "text-xs has-font-semibold uppercase", className)}>
      {children}
    </p>
  );
}
