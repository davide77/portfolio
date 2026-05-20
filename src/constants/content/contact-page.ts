import { SITE } from "@/constants/site";

export const CONTACT_PAGE = {
  headline: "Bring the brief everyone else avoided.",
  responseTime: "I reply within 24 hours, weekdays.",
  backHomeLabel: "Back to home",
  pageIntro: "Send a brief. No gate, no pop-up. Replies within 48h.",
  cards: {
    brief: {
      title: "Send a brief",
      body: "Name, email, and message are enough. Budget and project type help me respond faster.",
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
    optionalHint: "(optional)",
    errorTitle: "That did not send.",
    errorBody: `Something went wrong on send. Email ${SITE.email} directly and it will reach me.`,
    rateLimitedTitle: "Slow down a moment.",
    rateLimitedBody:
      "Too many attempts from here in a short window. Wait a minute, then send again.",
    successTitle: "Message received.",
    successBody: "I will reply within one working day.",
    // Accessible error summary shown above the form on an invalid submit.
    summaryTitle: "Check the highlighted fields:",
    // Field-level validation messages. Single source of truth for both the
    // client form and the API route via src/lib/validation/contact.ts.
    validation: {
      nameRequired: "Add your name so I know who I am replying to.",
      emailRequired: "Add an email so I can reply.",
      emailInvalid: "That email does not look right. Check for a typo.",
      messageRequired: "Add a short brief.",
      messageTooShort: "A line or two more so I can gauge fit (10 characters minimum).",
    },
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
