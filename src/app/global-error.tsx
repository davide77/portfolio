"use client";

import { useEffect } from "react";
import { GLOBAL_ERROR_PAGE } from "@/constants/content/error-page";
// global-error replaces the root layout entirely, so the stylesheet that
// layout.tsx imports does not apply here. Import it directly so brand
// colours and utility classes still work. If the failure is in the build
// itself this degrades to clean unstyled HTML, which is acceptable.
import "../styles/main.scss";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-GB" data-theme="paper">
      <body>
        <main id="main" className="error-page">
          <div className="container-sm has-py-10 is-flex is-flex-column has-gap-7">
            <p className="error-page__code" aria-hidden="true">
              {GLOBAL_ERROR_PAGE.code}
            </p>
            <div className="is-flex is-flex-column has-gap-4">
              <h1 className="text-4xl">{GLOBAL_ERROR_PAGE.title}</h1>
              <p className="text-lg leading-relaxed is-text-muted">
                {GLOBAL_ERROR_PAGE.body}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="error-page__cta has-font-semibold text-base"
            >
              {GLOBAL_ERROR_PAGE.retryLabel}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
