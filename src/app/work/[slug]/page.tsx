import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, caseStudyJsonLd } from "@/components/seo/JsonLd";
import { CaseStudyView } from "@/components/sections/work/CaseStudyView";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    return pageMetadata({
      description: "Case study not found.",
      path: ROUTES.work(slug),
      noIndex: true,
    });
  }

  return pageMetadata({
    title: `${project.title} · ${project.client}`,
    description: project.summary,
    path: ROUTES.work(project.slug),
    ogImage: { path: project.imageSrc, alt: project.imageAlt },
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextCaseStudy(project.slug);

  return (
    <>
      <JsonLd data={caseStudyJsonLd(project)} />
      <CaseStudyView project={project} nextProject={nextProject} />
    </>
  );
}
