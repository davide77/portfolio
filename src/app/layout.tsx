import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { PLAUSIBLE_DOMAIN } from "@/constants/config";
import { rootMetadata } from "@/lib/seo";
import { Providers } from "./providers";
import Script from "next/script";
import "../styles/main.scss";
import "lenis/dist/lenis.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={dmSans.variable} data-theme="paper">
      <body>
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
