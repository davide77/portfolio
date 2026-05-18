import { cx } from "@/components/cx";

type BrandMarkVariant = "ink" | "paper";

type BrandMarkProps = {
  variant: BrandMarkVariant;
  className?: string;
};

/** Interlocking Fraunces monogram — no boxed "DD" badge. */
export function BrandMark({ variant, className }: BrandMarkProps) {
  return (
    <span
      className={cx("brand-mark__mark", variant === "ink" ? "brand-mark__mark--ink" : "brand-mark__mark--paper", className)}
      aria-hidden
    >
      <span className={"brand-mark__letter"}>D</span>
      <span className={"brand-mark__letter-alt"}>D</span>
    </span>
  );
}
