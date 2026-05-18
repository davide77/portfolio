import { Resend } from "resend";
import { SITE } from "@/constants/site";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  budget?: string;
  projectType?: string;
};

export async function sendContactEmail(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact]", data);
      return;
    }
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "portfolio@domenghini.com",
    to,
    replyTo: data.email,
    subject: `Portfolio brief from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : "",
      data.projectType ? `Project type: ${data.projectType}` : "",
      data.budget ? `Budget: ${data.budget}` : "",
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
