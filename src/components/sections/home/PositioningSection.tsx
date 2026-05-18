import { StickyScene } from "@/components/motion/StickyScene";
import { POSITIONING } from "@/constants/content/profile";

export function PositioningSection() {
  return <StickyScene headline={POSITIONING.headline} paragraphs={POSITIONING.paragraphs} />;
}
