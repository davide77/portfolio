export const ABOUT_PAGE = {
  eyebrow: "05 · Who you'd be hiring",
  cvLabel: "Download CV (PDF)",
  principlesLabel: "Why you'd hire me",
  headline: "Product Engineer. Twenty years turning ideas into products people use.",
  intro:
    "I help founders and ambitious brands turn ideas into digital products people love to use, combining product thinking, design systems and modern frontend engineering. Twenty-plus years in high-traffic web, React, Next.js and TypeScript as home ground. Through Origin Social I now lead product strategy, engineering and design end to end. I do my best work when design, engineering and commercial outcomes all have to land at once, which is exactly the moment most teams want a senior pair of hands they can hand the call to.",
  portraitAlt: "Portrait of Davide Domenghini",
  portraitSrc: "/images/about/portrait.jpg",
  principles: [
    {
      id: "judgement",
      title: "I've already shipped the hard version of your problem",
      body:
        "Sky, Estée Lauder, Liberty Global, Bristol City Council, EE and A+E Networks have all run front-end I led. Twenty years in high-traffic web work means I know where speed pays off and where it costs you later: fewer regressions, clearer interfaces and code the next engineer picks up without a tour.",
    },
    {
      id: "range",
      title: "One senior hire covering what usually takes a team",
      body:
        "I architect a 12-step financial lending platform one week and prototype an experimental WebGL interface the next. I lead front-end on enterprise platforms generating multi-million-pound revenue, and I'm just as effective mentoring juniors or turning a rough idea into a working MVP. That range is less coordination overhead for you.",
    },
    {
      id: "ship",
      title: "I ship product end to end, not tickets",
      body:
        "Nannynow.co.uk is the proof: product direction, UX, API integration and deployment in one stack. LOVA on Shopify, Cheam Sports FC and Striver.Football show the same pattern. One senior owner delivering what used to need a small cross-functional team.",
    },
  ],
  beyond: {
    title: "Beyond work",
    body:
      "For six years I've coached a youth team at Cheam Sports FC. Reading how to motivate different personalities is the same skill I bring to mentoring developers and leading teams. Outside client work I keep building with Three.js, WebGL and Framer Motion, testing ideas that later show up, more disciplined, in production.",
  },
  tools: {
    title: "Tools and stack",
    groups: [
      {
        label: "Core",
        items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "SCSS (BEM)"],
      },
      {
        label: "Commerce",
        items: ["Shopify", "DTC storefronts", "Stripe", "Conversion UX"],
      },
      {
        label: "Creative",
        items: ["Framer Motion", "Three.js", "WebGL", "SVG", "GSAP"],
      },
      {
        label: "DevOps",
        items: ["Git", "GitHub", "CI/CD", "Docker", "GCP", "Vercel"],
      },
      {
        label: "CMS",
        items: ["WordPress (headless)", "Drupal", "Umbraco", "Squiz Matrix", "Docusaurus"],
      },
    ],
  },
  cta: "Email Davide",
} as const;
