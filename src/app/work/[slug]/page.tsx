import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/constants/content/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) {
    return {};
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) {
    notFound();
  }
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          author: { "@type": "Person", name: "Davide Domenghini" },
        }}
      />
      <CaseStudyTemplate project={project} />
    </>
  );
}
