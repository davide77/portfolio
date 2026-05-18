import type { Metadata } from "next";
import { LegacyWorkGallery } from "@/components/LegacyWorkGallery";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ARCHIVE_SECTION } from "@/constants/content/archive-work";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Archive",
  description: `${ARCHIVE_SECTION.title} · ${SITE.name}`,
};

export default function ArchivePage() {
  return (
    <SiteChrome>
      <main id="main">
        <LegacyWorkGallery />
      </main>
    </SiteChrome>
  );
}
