import { z } from "zod";
import { CONTACT_PAGE } from "@/constants/content/contact-page";

const V = CONTACT_PAGE.form.validation;

/**
 * Single source of truth for contact submission validation.
 * Both the client form (ContactForm.tsx) and the API route
 * (app/api/contact/route.ts) import this schema so the rules and
 * messages can never drift apart.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, V.nameRequired),
  email: z
    .string()
    .trim()
    .min(1, V.emailRequired)
    .email(V.emailInvalid),
  company: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(1, V.messageRequired)
    .min(10, V.messageTooShort),
  budget: z.string().trim().optional(),
  projectType: z.string().optional(),
  // Honeypot: real users never see or fill this, so it must stay empty.
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Fields a user can actually correct, in display order. */
export const CONTACT_FIELD_ORDER = [
  "name",
  "email",
  "message",
] as const satisfies readonly (keyof ContactFormValues)[];

/**
 * Flatten a ZodError into a `{ field: firstMessage }` map. Used by the API
 * route to return structured, per-field errors the client can surface.
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) {
      out[key] = issue.message;
    }
  }
  return out;
}
