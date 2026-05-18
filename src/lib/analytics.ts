export function trackEvent(name: string, props?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: (n: string, o?: { props: Record<string, string | number> }) => void }).plausible;
  plausible?.(name, props ? { props } : undefined);
}
