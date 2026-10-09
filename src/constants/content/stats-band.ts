/**
 * Stats band - the twenty years, said as one sentence instead of a
 * stat grid. Segments with `strong: true` render at full paper
 * brightness, the rest sits back in dimmed cream so the facts lead.
 * Numbers from the CV.
 */

export type StatsStatementSegment = {
  text: string;
  strong?: boolean;
};

export const STATS_BAND = {
  ariaLabel: "Twenty years of front-end work",
} as const;

export const STATS_STATEMENT: readonly StatsStatementSegment[] = [
  { text: "I've built front-ends " },
  { text: "since 2006", strong: true },
  { text: " for " },
  { text: "more than 60 brands", strong: true },
  { text: ", from Sky to grassroots clubs. Today the work runs through Origin Social, my own studio, and I still do " },
  { text: "every part of it myself", strong: true },
  { text: "." },
];
