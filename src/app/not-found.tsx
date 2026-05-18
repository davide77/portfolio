import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cx } from "@/components/cx";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "The page you requested is not part of this portfolio. Return to the homepage to explore selected work and contact details.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="container-sm has-py-10 is-flex is-flex-column has-gap-4">
      <h1 className="text-3xl">Page not found</h1>
      <p className="text-lg leading-relaxed is-text-muted">
        That URL is not part of this portfolio. Head back to the homepage.
      </p>
      <p>
        <Link href={ROUTES.home} className={cx("not-found-page__link", "is-primary has-font-semibold text-base")}>
          Back to homepage
        </Link>
      </p>
    </section>
  );
}
