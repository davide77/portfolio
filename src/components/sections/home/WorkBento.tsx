import Image from "next/image";
import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import {
  WORK_BENTO,
  WORK_BENTO_TILES,
} from "@/constants/content/work-bento";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

/**
 * Selected work - uniform 3x2 grid (Figma "Project tile · pattern", 79:2).
 * Clean screenshot on top with a floating role chip, metadata below. Every
 * tile is the same size; hierarchy lives in the chip copy, not the layout.
 */
export function WorkBento() {
  return (
    <section className="work-bento" aria-labelledby="work-bento-title">
      <div className="container-atmosphere">
        <StaggerList as="div" stagger={0.08}>
          <StaggerItem as="div">
            <EyebrowLabel>{WORK_BENTO.eyebrow}</EyebrowLabel>
          </StaggerItem>
          <StaggerItem as="div">
            <h2 id="work-bento-title" className="section-title is-paper has-mt-3">
              {WORK_BENTO.headline}
            </h2>
          </StaggerItem>
        </StaggerList>
        <StaggerList as="ul" className="work-bento__grid has-mt-6" stagger={0.08}>
          {WORK_BENTO_TILES.map((tile) => {
            const Wrapper = tile.isExternal ? "a" : Link;
            const wrapperProps = tile.isExternal
              ? { href: tile.href, rel: "noopener noreferrer", target: "_blank" }
              : { href: tile.href };
            return (
              <StaggerItem
                as="li"
                key={tile.slug}
                className="work-bento__cell"
                lift={28}
              >
                <Wrapper
                  {...(wrapperProps as { href: string })}
                  className="work-bento__link"
                  aria-label={`${tile.title} - ${tile.role}`}
                >
                  <div className="work-bento__media-well">
                    <Image
                      src={tile.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                      className="work-bento__media"
                    />
                    <p className="work-bento__chip">
                      <span className="work-bento__chip-dot" aria-hidden />
                      {tile.role}
                    </p>
                  </div>
                  <div className="work-bento__meta is-flex is-flex-column has-gap-2 has-p-5">
                    <p className="work-bento__title">{tile.title}</p>
                    <p className="work-bento__body">{tile.body}</p>
                    <p className="work-bento__stack mono">{tile.stack}</p>
                  </div>
                </Wrapper>
              </StaggerItem>
            );
          })}
        </StaggerList>
        <MotionReveal className="work-bento__footer has-mt-6" lift={16}>
          <p className="is-cream text-sm has-m-0">{WORK_BENTO.archiveLabel}</p>
          <Link href={WORK_BENTO.archiveHref} className="work-bento__archive-cta">
            {WORK_BENTO.archiveCta}
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
