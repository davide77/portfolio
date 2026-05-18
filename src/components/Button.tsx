import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost" | "ghostOnInk";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx(styles.button, styles[`button--${variant}`], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
