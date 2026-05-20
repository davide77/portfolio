import { SITE } from "@/constants/site";

// Shown by src/app/error.tsx - a runtime error inside a route segment.
// The site shell is still intact, so this renders inside the layout.
export const ERROR_PAGE = {
  code: "500",
  eyebrow: "My fault, not yours",
  title: "Something broke on my side.",
  body: "A runtime error stopped this page from rendering. The error is logged, so I will see it. Try the page again, or head back to the home page.",
  retryLabel: "Try again",
  homeLabel: "Back to home",
  contactPrefix: "If it keeps happening, email",
  contactEmail: SITE.email,
  metaDescription:
    "An unexpected error stopped this page from rendering. Try again or return to the homepage.",
} as const;

// Shown by src/app/global-error.tsx - an error in the root layout itself.
// Nothing from the normal shell or stylesheet can be relied on here, so the
// copy is short and the page renders its own minimal document.
export const GLOBAL_ERROR_PAGE = {
  code: "500",
  title: "The site failed to load.",
  body: "Something went wrong before the page could start. Reload, or come back in a moment.",
  retryLabel: "Reload the page",
} as const;
