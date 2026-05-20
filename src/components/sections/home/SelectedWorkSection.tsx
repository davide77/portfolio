import { SelectedWorkList } from "@/components/sections/home/SelectedWorkList";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { SELECTED_WORK_SECTION } from "@/constants/content/home";
import { getFeaturedCaseStudies } from "@/constants/content/projects";

export function SelectedWorkSection() {
  const projects = getFeaturedCaseStudies();

  return (
    <section className={"selected-work"} aria-labelledby="selected-work-title">
      <div className="container-atmosphere">
        <header className="selected-work__header">
          <EyebrowLabel>{SELECTED_WORK_SECTION.kicker}</EyebrowLabel>
          <h2 id="selected-work-title" className="section-title is-cream has-mt-3">
            {SELECTED_WORK_SECTION.title}
          </h2>
          <p className="text-lg leading-relaxed measure-62ch has-mt-3">
            {SELECTED_WORK_SECTION.intro}
          </p>
        </header>
        <SelectedWorkList projects={projects} />
      </div>
    </section>
  );
}
