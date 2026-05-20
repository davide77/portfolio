/* Design system: colours, type, spacing, motion, components */
/* eslint-disable */

function Swatch({ name, hex, role, modifier }) {
  return (
    <div className={"swatch " + (modifier || "")}>
      <div className="chip" style={{ background: hex }}></div>
      <div className="meta">
        <div className="name">{name}</div>
        <div className="hex">{hex}</div>
        <div className="role">{role}</div>
      </div>
    </div>
  );
}

function SystemSection() {
  return (
    <section id="system" className="section section--paper">
      <div className="well">
        <div className="section-head">
          <div className="eyebrow"><span className="num">04</span>system / tokens + components</div>
          <div>
            <h2>The system, on one page.</h2>
            <p>Tokens mirror brand.md exactly. The accents below are the ones the new portfolio uses on
              ink and paper surfaces. Everything else is built from these.</p>
          </div>
        </div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Primary
        </h3>
        <div className="swatch-grid" style={{ marginBottom: "var(--s-8)" }}>
          <Swatch name="Ink" hex="#101214" role="Hero bands, footer, high-contrast panels." />
          <Swatch name="Forest" hex="#2a6b5e" role="Primary actions and selection on light backgrounds." />
          <Swatch name="Paper" hex="#f5f1ea" role="Default page background." />
          <Swatch name="White" hex="#ffffff" role="Cards, raised surfaces." />
        </div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Support + accent
        </h3>
        <div className="swatch-grid" style={{ marginBottom: "var(--s-8)" }}>
          <Swatch name="Stone" hex="#6f6a63" role="Secondary text. Control borders on light surfaces (5.36:1 on white)." />
          <Swatch name="Cream" hex="#e0dbd4" role="Decorative hairlines and meta text on ink (does not meet 3:1 for controls)." />
          <Swatch name="Signal" hex="#c45c3e" role="Hover, large text and non-text accents. Light surfaces only." />
          <Swatch name="Signal strong" hex="#b04f33" role="Error text. The accessible-text shade of Signal (4.5:1 on white and paper)." />
        </div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Orb ramp <span style={{ color: "var(--signal-strong)", fontWeight: 500 }}>(WebGL only, never CSS)</span>
        </h3>
        <div className="swatch-grid" style={{ marginBottom: "var(--s-10)" }}>
          <Swatch name="Orb void" hex="#000000" role="Pure black core. Design-mandated, not Ink." />
          <Swatch name="Orb shadow" hex="#2c1505" role="Dark warm bands between ridges." />
          <Swatch name="Orb amber" hex="#d07a25" role="Bright ridges." />
          <Swatch name="Orb flare" hex="#ffc080" role="Hot rim peaks." />
        </div>

        <div className="divider"></div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Type scale . DM Sans only
        </h3>
        <div className="card card--paper" style={{ padding: "var(--s-7) var(--s-7) var(--s-4)" }}>
          <TypeRow name="hero" demo="Ships product." sz="132 / 0.95 / -0.03em" w={300} italicWord="product" />
          <TypeRow name="display" demo="From humble to undeniable." sz="84 / 0.98 / -0.025em" w={300} />
          <TypeRow name="title" demo="Selected work, twenty years deep." sz="56 / 1.05 / -0.02em" w={300} />
          <TypeRow name="heading" demo="Regulated lending, end to end." sz="38 / 1.1 / -0.015em" w={400} />
          <TypeRow name="subhead" demo="Liberty Blume - live consumer-lending journey." sz="28 / 1.2 / -0.01em" w={400} />
          <TypeRow name="body large" demo="I lead front-end on regulated platforms and consumer products." sz="22 / 1.45 / 0" w={400} />
          <TypeRow name="body" demo="Twenty years building high-traffic interfaces for Sky, Estée Lauder and Liberty Global." sz="16 / 1.55 / 0" w={400} />
          <TypeRow name="meta" demo="01 - SENIOR FRONT-END . FOUNDER" sz="12 / 1.5 / 0.28em" w={500} mono />
        </div>

        <div style={{ marginTop: "var(--s-6)", fontSize: "var(--t-sm)", color: "var(--stone)", maxWidth: "70ch" }}>
          One typeface. Hierarchy is built from size and weight contrast - never a second face. Italic is reserved
          for one or two emphasis words per page. JetBrains Mono is allowed only for nav micro-labels, eyebrows,
          and stack chips on cards. Body weight stays at 400; titles run 300 to feel light against scale.
        </div>

        <div className="divider"></div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Spacing scale + radii
        </h3>
        <SpacingScale />

        <div className="divider"></div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Components
        </h3>
        <ComponentLibrary />

        <div className="divider"></div>

        <h3 style={{ fontSize: "var(--t-md)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "var(--s-5)" }}>
          Motion rules
        </h3>
        <MotionRules />
      </div>
    </section>
  );
}

function TypeRow({ name, demo, sz, w, mono, italicWord }) {
  const size = parseInt(sz.split("/")[0]);
  const tag = mono ? { fontFamily: "'JetBrains Mono', ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.28em" } : {};
  let demoNode = demo;
  if (italicWord) {
    const parts = demo.split(italicWord);
    demoNode = <span>{parts[0]}<em style={{ fontStyle: "italic", color: "var(--signal-strong)" }}>{italicWord}</em>{parts[1]}</span>;
  }
  return (
    <div className="specimen-row">
      <div className="name">{name}</div>
      <div className="demo" style={{ fontSize: Math.min(size, 60) + "px", fontWeight: w, lineHeight: 1.05, letterSpacing: name === "hero" || name === "display" || name === "title" ? "-0.02em" : "0", ...tag }}>
        {demoNode}
      </div>
      <div className="specs">{sz} / {w}</div>
    </div>
  );
}

function SpacingScale() {
  const steps = [
    { n: 1, px: 4 }, { n: 2, px: 8 }, { n: 3, px: 12 }, { n: 4, px: 16 },
    { n: 5, px: 24 }, { n: 6, px: 32 }, { n: 7, px: 40 }, { n: 8, px: 48 },
    { n: 9, px: 64 }, { n: 10, px: 80 }, { n: 11, px: 96 }, { n: 12, px: 128 },
  ];
  return (
    <div className="card card--paper" style={{ padding: "var(--s-7)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
        {steps.map(s => (
          <div key={s.n} style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px", alignItems: "center", gap: "var(--s-5)" }}>
            <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--stone)" }}>s-{s.n}</div>
            <div style={{ height: 14, background: "var(--ink)", width: s.px + "px", borderRadius: 2 }}></div>
            <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--stone)", textAlign: "right" }}>{s.px}px</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "var(--s-7)", paddingTop: "var(--s-5)", borderTop: "var(--hairline-paper)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s-6)" }}>
        <RadiusDemo name="card" px={10} />
        <RadiusDemo name="pill" px={999} />
        <RadiusDemo name="square" px={0} />
      </div>
    </div>
  );
}

function RadiusDemo({ name, px }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", alignItems: "flex-start" }}>
      <div style={{ width: 56, height: 56, background: "var(--forest)", borderRadius: px + "px" }}></div>
      <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--stone)" }}>radius / {name} / {px === 999 ? "999px" : px + "px"}</div>
    </div>
  );
}

function ComponentLibrary() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s-4)" }}>
      <ComponentCard title="Pill / meta label">
        <span className="pill"><span className="dot"></span>Currently leading frontend</span>
      </ComponentCard>

      <ComponentCard title="Pill / accent">
        <span className="pill pill--forest">View case study</span>
      </ComponentCard>

      <ComponentCard title="Eyebrow + index">
        <div className="eyebrow"><span className="num">03</span>selected work</div>
      </ComponentCard>

      <ComponentCard title="Button / ghost on ink" bg="var(--ink)">
        <button style={{ padding: "12px 22px", border: "1px solid var(--cream)", borderRadius: "var(--r-pill)", color: "var(--paper)", fontSize: "var(--t-sm)" }}>
          Email Davide
        </button>
      </ComponentCard>

      <ComponentCard title="Button / solid forest">
        <button style={{ padding: "12px 22px", background: "var(--forest)", color: "var(--paper)", borderRadius: "var(--r-pill)", fontSize: "var(--t-sm)" }}>
          Open case study
        </button>
      </ComponentCard>

      <ComponentCard title="Stack chip">
        <span className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--signal-strong)", padding: "6px 10px", border: "1px solid var(--cream)", borderRadius: 4 }}>
          NEXT.JS · TS · SCSS
        </span>
      </ComponentCard>

      <ComponentCard title="Stat marker">
        <div className="stat" style={{ color: "var(--ink)" }}>
          <div className="num" style={{ color: "var(--ink)", fontSize: 56 }}>20<span className="suffix">yrs</span></div>
          <div className="label" style={{ color: "var(--stone)" }}>Front-end practice</div>
        </div>
      </ComponentCard>

      <ComponentCard title="Quote">
        <p className="quote" style={{ color: "var(--ink)", fontSize: "var(--t-md)" }}>
          Shipped a regulated lending journey under the original deadline.
        </p>
      </ComponentCard>

      <ComponentCard title="Form input">
        <label style={{ display: "block" }}>
          <span style={{ fontSize: "var(--t-xs)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)" }}>Email</span>
          <input style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 14px", border: "1px solid var(--stone)", background: "transparent", borderRadius: 6, fontSize: "var(--t-sm)", color: "var(--ink)" }} defaultValue="hello@" />
        </label>
      </ComponentCard>
    </div>
  );
}

function ComponentCard({ title, children, bg }) {
  return (
    <div style={{ border: "var(--hairline-paper)", borderRadius: "var(--r-card)", overflow: "hidden", background: "var(--white)" }}>
      <div style={{ padding: "var(--s-5) var(--s-5) var(--s-7)", background: bg || "var(--white)", minHeight: 110, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        {children}
      </div>
      <div style={{ padding: "var(--s-3) var(--s-5)", borderTop: "var(--hairline-paper)", fontSize: "var(--t-xs)", color: "var(--stone)", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
        {title}
      </div>
    </div>
  );
}

function MotionRules() {
  const rules = [
    { k: "Page entry", v: "Sections fade in on scroll with translateY(20px). 480ms, ease-out. Stagger children at 60ms." },
    { k: "Hover", v: "240ms ease on opacity / border / colour. Never scale chrome. Imagery may scale to 1.04 inside fixed crops." },
    { k: "Hero orbs", v: "Continuous low-frequency wobble at 0.06-0.18 Hz. Parallax lerps at 0.02. Drift, never spin." },
    { k: "Marquee", v: "50s linear, single direction, masked edges. Pauses under prefers-reduced-motion." },
    { k: "Reduced motion", v: "Hero canvas does not mount. Marquee, badge spin and ambient dot all hold position." },
    { k: "Forbidden", v: "Bounce easings, parallax on body type, autoplay video, full-screen scroll hijack, generic 'reveal' libraries." },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "var(--s-7)" }}>
      <div className="body-sm" style={{ color: "var(--stone)" }}>
        Motion stays in service of legibility. The page reads as a document first, the orbs and ambient elements are the seasoning.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, border: "var(--hairline-paper)", borderRadius: "var(--r-card)", overflow: "hidden", background: "var(--white)" }}>
        {rules.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "var(--s-5)", padding: "var(--s-4) var(--s-5)", borderBottom: i === rules.length - 1 ? 0 : "var(--hairline-paper)" }}>
            <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--ink)", letterSpacing: "0.06em" }}>{r.k}</div>
            <div style={{ fontSize: "var(--t-sm)", color: "var(--stone)", lineHeight: 1.55 }}>{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { SystemSection });
