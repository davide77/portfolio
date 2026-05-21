import Image from "next/image";
import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import {
  WORK_BENTO,
  WORK_BENTO_TILES,
} from "@/constants/content/work-bento";
import { cx } from "@/components/cx";

/** Selected work - 6-cell bento. Liberty Blume features 4x2. */
export function WorkBento() {
  return (
    <section className="work-bento" aria-labelledby="work-bento-title">
      <div className="container-atmosphere">
        <EyebrowLabel>{WORK_BENTO.eyebrow}</EyebrowLabel>
        <h2 id="work-bento-title" className="section-title is-paper has-mt-3">
          {WORK_BENTO.headline}
        </h2>
        <p className="work-bento__intro is-cream has-mt-3">{WORK_BENTO.intro}</p>
        <ul className="work-bento__grid has-mt-6">
          {WORK_BENTO_TILES.map((tile) => {
            const isText = tile.span === "text";
            const isExternal = tile.href.startsWith("http");
            const Wrapper = isExternal ? "a" : Link;
            const wrapperProps = isExternal
              ? { href: tile.href, rel: "noopener noreferrer", target: "_blank" }
              : { href: tile.href };
            return (
              <li
                key={tile.slug}
                className={cx("work-bento__cell", `work-bento__cell--${tile.span}`)}
                data-span={tile.span}
              >
                <Wrapper
                  {...(wrapperProps as { href: string })}
                  className="work-bento__link"
                  aria-label={`${tile.title} - ${tile.role}`}
                >
                  {!isText && "image" in tile && tile.image && (
                    <Image
                      src={tile.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                      className="work-bento__media"
                    />
                  )}
                  <div className="work-bento__label">
                    <div>
                      <p className="work-bento__role">{tile.role}</p>
                      <p className="work-bento__title">{tile.title}</p>
                      <p className="work-bento__body">{tile.body}</p>
                    </div>
                    <p className="work-bento__stack mono">{tile.stack}</p>
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
        <div className="work-bento__footer has-mt-6">
          <p className="is-cream text-sm has-m-0">{WORK_BENTO.archiveLabel}</p>
          <Link href="#archive" className="work-bento__archive-cta">
            {WORK_BENTO.archiveCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
