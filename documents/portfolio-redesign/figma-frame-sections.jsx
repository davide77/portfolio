/* Figma-frame contents - condensed for use as a Figma source-of-truth */
/* eslint-disable */

function FrameTokensColour() {
  const groups = [
    {
      title: "Primary",
      items: [
        { n: "Ink", hex: "#101214", role: "Hero bands, footer, high-contrast panels." },
        { n: "Forest", hex: "#2a6b5e", role: "Primary actions and selection on light." },
        { n: "Paper", hex: "#f5f1ea", role: "Default page background." },
        { n: "White", hex: "#ffffff", role: "Cards, raised surfaces." },
      ],
    },
    {
      title: "Support",
      items: [
        { n: "Stone", hex: "#6f6a63", role: "Secondary text + control borders. 5.36:1 on white." },
        { n: "Cream", hex: "#e0dbd4", role: "Hairlines, meta text on ink. Decorative only." },
        { n: "Signal", hex: "#c45c3e", role: "Hover + large-text accent. Light surfaces only." },
        { n: "Signal-strong", hex: "#b04f33", role: "Accessible-text shade. 4.5:1 on white." },
      ],
    },
    {
      title: "Orb ramp . WebGL only, never CSS",
      items: [
        { n: "Orb void", hex: "#000000", role: "Pure black core." },
        { n: "Orb shadow", hex: "#2c1505", role: "Dark warm band." },
        { n: "Orb amber", hex: "#d07a25", role: "Bright ridges." },
        { n: "Orb flare", hex: "#ffc080", role: "Hot rim peaks." },
        { n: "Orb glow", hex: "#a8d66a", role: "Cool refracted (lab cluster only)." },
      ],
    },
  ];
  return (
    <div className="fr fr--paper" style={{ padding: 48 }}>
      <FrameHead num="01" title="Tokens / Colour" sub="Mirror these into Figma variables under colour/*. The orb ramp lives in the shader only." />
      {groups.map((g, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{g.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${g.items.length}, 1fr)`, gap: 12 }}>
            {g.items.map(it => (
              <div key={it.hex} style={{ border: "var(--hairline-paper)", borderRadius: 10, overflow: "hidden", background: "var(--white)" }}>
                <div style={{ aspectRatio: "4/3", background: it.hex }}></div>
                <div style={{ padding: "10px 14px" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{it.n}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{it.hex}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 6, lineHeight: 1.4 }}>{it.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FrameTokensType() {
  const rows = [
    { name: "hero", size: 132, weight: 300, demo: "Ships product.", italic: "product" },
    { name: "display", size: 84, weight: 300, demo: "From humble to undeniable." },
    { name: "title", size: 56, weight: 300, demo: "Selected work, twenty years deep." },
    { name: "heading", size: 38, weight: 400, demo: "Regulated lending, end to end." },
    { name: "subhead", size: 28, weight: 400, demo: "Liberty Blume - live consumer lending." },
    { name: "body-large", size: 22, weight: 400, demo: "I lead front-end on regulated platforms and consumer products." },
    { name: "body", size: 16, weight: 400, demo: "Twenty years building high-traffic interfaces for Sky, Estée Lauder and Liberty Global." },
    { name: "meta", size: 12, weight: 500, demo: "01 - SENIOR FRONT-END . FOUNDER", mono: true },
  ];
  return (
    <div className="fr fr--paper" style={{ padding: 48 }}>
      <FrameHead num="02" title="Tokens / Type" sub="DM Sans only. Hierarchy is size + weight contrast. JetBrains Mono allowed for eyebrows and stack chips." />
      <div style={{ background: "var(--white)", border: "var(--hairline-paper)", borderRadius: 10, padding: 24 }}>
        {rows.map((r, i) => {
          let demoNode = r.demo;
          if (r.italic) {
            const parts = r.demo.split(r.italic);
            demoNode = <span>{parts[0]}<em style={{ fontStyle: "italic", color: "var(--signal-strong)" }}>{r.italic}</em>{parts[1]}</span>;
          }
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 160px", gap: 24, padding: "18px 0", borderBottom: i === rows.length - 1 ? 0 : "var(--hairline-paper)", alignItems: "baseline" }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--stone)" }}>{r.name}</div>
              <div style={{ fontSize: Math.min(r.size, 64), fontWeight: r.weight, lineHeight: 1.05, color: "var(--ink)", letterSpacing: r.size > 30 ? "-0.02em" : "0", fontFamily: r.mono ? "'JetBrains Mono', monospace" : undefined, textTransform: r.mono ? "uppercase" : undefined }}>{demoNode}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--stone)", textAlign: "right" }}>{r.size}px / {r.weight}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FrameTokensSpacing() {
  const steps = [
    { n: 1, px: 4 }, { n: 2, px: 8 }, { n: 3, px: 12 }, { n: 4, px: 16 },
    { n: 5, px: 24 }, { n: 6, px: 32 }, { n: 7, px: 40 }, { n: 8, px: 48 },
    { n: 9, px: 64 }, { n: 10, px: 80 }, { n: 11, px: 96 }, { n: 12, px: 128 },
  ];
  return (
    <div className="fr fr--paper" style={{ padding: 48 }}>
      <FrameHead num="03" title="Tokens / Spacing + Radii" sub="Twelve spacing steps, three radii. Add a token before introducing a new value." />
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        <div style={{ background: "var(--white)", border: "var(--hairline-paper)", borderRadius: 10, padding: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Spacing scale</div>
          {steps.map(s => (
            <div key={s.n} style={{ display: "grid", gridTemplateColumns: "70px 1fr 70px", alignItems: "center", gap: 16, paddingBottom: 10 }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--stone)" }}>s-{s.n}</div>
              <div style={{ height: 12, background: "var(--ink)", width: s.px + "px", borderRadius: 2 }}></div>
              <div className="mono" style={{ fontSize: 11, color: "var(--stone)", textAlign: "right" }}>{s.px}px</div>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--white)", border: "var(--hairline-paper)", borderRadius: 10, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="eyebrow">Radii</div>
          {[{ n: "card", px: 10 }, { n: "pill", px: 999 }, { n: "square", px: 0 }].map(r => (
            <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 64, height: 64, background: "var(--forest)", borderRadius: r.px + "px" }}></div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{r.n}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--stone)" }}>{r.px === 999 ? "999px" : r.px + "px"}</div>
              </div>
            </div>
          ))}
          <div className="eyebrow" style={{ marginTop: 16 }}>Layout</div>
          <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--stone)", flexDirection: "column" }}>
            <div><span className="mono">well</span> · 1180px · default content well</div>
            <div><span className="mono">well-narrow</span> · 720px · long-form reading</div>
            <div><span className="mono">control-min</span> · 44px · minimum hit target</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameComponents() {
  return (
    <div className="fr fr--paper" style={{ padding: 48 }}>
      <FrameHead num="04" title="Components" sub="Build these as Figma components first; templates compose from these." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <Box label="Pill / meta">
          <span className="pill"><span className="dot"></span>Currently leading frontend</span>
        </Box>
        <Box label="Pill / forest">
          <span className="pill pill--forest">View case study</span>
        </Box>
        <Box label="Eyebrow + index">
          <div className="eyebrow"><span className="num">03</span>selected work</div>
        </Box>
        <Box label="Button / ghost on ink" bg="var(--ink)">
          <button style={{ padding: "12px 22px", border: "1px solid var(--cream)", borderRadius: 999, color: "var(--paper)", fontSize: 14, background: "transparent" }}>Email Davide</button>
        </Box>
        <Box label="Button / solid forest">
          <button style={{ padding: "12px 22px", background: "var(--forest)", color: "var(--paper)", borderRadius: 999, fontSize: 14, border: 0 }}>Open case study</button>
        </Box>
        <Box label="Stack chip">
          <span className="mono" style={{ fontSize: 12, color: "var(--signal-strong)", padding: "6px 10px", border: "1px solid var(--cream)", borderRadius: 4 }}>NEXT.JS · TS · SCSS</span>
        </Box>
        <Box label="Stat marker">
          <div>
            <div style={{ fontSize: 56, fontWeight: 300, lineHeight: 0.9, color: "var(--ink)", letterSpacing: "-0.04em", display: "flex", alignItems: "baseline", gap: 4 }}>500<span style={{ fontSize: 24, color: "var(--signal-strong)" }}>k+</span></div>
            <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 8, lineHeight: 1.45, maxWidth: 200 }}>Bristol residents served by the design system I shipped.</div>
          </div>
        </Box>
        <Box label="Quote">
          <p style={{ fontSize: 16, color: "var(--ink)", fontWeight: 300, lineHeight: 1.45 }}><span style={{ color: "var(--signal)" }}>&ldquo;</span> Shipped a regulated lending journey under the original deadline.</p>
        </Box>
        <Box label="Form input">
          <label>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block" }}>Email</span>
            <input style={{ marginTop: 6, padding: "10px 14px", border: "1px solid var(--stone)", background: "transparent", borderRadius: 6, fontSize: 14, color: "var(--ink)", width: "100%" }} defaultValue="hello@" />
          </label>
        </Box>
        <Box label="Work card (work bento cell)">
          <div style={{ width: "100%", height: 180, borderRadius: 10, background: "linear-gradient(180deg, #1a1d20 0%, #101214 100%)", padding: 16, color: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream)", opacity: 0.7 }}>Senior FE . 2025 - now</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em" }}>Liberty Blume</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--cream)", marginTop: 8 }}>REACT · TS · SCSS</div>
            </div>
          </div>
        </Box>
        <Box label="Eyebrow / on ink" bg="var(--ink)">
          <div className="eyebrow on-ink"><span className="num">06</span>by the numbers</div>
        </Box>
        <Box label="Hairline divider with marker">
          <div className="divider" style={{ width: "100%", margin: 0 }}></div>
        </Box>
      </div>
    </div>
  );
}

function Box({ label, children, bg }) {
  return (
    <div style={{ border: "var(--hairline-paper)", borderRadius: 10, overflow: "hidden", background: "var(--white)" }}>
      <div style={{ padding: "24px 20px 28px", minHeight: 160, display: "flex", alignItems: "center", background: bg || "var(--white)" }}>
        {children}
      </div>
      <div className="mono" style={{ padding: "10px 14px", borderTop: "var(--hairline-paper)", fontSize: 11, color: "var(--stone)" }}>{label}</div>
    </div>
  );
}

function FrameHomeDesktop() {
  return (
    <div className="fr fr--ink" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <FrameHomeHero />
      <FrameHomeBrands />
      <FrameHomeStats />
      <FrameHomeWork />
      <FrameHomeCaps />
      <FrameHomeAbout />
      <FrameHomeClose />
    </div>
  );
}

function FrameHomeHero() {
  return (
    <section style={{ position: "relative", height: 900, overflow: "hidden", background: "#020100" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 50% at 15% 25%, rgba(42,107,94,.18), transparent 70%), radial-gradient(50% 40% at 85% 75%, rgba(196,92,62,.14), transparent 70%)" }}></div>
      <nav style={{ position: "absolute", top: 36, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 48px", zIndex: 10 }}>
        <div style={{ fontSize: 14 }}><span style={{ color: "var(--cream)" }}>dd</span> <span style={{ marginLeft: 8 }}>domenghini</span></div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.55, color: "var(--cream)" }}>SENIOR FRONT-END . LONDON</div>
        <div className="mono" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, fontSize: 11, letterSpacing: "0.22em", color: "var(--cream)" }}>
          <div>WORK</div><div>ABOUT</div><div>LAB</div><div>CONTACT</div>
        </div>
      </nav>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", maxWidth: 980 }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: "0.3em", color: "var(--cream)", opacity: 0.6, marginBottom: 22, textTransform: "uppercase" }}>01 . SENIOR FRONT-END . FOUNDER</div>
        <h1 style={{ fontSize: 80, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-0.025em", color: "var(--paper)" }}>Twenty years <em style={{ fontStyle: "italic" }}>shipping</em><br/>the front end of products people use.</h1>
        <div className="mono" style={{ marginTop: 28, fontSize: 12, color: "var(--cream)", opacity: 0.7, letterSpacing: "0.22em" }}>SKY . ESTEE LAUDER . LIBERTY GLOBAL . BRISTOL CITY COUNCIL . EE . A+E NETWORKS</div>
      </div>
      <div style={{ position: "absolute", right: -34, top: "50%", transform: "rotate(90deg)", transformOrigin: "center", fontSize: 11, letterSpacing: "0.45em", opacity: 0.5, color: "var(--cream)", fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>EST . 2006 . BASED IN LONDON</div>
      <FrameAnnotation top={28} left={48}>NAV . inline brand + role + nav. NO Book a call, NO EN.IT switch.</FrameAnnotation>
      <FrameAnnotation top={420} left={48}>HERO . headline 80px DM Sans light, italic accent in Orb-flare.</FrameAnnotation>
      <FrameAnnotation top={780} left={48}>BRAND BAND . six clients in caps, mono, 12px 0.22em.</FrameAnnotation>
    </section>
  );
}

function FrameHomeBrands() {
  const brands = ["Sky", "Estée Lauder", "Liberty Global", "Bristol City Council", "EE", "A+E Networks", "SAP", "Boring Money"];
  return (
    <section style={{ padding: "48px 48px", borderTop: "var(--hairline)", borderBottom: "var(--hairline)", position: "relative" }}>
      <div className="eyebrow on-ink" style={{ marginBottom: 32 }}><span className="num">02</span>brands shipped for</div>
      <div style={{ display: "flex", gap: 64, alignItems: "center", overflow: "hidden" }}>
        {brands.map((b, i) => (
          <span key={i} style={{ fontSize: 34, fontWeight: 300, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{b}</span>
        ))}
      </div>
      <FrameAnnotation top={20} right={20}>MARQUEE . 50s linear, edge-masked.</FrameAnnotation>
    </section>
  );
}

function FrameHomeStats() {
  const stats = [
    { n: "20", s: "+yrs", l: "Senior front-end practice. Started 2006." },
    { n: "500", s: "k+", l: "Bristol residents on bristol.gov.uk." },
    { n: "12", s: "steps", l: "Regulated lending journey live at Liberty Blume." },
    { n: "40", s: "%", l: "Dev-time reduction across Squiz engagements." },
  ];
  return (
    <section style={{ padding: "96px 48px", position: "relative" }}>
      <div className="eyebrow on-ink" style={{ marginBottom: 24 }}><span className="num">03</span>by the numbers / 2006 . 2026</div>
      <h2 style={{ fontSize: 56, fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--paper)", marginBottom: 56, maxWidth: 600 }}>The shape of twenty years, on one line.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, borderTop: "var(--hairline)", paddingTop: 40 }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 80, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9, display: "flex", alignItems: "baseline", gap: 4 }}>
              {s.n}<span style={{ fontSize: 32, color: "var(--signal)" }}>{s.s}</span>
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--cream)", opacity: 0.75, maxWidth: 220, lineHeight: 1.5 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <FrameAnnotation top={20} right={20}>STAT BAND . 4-up, tabular-nums, signal suffix.</FrameAnnotation>
    </section>
  );
}

function FrameHomeWork() {
  return (
    <section style={{ padding: "96px 48px", position: "relative" }}>
      <div className="eyebrow on-ink" style={{ marginBottom: 32 }}><span className="num">04</span>selected work</div>
      <h2 style={{ fontSize: 38, fontWeight: 300, lineHeight: 1.1, color: "var(--paper)", marginBottom: 40, maxWidth: 640 }}>Six pieces. Each answers role, stack, scale, status.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: 200, gap: 16 }}>
        <WorkTile span={[4, 2]} role="Senior FE lead . 2025 - now" title="Liberty Blume" sub="12-step regulated lending journey. Live." stack="REACT · TS · SCSS · GCP" featured />
        <WorkTile span={[2, 2]} role="Design + FE lead . 2026" title="Striver.Football" sub="Brand to shipped site." stack="NEXT · WP" />
        <WorkTile span={[2, 1]} role="Senior FE . 2022-25" title="Estée Lauder" sub="7 brands, FR + DE rollouts." stack="REACT · DRUPAL" />
        <WorkTile span={[2, 1]} role="Senior FE . 2021-22" title="bristol.gov.uk" sub="500k+ residents." stack="REACT · DOCUSAURUS" />
        <WorkTile span={[2, 1]} role="Founder . 2024 - now" title="Cheam Sports FC" sub="Full-stack solo build." stack="NEXT · DRIZZLE · STRIPE" />
        <WorkTile span={[2, 1]} role="Currently building" title="Nannynow" sub="Concept to MVP, solo." stack="NEXT · TS" text />
      </div>
      <FrameAnnotation top={20} right={20}>BENTO . 6-col grid, 200px row, hero spans 4x2.</FrameAnnotation>
    </section>
  );
}

function WorkTile({ span, role, title, sub, stack, featured, text }) {
  return (
    <div style={{ gridColumn: `span ${span[0]}`, gridRow: `span ${span[1]}`, background: "#1a1d20", border: "var(--hairline)", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream)", opacity: 0.65 }}>{role}</div>
      <div>
        <div style={{ fontSize: featured ? 28 : 18, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--paper)" }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--cream)", opacity: 0.75, marginTop: 4, lineHeight: 1.45 }}>{sub}</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--cream)", marginTop: 12, letterSpacing: "0.05em" }}>{stack}</div>
      </div>
    </div>
  );
}

function FrameHomeCaps() {
  const caps = [
    { t: "Front-end architecture", s: "REACT · TS · SCSS" },
    { t: "Accessibility", s: "WCAG 2.1 AA · AXE" },
    { t: "Performance", s: "LH 90+ · MOBILE" },
    { t: "Design systems", s: "TOKENS · FIGMA" },
    { t: "WebGL + motion", s: "THREE · GLSL" },
    { t: "End-to-end delivery", s: "VERCEL · STRIPE" },
  ];
  return (
    <section style={{ padding: "96px 48px", background: "var(--paper)", color: "var(--ink)", position: "relative" }}>
      <div className="eyebrow" style={{ marginBottom: 32 }}><span className="num">05</span>capabilities . with receipts</div>
      <h2 style={{ fontSize: 38, fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", marginBottom: 40, maxWidth: 640 }}>Six things I do. Each one earns its line.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(16,18,20,.1)", border: "var(--hairline-paper)", borderRadius: 10, overflow: "hidden" }}>
        {caps.map((c, i) => (
          <div key={i} style={{ background: "var(--white)", padding: 24, minHeight: 180, display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--stone)" }}>0{i + 1}</div>
            <div style={{ fontSize: 18, fontWeight: 400, color: "var(--ink)" }}>{c.t}</div>
            <div className="mono" style={{ marginTop: "auto", fontSize: 11, color: "var(--signal-strong)" }}>{c.s}</div>
          </div>
        ))}
      </div>
      <FrameAnnotation paper top={20} right={20}>CAPABILITIES . 3x2 grid, 1px gap, hairline external border.</FrameAnnotation>
    </section>
  );
}

function FrameHomeAbout() {
  return (
    <section style={{ padding: "80px 48px", position: "relative", display: "grid", gridTemplateColumns: "320px 1fr", gap: 64, alignItems: "start" }}>
      <div style={{ borderRadius: 10, overflow: "hidden", border: "var(--hairline)", aspectRatio: "4/5", background: "#222" }}>
        <img src="assets/portrait.jpg" alt="Portrait of Davide Domenghini" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <div className="eyebrow on-ink" style={{ marginBottom: 24 }}><span className="num">06</span>about</div>
        <h2 style={{ fontSize: 56, fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--paper)", marginBottom: 32, maxWidth: 520 }}>Senior front-end. Twenty years deep. Founder on the side.</h2>
        <p style={{ fontSize: 18, color: "var(--cream)", opacity: 0.9, lineHeight: 1.55, maxWidth: 620 }}>
          I'm a senior front-end engineer and founder with twenty-plus years building scalable,
          high-performance web applications for Sky, Estée Lauder, Liberty Global, Bristol City Council,
          EE and A+E Networks.
        </p>
      </div>
      <FrameAnnotation top={20} right={20}>ABOUT STRIP . 4:5 portrait left, copy right.</FrameAnnotation>
    </section>
  );
}

function FrameHomeClose() {
  return (
    <section style={{ padding: "160px 48px 80px", position: "relative" }}>
      <div className="eyebrow on-ink" style={{ marginBottom: 40 }}><span className="num">07</span>closing</div>
      <h2 style={{ fontSize: 88, fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--paper)", maxWidth: 14 + "ch" }}>Got a brief that needs a<br/><em style={{ fontStyle: "italic" }}>senior owner</em>? Send it.</h2>
      <FrameAnnotation top={20} right={20}>CLOSER . 88px display, italic accent, contact dl below.</FrameAnnotation>
    </section>
  );
}

function FrameHomeMobile() {
  return (
    <div className="fr fr--ink" style={{ background: "var(--ink)", color: "var(--paper)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13 }}><span style={{ color: "var(--cream)" }}>dd</span> domenghini</div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em" }}>MENU</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--cream)", opacity: 0.6, marginBottom: 14 }}>01 . SENIOR FRONT-END</div>
        <h1 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.025em" }}>Twenty years <em style={{ fontStyle: "italic" }}>shipping</em> the front end.</h1>
        <div className="mono" style={{ marginTop: 18, fontSize: 10, letterSpacing: "0.18em", color: "var(--cream)", opacity: 0.7 }}>SKY · ESTEE LAUDER · LIBERTY GLOBAL · BRISTOL</div>
      </div>
      <div style={{ height: 200, background: "#020100", borderRadius: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(50% 50% at 30% 40%, #d07a25 0%, #2c1505 30%, #000 70%)", opacity: 0.85 }}></div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(40% 50% at 75% 70%, #ffc080 0%, #d07a25 25%, #2c1505 60%, transparent 100%)", opacity: 0.55 }}></div>
        <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 9, letterSpacing: "0.2em", color: "var(--cream)", opacity: 0.5 }} className="mono">ORB CANVAS</div>
      </div>
      <div>
        <div className="eyebrow on-ink" style={{ marginBottom: 18, fontSize: 10 }}><span className="num">03</span>by the numbers</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, borderTop: "var(--hairline)", paddingTop: 20 }}>
          <div><div style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9 }}>20<span style={{ fontSize: 18, color: "var(--signal)" }}>+yrs</span></div><div style={{ fontSize: 11, color: "var(--cream)", opacity: 0.75, marginTop: 10 }}>Practice.</div></div>
          <div><div style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9 }}>500<span style={{ fontSize: 18, color: "var(--signal)" }}>k+</span></div><div style={{ fontSize: 11, color: "var(--cream)", opacity: 0.75, marginTop: 10 }}>Bristol residents.</div></div>
          <div><div style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9 }}>12<span style={{ fontSize: 18, color: "var(--signal)" }}>steps</span></div><div style={{ fontSize: 11, color: "var(--cream)", opacity: 0.75, marginTop: 10 }}>Liberty Blume.</div></div>
          <div><div style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9 }}>40<span style={{ fontSize: 18, color: "var(--signal)" }}>%</span></div><div style={{ fontSize: 11, color: "var(--cream)", opacity: 0.75, marginTop: 10 }}>Squiz dev-time cut.</div></div>
        </div>
      </div>
      <div>
        <div className="eyebrow on-ink" style={{ marginBottom: 18, fontSize: 10 }}><span className="num">04</span>selected work</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { r: "2025-now", t: "Liberty Blume", s: "12-step regulated lending. Live." },
            { r: "2026", t: "Striver.Football", s: "Brand to shipped site." },
            { r: "2022-25", t: "Estée Lauder", s: "7 brands, EMEA." },
            { r: "2021-22", t: "bristol.gov.uk", s: "500k+ residents." },
          ].map((w, i) => (
            <div key={i} style={{ padding: 16, background: "#1a1d20", border: "var(--hairline)", borderRadius: 10 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--cream)", opacity: 0.7, letterSpacing: "0.18em" }}>{w.r}</div>
              <div style={{ fontSize: 20, fontWeight: 300, marginTop: 6, letterSpacing: "-0.02em" }}>{w.t}</div>
              <div style={{ fontSize: 13, color: "var(--cream)", opacity: 0.75, marginTop: 4 }}>{w.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FrameHead({ num, title, sub }) {
  return (
    <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: "var(--hairline-paper)" }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}><span className="num">{num}</span>{title.split(" / ")[0]}</div>
      <h2 style={{ fontSize: 38, fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)" }}>{title}</h2>
      <p style={{ marginTop: 12, color: "var(--stone)", fontSize: 15, maxWidth: 760, lineHeight: 1.55 }}>{sub}</p>
    </div>
  );
}

function FrameAnnotation({ top, left, right, bottom, paper, children }) {
  return (
    <div style={{ position: "absolute", top, left, right, bottom, padding: "6px 12px", borderRadius: 999, border: "1px dashed " + (paper ? "rgba(196,92,62,.5)" : "rgba(224,219,212,.45)"), color: paper ? "var(--signal-strong)" : "var(--cream)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", zIndex: 20, background: paper ? "rgba(245,241,234,.95)" : "rgba(16,18,20,.85)" }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  FrameTokensColour, FrameTokensType, FrameTokensSpacing,
  FrameComponents, FrameHomeDesktop, FrameHomeMobile,
});
