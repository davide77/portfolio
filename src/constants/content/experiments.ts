export const EXPERIMENTS = [
  {
    id: "noise-field",
    title: "Noise field",
    caption: "Shader gradient study. Placeholder demo.",
    attribution: "Inspired by public WebGL noise examples.",
  },
  {
    id: "scroll-mask",
    title: "Scroll mask",
    caption: "Clip-path reveal prototype.",
    attribution: "Internal experiment.",
  },
  {
    id: "type-decode",
    title: "Decode text",
    caption: "Character scramble reveal with framer-motion.",
    attribution: "Internal experiment.",
  },
] as const;

export const LAB_PAGE = {
  eyebrow: "Lab",
  headline: "Proof I push past the brief.",
  description: "WebGL, canvas, and motion experiments. Lazy-loaded and paused off-screen.",
} as const;
