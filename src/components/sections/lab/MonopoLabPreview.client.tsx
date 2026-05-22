"use client";

import { MonopoLabCanvas } from "@/components/lab/monopo/MonopoLabCanvas";

/** Full-viewport monopo DD lens. */
export function MonopoLabPreview() {
  return (
    <section className="monopo-lab" aria-label="Monopo refraction scene">
      <div className="monopo-lab__stage">
        <MonopoLabCanvas className="monopo-lab__canvas" lensScale={1.6} />
      </div>
    </section>
  );
}
