/**
 * About strip - 4:5 portrait left, two-paragraph bio right, two CTA chips,
 * four-column meta strip beneath. Mirrors the Figma source of truth
 * (③ Home / Desktop · About frame).
 */

import { CV_PDF_PATH } from "@/constants/config";

export const ABOUT_STRIP = {
  eyebrow: "06 · About · the one-paragraph version",
  headline: "Product Engineer. Twenty years deep. My own studio now.",
  paragraphs: [
    "I help founders and ambitious brands turn ideas into digital products people love to use, combining product thinking, design systems and modern frontend engineering. Twenty-plus years in high-traffic web, React, Next.js and TypeScript as home ground, and I love the moment a complex multi-step product finally feels effortless.",
    "What sets me apart is range. I architect a 12-step financial lending platform one day and build a Shopify storefront the next. Through Origin Social I now lead product strategy, engineering and design across a portfolio, and I'm building Nannynow.co.uk end to end. Shipping product is the senior bar.",
  ],
  portraitSrc: "/images/about/portrait.jpg",
  portraitAlt: "Portrait of Davide Domenghini",
  chips: [
    { label: "Download CV", href: CV_PDF_PATH, download: true },
    { label: "github.com/davide77", href: "https://github.com/davide77" },
  ],
  metaStrip: [
    {
      label: "Currently",
      body: "Product Engineer at Origin Social. Senior FE at Liberty Blume. Founding Nannynow.",
    },
    {
      label: "Specialism",
      body: "React, Next.js, TypeScript, SCSS, ecommerce, accessibility, design systems, WebGL.",
    },
    {
      label: "Coaching",
      body: "Six years coaching youth football at Cheam Sports FC. Mentor on the same instincts.",
    },
    {
      label: "Based",
      body: "London. Italian. Twenty years in UK product teams.",
    },
  ],
} as const;
