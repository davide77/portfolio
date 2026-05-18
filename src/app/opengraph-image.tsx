import { ImageResponse } from "next/og";
import { OPENGRAPH_IMAGE_STYLES } from "@/constants/og-image-styles";
import { SITE } from "@/constants/site";

export const alt = `${SITE.name} - ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const s = OPENGRAPH_IMAGE_STYLES;

  return new ImageResponse(
    (
      <div style={s.root}>
        <div style={s.brandRow}>
          <div style={s.monogram}>{SITE.monogram}</div>
          <span style={s.domain}>domenghini.com</span>
        </div>
        <div style={s.copy}>
          <p style={s.name}>{SITE.name}</p>
          <p style={s.role}>{SITE.role}</p>
          <p style={s.description}>{SITE.oneLineDescription}</p>
        </div>
        <p style={s.location}>{SITE.location}</p>
      </div>
    ),
    { ...size },
  );
}
