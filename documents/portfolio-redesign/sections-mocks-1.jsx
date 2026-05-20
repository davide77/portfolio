/* Proposed page mocks - the new portfolio rendered section by section */
/* eslint-disable */

function MocksIntro() {
  return (
    <section id="mocks" className="section section--ink section--compact">
      <div className="ink-wash" aria-hidden="true"></div>
      <div className="well">
        <div className="section-head">
          <div className="eyebrow on-ink"><span className="num">06</span>mocks / the new portfolio</div>
          <div>
            <h2 style={{ color: "var(--paper)" }}>What the user actually sees.</h2>
            <p>Hero first, then the trust band that v1 buried. Numbers second.
              Selected work as a bento that makes scale legible. Capabilities with receipts.
              Three quotes. Closing CTA that asks for the brief.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMock({ webglOn }) {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (!webglOn) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let dispose = null;
    const t = setTimeout(() => {
      if (window.mountDDOrb && canvasRef.current && containerRef.current) {
        dispose = window.mountDDOrb(canvasRef.current, containerRef.current);
      }
    }, 200);
    return () => { clearTimeout(t); if (dispose) dispose(); };
  }, [webglOn]);

  return (
    <section className="section section--ink" style={{ paddingTop: "var(--s-7)", paddingBottom: "var(--s-7)" }}>
      <div className="well">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--s-5)" }}>
          <div className="eyebrow on-ink"><span className="num">06.1</span>home / hero</div>
          <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--cream)", opacity: 0.55 }}>
            shader: high-contrast | dpr: min(3, devicePixelRatio) | reduced-motion: hidden
          </div>
        </div>

        <div className="hero-mock" ref={containerRef}>
          <canvas id="orb-canvas" ref={canvasRef}></canvas>

          <nav className="hero-mock__nav">
            <div className="wordmark"><span className="accent">dd</span><span style={{ marginLeft: 8, opacity: 0.9 }}>domenghini</span></div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.55, color: "var(--cream)" }}>SENIOR FRONT-END . LONDON</div>
            <div className="right">
              <div>WORK</div><div>ABOUT</div><div>LAB</div><div>CONTACT</div>
            </div>
          </nav>

          <div className="hero-mock__text">
            <div className="hero-mock__eyebrow">01 . SENIOR FRONT-END . FOUNDER</div>
            <div className="hero-mock__title">
              Twenty years <em>shipping</em><br />the front end of products people use.
            </div>
            <div className="mono" style={{ marginTop: 22, fontSize: "var(--t-xs)", color: "var(--cream)", opacity: 0.7, letterSpacing: "0.2em" }}>
              SKY . ESTEE LAUDER . LIBERTY GLOBAL . BRISTOL CITY COUNCIL . EE . A+E NETWORKS
            </div>
          </div>

          <div className="hero-mock__badge">
            <svg viewBox="0 0 100 100">
              <defs><path id="circle-path" d="M 50, 50 m -36, 0 a 36, 36 0 1, 1 72, 0 a 36, 36 0 1, 1 -72, 0" fill="none" /></defs>
              <text><textPath href="#circle-path">SCROLL DOWN . SCROLL DOWN . </textPath></text>
            </svg>
            <div className="dot"></div>
          </div>
          <div className="hero-mock__edge">EST . 2006 . BASED IN LONDON</div>
          <span className="ambient-dot" style={{ top: "30%", right: "14%" }}></span>
        </div>

        <div className="body-sm" style={{ marginTop: "var(--s-5)", maxWidth: "70ch" }}>
          The headline is the biggest object on screen. Brand row sits in the first viewport - no scroll
          needed to learn that this is Sky, Estée Lauder and Liberty Global work. Orbs stay sharp, no blur,
          no halo bleed. Per brand.md, the orb ramp lives in the shader only.
        </div>
      </div>
    </section>
  );
}

function BrandsBand() {
  const brands = [
    "Sky", "Estée Lauder", "Liberty Global", "Bristol City Council",
    "EE", "A+E Networks", "SAP", "Boring Money",
    "Toyota", "HSBC", "GSK", "Philips",
    "Honda", "Renault", "Comic Relief", "Sunday Times",
    "History Channel", "Inmarsat", "Squiz", "Le Bon Marche",
  ];
  const items = [...brands, ...brands];
  return (
    <section className="section--ink" style={{ padding: "var(--s-8) 0", borderTop: "var(--hairline)", borderBottom: "var(--hairline)" }}>
      <div className="well" style={{ paddingLeft: "var(--s-7)", paddingRight: "var(--s-7)" }}>
        <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-6)", display: "flex", justifyContent: "space-between" }}>
          <span><span className="num">06.2</span>brands shipped for</span>
          <span className="mono" style={{ opacity: 0.55 }}>20 of 60+ . 2006 - 2026</span>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {items.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--s-6)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cream)", opacity: 0.6 }}></span>
              <span style={{ fontSize: 34, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--paper)", whiteSpace: "nowrap" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="section section--ink" style={{ paddingTop: "var(--s-11)", paddingBottom: "var(--s-11)" }}>
      <div className="well">
        <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-7)" }}>
          <span className="num">06.3</span>by the numbers / 2006 . 2026
        </div>
        <h3 className="display" style={{ fontSize: "var(--t-3xl)", color: "var(--paper)", marginBottom: "var(--s-9)", maxWidth: "20ch" }}>
          The shape of twenty years, on one line.
        </h3>

        <div className="stat-row">
          <div className="stat"><div className="num">20<span className="suffix">+yrs</span></div><div className="label">Senior front-end practice. Started 2006. Still in the IDE every day.</div></div>
          <div className="stat"><div className="num">500<span className="suffix">k+</span></div><div className="label">Bristol residents served by bristol.gov.uk. The design system I shipped is still live.</div></div>
          <div className="stat"><div className="num">12<span className="suffix">steps</span></div><div className="label">Regulated lending journey live at Liberty Blume. Real money, real compliance, every transition.</div></div>
          <div className="stat"><div className="num">40<span className="suffix">%</span></div><div className="label">Dev-time reduction across Squiz client engagements via standardised component libraries.</div></div>
        </div>

        <div className="stat-row" style={{ marginTop: "var(--s-7)" }}>
          <div className="stat"><div className="num">7<span className="suffix">brands</span></div><div className="label">Modernised across Estée Lauder EMEA. Clinique, MAC, Bobbi Brown, Tom Ford, Jo Malone, La Mer, Origins.</div></div>
          <div className="stat"><div className="num">100<span className="suffix">+</span></div><div className="label">Families using the platform I built and ship solo for Cheam Sports FC.</div></div>
          <div className="stat"><div className="num">2.1<span className="suffix">AA</span></div><div className="label">WCAG conformance, full delivery. Keyboard, contrast, reduced motion in the definition of done.</div></div>
          <div className="stat"><div className="num">0</div><div className="label">Em-dashes, Americanisms or banned framings in shipped copy. The brand book audits itself.</div></div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MocksIntro, HeroMock, BrandsBand, StatsBand });
