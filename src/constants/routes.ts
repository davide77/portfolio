// Single-page site, with one exception: each case study is its own real
// page at /work/<slug> (a distinct place with a Back to home button).
// Every other "route" is a section anchor on the home page. Old external
// URLs (/about, /work, /contact, /lab) are 301'd in next.config.ts.
export const ROUTES = {
  home: "/",
  workIndex: "/#work",
  archive: "/#archive",
  about: "/#about",
  contact: "/#contact",
  // Each case study is its own standalone page.
  work: (slug: string) => `/work/${slug}`,
  hash: {
    work: "/#work",
    approach: "/#about",
  },
  styleguide: "/styleguide",
} as const;
