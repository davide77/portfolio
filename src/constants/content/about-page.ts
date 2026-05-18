export const ABOUT_PAGE = {
  eyebrow: "About",
  headline: "Senior engineering judgement, amplified by AI.",
  intro:
    "I'm a senior front-end engineer and founder with 20+ years building scalable, high-performance web applications for Sky, Estée Lauder, Liberty Global, Bristol City Council, EE, and A+E Networks. I specialise in React, Next.js and TypeScript. I come alive when design, engineering and commercial outcomes all have to land at once.",
  portraitAlt: "Portrait of Davide Domenghini",
  portraitSrc: "/images/about/portrait.jpg",
  principles: [
    {
      id: "ai",
      title: "Senior engineering judgement, amplified by AI",
      body:
        "I've spent the past two years embedding AI tools into my workflow as a force multiplier, not a shortcut. AI doesn't replace senior engineering judgement, it amplifies it. I treat AI output with the scepticism I'd apply to a mid-level pull request: fast to generate, slower to verify.",
    },
    {
      id: "range",
      title: "Range is the differentiator",
      body:
        "What sets me apart is range. I can architect a 12-step financial lending platform one day and prototype an experimental WebGL interface the next. I lead frontend on enterprise platforms generating multi-million euro revenue, and I'm equally at home mentoring juniors and turning a rough idea into a working MVP.",
    },
    {
      id: "ship",
      title: "Ship product, not just code",
      body:
        "I'm building Nannynow.co.uk end-to-end because the best engineers know how to ship product, not just code. Cheam Sports FC and Striver.Football are the same proof point: with AI in the loop, one senior engineer can deliver what used to need a small cross-functional team.",
    },
  ],
  beyond: {
    title: "Beyond work",
    body:
      "For six years I've coached a youth team at Cheam Sports FC. Understanding how to motivate different personalities shapes how I mentor developers and lead teams. Outside client work I keep my hands dirty with Three.js, WebGL and Framer Motion, testing ideas that later show up, more disciplined, in production.",
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
