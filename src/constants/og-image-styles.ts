import type { CSSProperties } from "react";
import { BRAND_COLORS } from "@/constants/brand-colors";

/**
 * ImageResponse (Satori) cannot load site CSS. These objects are the only styling surface for OG/icon routes.
 */
export const OPENGRAPH_IMAGE_STYLES = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 72,
    background: BRAND_COLORS.black,
    color: BRAND_COLORS.cream,
    fontFamily: "system-ui, sans-serif",
  } satisfies CSSProperties,
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  } satisfies CSSProperties,
  monogram: {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: BRAND_COLORS.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  } satisfies CSSProperties,
  domain: {
    fontSize: 22,
    color: BRAND_COLORS.stoneGray,
    fontWeight: 500,
  } satisfies CSSProperties,
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    maxWidth: 900,
  } satisfies CSSProperties,
  name: {
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 1.05,
    margin: 0,
    letterSpacing: "-0.03em",
  } satisfies CSSProperties,
  role: {
    fontSize: 32,
    lineHeight: 1.35,
    margin: 0,
    color: BRAND_COLORS.cream,
  } satisfies CSSProperties,
  description: {
    fontSize: 24,
    lineHeight: 1.45,
    margin: 0,
    color: BRAND_COLORS.stoneGray,
    maxWidth: 820,
  } satisfies CSSProperties,
  location: {
    fontSize: 20,
    margin: 0,
    color: BRAND_COLORS.primary,
    fontWeight: 600,
  } satisfies CSSProperties,
} as const;

export const FAVICON_IMAGE_STYLES = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: BRAND_COLORS.primary,
    color: BRAND_COLORS.cream,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "system-ui, sans-serif",
    letterSpacing: "-0.04em",
  } satisfies CSSProperties,
} as const;

export const APPLE_ICON_IMAGE_STYLES = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: BRAND_COLORS.primary,
    color: BRAND_COLORS.cream,
    fontSize: 64,
    fontWeight: 700,
    fontFamily: "system-ui, sans-serif",
    letterSpacing: "-0.04em",
    borderRadius: 36,
  } satisfies CSSProperties,
} as const;
