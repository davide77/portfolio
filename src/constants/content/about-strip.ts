/**
 * About strip - 4:5 portrait left, two-paragraph bio right, three CTA chips.
 * Compact form of the previous full /about page; lives inline on home in
 * Option B (single-page architecture).
 */

export const ABOUT_STRIP = {
  eyebrow: "06 · About · the one-paragraph version",
  headline: "Senior front-end. Twenty years deep. Founder on the side.",
  paragraphs: [
    "I'm a senior front-end engineer and founder with twenty-plus years building scalable, high-performance web applications for Sky, Estée Lauder, Liberty Global, Bristol City Council, EE and A+E Networks. I specialise in React, Next.js and TypeScript, and I love the moment a complex multi-step product finally feels effortless to use.",
    "What sets me apart is range. I architect a 12-step financial lending platform one day and prototype an experimental WebGL interface the next. I lead front-end on enterprise revenue platforms, mentor juniors onto modern practice, and I'm currently building Nannynow.co.uk end to end. Shipping product is the senior bar.",
  ],
  portraitAlt: "Portrait of Davide Domenghini",
  chips: [
    { label: "Download CV", href: "/davide-domenghini-cv.pdf" },
    { label: "Twenty-year timeline", href: "#timeline" },
    { label: "github.com/davide77", href: "https://github.com/davide77" },
  ],
} as const;
