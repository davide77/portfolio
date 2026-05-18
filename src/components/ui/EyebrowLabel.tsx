import { cx } from "@/components/cx";

type EyebrowLabelProps = {
  children: string;
  className?: string;
};

/** Numbered section indicator, e.g. "01 - Selected work". */
export function EyebrowLabel({ children, className }: EyebrowLabelProps) {
  return (
    <p className={cx("eyebrow-label", "text-xs has-font-semibold uppercase is-stone-gray", className)}>
      {children}
    </p>
  );
}
