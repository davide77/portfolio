import { DiscLensPreview } from "@/components/sections/lab/DiscLensPreview.client";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DISC_LENS_LAB_PAGE } from "@/constants/content/disc-lens-lab";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disc lens lab",
  description:
    "Static magnifying glass disc over a glowing 3D letterform. FBO-sampled refraction in the monopo web3d asset style. Three compositions for visual review.",
  path: `${ROUTES.lab}/disc-lens`,
});

export default function DiscLensLabPage() {
  return (
    <main id="main" className="lab-page bg-black">
      <div className="container-atmosphere has-py-8">
        <EyebrowLabel>{DISC_LENS_LAB_PAGE.eyebrow}</EyebrowLabel>
        <h1 className="text-hero has-font-medium leading-tight is-white has-mt-4">
          {DISC_LENS_LAB_PAGE.headline}
        </h1>
        <p className="text-lg leading-relaxed measure-62ch has-mt-4 is-cream">
          {DISC_LENS_LAB_PAGE.description}
        </p>

        <DiscLensPreview />

        <div className="disc-lens-lab__checklist has-mt-8">
          <p className="text-xs has-font-semibold uppercase is-stone-gray">
            Acceptance checks
          </p>
          <ul role="list" className="is-flex is-flex-column has-gap-2 has-mt-2">
            {DISC_LENS_LAB_PAGE.checklist.map((line) => (
              <li key={line} className="text-base leading-relaxed is-cream">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
