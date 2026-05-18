import { SITE } from "@/constants/site";

export const CONTACT_PAGE = {
  headline: "Let's build something.",
  responseTime: "I reply within 24 hours, weekdays.",
  backHomeLabel: "Back to home",
  pageIntro:
    "Book a call, send a brief, or reach out directly. No gate, no pop-up.",
  cards: {
    book: {
      title: "Book a call",
      body: "Pick a slot that suits your timezone. Best for hiring leads and founders.",
    },
    brief: {
      title: "Send a brief",
      body: "Name, email, and message are enough. Budget and project type help me respond faster.",
    },
    dm: {
      title: "Direct message",
      body: "LinkedIn, X, Facebook, email, or GitHub if you prefer async.",
    },
  },
  form: {
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    messageLabel: "Message",
    budgetLabel: "Budget (optional)",
    submitLabel: "Send brief",
    projectTypeLabel: "Project type",
    requiredHint: "(required)",
    errorBody: `Something went wrong. Email ${SITE.email} directly.`,
    successTitle: "Message received.",
    successBody: "I will reply within one working day.",
    projectTypes: [
      "Senior hire",
      "Advisory",
      "Product build",
      "Design system",
      "Other",
    ] as const,
    honeypotLabel: "Leave blank",
  },
} as const;
