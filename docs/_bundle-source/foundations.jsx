// ----- Foundations: Logo, Color, Type, Spacing, Iconography -----

const SectionHeader = ({ label, title, children }) => (
  <header className="ds-section-header">
    <div>
      <div className="label">{label}</div>
      <h2>{title}</h2>
    </div>
    <p>{children}</p>
  </header>
);

window.SectionHeader = SectionHeader;

/* ---------------- Brand mark / Logo ---------------- */
// Stylized SVG mark — for favicon, watermark, badges (canonical logo is the PNG)
const FHEMark = ({ size = 48, tone = "primary" }) => {
  const blue = tone === "mono" ? "#0B1D3A" : "#9EC5FF";
  const navy = "#0B1D3A";
  const cross = tone === "mono" ? "#fff" : "#fff";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Laurel left */}
      <g stroke={blue} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M14 18 C9 24 8 32 12 42 C16 49 22 52 28 52" />
        <path d="M13 23 C10 24 8 23 7 21" />
        <path d="M11 29 C8 30 6 28 5 26" />
        <path d="M11 35 C8 36 6 34 5 32" />
        <path d="M13 41 C10 42 8 40 7 38" />
        <path d="M16 46 C13 47 11 45 10 43" />
        <path d="M21 50 C18 51 16 49 15 47" />
      </g>
      {/* Laurel right */}
      <g stroke={blue} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M50 18 C55 24 56 32 52 42 C48 49 42 52 36 52" />
        <path d="M51 23 C54 24 56 23 57 21" />
        <path d="M53 29 C56 30 58 28 59 26" />
        <path d="M53 35 C56 36 58 34 59 32" />
        <path d="M51 41 C54 42 56 40 57 38" />
        <path d="M48 46 C51 47 53 45 54 43" />
        <path d="M43 50 C46 51 48 49 49 47" />
      </g>
      {/* Shield */}
      <path d="M32 11 L46 16 V29 C46 38 40 44 32 47 C24 44 18 38 18 29 V16 L32 11 Z" fill={tone === "mono" ? navy : blue} />
      <path d="M32 13 L44 17.5 V29 C44 36.5 39 41.5 32 44.2 C25 41.5 20 36.5 20 29 V17.5 L32 13 Z" fill={tone === "mono" ? navy : "#B7D2FA"} opacity={tone === "mono" ? 1 : 0.5} />
      {/* Cross */}
      <rect x="29.5" y="22" width="5" height="13" rx="0.6" fill={cross} />
      <rect x="25.5" y="26" width="13" height="5" rx="0.6" fill={cross} />
    </svg>
  );
};
window.FHEMark = FHEMark;

const SwatchTile = ({ name, hex, varName, fg, contrast }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{
      background: hex, height: 96, borderRadius: 12,
      border: "1px solid rgba(11,29,58,0.06)",
      position: "relative", overflow: "hidden"
    }}>
      <span style={{
        position: "absolute", top: 10, right: 10,
        fontSize: 10, fontFamily: "var(--font-mono)",
        background: "rgba(255,255,255,0.85)", color: "#0B1D3A",
        padding: "2px 6px", borderRadius: 4
      }}>{contrast}</span>
    </div>
    <div>
      <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 600, color: "var(--fhe-navy)" }}>{name}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--n-500)", marginTop: 2 }}>{hex}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--n-400)" }}>{varName}</div>
    </div>
  </div>
);

const FoundationLogo = () => (
  <section className="ds-section" id="logo">
    <div className="ds-shell">
      <SectionHeader label="01 — Brand Mark" title="Logo & lockups">
        The First Health Enrollment mark pairs a protective shield with a laurel of trust and a healthcare cross. The PNG is canonical for marketing; an SVG variant exists only for icons, watermarks, favicons, and tight UI placements.
      </SectionHeader>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        <div className="panel" style={{ padding: 56, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
          <img src="assets/fhe-logo.png" alt="First Health Enrollment" style={{ maxWidth: "85%", height: "auto" }} />
          <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 11, color: "var(--n-400)", fontFamily: "var(--font-mono)" }}>Primary horizontal lockup · use for ≥ 200px width</div>
        </div>
        <div className="panel" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "var(--fhe-navy)", color: "#fff" }}>
          <img src="assets/fhe-logo.png" alt="" style={{ width: "70%", height: "auto", filter: "brightness(0) invert(1)" }} />
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", marginTop: 12 }}>Reverse / on-navy</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 16 }}>
        {[
          { label: "SVG Mark", bg: "#fff", el: <FHEMark size={72} /> },
          { label: "Mono Navy", bg: "#fff", el: <FHEMark size={72} tone="mono" /> },
          { label: "On Soft Blue", bg: "var(--fhe-soft-blue)", el: <FHEMark size={72} /> },
          { label: "On Navy", bg: "var(--fhe-navy)", el: <FHEMark size={72} /> },
        ].map((c, i) => (
          <div key={i} className="panel" style={{ background: c.bg, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            {c.el}
            <div style={{ fontSize: 11, color: c.bg === "var(--fhe-navy)" ? "rgba(255,255,255,0.7)" : "var(--n-500)", fontFamily: "var(--font-mono)" }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="panel panel-pad">
          <h4 className="ds-subsection-title">Clear space</h4>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", height: 180, background: "var(--n-25)", borderRadius: 8 }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--n-100) 1px, transparent 1px), linear-gradient(90deg, var(--n-100) 1px, transparent 1px)", backgroundSize: "16px 16px", opacity: 0.5 }} />
            <div style={{ position: "relative", border: "1px dashed var(--fhe-blue)", padding: 24 }}>
              <FHEMark size={52} />
            </div>
          </div>
          <p style={{ fontSize: 13, color: "var(--n-600)", margin: "12px 0 0" }}>Maintain clear space equal to the height of the cross around all sides of the mark.</p>
        </div>
        <div className="panel panel-pad">
          <h4 className="ds-subsection-title">Misuse</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {["Don't recolor", "Don't stretch", "Don't outline"].map((t, i) => (
              <div key={i} style={{ background: "var(--n-25)", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
                <div style={{ filter: i === 0 ? "hue-rotate(140deg)" : "none", transform: i === 1 ? "scaleX(1.6)" : "none", opacity: i === 2 ? 0.4 : 1 }}>
                  <FHEMark size={36} />
                </div>
                <div style={{ fontSize: 10.5, color: "var(--error-700)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
window.FoundationLogo = FoundationLogo;

/* ---------------- Color ---------------- */
const FoundationColor = () => {
  const brand = [
    { name: "Deep Navy", hex: "#0B1D3A", varName: "--fhe-navy", contrast: "AAA" },
    { name: "Medium Blue", hex: "#2563EB", varName: "--fhe-blue", contrast: "AA" },
    { name: "Light Blue", hex: "#9EC5FF", varName: "--fhe-light-blue", contrast: "AA Lg" },
    { name: "Soft Blue", hex: "#E8F1FF", varName: "--fhe-soft-blue", contrast: "—" },
    { name: "Off-White", hex: "#F6F8FA", varName: "--fhe-off-white", contrast: "—" },
  ];
  const neutrals = [
    ["0", "#FFFFFF"], ["25", "#FAFBFC"], ["50", "#F4F6F8"], ["100", "#E7EBF0"],
    ["200", "#D4DAE2"], ["300", "#B6BFCC"], ["400", "#8C97A8"], ["500", "#69748A"],
    ["600", "#4D5870"], ["700", "#353F55"], ["800", "#1F2940"], ["900", "#0F172E"],
  ];
  const semantic = [
    { name: "Success", hex: "#12B76A", note: "Eligibility confirmed, application submitted" },
    { name: "Warning", hex: "#F79009", note: "Documents required, expiring window" },
    { name: "Error", hex: "#EF4444", note: "Compliance issue, rejected document" },
    { name: "Info", hex: "#2563EB", note: "Informational notice, system status" },
  ];

  return (
    <section className="ds-section" id="color">
      <div className="ds-shell">
        <SectionHeader label="02 — Color" title="A trusted, sky-rooted palette">
          Navy carries authority and reliability; medium and light blues create approachable trust and movement; off-white and a calibrated cool gray ramp keep dense agent UIs readable. Semantic colors are reserved for state — never decoration.
        </SectionHeader>

        <h4 className="ds-subsection-title">Core brand</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {brand.map((c) => <SwatchTile key={c.name} {...c} />)}
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 40 }}>Neutral ramp</h4>
        <div className="panel" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(12, 1fr)" }}>
          {neutrals.map(([n, hex]) => (
            <div key={n} style={{ background: hex, padding: "32px 8px 12px", borderRight: "1px solid rgba(11,29,58,0.04)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: parseInt(n) >= 400 ? "#fff" : "var(--n-700)" }}>{hex}</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 13, fontWeight: 600, color: parseInt(n) >= 400 ? "#fff" : "var(--fhe-navy)", marginTop: 4 }}>{n}</div>
            </div>
          ))}
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 40 }}>Semantic</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {semantic.map((s) => (
            <div key={s.name} className="panel" style={{ overflow: "hidden" }}>
              <div style={{ background: s.hex, height: 80 }} />
              <div style={{ padding: 16 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, color: "var(--fhe-navy)" }}>{s.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--n-500)" }}>{s.hex}</div>
                <p style={{ fontSize: 12.5, color: "var(--n-600)", margin: "8px 0 0", lineHeight: 1.5 }}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 40 }}>Accessibility & combinations</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { bg: "var(--fhe-navy)", fg: "#fff", note: "Primary button, dark sections", ratio: "16.4 : 1 ✓ AAA" },
            { bg: "var(--fhe-blue)", fg: "#fff", note: "Secondary CTA, links on light", ratio: "5.1 : 1 ✓ AA" },
            { bg: "var(--fhe-soft-blue)", fg: "var(--fhe-navy)", note: "Notice tiles, badges", ratio: "13.8 : 1 ✓ AAA" },
          ].map((c, i) => (
            <div key={i} style={{ background: c.bg, color: c.fg, padding: 28, borderRadius: 12 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 24, lineHeight: 1.2 }}>Coverage you can trust.</div>
              <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 12 }}>{c.note}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, marginTop: 16, opacity: 0.85 }}>{c.ratio}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
window.FoundationColor = FoundationColor;

/* ---------------- Typography ---------------- */
const FoundationType = () => {
  const scale = [
    { token: "display", size: 64, lh: 1.02, tracking: "-0.025em", weight: 600, sample: "Coverage made simple." },
    { token: "h1", size: 44, lh: 1.08, tracking: "-0.02em", weight: 600, sample: "Find the right plan" },
    { token: "h2", size: 32, lh: 1.15, tracking: "-0.015em", weight: 600, sample: "Talk to a licensed agent" },
    { token: "h3", size: 24, lh: 1.2, tracking: "-0.01em", weight: 600, sample: "Open enrollment guidance" },
    { token: "h4", size: 18, lh: 1.3, tracking: "-0.005em", weight: 600, sample: "Quick eligibility check" },
    { token: "body-lg", size: 17, lh: 1.6, tracking: "0", weight: 400, sample: "We help you compare options and enroll with confidence — no jargon, no pressure.", body: true },
    { token: "body", size: 15, lh: 1.55, tracking: "0", weight: 400, sample: "A licensed agent will walk you through your coverage options at no cost.", body: true },
    { token: "small", size: 13, lh: 1.5, tracking: "0", weight: 400, sample: "Plans vary by state. Eligibility and benefits are subject to plan terms.", body: true },
    { token: "micro", size: 11.5, lh: 1.45, tracking: "0.04em", weight: 600, sample: "ENROLLMENT WINDOW", body: true, upper: true },
  ];
  return (
    <section className="ds-section" id="type">
      <div className="ds-shell">
        <SectionHeader label="03 — Typography" title="Poppins for headlines, Inter for everything else">
          Poppins SemiBold sets a confident, modern voice for headlines and key messaging. Inter handles body, forms, and dense UI where its higher x-height and tabular figures shine. Minimum body size is 15px on web; 13px reserved for legal/footnotes only.
        </SectionHeader>

        <div className="panel panel-pad">
          {scale.map((row) => (
            <div key={row.token} style={{
              display: "grid", gridTemplateColumns: "120px 1fr 220px",
              alignItems: "baseline", gap: 24,
              padding: "18px 0", borderTop: "1px dashed var(--n-100)"
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--fhe-blue)", fontWeight: 600 }}>{row.token}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--n-500)" }}>{row.size}px / {row.lh}</div>
              </div>
              <div style={{
                fontFamily: row.body ? "var(--font-body)" : "var(--font-head)",
                fontSize: row.size, lineHeight: row.lh, fontWeight: row.weight,
                letterSpacing: row.tracking, color: "var(--fhe-navy)",
                textTransform: row.upper ? "uppercase" : "none",
              }}>{row.sample}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--n-500)", textAlign: "right" }}>
                {row.body ? "Inter" : "Poppins"} · {row.weight} · {row.tracking}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="panel panel-pad" style={{ background: "var(--fhe-navy)", color: "#fff" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 12, color: "var(--fhe-light-blue)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Headline · Poppins</div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 56, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 8 }}>
              Aa Bb Cc 1234567890
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 14, marginTop: 16, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>0123456789 · ! ? & @ % $ #
            </div>
          </div>
          <div className="panel panel-pad">
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11.5, color: "var(--fhe-blue)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Body · Inter</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 22, marginTop: 8, color: "var(--fhe-navy)", fontFeatureSettings: "'tnum'" }}>
              Aa Bb Cc 1234567890
            </div>
            <p style={{ fontSize: 14, color: "var(--n-700)", marginTop: 14, lineHeight: 1.65, maxWidth: "44ch" }}>
              We're a licensed enrollment agency that helps you understand your coverage options, compare plans, and enroll with a real person — not a chatbot.
            </p>
            <div style={{ display: "flex", gap: 24, marginTop: 16, fontSize: 12, color: "var(--n-500)", fontFamily: "var(--font-mono)" }}>
              <span>Regular 400</span><span>Medium 500</span><span style={{ fontWeight: 600 }}>SemiBold 600</span><span style={{ fontWeight: 700 }}>Bold 700</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.FoundationType = FoundationType;

/* ---------------- Spacing, radii, shadows ---------------- */
const FoundationSpacing = () => (
  <section className="ds-section" id="spacing">
    <div className="ds-shell">
      <SectionHeader label="04 — Spacing & Surfaces" title="A 4px grid; gentle radii; layered shadows">
        Spacing follows a 4px base. Use the tokens, not arbitrary values. Radii skew small for forms (6–8px) and larger for marketing surfaces (12–20px). Shadows are tinted navy and stay subtle — we lean on borders and tone shifts before elevation.
      </SectionHeader>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16 }}>
        <div className="panel panel-pad">
          <h4 className="ds-subsection-title">Spacing scale</h4>
          {[["s-1", 4], ["s-2", 8], ["s-3", 12], ["s-4", 16], ["s-5", 20], ["s-6", 24], ["s-8", 32], ["s-10", 40], ["s-12", 48], ["s-16", 64]].map(([t, n]) => (
            <div key={t} style={{ display: "grid", gridTemplateColumns: "70px 50px 1fr", alignItems: "center", gap: 12, padding: "8px 0", borderTop: "1px dashed var(--n-100)" }}>
              <span className="code">{t}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--n-500)" }}>{n}px</span>
              <div style={{ height: 10, width: n * 2.4, background: "var(--fhe-soft-blue)", borderRadius: 4, borderLeft: "2px solid var(--fhe-blue)" }} />
            </div>
          ))}
        </div>

        <div className="panel panel-pad">
          <h4 className="ds-subsection-title">Radii</h4>
          {[["xs", 4, "Tags, code"], ["sm", 6, "Inputs, chips"], ["md", 8, "Buttons"], ["lg", 12, "Cards"], ["xl", 16, "Marketing"], ["2xl", 20, "Heroes"]].map(([t, n, u]) => (
            <div key={t} style={{ display: "grid", gridTemplateColumns: "60px 1fr 50px", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px dashed var(--n-100)" }}>
              <span className="code">r-{t}</span>
              <div style={{ height: 28, background: "var(--fhe-soft-blue)", border: "1px solid var(--fhe-light-blue)", borderRadius: n }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--n-500)", textAlign: "right" }}>{u}</span>
            </div>
          ))}
        </div>

        <div className="panel panel-pad">
          <h4 className="ds-subsection-title">Shadows</h4>
          {[
            { t: "xs", desc: "Hairline · 1px lift" },
            { t: "sm", desc: "Cards · default" },
            { t: "md", desc: "Popovers" },
            { t: "lg", desc: "Modals, dropdowns" },
            { t: "xl", desc: "Drawers, overlays" },
          ].map((s) => (
            <div key={s.t} style={{ padding: "14px 0", borderTop: "1px dashed var(--n-100)", display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, alignItems: "center" }}>
              <span className="code">sh-{s.t}</span>
              <div style={{ background: "#fff", padding: 14, borderRadius: 10, boxShadow: `var(--shadow-${s.t})`, fontSize: 12, color: "var(--n-500)" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
window.FoundationSpacing = FoundationSpacing;

/* ---------------- Iconography ---------------- */
const FoundationIcons = () => {
  const groups = [
    { name: "Healthcare & coverage", items: ["shieldcheck", "stethoscope", "pill", "heartbeat", "piggy", "doc-search", "id-card"] },
    { name: "People & contact", items: ["user", "users", "user-plus", "phone", "phone-incoming", "mail", "chat"] },
    { name: "Workflow", items: ["calendar", "clock", "doc", "upload", "download", "list", "inbox", "flag"] },
    { name: "Status & UI", items: ["check-circle", "x-circle", "info", "alert", "bell", "search", "filter", "settings"] },
  ];
  return (
    <section className="ds-section" id="icons">
      <div className="ds-shell">
        <SectionHeader label="05 — Iconography" title="Outline, 1.6px stroke, rounded">
          A consistent line family at 24×24, 1.6px stroke, rounded caps and joins. Avoid filled glyphs except for status (check-circle filled = success on dark). Pair icons with text whenever possible — never let an icon carry meaning alone.
        </SectionHeader>

        <div className="panel panel-pad">
          {groups.map((g) => (
            <div key={g.name} style={{ marginTop: 8 }}>
              <h4 className="ds-subsection-title">{g.name}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                {g.items.map((n) => (
                  <div key={n} style={{ border: "1px solid var(--n-100)", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "var(--n-25)" }}>
                    <Icon name={n} size={26} color="var(--fhe-navy)" />
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--n-500)" }}>{n}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h4 className="ds-subsection-title" style={{ marginTop: 32 }}>Sizes & color</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "16px 0" }}>
            {[14, 16, 20, 24, 32, 40].map((s) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Icon name="shieldcheck" size={s} color="var(--fhe-navy)" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--n-500)" }}>{s}px</span>
              </div>
            ))}
            <div style={{ width: 1, alignSelf: "stretch", background: "var(--n-100)" }} />
            {[
              ["var(--fhe-navy)", "navy"],
              ["var(--fhe-blue)", "blue"],
              ["var(--n-500)", "n-500"],
              ["var(--success-500)", "success"],
              ["var(--error-500)", "error"],
            ].map(([c, n]) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Icon name="check-circle" size={28} color={c} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--n-500)" }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
window.FoundationIcons = FoundationIcons;
