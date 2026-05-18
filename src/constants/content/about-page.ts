export const ABOUT_PAGE = {
  eyebrow: "About",
  headline: "Twenty years of front-end work. Still sweating the details.",
  intro:
    "I'm a senior front-end engineer and founder with 20+ years building scalable, high-performance web applications for Sky, Estée Lauder, Liberty Global, Bristol City Council, EE, and A+E Networks. I specialise in React, Next.js and TypeScript. I do my best work when design, engineering and commercial outcomes all have to land at once.",
  portraitAlt: "Portrait of Davide Domenghini",
  portraitSrc: "/images/about/portrait.jpg",
  principles: [
    {
      id: "judgement",
      title: "Judgement over volume",
      body:
        "Twenty years in high-traffic web work taught me where speed helps and where it costs. I optimise for the outcome: fewer regressions, clearer interfaces, and code the next engineer can pick up without a tour.",
    },
    {
      id: "range",
      title: "Range is the differentiator",
      body:
        "I can architect a 12-step financial lending platform one day and prototype an experimental WebGL interface the next. I lead front-end on enterprise platforms generating multi-million-euro revenue, and I'm equally at home mentoring juniors and turning a rough idea into a working MVP.",
    },
    {
      id: "ship",
      title: "Ship product end to end",
      body:
        "Nannynow.co.uk is the live proof: product direction, UX, API integration, and deployment in one stack. Cheam Sports FC and Striver.Football show the same pattern - one senior engineer with clear ownership delivering what used to need a small cross-functional team.",
    },
  ],
  beyond: {
    title: "Beyond work",
    body:
      "For six years I've coached a youth team at Cheam Sports FC. Understanding how to motivate different personalities shapes how I mentor developers and lead teams. Outside client work I keep building with Three.js, WebGL and Framer Motion, testing ideas that later show up, more disciplined, in production.",
  },
  tools: {
    title: "Tools and stack",
    groups: [
      {
        label: "Core",
        items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "SCSS (BEM)"],
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
  cta: "Let's talk",
} as const;
