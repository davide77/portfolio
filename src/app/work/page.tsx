import { WorkIndexClient } from "@/components/sections/work/WorkIndexClient";
import { WORK_INDEX } from "@/constants/content/work-index";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Selected work",
  description: WORK_INDEX.description,
  path: ROUTES.workIndex,
});

export default function WorkIndexPage() {
  return (
    <main id="main">
      <WorkIndexClient />
    </main>
  );
}
