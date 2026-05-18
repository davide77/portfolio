import type { Metadata } from "next";
import { WorkIndexClient } from "@/components/sections/work/WorkIndexClient";
import { WORK_INDEX } from "@/constants/content/work-index";

export const metadata: Metadata = {
  title: "Selected work",
  description: WORK_INDEX.description,
};

export default function WorkIndexPage() {
  return (
    <main id="main">
      <WorkIndexClient />
    </main>
  );
}
