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
    <main id="main" className="container-sm has-py-10 is-flex is-flex-column has-gap-4">
      <h1 className="text-3xl">{NOT_FOUND_PAGE.title}</h1>
      <p className="text-lg leading-relaxed is-text-muted">{NOT_FOUND_PAGE.body}</p>
      <p>
        <Link href={ROUTES.home} className={cx("not-found-page__link", "is-primary has-font-semibold text-base")}>
          {NOT_FOUND_PAGE.linkLabel}
        </Link>
      </p>
    </main>
  );
}
