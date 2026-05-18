import { HomeJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";
import { MarketingHome } from "@/sections/home/MarketingHome";

export const metadata = pageMetadata({
  description: SITE.oneLineDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <MarketingHome />
    </>
  );
}
