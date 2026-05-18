import { Marquee } from "@/components/ui/Marquee";
import { TRUSTED_BY_CLIENTS } from "@/constants/content/profile";

export function TrustedBySection() {
  return (
    <section aria-label="Trusted by">
      <Marquee items={TRUSTED_BY_CLIENTS} ariaLabel="Clients and organisations" />
    </section>
  );
}
