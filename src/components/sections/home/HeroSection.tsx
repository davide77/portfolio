"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DisplayText } from "@/components/ui/DisplayText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { VerticalText } from "@/components/ui/VerticalText";
import { BOOKING_URL } from "@/constants/config";
import { PROFILE } from "@/constants/content/profile";
import { ROUTES } from "@/constants/routes";
import { cx } from "@/components/cx";
import styles from "./HeroSection.module.scss";

const HeroWebGLBackdrop = dynamic(
  () => import("@/components/hero/HeroWebGLBackdrop").then((m) => m.HeroWebGLBackdrop),
  { ssr: false },
);

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={cx(styles.root, "bg-black")} aria-labelledby="hero-heading">
      {!reduceMotion ? <HeroWebGLBackdrop /> : null}
      <div className={cx(styles.inner, "container-atmosphere")}>
        <EyebrowLabel className="is-cream">{PROFILE.eyebrow}</EyebrowLabel>
        <DisplayText as="h1" className={styles.headline}>
          {PROFILE.headline}
        </DisplayText>
        <p id="hero-heading" className={cx(styles.subhead, "text-lg leading-relaxed is-cream measure-62ch")}>
          {PROFILE.subhead}
        </p>
        <div className="is-flex is-flex-wrap has-gap-3 has-mt-5">
          <MagneticButton href={BOOKING_URL} variant="primary" cursorText="Book" external>
            {PROFILE.primaryCta}
          </MagneticButton>
          <MagneticButton href={ROUTES.workIndex} variant="ghostOnInk" cursorText="Work">
            {PROFILE.secondaryCta}
          </MagneticButton>
        </div>
        <VerticalText className={styles.strip}>{PROFILE.verticalStrip}</VerticalText>
      </div>
    </section>
  );
}
