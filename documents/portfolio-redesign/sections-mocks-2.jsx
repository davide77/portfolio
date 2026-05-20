/* Proposed page mocks part 2 - bento, capabilities, receipts, about, closer */
/* eslint-disable */

function WorkBento() {
  return (
    <section className="section section--ink" style={{ paddingTop: "var(--s-11)" }}>
      <div className="well">
        <div className="section-head" style={{ borderBottomColor: "rgba(224,219,212,0.16)" }}>
          <div className="eyebrow on-ink"><span className="num">06.4</span>selected work</div>
          <div>
            <h2 style={{ color: "var(--paper)" }}>Six pieces. Each one answers role, stack, scale, status.</h2>
            <p>Same template, every time. The bento is sized so one project always anchors the eye.</p>
          </div>
        </div>

        <div className="bento">
          <a className="bento__cell bento__cell--feat" href="#" aria-label="Liberty Blume case study">
            <img src="assets/work/liberty-blume-review.jpg" alt="Liberty Blume review-offer screen" />
            <div className="label">
              <div>
                <div className="role">Senior FE lead . Liberty Global . 2025 - now</div>
                <div style={{ fontSize: "var(--t-xl)", fontWeight: 300, letterSpacing: "-0.02em", marginTop: 6 }}>Liberty Blume</div>
                <div style={{ fontSize: "var(--t-sm)", color: "var(--cream)", opacity: 0.8, marginTop: 4 }}>
                  12-step regulated consumer-lending journey. React + Context, SCSS 7-1, GCP, Docker. Live.
                </div>
              </div>
              <div className="stack">REACT · TS · SCSS · GCP · DOCKER</div>
            </div>
          </a>

          <a className="bento__cell bento__cell--tall" href="#">
            <img src="assets/work/sap-water.jpg" alt="Striver football placeholder" />
            <div className="label">
              <div>
                <div className="role">Design + FE lead . 2026</div>
                <div style={{ fontSize: "var(--t-md)", marginTop: 4 }}>Striver.Football</div>
                <div style={{ fontSize: "var(--t-xs)", color: "var(--cream)", opacity: 0.7, marginTop: 4 }}>
                  Brand guidelines to shipped site. Token-driven SCSS, headless WP, IMAGO.
                </div>
              </div>
              <div className="stack">NEXT · TS · WP</div>
            </div>
          </a>

          <a className="bento__cell bento__cell--reg" href="#">
            <img src="assets/work/estee-lauder.jpg" alt="Estée Lauder Calvin Klein Beauty proofing" />
            <div className="label">
              <div>
                <div className="role">Senior FE . EMEA . 2022 - 25</div>
                <div style={{ fontSize: "var(--t-md)", marginTop: 4 }}>Estée Lauder Companies</div>
                <div style={{ fontSize: "var(--t-xs)", color: "var(--cream)", opacity: 0.7, marginTop: 4 }}>
                  7 brands, FR + DE rollouts, multi-million euro revenue.
                </div>
              </div>
              <div className="stack">REACT · DRUPAL · SCSS</div>
            </div>
          </a>

          <a className="bento__cell bento__cell--reg" href="#">
            <img src="assets/work/sap-banking.jpg" alt="bristol.gov.uk design system placeholder" />
            <div className="label">
              <div>
                <div className="role">Senior FE . 2021 - 22</div>
                <div style={{ fontSize: "var(--t-md)", marginTop: 4 }}>bristol.gov.uk</div>
                <div style={{ fontSize: "var(--t-xs)", color: "var(--cream)", opacity: 0.7, marginTop: 4 }}>
                  GOV.UK-aligned design system. 500k+ residents. Mentored 2 associates. Live.
                </div>
              </div>
              <div className="stack">REACT · DOCUSAURUS</div>
            </div>
          </a>

          <a className="bento__cell bento__cell--wide" href="#">
            <img src="assets/work/toyota.jpg" alt="Cheam Sports FC placeholder" />
            <div className="label">
              <div>
                <div className="role">Founder + sole engineer . 2024 - now</div>
                <div style={{ fontSize: "var(--t-md)", marginTop: 4 }}>Cheam Sports FC . full-stack</div>
                <div style={{ fontSize: "var(--t-xs)", color: "var(--cream)", opacity: 0.7, marginTop: 4 }}>
                  Member portal, Stripe + webhook reconciliation, FA scraper, PWA cron. 100+ families.
                </div>
              </div>
              <div className="stack">NEXT · DRIZZLE · STRIPE · BETTER-AUTH</div>
            </div>
          </a>

          <div className="bento__cell bento__cell--text">
            <div>
              <div className="role" style={{ color: "var(--cream)", opacity: 0.65, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "var(--t-xs)" }}>Currently building</div>
              <div className="head" style={{ marginTop: 12 }}>Nannynow.<br/>Concept to MVP, solo.</div>
            </div>
            <div className="body">
              Two-sided childcare marketplace. Architecture, UX, delivery. AI in the loop, senior judgement at the helm.
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
              <span className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--cream)" }}>NEXT · TS · MOBILE-FIRST</span>
              <span style={{ fontSize: 20 }}>&#x2197;</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "var(--s-7)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--s-4)" }}>
          <div className="body-sm">Everything else lives at /lab . Twelve years of archive work, no longer crowding the hero.</div>
          <a href="#" className="pill"><span className="dot"></span>Open the archive at /lab</a>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const caps = [
    {
      title: "Front-end architecture",
      body: "Type-safe component systems with tokens, container-query layouts and a generated utility layer. The structure that lets a team ship without re-litigating every spacing decision.",
      stack: "NEXT.JS · REACT · TYPESCRIPT · SCSS",
    },
    {
      title: "Accessibility",
      body: "WCAG 2.2 AA on every shipped flow. Keyboard pass, contrast checks, reduced motion and live-region announcements live in the definition of done, not the QA backlog.",
      stack: "AXE · NVDA · VOICEOVER · LIGHTHOUSE",
    },
    {
      title: "Performance",
      body: "Lighthouse 90+ on production hero pages, mobile, throttled. Set a perf budget; measure on every PR; refuse the regression. Boring, repeatable, evidence-led.",
      stack: "LIGHTHOUSE · WEBPAGETEST · CWV",
    },
    {
      title: "Design systems",
      body: "Tokens mirrored across brand book, Figma library, and SCSS. The same name in three places. The library is a product, with versioning and a changelog.",
      stack: "FIGMA · STYLE-DICTIONARY · SCSS",
    },
    {
      title: "WebGL and motion",
      body: "GLSL shaders for the celestial DD orbs on the home hero. Sharp, defined, high-contrast. Render loop paused on visibility change. No bloom, no blur.",
      stack: "THREE.JS · GLSL · IO",
    },
    {
      title: "End-to-end delivery",
      body: "From technical discovery to live deploy. Comfortable owning the API contract, the build pipeline and the analytics that prove the thing worked.",
      stack: "VERCEL · GH ACTIONS · STRIPE",
    },
  ];
  return (
    <section className="section section--paper">
      <div className="well">
        <div className="section-head">
          <div className="eyebrow"><span className="num">06.5</span>capabilities . with receipts</div>
          <div>
            <h2>Six things I do. Each one earns its line.</h2>
            <p>v1 listed these as chips. The new page proves them. Same six, with the constraint, the
              standard and the kit named explicitly.</p>
          </div>
        </div>

        <div className="cap-grid">
          {caps.map((c, i) => (
            <div className="cap" key={i}>
              <svg className="cap__icon" viewBox="0 0 32 32" aria-hidden="true">
                <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke="#101214" strokeWidth="1.5" />
                <text x="16" y="22" textAnchor="middle" fontFamily="DM Sans" fontSize="14" fontWeight="500" fill="#101214">{(i + 1).toString().padStart(2, "0")}</text>
              </svg>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
              <div className="cap__stack">{c.stack}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  const cards = [
    {
      tag: "Full-stack delivery",
      head: "Cheam Sports FC, end to end, solo.",
      body: "Member portal, Stripe + webhook reconciliation, FA fixture scraper, PWA web-push, Vercel cron. Pre-AI this is a cross-functional team. With AI in the loop, one senior frontend engineer. 100+ families on the live platform.",
      stack: "NEXT.JS · DRIZZLE · BETTER-AUTH · STRIPE",
    },
    {
      tag: "Debugging at machine speed",
      head: "Hours, not days.",
      body: "The diagnostic loop between 'something's wrong' and 'I know why' has collapsed. Unfamiliar stacks, legacy codebases, third-party SDKs - I get to the diff faster. The senior call stays mine.",
      stack: "CURSOR · CLAUDE CODE · GH COPILOT",
    },
    {
      tag: "AI as a junior PR",
      head: "Verification is where senior engineers earn their keep.",
      body: "I treat AI output with the scepticism I apply to a mid-level pull request. Fast to generate, slower to verify. Code review is the discipline that scales AI without scaling the bug count.",
      stack: "REVIEW · TYPE-CHECK · TEST · SHIP",
    },
  ];
  return (
    <section className="section section--paper">
      <div className="well">
        <div className="section-head">
          <div className="eyebrow"><span className="num">06.6</span>ai-assisted engineering . a senior view</div>
          <div>
            <h2>Two years embedding AI into the workflow. Not as a shortcut, as a force multiplier.</h2>
            <p>
              v1 buries this. v2 leads with it. AI does not replace senior judgement. It amplifies it. The proof
              is the platform I shipped solo. The discipline is the code review I run on every line it writes.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s-5)" }} className="ai-grid">
          {cards.map((c, i) => (
            <div key={i} style={{ padding: "var(--s-6)", border: "var(--hairline-paper)", borderRadius: "var(--r-card)", background: "var(--white)", display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginBottom: "var(--s-2)" }}>
                <span style={{ fontSize: 36, fontWeight: 300, color: "var(--signal-strong)", lineHeight: 1, letterSpacing: "-0.02em" }}>0{i + 1}</span>
                <span className="eyebrow" style={{ margin: 0 }}>{c.tag}</span>
              </div>
              <h4 style={{ fontSize: "var(--t-lg)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.25, letterSpacing: "-0.01em", textWrap: "balance" }}>{c.head}</h4>
              <p style={{ fontSize: "var(--t-sm)", color: "var(--stone)", lineHeight: 1.6 }}>{c.body}</p>
              <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--signal-strong)", marginTop: "auto" }}>{c.stack}</div>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 900px) { .ai-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}

function Receipts() {
  return (
    <section className="section section--ink">
      <div className="ink-wash" aria-hidden="true"></div>
      <div className="well" style={{ position: "relative" }}>
        <div className="section-head" style={{ borderBottomColor: "rgba(224,219,212,0.16)" }}>
          <div className="eyebrow on-ink"><span className="num">06.7</span>three proofs / from the CV</div>
          <div>
            <h2 style={{ color: "var(--paper)" }}>Three projects. Three specific receipts. Pick any one to verify.</h2>
            <p>Final site will replace these with named LinkedIn quotes. Until then, the evidence is the work.</p>
          </div>
        </div>

        <div className="receipts">
          <div className="receipt">
            <div className="eyebrow on-ink" style={{ marginBottom: 0 }}>Proof / Bristol City Council</div>
            <blockquote>Architected a GOV.UK-aligned design system in React and Docusaurus. WCAG 2.1 AA across all components. Live for 500,000+ residents. Mentored two associates onto government accessibility practice.</blockquote>
            <div className="who">
              <div className="av">BG</div>
              <div>
                <div className="name">bristol.gov.uk</div>
                <div className="role">Public sector . 2021 - 22 . still live</div>
              </div>
            </div>
          </div>
          <div className="receipt">
            <div className="eyebrow on-ink" style={{ marginBottom: 0 }}>Proof / Liberty Blume</div>
            <blockquote>Led front-end on a 12-step regulated consumer-lending journey at Liberty Global. React with context-based state, financial validation, digital agreement, secure compliance flows. Established team DevOps standards.</blockquote>
            <div className="who">
              <div className="av">LB</div>
              <div>
                <div className="name">Liberty Blume</div>
                <div className="role">Regulated finance . 2025 - now . in production</div>
              </div>
            </div>
          </div>
          <div className="receipt">
            <div className="eyebrow on-ink" style={{ marginBottom: 0 }}>Proof / Estée Lauder EMEA</div>
            <blockquote>Modernised seven luxury beauty brands (Clinique, MAC, Bobbi Brown, Tom Ford, Jo Malone, La Mer, Origins). French and German markets first, the blueprint for global rollout. Multi-million euro revenue platforms.</blockquote>
            <div className="who">
              <div className="av">EL</div>
              <div>
                <div className="name">Estée Lauder Companies</div>
                <div className="role">Luxury beauty . 2022 - 25 . live across EMEA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutStrip() {
  return (
    <section className="section section--ink section--compact">
      <div className="well">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 320px) 1fr", gap: "var(--s-9)", alignItems: "start" }} className="about-strip">
          <div style={{ borderRadius: "var(--r-card)", overflow: "hidden", border: "var(--hairline)", aspectRatio: "4/5", background: "#222" }}>
            <img src="assets/portrait.jpg" alt="Portrait of Davide Domenghini" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div className="eyebrow on-ink"><span className="num">06.8</span>about . the one-paragraph version</div>
            <h3 className="display" style={{ fontSize: "var(--t-3xl)", color: "var(--paper)", marginTop: "var(--s-5)", maxWidth: "20ch" }}>
              Senior front-end. Twenty years deep. Founder on the side.
            </h3>
            <p style={{ fontSize: "var(--t-md)", color: "var(--cream)", opacity: 0.9, marginTop: "var(--s-6)", maxWidth: "62ch", lineHeight: 1.55 }}>
              I'm a senior front-end engineer and founder with twenty-plus years building scalable,
              high-performance web applications for Sky, Estée Lauder, Liberty Global, Bristol City Council,
              EE and A+E Networks. I specialise in React, Next.js and TypeScript, and I love the moment a
              complex multi-step product finally feels effortless to use.
            </p>
            <p style={{ fontSize: "var(--t-md)", color: "var(--cream)", opacity: 0.85, marginTop: "var(--s-4)", maxWidth: "62ch", lineHeight: 1.55 }}>
              What sets me apart is range. I architect a 12-step financial lending platform one day and
              prototype an experimental WebGL interface the next. I lead front-end on enterprise revenue
              platforms, mentor juniors onto modern practice, and I'm currently building Nannynow.co.uk
              end to end - because the best engineers know how to ship product, not just code.
            </p>
            <div style={{ marginTop: "var(--s-7)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
              <a href="#" className="pill"><span className="dot"></span>Download CV</a>
              <a href="#" className="pill">Twenty-year timeline</a>
              <a href="#" className="pill">github.com/davide77</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="closer">
      <div className="ink-wash" aria-hidden="true"></div>
      <div className="well" style={{ position: "relative" }}>
        <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-7)" }}>
          <span className="num">06.8</span>closing
        </div>
        <h2 className="closer__title">
          Got a brief that needs a<br/><em>senior owner</em>? Send it.
        </h2>
        <p style={{ marginTop: "var(--s-7)", maxWidth: "62ch", fontSize: "var(--t-md)", color: "var(--cream)", opacity: 0.85 }}>
          I read every brief, even the ones I cannot take. Hiring a senior IC or lead front-end, or you want a
          technical partner from discovery to deploy? The address below lands in my inbox.
        </p>

        <div className="closer__row">
          <a href="#" className="cta-pill">Email Davide <span aria-hidden="true">&#x2197;</span></a>
          <span className="mono" style={{ fontSize: "var(--t-xs)", letterSpacing: "0.22em", color: "var(--cream)", opacity: 0.6 }}>
            REPLY WITHIN 48H . LONDON . GMT
          </span>
        </div>

        <dl className="closer__contacts">
          <div><dt>Email</dt><dd>davide@domenghini.com</dd></div>
          <div><dt>LinkedIn</dt><dd>in/davidedomenghini</dd></div>
          <div><dt>GitHub</dt><dd>github.com/davide77</dd></div>
        </dl>

        <div style={{ marginTop: "var(--s-12)", paddingTop: "var(--s-5)", borderTop: "var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--t-xs)", letterSpacing: "0.22em", color: "var(--cream)", opacity: 0.55, textTransform: "uppercase" }}>
          <span><span style={{ color: "var(--cream)" }}>dd</span> domenghini . 2026</span>
          <span>est . 2006 . based in london</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WorkBento, Capabilities, AISection, Receipts, AboutStrip, Closer });
