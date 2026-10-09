/**
 * Uppercase "D" from DM Sans, the brand typeface, so the hero DD is the same
 * letter as the "dd" wordmark. Extracted with fontTools from the DM Sans
 * variable font (Google Fonts, SIL Open Font License) instanced at wght 600,
 * the wordmark weight, opsz default.
 *
 * Raw font units: 1000 per em, y up, baseline at 0, cap height 700.
 * Commands are absolute M / H / V / L / Q / Z.
 */
export const DM_SANS_D_GLYPH = {
  path: "M70.9 0V700H296.7Q419.3 700 498.6 656.9Q577.9 613.8 616.4 535.3Q654.9 456.8 654.9 349.2Q654.9 242.9 616.4 164.5Q577.9 86.1 498.6 43Q419.3 0 296.7 0ZM190.9 102.3H291Q381.8 102.3 434.4 131.8Q486.9 161.4 509.4 216.9Q531.9 272.3 531.9 349.2Q531.9 427.3 509.4 482.9Q486.9 538.4 434.4 568.5Q381.8 598.5 291 598.5H190.9Z",
  capHeight: 700,
  /** x extent of the outline, font units. */
  xMin: 70.9,
  xMax: 654.9,
} as const;
