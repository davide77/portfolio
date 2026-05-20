import Link from "next/link";
import { FloatingLens } from "@/components/lab/monopo/FloatingLens";
import { HorizontalScrollSection } from "@/components/motion/HorizontalScrollSection";
import { ProjectCard } from "@/components/ProjectCard";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { FEATURED_WORK_SECTION } from "@/constants/content/home";
import { getFeaturedCaseStudies } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";

export function FeaturedWorkSection() {
  const projects = getFeaturedCaseStudies();

  return (
    <section id="work" className={"featured-work-section"} aria-labelledby="featured-work-title">
      <FloatingLens
        word="WORK"
        wordColor="#f5f1ea"
        wordBackground="#101214"
        wordSize={0.28}
        size={220}
        top="14%"
        right="8%"
      />
      <HorizontalScrollSection
        header={
          <div className="container-atmosphere">
            <EyebrowLabel>{FEATURED_WORK_SECTION.kicker}</EyebrowLabel>
            <h2 id="featured-work-title" className="text-3xl has-mt-3">
              {FEATURED_WORK_SECTION.title}
            </h2>
            <p className="text-lg leading-relaxed measure-62ch has-mt-3">
              {FEATURED_WORK_SECTION.intro}
            </p>
            <p className="has-mt-4">
              <Link href={ROUTES.workIndex} className="has-font-semibold is-forest">
                {FEATURED_WORK_SECTION.viewAllLabel}
              </Link>
            </p>
          </div>
        }
      >
        {projects.map((project) => (
          <div key={project.slug} className={"featured-work-section__card-wrap"}>
            <ProjectCard project={project} tone="ink" />
          </div>
        ))}
      </HorizontalScrollSection>
    </section>
  );
}

