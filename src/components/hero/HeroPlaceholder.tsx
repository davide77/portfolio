import { cx } from "@/components/cx";

type HeroPlaceholderProps = {
  className?: string;
  visible?: boolean;
};

/** Static radial fallback before WebGL mounts or when motion is reduced. */
export function HeroPlaceholder({ className, visible = true }: HeroPlaceholderProps) {
  return (
    <div
      className={cx("hero-placeholder", className, visible && "hero-placeholder--visible")}
      aria-hidden
    />
  );
}
