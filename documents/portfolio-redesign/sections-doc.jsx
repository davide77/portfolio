/* Header / Cover / Audit / Reposition sections */
/* eslint-disable */

const { Fragment } = React;

function DocBar() {
  return (
    <div className="docbar">
      <div><span className="accent">dd</span>&nbsp;portfolio v2 / strategy + system</div>
      <nav>
        <a href="#cover">01 cover</a>
        <a href="#audit">02 audit</a>
        <a href="#voice">03 voice</a>
        <a href="#system">04 system</a>
        <a href="#sitemap">05 sitemap</a>
        <a href="#mocks">06 mocks</a>
      </nav>
      <div>2026 / london</div>
    </div>
  );
}

function Cover() {
  return (
    <section id="cover" className="cover section--ink">
      <div className="ink-wash" aria-hidden="true"></div>
      <div className="well" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div>
          <div className="eyebrow on-ink" style={{ marginBottom: "var(--s-6)" }}>
            <span className="num">00</span>portfolio.v2 / strategy &amp; system
          </div>
          <h1 className="cover__title">
            From <em>humble</em> to undeniable.<br />
            A portfolio that does the talking.
          </h1>
          <p className="body-sm" style={{ marginTop: "var(--s-7)", maxWidth: "58ch", fontSize: "var(--t-md)" }}>
            v1 reads like a CV in a dark theme. The work is bigger than the page. This document audits what's
            holding it back, repositions the voice without breaking brand.md, extends the system, and shows
            the new site, section by section.
          </p>
        </div>

        <dl className="cover__meta" style={{ marginTop: "var(--s-11)" }}>
          <div><dt>Author</dt><dd>Davide Domenghini</dd></div>
          <div><dt>Role</dt><dd>Senior front-end engineer</dd></div>
          <div><dt>Base</dt><dd>London</dd></div>
          <div><dt>Doc status</dt><dd>Draft for review</dd></div>
        </dl>

        <span className="ambient-dot" style={{ top: "22%", right: "12%" }}></span>
        <span className="edge-label">est . 2006 . based in london</span>
      </div>
    </section>
  );
}

function AuditSection() {
  const items = [
    { n: 1, h: "The hero apologises", v: "Tiny 14px copy on a 1920px stage. Twenty years of high-traffic work compressed into 'shipping whole products' as if that were an embarrassment. The headline is the smallest thing on screen." },
    { n: 2, h: "Selected work reads like a list, not a portfolio", v: "Each project gets one thumb and a label. No outcome, no scale, no role. The brain has nothing to anchor 'so what'. Liberty Blume should look like the regulated-lending platform it is." },
    { n: 3, h: "Trust signals are buried", v: "Sky, Estée Lauder, Liberty Global, twenty years of high-traffic web - all mentioned once, low in the page, as a single sentence. These names sell the role on their own. They should land in the first viewport." },
    { n: 4, h: "Archive eats real estate", v: "A 25-tile bento of 2010-era work is given the same visual weight as flagship case studies. It says 'I'll take anything', not 'I lead frontend'. Move it behind a /lab archive route." },
    { n: 5, h: "Capabilities are listed, not proved", v: "'Accessibility', 'design systems', 'end-to-end delivery' as flat chips. No evidence. Every capability needs a sentence of receipt - a constraint, a stack, an outcome." },
    { n: 6, h: "No numbers, no scale, no risk reduction", v: "What did you ship? For how many users? At what uptime? Hiring leads scan for risk reduction first. v1 forces them to infer it." },
    { n: 7, h: "Voice undersells craft", v: "'Got a hard brief? That's the fun part' is friendly. It is not 'senior IC who could lead your frontend'. The voice rules in brand.md already permit confident, evidence-led prose - v1 isn't using them." },
  ];
  return (
    <section id="audit" className="section section--paper">
      <div className="well">
        <div className="section-head">
          <div className="eyebrow"><span className="num">02</span>audit / v1</div>
          <div>
            <h2>Seven things v1 gets in its own way.</h2>
            <p>Not a redesign for novelty. Each point below maps to a hiring lead's first ninety seconds on the page,
              and to a section we'll rebuild in part 06.</p>
          </div>
        </div>

        <div className="audit-grid">
          <div className="audit-shot">
            <img src="assets/v1-current.png" alt="Current portfolio v1, full-page screenshot in dark theme" />
            {items.map((it, i) => (
              <span key={it.n} className="pin" style={pinPos(i)}>{it.n}</span>
            ))}
          </div>
          <div className="audit-list">
            {items.map(it => (
              <div className="audit-item" key={it.n}>
                <div className="marker">{it.n}</div>
                <div>
                  <h4>{it.h}</h4>
                  <p className="verdict">{it.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function pinPos(i) {
  // approximate positions over the v1 screenshot - distributed top-to-bottom
  const stops = [
    { top: "6%",  left: "55%" },   // hero apologises
    { top: "32%", left: "20%" },   // selected work list
    { top: "55%", left: "25%" },   // trust signals
    { top: "62%", left: "60%" },   // archive
    { top: "78%", left: "18%" },   // capabilities
    { top: "84%", left: "55%" },   // numbers missing
    { top: "92%", left: "30%" },   // voice
  ];
  return stops[i] || { top: "10%", left: "10%" };
}

function VoiceSection() {
  const rewrites = [
    {
      tag: "Hero headline",
      before: "Senior engineer shipping whole products, end to end.",
      after: "Twenty years shipping the front end of products people actually use.",
      note: "Lead with scale and reach. Reach the reader before they have to infer it.",
    },
    {
      tag: "Hero sub",
      before: "I work at both ends: regulated enterprise platforms and experimental interfaces.",
      after: "Sky. Estée Lauder. Liberty Global. Bristol City Council. EE. A+E Networks.",
      note: "Six brands, one line. The credentialing happens before the visitor scrolls.",
    },
    {
      tag: "Liberty Blume card",
      before: "Liberty Blume - lending platform we worked on.",
      after: "Liberty Blume - 12-step regulated consumer-lending journey at Liberty Global. React, Context, SCSS 7-1, GCP, Docker. Live.",
      note: "Role, scale, stack, status. Same template, every card.",
    },
    {
      tag: "Capability label",
      before: "Accessibility - familiar with screen-readers and WCAG.",
      after: "Accessibility - WCAG 2.1 AA delivered across bristol.gov.uk for 500,000+ residents. Mentored two associates onto government accessibility practice.",
      note: "Replace 'familiar with' with the standard, the population and the proof.",
    },
    {
      tag: "About bio",
      before: "Hiring a senior engineer? Building a product?",
      after: "I'm a senior front-end engineer and founder with twenty-plus years building scalable, high-performance web applications for Sky, Estée Lauder, Liberty Global, Bristol City Council, EE and A+E Networks.",
      note: "First sentence does the work. The rest of the page is the receipt.",
    },
    {
      tag: "AI section",
      before: "Not in v1 at all.",
      after: "Two years embedding AI into the workflow. With AI in the loop I ship full-stack features end to end I'd previously have needed a cross-functional team to deliver.",
      note: "Shipped Cheam Sports FC solo. The proof exists. F*BH says name the receipt.",
    },
    {
      tag: "Closing CTA",
      before: "Got a hard brief? That's the fun part.",
      after: "Got a brief that needs a senior owner? Send it.",
      note: "Friendly was the v1 tic. Direct is the brand voice.",
    },
  ];
  return (
    <section id="voice" className="section section--paper">
      <div className="well">
        <div className="section-head">
          <div className="eyebrow"><span className="num">03</span>voice / strong, not humble</div>
          <div>
            <h2>Same brand book. Stronger prose.</h2>
            <p>brand.md already bans the influencer voice and the corporate-dev voice. The rewrites below stay
              inside its rules (British English, no em-dashes, no banned framings, sentence case) and lift the
              voice from polite to undeniable.</p>
          </div>
        </div>

        <div className="compare">
          {rewrites.map((r, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="compare__col compare__col--before">
                <div className="compare__tag">Before . {r.tag}</div>
                <p className="compare__head">{r.before}</p>
              </div>
              <div className="compare__col compare__col--after">
                <div className="compare__tag">After . {r.tag}</div>
                <p className="compare__head">{r.after}</p>
                <p className="compare__note">{r.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider"></div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "var(--s-7)" }}>
          <div className="eyebrow">Rules we kept</div>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--s-3) var(--s-7)", fontSize: "var(--t-sm)", color: "var(--stone)", listStyle: "none" }}>
            <li>British English. Sentence case for UI and headings.</li>
            <li>No em-dashes or en-dashes. Spaced hyphens only.</li>
            <li>One core message at a time. Headline plus one supporting line.</li>
            <li>No "not just X" framing. No empty three-part lists.</li>
            <li>No "revolutionise", "seamless", "world-class", "intuitive".</li>
            <li>Evidence over adjectives. Name the stack, constraint, outcome.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DocBar, Cover, AuditSection, VoiceSection });
