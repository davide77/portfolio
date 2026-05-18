import { cx } from "@/components/cx";

type StatusPillProps = {
  label: string;
  className?: string;
};

/** Animated availability indicator. */
export function StatusPill({ label, className }: StatusPillProps) {
  return (
    <span className={cx("status-pill", "text-xs has-font-medium", className)}>
      <span className={"status-pill__dot"} aria-hidden />
      {label}
    </span>
  );
}
