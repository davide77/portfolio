import Link from "next/link";
import { MonopoLabPreview } from "@/components/sections/lab/MonopoLabPreview.client";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { MONOPO_LAB_PAGE } from "@/constants/content/monopo-lab";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Monopo refraction lab",
  description:
    "Sandbox reproduction of nemutas/r3f-monopo: noise background sphere, cube-camera Fresnel lens, film grain, and FXAA. Isolated from the hero for tuning.",
  path: MONOPO_LAB_PAGE.path,
});

export default function MonopoLabPage() {
  return (
    <main id="main" className="lab-page bg-black">
      <MonopoLabPreview />

      <div className="container-atmosphere has-py-8">
        <EyebrowLabel>{MONOPO_LAB_PAGE.eyebrow}</EyebrowLabel>
        <h1 className="text-hero has-font-medium leading-tight is-white has-mt-4">
          {MONOPO_LAB_PAGE.headline}
        </h1>
        <p className="text-lg leading-relaxed measure-62ch has-mt-4 is-cream">
          {MONOPO_LAB_PAGE.description}{" "}
          <Link
            href={MONOPO_LAB_PAGE.referenceUrl}
            className="is-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            {MONOPO_LAB_PAGE.referenceLabel}
          </Link>
          .
        </p>

        <div className="monopo-lab__checklist has-mt-8">
          <p className="text-xs has-font-semibold uppercase is-stone-gray">
            Acceptance checks
          </p>
          <ul role="list" className="is-flex is-flex-column has-gap-2 has-mt-2">
            {MONOPO_LAB_PAGE.checklist.map((line) => (
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
