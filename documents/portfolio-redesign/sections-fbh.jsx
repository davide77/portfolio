/* F*ck Being Humble lens - mindset shifts mapped to brand.md, synthesis rules */
/* eslint-disable */

function FBHSection() {
  const mindset = [
    {
      tag: "Mindset shift 1",
      title: "Selling myself is essential, not optional.",
      body: "The portfolio is the one place where self-promotion is the job. Hiring leads cannot infer twenty years of high-traffic work from a 14px line of copy. State it. In the first viewport.",
    },
    {
      tag: "Mindset shift 2",
      title: "I am valued. The brands I shipped for prove it.",
      body: "Sky. Estée Lauder. Liberty Global. Bristol City Council. EE. A+E Networks. SAP. These names credential the role on their own. v1 names them once, low. v2 leads with them.",
    },
    {
      tag: "Mindset shift 3",
      title: "A no is a not-right-now.",
      body: "The portfolio is permanent. It works while you sleep, on briefs you have not seen. Build it so the next hiring lead who lands cold has every answer in the first two screens.",
    },
  ];

  const synthesis = [
    { fbh: "Brag about successes", brand: "No superlatives without proof", out: "Brag with numbers. 500,000+ residents served. 12 lending steps shipped. 40% dev-time cut." },
    { fbh: "Show personality", brand: "No filler, no influencer voice", out: "One italic word per page. One signature motif (the orbs). The rest is direct prose." },
    { fbh: "Name drop", brand: "Specifics where they matter to the reader", out: "Name brands, name the stack, name the constraint. Never generic 'top global clients'." },
    { fbh: "Active verbs", brand: "Verb-led CTAs, evidence over adjectives", out: "Architected. Led. Shipped. Mentored. Reduced. Built. The same list both books endorse." },
    { fbh: "First person", brand: "Direct sentences", out: "'I lead front-end at Liberty Blume.' Not 'a senior engineer with experience leading frontend.'" },
    { fbh: "Drop the apology", brand: "No 'it's not just X, it's Y' framing", out: "The headline is the claim. The subhead is the receipt. No hedging between them." },
  ];

  return (
    <section className="section section--ink">
      <div className="ink-wash" aria-hidden="true"></div>
      <div className="well" style={{ position: "relative" }}>
        <div className="section-head">
          <div className="eyebrow on-ink"><span className="num">03.5</span>lens / f*ck being humble</div>
          <div>
            <h2 style={{ color: "var(--paper)" }}>
              The voice book you handed me, applied without breaking brand.md.
            </h2>
            <p>
              brand.md bans buzzwords. F*BH bans humility. Together they say one thing: brag with facts.
              The mindset shifts below are F*BH's. The synthesis rules are how they survive contact with the
              brand book.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s-5)", marginBottom: "var(--s-10)" }} className="fbh-mindset">
          {mindset.map((m, i) => (
            <div key={i} style={{ padding: "var(--s-6)", border: "var(--hairline)", borderRadius: "var(--r-card)", background: "var(--ink-2)", display: "flex", flexDirection: "column", gap: "var(--s-3)", position: "relative" }}>
              <div className="eyebrow on-ink" style={{ marginBottom: 0 }}>
                <span style={{ color: "var(--signal)", fontSize: 36, fontWeight: 300, letterSpacing: "-0.02em", display: "block", marginBottom: 8, lineHeight: 1 }}>0{i + 1}</span>
                {m.tag}
              </div>
              <h4 style={{ fontSize: "var(--t-lg)", fontWeight: 400, color: "var(--paper)", letterSpacing: "-0.01em", lineHeight: 1.25, textWrap: "balance" }}>
                {m.title}
              </h4>
              <p style={{ fontSize: "var(--t-sm)", color: "var(--cream)", opacity: 0.78, lineHeight: 1.6 }}>{m.body}</p>
            </div>
          ))}
        </div>

        <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-5)" }}>
          Synthesis . where the two books meet
        </div>
        <div style={{ border: "var(--hairline)", borderRadius: "var(--r-card)", overflow: "hidden" }} className="fbh-synth">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr", gap: 0 }}>
            <div className="fbh-head">F*BH says</div>
            <div className="fbh-head">brand.md says</div>
            <div className="fbh-head">v2 does</div>
            {synthesis.map((s, i) => (
              <div key={i} style={{ display: "contents" }}>
                <div className="fbh-cell" style={{ color: "var(--cream)", opacity: 0.8 }}>{s.fbh}</div>
                <div className="fbh-cell" style={{ color: "var(--cream)", opacity: 0.8 }}>{s.brand}</div>
                <div className="fbh-cell" style={{ color: "var(--paper)" }}>{s.out}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "var(--s-9)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-7)" }} className="fbh-glossary">
          <div>
            <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-4)" }}>Active verbs we'll actually use</div>
            <p style={{ fontSize: "var(--t-md)", color: "var(--paper)", lineHeight: 1.45, fontWeight: 300, letterSpacing: "-0.01em", textWrap: "pretty" }}>
              Architected . Led . Shipped . Built . Mentored . Reduced . Compressed . Reconciled . Established .
              Designed . Integrated . Modernised . Delivered . Standardised . Codified.
            </p>
          </div>
          <div>
            <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-4)" }}>Adjectives that earn their place</div>
            <p style={{ fontSize: "var(--t-md)", color: "var(--paper)", lineHeight: 1.45, fontWeight: 300, letterSpacing: "-0.01em", textWrap: "pretty" }}>
              Senior . Regulated . Production . Token-driven . Server-component-first . Container-query-first .
              Trunk-based . Forkable . AI-assisted.
            </p>
          </div>
          <div>
            <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-4)" }}>Words we will not write</div>
            <p style={{ fontSize: "var(--t-md)", color: "var(--cream)", opacity: 0.65, lineHeight: 1.45, fontWeight: 300, letterSpacing: "-0.01em", textWrap: "pretty", textDecoration: "line-through", textDecorationColor: "var(--signal)" }}>
              passionate . love . really . obsessed . enabler . game-changer . synergy .
              elevate . unleash . cutting-edge . robust . seamless . world-class.
            </p>
          </div>
          <div>
            <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-4)" }}>The trade we are making</div>
            <p style={{ fontSize: "var(--t-md)", color: "var(--paper)", opacity: 0.85, lineHeight: 1.5, fontWeight: 300, letterSpacing: "-0.01em" }}>
              Polite reads as forgettable. Direct reads as senior. Every paragraph below is rewritten to lead with
              the verb, the brand, the number or the stack. That is the F*BH discipline, in service of brand.md.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        .fbh-head {
          padding: var(--s-4) var(--s-5);
          background: rgba(245, 241, 234, 0.04);
          font-size: var(--t-xs);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--cream);
          opacity: 0.7;
          border-bottom: var(--hairline);
        }
        .fbh-cell {
          padding: var(--s-4) var(--s-5);
          font-size: var(--t-sm);
          line-height: 1.55;
          border-bottom: var(--hairline);
          border-right: var(--hairline);
        }
        .fbh-cell:nth-child(3n) { border-right: 0; }
        .fbh-synth > div > div:nth-last-child(-n+3) { border-bottom: 0; }
        @media (max-width: 900px) {
          .fbh-mindset { grid-template-columns: 1fr !important; }
          .fbh-synth > div { grid-template-columns: 1fr !important; }
          .fbh-head, .fbh-cell { border-right: 0; }
          .fbh-glossary { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { FBHSection });
