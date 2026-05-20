/* Sitemap / Figma file plan + Proposed page mocks (hero, stats, brands, work bento, capabilities, receipts, closer) */
/* eslint-disable */

function SitemapSection() {
  return (
    <section id="sitemap" className="section section--paper">
      <div className="well">
        <div className="section-head">
          <div className="eyebrow"><span className="num">05</span>sitemap / figma file plan</div>
          <div>
            <h2>One file. Four pages. A library that holds the rest.</h2>
            <p>Lean information architecture. Home does the heavy lifting; case study is the long-form
              template; lab is the archive's new home, where curiosities live without dragging the hero down.</p>
          </div>
        </div>

        <div className="sitemap">
          <div className="sitemap__node sitemap__node--root">
            <div className="level">/ root</div>
            <h5>Home</h5>
            <ul>
              <li>Hero . orb canvas + headline</li>
              <li>Trust band . brands marquee</li>
              <li>Receipts band . by the numbers</li>
              <li>Selected work . bento (4-6 items)</li>
              <li>Capabilities . evidence grid</li>
              <li>Quotes . three receipts</li>
              <li>About strip . portrait + bio</li>
              <li>Closing CTA . email Davide</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/work/[slug]</div>
            <h5>Case study</h5>
            <ul>
              <li>Hero . project, role, dates</li>
              <li>The brief</li>
              <li>What I shipped</li>
              <li>Constraints (regulation, scale, team)</li>
              <li>Stack and architecture</li>
              <li>Selected screens (bento)</li>
              <li>Outcome and next steps</li>
              <li>Up-next link</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/about</div>
            <h5>About</h5>
            <ul>
              <li>Wide portrait + one-line bio</li>
              <li>Career timeline (Sky -> ELC -> LG -> now)</li>
              <li>How I work . principles</li>
              <li>Speaking and writing</li>
              <li>Download CV (PDF)</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/lab</div>
            <h5>Lab + archive</h5>
            <ul>
              <li>Experiments . WebGL orb cluster</li>
              <li>Long-form archive (2008-2018)</li>
              <li>Bento gallery (was on home in v1)</li>
              <li>Notes . shorter posts</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/contact</div>
            <h5>Contact</h5>
            <ul>
              <li>Single intent (hire / advise)</li>
              <li>Form with three fields</li>
              <li>Direct email + LinkedIn</li>
              <li>Time zone + response window</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/figma . pages</div>
            <h5>Library</h5>
            <ul>
              <li>00 Cover</li>
              <li>01 Tokens (colour, type, spacing)</li>
              <li>02 Components (nav, cards, buttons, forms)</li>
              <li>03 Patterns (hero, bento, marquee, closer)</li>
              <li>04 Templates (home, case, about, lab)</li>
              <li>05 Hand-off (specs + states)</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/figma . variants</div>
            <h5>Variants per component</h5>
            <ul>
              <li>Surface . ink / paper</li>
              <li>State . default / hover / focus / disabled</li>
              <li>Size . sm / md / lg</li>
              <li>Density . desktop / tablet / mobile</li>
              <li>Motion . static / animated</li>
            </ul>
          </div>

          <div className="sitemap__node">
            <div className="level">/figma . tokens</div>
            <h5>Tokens linked to brand.md</h5>
            <ul>
              <li>colour-* variables</li>
              <li>type-* (size + weight + LH)</li>
              <li>space-* (12 steps)</li>
              <li>radius-* (card, pill, square)</li>
              <li>shadow . none (brand says no stacks)</li>
              <li>motion . easings + durations</li>
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        <div className="card card--paper" style={{ padding: "var(--s-7)" }}>
          <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Build order</div>
          <ol style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--s-4) var(--s-7)", listStyle: "decimal inside", color: "var(--ink)", fontSize: "var(--t-sm)", lineHeight: 1.6 }}>
            <li>Lock tokens in Figma. Mirror the SCSS map exactly.</li>
            <li>Build components in the library (variants + states).</li>
            <li>Compose patterns from components. No raw pixels.</li>
            <li>Compose home from patterns. Annotate spacing tokens.</li>
            <li>Promote the case-study template to a Component.</li>
            <li>Ship two real case studies (Liberty Blume, Nannynow).</li>
            <li>Move v1 archive to /lab. Hide from primary nav.</li>
            <li>Pass to engineering with a one-page spec per pattern.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SitemapSection });
