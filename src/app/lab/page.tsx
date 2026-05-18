import type { Metadata } from "next";
import { LabGrid } from "@/components/sections/lab/LabGrid";
import { LAB_PAGE } from "@/constants/content/experiments";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DisplayText } from "@/components/ui/DisplayText";

export const metadata: Metadata = {
  title: "Lab",
  description: LAB_PAGE.description,
};

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
