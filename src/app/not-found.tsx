import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cx } from "@/components/cx";
import { pageMetadata } from "@/lib/seo";
import { NOT_FOUND_PAGE } from "@/constants/content/not-found-page";

export const metadata = pageMetadata({
  title: NOT_FOUND_PAGE.title,
  description: NOT_FOUND_PAGE.metaDescription,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <div className="container-sm has-py-10 is-flex is-flex-column has-gap-7">
        <p className="error-page__code" aria-hidden="true">
          {NOT_FOUND_PAGE.code}
        </p>
        <div className="is-flex is-flex-column has-gap-4">
          <p className="error-page__eyebrow text-sm uppercase has-font-semibold">
            {NOT_FOUND_PAGE.eyebrow}
          </p>
          <h1 className="text-4xl">{NOT_FOUND_PAGE.title}</h1>
          <p className="text-lg leading-relaxed is-stone">
            {NOT_FOUND_PAGE.body}
          </p>
        </div>
        <div className="is-flex is-flex-column has-gap-5">
          <Link
            href={ROUTES.home}
            className={cx("error-page__cta", "has-font-semibold text-base")}
          >
            {NOT_FOUND_PAGE.primaryLabel}
          </Link>
          <ul className="error-page__links is-flex is-flex-wrap has-gap-5">
            {NOT_FOUND_PAGE.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="error-page__link text-base">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
