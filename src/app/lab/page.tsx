import Link from "next/link";
import { BrandOrbShowcase } from "@/components/sections/lab/BrandOrbShowcase";
import { LabGrid } from "@/components/sections/lab/LabGrid";
import { LAB_PAGE } from "@/constants/content/experiments";
import { LAB_FEATURED } from "@/constants/content/lab-featured";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DisplayText } from "@/components/ui/DisplayText";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lab",
  description:
    "WebGL, canvas, and motion experiments from Davide Domenghini. Prototypes for scroll masks, shader gradients, and interaction patterns before they ship to production.",
  path: ROUTES.lab,
});

export default function LabPage() {
  return (
    <main id="main" className="lab-page bg-ink">
      <div className="container-atmosphere has-py-8">
        <EyebrowLabel>{LAB_PAGE.eyebrow}</EyebrowLabel>
        <DisplayText as="h1" className="has-mt-4 is-white">
          {LAB_PAGE.headline}
        </DisplayText>
        <p className="text-lg leading-relaxed measure-62ch has-mt-4 is-paper">
          {LAB_PAGE.description}
        </p>

        <ul className="lab-featured has-mt-8" role="list">
          {LAB_FEATURED.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="lab-featured__card">
                <p className="text-xs has-font-semibold uppercase is-stone">
                  {item.eyebrow}
                </p>
                <p className="text-lg has-font-semibold is-white has-mt-2">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed is-paper has-mt-2">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <BrandOrbShowcase />
        <LabGrid />
      </div>
    </main>
  );
}
