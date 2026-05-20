"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cx } from "@/components/cx";
import { ERROR_PAGE } from "@/constants/content/error-page";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for the browser console / monitoring. The digest
    // links a user-visible failure to the server log entry.
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="error-page">
      <div className="container-sm has-py-10 is-flex is-flex-column has-gap-7">
        <p className="error-page__code" aria-hidden="true">
          {ERROR_PAGE.code}
        </p>
        <div className="is-flex is-flex-column has-gap-4">
          <p className="error-page__eyebrow text-sm uppercase has-font-semibold">
            {ERROR_PAGE.eyebrow}
          </p>
          <h1 className="text-4xl">{ERROR_PAGE.title}</h1>
          <p className="text-lg leading-relaxed is-stone">
            {ERROR_PAGE.body}
          </p>
        </div>
        <div className="is-flex is-flex-column has-gap-5">
          <div className="error-page__actions is-flex is-flex-wrap has-gap-4">
            <button
              type="button"
              onClick={reset}
              className={cx("error-page__cta", "has-font-semibold text-base")}
            >
              {ERROR_PAGE.retryLabel}
            </button>
            <Link
              href={ROUTES.home}
              className="error-page__link text-base has-font-semibold"
            >
              {ERROR_PAGE.homeLabel}
            </Link>
          </div>
          <p className="text-sm is-stone">
            {ERROR_PAGE.contactPrefix}{" "}
            <a
              href={`mailto:${ERROR_PAGE.contactEmail}`}
              className="error-page__link"
            >
              {ERROR_PAGE.contactEmail}
            </a>
            {error.digest ? (
              <>
                {" "}
                <span className="error-page__digest">
                  (ref {error.digest})
                </span>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </main>
  );
}
