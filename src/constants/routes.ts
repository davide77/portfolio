export const ROUTES = {
  home: "/",
  workIndex: "/work",
  archive: "/archive",
  about: "/about",
  lab: "/lab",
  contact: "/contact",
  work: (slug: string) => `/work/${slug}`,
  hash: {
    work: "/#work",
    approach: "/about#judgement",
  },
  styleguide: "/styleguide",
} as const;
