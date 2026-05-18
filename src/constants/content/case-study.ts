// Shared labels for the case-study templates (CaseStudyTemplate and
// CaseStudyBody). Kept in one place so the two templates cannot drift.
export const CASE_STUDY = {
  backToWorkLabel: "Back to work",
  backToHomeLabel: "Back to home",
  moreWorkLabel: "More work",
  technologiesAriaLabel: "Technologies",
  artefactsAriaLabel: "Selected artefacts",
  nextProjectLabel: "Next project",
  liveCursorText: "Live",
  viewCaseStudyLabel: "View case study",
  viewCaseStudyAriaPrefix: "View case study:",
  sections: {
    brief: "The brief",
    work: "The work",
    outcome: "Outcome",
    artefacts: "Selected screens",
  },
} as const;
