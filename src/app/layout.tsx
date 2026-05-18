import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomeJsonLd } from "@/components/seo/JsonLd";
import { PLAUSIBLE_DOMAIN } from "@/constants/config";
import { Providers } from "./providers";
import Script from "next/script";
import "../styles/main.scss";
import "lenis/dist/lenis.css";
import { SITE } from "@/constants/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://domenghini.com"),
  title: {
    default: `${SITE.name} · ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.oneLineDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${dmSans.variable}`} data-theme="paper">
      <body>
        <HomeJsonLd />
        {process.env.NODE_ENV === "production" ? (
          <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        ) : null}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
