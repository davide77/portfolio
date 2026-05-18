import Link from "next/link";
import { HorizontalScrollSection } from "@/components/motion/HorizontalScrollSection";
import { ProjectCard } from "@/components/ProjectCard";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { FEATURED_WORK_SECTION } from "@/constants/content/home";
import { getFeaturedCaseStudies } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import styles from "./FeaturedWorkSection.module.scss";

export function FeaturedWorkSection() {
  const projects = getFeaturedCaseStudies();

  return (
    <section id="work" className={styles.root} aria-labelledby="featured-work-title">
      <div className="container-atmosphere has-pb-5">
        <EyebrowLabel>{FEATURED_WORK_SECTION.kicker}</EyebrowLabel>
        <h2 id="featured-work-title" className="text-3xl has-mt-3">
          {FEATURED_WORK_SECTION.title}
        </h2>
        <p className="text-lg leading-relaxed measure-62ch has-mt-3">{FEATURED_WORK_SECTION.intro}</p>
        <p className="has-mt-4">
          <Link href={ROUTES.workIndex} className="has-font-semibold is-primary">
            View all work
          </Link>
        </p>
      </div>
      <HorizontalScrollSection>
        {projects.map((project) => (
          <div key={project.slug} className={styles.cardWrap}>
            <ProjectCard project={project} tone="ink" />
          </div>
        ))}
      </HorizontalScrollSection>
    </section>
  );
}

