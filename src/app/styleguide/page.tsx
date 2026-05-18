import { notFound } from "next/navigation";
import { DisplayText } from "@/components/ui/DisplayText";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { StatusPill } from "@/components/ui/StatusPill";
import { VerticalText } from "@/components/ui/VerticalText";
import { BOOKING_URL } from "@/constants/config";
import { PROFILE } from "@/constants/content/profile";

export default function StyleguidePage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main id="main" className="container-atmosphere has-py-8 is-flex is-flex-column has-gap-8">
      <h1 className="text-3xl">Styleguide</h1>
      <section className="is-flex is-flex-column has-gap-3">
        <EyebrowLabel>01 - Component preview</EyebrowLabel>
        <DisplayText as="h2">{PROFILE.headline}</DisplayText>
        <StatusPill label={PROFILE.availabilityLabel} tone="paper" />
        <MagneticButton href={BOOKING_URL} cursorText="Book" external>
          Book a call
        </MagneticButton>
        <VerticalText>{PROFILE.verticalStrip}</VerticalText>
        <Marquee items={["Sky", "Liberty Global", "Estée Lauder"]} />
      </section>
    </main>
  );
}
