/**
 * AI-assisted engineering section. 3 cards, paper surface.
 * v1 buries the AI workflow; v2 leads with it as a differentiator.
 */

export const AI_SECTION = {
  eyebrow: "04 · AI-assisted engineering · a senior view",
  headline:
    "Two years embedding AI into the workflow. Not as a shortcut, as a force multiplier.",
  intro:
    "AI does not replace senior judgement. It amplifies it. The proof is the platform I shipped solo. The discipline is the code review I run on every line it writes.",
} as const;

export const AI_CARDS = [
  {
    tag: "Full-stack delivery",
    head: "Cheam Sports FC, end to end, solo.",
    body:
      "Member portal, Stripe + webhook reconciliation, FA fixture scraper, PWA web-push, Vercel cron. Pre-AI this is a cross-functional team. With AI in the loop, one senior frontend engineer. 100+ families on the live platform.",
    stack: "NEXT.JS · DRIZZLE · BETTER-AUTH · STRIPE",
  },
  {
    tag: "Debugging at machine speed",
    head: "Hours, not days.",
    body:
      "The diagnostic loop between 'something's wrong' and 'I know why' has collapsed. Unfamiliar stacks, legacy codebases, third-party SDKs - I get to the diff faster. The senior call stays mine.",
    stack: "CURSOR · CLAUDE CODE · GH COPILOT",
  },
  {
    tag: "AI as a junior PR",
    head: "Verification is where senior engineers earn their keep.",
    body:
      "I treat AI output with the scepticism I apply to a mid-level pull request. Fast to generate, slower to verify. Code review is the discipline that scales AI without scaling the bug count.",
    stack: "REVIEW · TYPE-CHECK · TEST · SHIP",
  },
] as const;
