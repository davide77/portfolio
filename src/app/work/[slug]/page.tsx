import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { JsonLd, caseStudyJsonLd } from "@/components/seo/JsonLd";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";
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
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: ROUTES.work(project.slug),
    ogImage: { path: project.imageSrc, alt: project.imageAlt },
  });
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) {
    notFound();
  }
  return (
    <>
      <JsonLd data={caseStudyJsonLd(project)} />
      <CaseStudyTemplate project={project} />
    </>
  );
}
