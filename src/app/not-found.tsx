import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cx } from "@/components/cx";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className="container-sm has-py-10 is-flex is-flex-column has-gap-4">
      <h1 className="text-3xl">Page not found</h1>
      <p className="text-lg leading-relaxed is-text-muted">
        That URL is not part of this portfolio. Head back to the homepage to see selected work and
        contact details.
      </p>
      <p>
        <Link href={ROUTES.home} className={cx(styles.link, "is-primary has-font-semibold text-base")}>
          Go home
        </Link>
      </p>
    </section>
  );
}
