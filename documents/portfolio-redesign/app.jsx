/* App orchestration: tweaks panel + section composition */
/* eslint-disable */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "webglOn": true,
  "showAuditPins": true,
  "accent": "signal",
  "heroVariant": "default"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.dataset.accent = t.accent;
  }, [t.accent]);

  return (
    <div>
      <window.DocBar />
      <window.Cover />
      <window.AuditSection />
      <window.VoiceSection />
      <window.FBHSection />
      <window.SystemSection />
      <window.SitemapSection />
      <window.MocksIntro />
      <window.HeroMock webglOn={t.webglOn} variant={t.heroVariant} />
      <window.BrandsBand />
      <window.StatsBand />
      <window.WorkBento />
      <window.Capabilities />
      <window.AISection />
      <window.Receipts />
      <window.AboutStrip />
      <window.Closer />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Hero">
          <window.TweakToggle label="WebGL orb canvas" value={t.webglOn} onChange={(v) => setTweak("webglOn", v)} />
        </window.TweakSection>
        <window.TweakSection label="Accent">
          <window.TweakRadio
            label="Accent colour"
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { value: "signal", label: "Signal" },
              { value: "forest", label: "Forest" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
