// Single-page site, with two exceptions kept as their own pages:
//   - Each case study at /work/<slug>
//   - The Lab at /lab (and its sub-routes for individual experiments)
// Every other "route" is a section anchor on the home page. Old external
// URLs (/about, /work, /contact, /archive) are 301'd in next.config.ts.
export const ROUTES = {
  home: "/",
  workIndex: "/#work",
  about: "/#about",
  contact: "/#contact",
  lab: "/lab",
  work: (slug: string) => `/work/${slug}`,
  hash: {
    work: "/#work",
    approach: "/#about",
  },
  styleguide: "/styleguide",
} as const;
