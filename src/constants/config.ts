/** Runtime config and third-party placeholders. Swap values per environment. */

export const BOOKING_URL = "https://cal.com/davidedomenghini/intro";

export const PLAUSIBLE_DOMAIN = "domenghini.com";

export const CV_PDF_PATH = "/cv/davide-domenghini-cv.docx";

export const CONTACT_RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 5,
} as const;

export const LOADER_STORAGE_KEY = "dd-portfolio-loader-v1";

/**
 * Footer wash: how far before the bottom of the page the cream
 * transition starts, measured in viewport heights. 1.1 means the page
 * has fully washed to cream by the time you reach the bottom, with the
 * ramp spanning roughly the last viewport-and-a-bit of scroll.
 */
export const FOOTER_WASH_RAMP_VH = 1.1;
