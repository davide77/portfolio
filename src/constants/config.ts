/** Runtime config and third-party placeholders. Swap values per environment. */

export const PLAUSIBLE_DOMAIN = "domenghini.com";

export const CV_PDF_PATH = "/cv/davide-domenghini-cv.docx";

export const CONTACT_RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 5,
} as const;

export const LOADER_STORAGE_KEY = "dd-portfolio-loader-v2";

/**
 * Intro sequence (the brand splash shown once per tab session before the
 * home hero). All timings live here - the component reads, never hard-codes.
 */
export const INTRO = {
  /** ms for the progress meter to fill 0 -> 100. */
  loadDurationMs: 1200,
  /** ms to hold at 100 before the curtain lifts. */
  dwellAfterFullMs: 260,
  /** seconds for the slide-up reveal (framer-motion). */
  exitSeconds: 0.85,
  /** per-letter stagger for the monogram mask reveal, in seconds. */
  letterStagger: 0.08,
  /** label on the skip control. */
  skipLabel: "Skip",
} as const;

/**
 * Footer wash: how far before the bottom of the page the cream
 * transition starts, measured in viewport heights. 1.1 means the page
 * has fully washed to cream by the time you reach the bottom, with the
 * ramp spanning roughly the last viewport-and-a-bit of scroll.
 */
export const FOOTER_WASH_RAMP_VH = 1.1;
