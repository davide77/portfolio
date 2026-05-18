import { cx } from "@/components/cx";

type StatusPillTone = "ink" | "paper";

type StatusPillProps = {
  label: string;
  /**
   * Surface the pill sits on. "ink" (default) is cream text for dark
   * backgrounds (footer, closing CTA). "paper" is dark text for light
   * backgrounds (contact, styleguide) so it stays readable.
   */
  tone?: StatusPillTone;
  className?: string;
};

/** Animated availability indicator. */
export function StatusPill({ label, tone = "ink", className }: StatusPillProps) {
  return (
    <span
      className={cx(
        "status-pill",
        `status-pill--${tone}`,
        "text-xs has-font-medium",
        className,
      )}
    >
      <span className={"status-pill__dot"} aria-hidden />
      {label}
    </span>
  );
}
