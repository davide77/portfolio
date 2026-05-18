import { cx } from "@/components/cx";

type VerticalTextProps = {
  children: string;
  className?: string;
};

/** Rotated edge accent copy. */
export function VerticalText({ children, className }: VerticalTextProps) {
  return (
    <p className={cx("vertical-text", "text-xs has-font-medium uppercase", className)} aria-hidden>
      {children}
    </p>
  );
}
