import { FloatingLens } from "@/components/lab/monopo/FloatingLens";
import { StickyScene } from "@/components/motion/StickyScene";
import { POSITIONING } from "@/constants/content/profile";

export function PositioningSection() {
  return (
    <div className="positioning-section-wrap">
      <StickyScene headline={POSITIONING.headline} paragraphs={POSITIONING.paragraphs} />
      <FloatingLens
        word="ARCHIVE"
        wordColor="#f5f1ea"
        wordBackground="#101214"
        wordSize={0.22}
        size={220}
        top="18%"
        right="6%"
      />
    </div>
  );
}
