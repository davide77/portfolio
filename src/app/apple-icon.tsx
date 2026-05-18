import { ImageResponse } from "next/og";
import { APPLE_ICON_IMAGE_STYLES } from "@/constants/og-image-styles";
import { SITE } from "@/constants/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={APPLE_ICON_IMAGE_STYLES.root}>
        {SITE.monogram}
      </div>
    ),
    { ...size },
  );
}
