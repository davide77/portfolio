/** Runtime config and third-party placeholders. Swap values per environment. */

export const BOOKING_URL = "https://cal.com/davidedomenghini/intro";

export const PLAUSIBLE_DOMAIN = "domenghini.com";

export const CV_PDF_PATH = "/cv/davide-domenghini-cv.docx";

export const CONTACT_RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 5,
} as const;

export const LOADER_STORAGE_KEY = "dd-portfolio-loader-v1";
