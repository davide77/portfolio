import Link from "next/link";
import { LensSections } from "@/components/sections/lab/LensSectionsClient";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { LENSES_LAB_PAGE } from "@/constants/content/lenses-lab";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Three lenses",
  description:
    "Three DD refraction lenses, each floating over a word: design, build, ship. Cursor-tracked Fresnel + cube-camera reproduction of the monopo lens technique.",
  path: LENSES_LAB_PAGE.path,
});

export default function LensesLabPage() {
  return (
    <main id="main" className="lab-page bg-ink">
      <div className="container-atmosphere has-py-8">
        <EyebrowLabel>{LENSES_LAB_PAGE.eyebrow}</EyebrowLabel>
        <h1 className="text-hero has-font-medium leading-tight is-white has-mt-4">
          {LENSES_LAB_PAGE.headline}
        </h1>
        <p className="text-lg leading-relaxed measure-62ch has-mt-4 is-paper">
          {LENSES_LAB_PAGE.description}{" "}
          <Link
            href={LENSES_LAB_PAGE.referenceUrl}
            className="is-signal"
            target="_blank"
            rel="noopener noreferrer"
          >
            {LENSES_LAB_PAGE.referenceLabel}
          </Link>
          .
        </p>

        <div className="has-mt-8">
          <LensSections />
        </div>
      </div>
    </main>
  );
}
