import { cx } from "@/components/cx";
import styles from "./VerticalText.module.scss";

type VerticalTextProps = {
  children: string;
  className?: string;
};

/** Rotated edge accent copy. */
export function VerticalText({ children, className }: VerticalTextProps) {
  return (
    <p className={cx(styles.root, "text-xs has-font-medium uppercase", className)} aria-hidden>
      {children}
    </p>
  );
}
