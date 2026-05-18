import { LabGrid } from "@/components/sections/lab/LabGrid";
import { LAB_PAGE } from "@/constants/content/experiments";
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
    <main id="main" className="container-atmosphere has-py-8">
      <EyebrowLabel>{LAB_PAGE.eyebrow}</EyebrowLabel>
      <DisplayText as="h1" className="has-mt-4">
        {LAB_PAGE.headline}
      </DisplayText>
      <p className="text-lg leading-relaxed measure-62ch has-mt-4">{LAB_PAGE.description}</p>
      <LabGrid />
    </main>
  );
}
