// ----- Applied templates: marketing email, landing hero, letterhead, dashboard, voice/tone -----

/* ---------- Email template ---------- */
const EmailTemplate = () => (
  <div style={{ background: "var(--n-100)", padding: 24, borderRadius: 12 }}>
    <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "var(--shadow-sm)", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #E7EBF0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src="assets/fhe-logo.png" alt="First Health Enrollment" style={{ height: 28 }} />
        <a style={{ fontSize: 12, color: "#2563EB", textDecoration: "none" }}>View in browser</a>
      </div>

      {/* Hero */}
      <div style={{ padding: "32px 24px 24px", background: "linear-gradient(180deg, #E8F1FF 0%, #fff 80%)" }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.12em", background: "#fff", padding: "4px 10px", borderRadius: 999 }}>Open Enrollment · 2026</span>
        <h1 style={{ fontFamily: "Poppins, Arial, sans-serif", fontSize: 30, lineHeight: 1.15, color: "#0B1D3A", margin: "14px 0 8px", fontWeight: 600, letterSpacing: "-0.02em" }}>
          Affordable coverage options for your family
        </h1>
        <p style={{ fontSize: 15, color: "#4D5870", lineHeight: 1.6, margin: "0 0 20px" }}>
          Talk with a licensed agent — at no cost — to compare plans available in your ZIP code and enroll with confidence.
        </p>
        <a style={{ display: "inline-block", background: "#0B1D3A", color: "#fff", padding: "12px 22px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Get started today</a>
        <a style={{ display: "inline-block", color: "#2563EB", padding: "12px 16px", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Speak with an agent →</a>
      </div>

      {/* Benefits */}
      <div style={{ padding: 24, borderTop: "1px solid #E7EBF0" }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              {[
                { i: "stethoscope", t: "Doctor visits", d: "Care when you need it." },
                { i: "pill", t: "Prescriptions", d: "Save on medications." },
                { i: "piggy", t: "Real savings", d: "Lower costs each month." },
              ].map((c, i) => (
                <td key={i} valign="top" style={{ width: "33%", padding: "0 8px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#E8F1FF", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <Icon name={c.i} size={22} color="#0B1D3A" />
                  </div>
                  <div style={{ fontFamily: "Poppins, Arial, sans-serif", fontWeight: 600, fontSize: 14, color: "#0B1D3A" }}>{c.t}</div>
                  <div style={{ fontSize: 12.5, color: "#69748A", marginTop: 4 }}>{c.d}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA block */}
      <div style={{ padding: 24, background: "#F4F6F8", borderTop: "1px solid #E7EBF0", textAlign: "center" }}>
        <div style={{ fontFamily: "Poppins, Arial, sans-serif", fontSize: 16, color: "#0B1D3A", fontWeight: 600 }}>Have questions about your options?</div>
        <div style={{ fontSize: 13.5, color: "#4D5870", margin: "6px 0 12px" }}>A licensed agent is standing by.</div>
        <a style={{ display: "inline-block", background: "#9EC5FF", color: "#0B1D3A", padding: "10px 18px", borderRadius: 8, textDecoration: "none", fontSize: 13.5, fontWeight: 600 }}>Speak with an agent</a>
      </div>

      {/* Footer */}
      <div style={{ padding: "20px 24px", background: "#0B1D3A", color: "rgba(255,255,255,0.75)", fontSize: 11.5, lineHeight: 1.6 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <img src="assets/fhe-logo.png" alt="" style={{ height: 18, filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", gap: 10 }}>
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <span key={s} style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
            ))}
          </div>
        </div>
        <div>First Health Enrollment is a licensed health insurance enrollment agency. We do not underwrite or issue policies. Plan availability and benefits vary by state and carrier.</div>
        <div style={{ marginTop: 10, fontSize: 11 }}>
          123 Wellness Way, Suite 200 · Austin, TX 78701 ·{" "}
          <a style={{ color: "#9EC5FF" }}>Privacy</a> ·{" "}
          <a style={{ color: "#9EC5FF" }}>Terms</a> ·{" "}
          <a style={{ color: "#9EC5FF" }}>Unsubscribe</a>
        </div>
      </div>
    </div>
  </div>
);

/* ---------- Landing page hero ---------- */
const LandingHero = () => (
  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--n-100)" }}>
    {/* Site header */}
    <div style={{ background: "#fff", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--n-100)" }}>
      <img src="assets/fhe-logo.png" alt="" style={{ height: 24 }} />
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {["Plans", "How it works", "About", "Resources"].map((l) => (
          <a key={l} style={{ fontSize: 13.5, color: "var(--n-700)", textDecoration: "none", fontWeight: 500 }}>{l}</a>
        ))}
        <Btn size="sm" variant="ghost" icon="phone">(800) 123-4567</Btn>
        <Btn size="sm" variant="primary">Get started</Btn>
      </div>
    </div>

    {/* Hero */}
    <div style={{
      padding: "64px 48px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center",
      background: "linear-gradient(135deg, #fff 0%, #E8F1FF 100%)", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", right: -80, top: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(158,197,255,0.35)", filter: "blur(8px)" }} />
      <div style={{ position: "relative" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "var(--fhe-blue)", background: "#fff", padding: "6px 12px", borderRadius: 999, border: "1px solid #C7DBFB" }}>
          <Icon name="shieldcheck" size={13} /> Licensed in 47 states
        </span>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: 56, lineHeight: 1.05, color: "var(--fhe-navy)", margin: "16px 0 14px", fontWeight: 600, letterSpacing: "-0.025em" }}>
          Health coverage,<br/>
          <span style={{ color: "var(--fhe-blue)" }}>made simple.</span>
        </h1>
        <p style={{ fontSize: 17, color: "var(--n-600)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: "44ch" }}>
          Compare plans from trusted carriers and enroll with a real, licensed agent — at no cost. Clear next steps, no pressure, no surprise charges.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <Btn variant="primary" size="lg" iconRight="arrow-right">Find my plan</Btn>
          <Btn variant="outline" size="lg" icon="phone">Talk to an agent</Btn>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(11,29,58,0.08)" }}>
          {[
            { v: "120k+", l: "Members enrolled" },
            { v: "4.9★", l: "Avg agent rating" },
            { v: "$0", l: "To work with us" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 600, color: "var(--fhe-navy)" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "var(--n-500)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        {/* Quote card */}
        <div className="panel" style={{ padding: 24, position: "relative", zIndex: 2, background: "#fff" }}>
          <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Plan match</div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 18, color: "var(--fhe-navy)", marginTop: 4 }}>BlueShield Bronze HSA</div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <Badge tone="success" icon="check-circle">Includes dental</Badge>
            <Badge tone="soft">$0 telehealth</Badge>
          </div>
          <div style={{ marginTop: 14, padding: "14px 0", borderTop: "1px dashed var(--n-100)", borderBottom: "1px dashed var(--n-100)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Estimated</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 600, color: "var(--fhe-navy)" }}>$284<span style={{ fontSize: 14, color: "var(--n-500)", fontWeight: 400 }}>/mo</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Deductible</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 600, color: "var(--fhe-navy)" }}>$3,500</div>
            </div>
          </div>
          <Btn full variant="primary" iconRight="arrow-right">Continue with this plan</Btn>
          <div style={{ fontSize: 11, color: "var(--n-400)", marginTop: 10, textAlign: "center" }}>Estimate based on ZIP 78701, household of 4.</div>
        </div>
        <div style={{ position: "absolute", inset: 18, background: "var(--fhe-light-blue)", borderRadius: 16, transform: "rotate(2deg)", zIndex: 1 }} />
      </div>
    </div>
  </div>
);

/* ---------- Letterhead ---------- */
const Letterhead = () => (
  <div style={{ background: "#fff", border: "1px solid var(--n-100)", borderRadius: 8, padding: 36, fontFamily: "var(--font-body)", aspectRatio: "8.5 / 11", maxWidth: 560, margin: "0 auto", position: "relative", boxShadow: "var(--shadow-sm)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 14, borderBottom: "2px solid var(--fhe-navy)" }}>
      <img src="assets/fhe-logo.png" alt="" style={{ height: 32 }} />
      <div style={{ fontSize: 10.5, color: "var(--n-600)", textAlign: "right", lineHeight: 1.6 }}>
        <div>(555) 123-4567</div>
        <div>info@firsthealthenrollment.com</div>
        <div>123 Wellness Way, Suite 200 · Austin, TX</div>
      </div>
    </div>
    <div style={{ paddingTop: 20, fontSize: 11, color: "var(--n-700)", lineHeight: 1.6 }}>
      <div style={{ color: "var(--n-500)" }}>May 22, 2026</div>
      <div style={{ marginTop: 14 }}>John Smith</div>
      <div>123 Main Street</div>
      <div>Austin, TX 78701</div>
      <div style={{ marginTop: 18 }}>Dear John,</div>
      <p style={{ marginTop: 10, color: "var(--n-700)" }}>
        Thank you for working with First Health Enrollment. Enclosed are your selected plan details and the next steps to complete enrollment. A licensed agent will follow up by phone within 24 hours to confirm your information and answer any questions.
      </p>
      <p style={{ color: "var(--n-700)" }}>
        If anything in this packet looks incorrect, please call us at the number above or reply to your agent's email — we'll fix it before your application is submitted to the carrier.
      </p>
      <p style={{ color: "var(--n-700)" }}>Sincerely,</p>
      <div style={{ fontFamily: "var(--font-head)", fontStyle: "italic", color: "var(--fhe-navy)", marginTop: 6 }}>Jessica Morgan</div>
      <div style={{ color: "var(--n-500)", fontSize: 10 }}>Enrollment Specialist · TX License #12345</div>
    </div>
    <div style={{ position: "absolute", bottom: 24, left: 36, right: 36, textAlign: "center", fontSize: 9, color: "var(--n-400)", borderTop: "1px solid var(--n-100)", paddingTop: 10 }}>
      First Health Enrollment is a licensed health insurance enrollment agency. We do not underwrite or issue policies.
    </div>
    <div style={{ position: "absolute", right: 24, bottom: 80, opacity: 0.06 }}>
      <FHEMark size={140} />
    </div>
  </div>
);

/* ---------- Dashboard preview ---------- */
const DashboardPreview = () => (
  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--n-100)", background: "var(--n-25)" }}>
    {/* Top bar */}
    <div style={{ background: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid var(--n-100)" }}>
      <img src="assets/fhe-logo.png" alt="" style={{ height: 22 }} />
      <div style={{ height: 18, width: 1, background: "var(--n-200)" }} />
      <span style={{ fontSize: 12, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Agent Console</span>
      <div style={{ flex: 1 }} />
      <div style={{ position: "relative", width: 280 }}>
        <Icon name="search" size={14} color="var(--n-400)" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
        <input placeholder="Search leads, policies, documents…" style={{ width: "100%", height: 32, padding: "0 10px 0 32px", border: "1px solid var(--n-200)", borderRadius: 6, fontSize: 12.5, fontFamily: "var(--font-body)", background: "var(--n-25)" }} />
      </div>
      <Btn size="sm" variant="ghost" icon="bell" />
      <Avatar name="MC" size={28} tone="navy" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 540 }}>
      {/* Sidebar */}
      <aside style={{ background: "#fff", borderRight: "1px solid var(--n-100)", padding: 12 }}>
        {[
          { i: "home", l: "Dashboard", active: true },
          { i: "users", l: "Leads", count: 42 },
          { i: "id-card", l: "Customers" },
          { i: "doc", l: "Applications", count: 8 },
          { i: "shieldcheck", l: "Policies" },
          { i: "phone", l: "Calls" },
          { i: "alert", l: "Compliance", count: 2, danger: true },
          { i: "settings", l: "Settings" },
        ].map((m) => (
          <div key={m.l} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
            background: m.active ? "var(--fhe-soft-blue)" : "transparent",
            color: m.active ? "var(--fhe-navy)" : "var(--n-700)",
            borderRadius: 6, fontSize: 13, fontWeight: m.active ? 600 : 500, cursor: "pointer", marginBottom: 2
          }}>
            <Icon name={m.i} size={15} color={m.active ? "var(--fhe-navy)" : "var(--n-500)"} />
            <span style={{ flex: 1 }}>{m.l}</span>
            {m.count != null && (
              <span style={{
                fontSize: 10.5, fontWeight: 700, padding: "1px 6px",
                background: m.danger ? "var(--error-100)" : "var(--n-100)",
                color: m.danger ? "var(--error-700)" : "var(--n-700)",
                borderRadius: 999
              }}>{m.count}</span>
            )}
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Tuesday · April 28</div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 600, color: "var(--fhe-navy)", marginTop: 4 }}>Good morning, Maya.</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" variant="outline" icon="filter">Filter</Btn>
            <Btn size="sm" variant="primary" icon="user-plus">New lead</Btn>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { l: "Open leads", v: "42", d: "+6 this week", t: "success" },
            { l: "In progress", v: "18", d: "Avg 2.4 days", t: "info" },
            { l: "Submitted", v: "11", d: "This month", t: "neutral" },
            { l: "Compliance flags", v: "2", d: "Needs review", t: "warning" },
          ].map((k) => (
            <div key={k.l} className="panel" style={{ padding: 14 }}>
              <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{k.l}</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 600, color: "var(--fhe-navy)", marginTop: 4 }}>{k.v}</div>
              <div style={{ fontSize: 11.5, color: `var(--${k.t}-700, var(--n-500))`, marginTop: 2 }}>{k.d}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--n-100)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontFamily: "var(--font-head)", fontSize: 14, color: "var(--fhe-navy)" }}>Today's queue</strong>
            <div style={{ display: "flex", gap: 4 }}>
              {["All", "Mine", "Unassigned"].map((t, i) => (
                <button key={t} style={{
                  padding: "4px 10px", fontSize: 12, fontWeight: 500, cursor: "pointer", border: "none",
                  background: i === 1 ? "var(--fhe-navy)" : "transparent", color: i === 1 ? "#fff" : "var(--n-600)",
                  borderRadius: 6, fontFamily: "var(--font-body)"
                }}>{t}</button>
              ))}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr style={{ background: "var(--n-25)", color: "var(--n-500)", textAlign: "left", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Lead</th>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Stage</th>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Coverage</th>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Next step</th>
                <th style={{ padding: "10px 16px", fontWeight: 600, textAlign: "right" }}>Last touch</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: "Jessica Morgan", l: "Austin, TX", s: "Documents", b: "warning", c: "Family · ACA", x: "Upload pay stub", t: "3h" },
                { n: "Daniel Park", l: "Phoenix, AZ", s: "In review", b: "info", c: "Individual", x: "Carrier confirmation", t: "1d" },
                { n: "Aaliyah Reed", l: "Tampa, FL", s: "Enrolled", b: "success", c: "Medicare", x: "Welcome packet sent", t: "2d" },
                { n: "Marcus Lin", l: "Boise, ID", s: "Compliance", b: "error", c: "Family", x: "Reassign call REC-44219", t: "5h" },
                { n: "Sara Patel", l: "Atlanta, GA", s: "New lead", b: "neutral", c: "Individual", x: "Schedule consult", t: "20m" },
              ].map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--n-100)" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={r.n.split(" ").map(s=>s[0]).join("")} size={28} tone={i % 2 ? "soft" : "light"} />
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--fhe-navy)" }}>{r.n}</div>
                        <div style={{ fontSize: 11.5, color: "var(--n-500)" }}>{r.l}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}><Badge tone={r.b}>{r.s}</Badge></td>
                  <td style={{ padding: "12px 16px", color: "var(--n-700)" }}>{r.c}</td>
                  <td style={{ padding: "12px 16px", color: "var(--n-800)" }}>{r.x}</td>
                  <td style={{ padding: "12px 16px", color: "var(--n-500)", fontFamily: "var(--font-mono)", textAlign: "right", fontSize: 12 }}>{r.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
);

/* ---------- Voice & tone ---------- */
const VoiceTone = () => {
  const pairs = [
    { yes: "We'll help you compare plans available in your ZIP code.", no: "Lock in your savings before they're gone forever!", reason: "Plain-English; no false scarcity." },
    { yes: "A licensed agent will walk you through your options at no cost.", no: "Get pre-approved instantly with our exclusive partner network.", reason: "We're an enrollment agency, not a carrier. We don't approve coverage." },
    { yes: "Your premium estimate is based on the info you shared.", no: "Guaranteed lowest rate or your money back.", reason: "We don't guarantee pricing or eligibility — that's the carrier." },
    { yes: "Open enrollment ends January 15. We can help today.", no: "⚠️ HURRY! Last chance for 2026 coverage!!!", reason: "Confident urgency, not panic." },
  ];
  return (
    <section className="ds-section" id="voice">
      <div className="ds-shell">
        <SectionHeader label="13 — Voice & Tone" title="Plain-English. Confident. Reassuring.">
          We're a licensed enrollment agency, not a carrier or a hospital. Our voice should reflect that: helpful, factual, calm. We never promise what only a carrier can — eligibility, savings, approval. We always offer a clear next step.
        </SectionHeader>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { t: "Trusted", d: "Backed by licensed agents and clear disclosures." },
            { t: "Clear", d: "No jargon, no buried terms, no surprise fees." },
            { t: "Personal", d: "Real people, by name, who follow through." },
            { t: "Straightforward", d: "One next step, always." },
          ].map((p) => (
            <div key={p.t} className="panel" style={{ padding: 18 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fhe-soft-blue)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon name="shieldcheck" size={15} color="var(--fhe-navy)" />
              </div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 15, color: "var(--fhe-navy)" }}>{p.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--n-600)", marginTop: 4, lineHeight: 1.5 }}>{p.d}</div>
            </div>
          ))}
        </div>

        <div className="panel panel-pad">
          <h4 className="ds-subsection-title">Say this · not that</h4>
          {pairs.map((p, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 220px", gap: 16, padding: "14px 0", borderTop: i ? "1px dashed var(--n-100)" : "none", alignItems: "flex-start" }}>
              <div style={{ background: "var(--success-50)", border: "1px solid #A6F4C5", borderRadius: 8, padding: 12, display: "flex", gap: 10 }}>
                <Icon name="check-circle" size={16} color="var(--success-700)" />
                <div style={{ fontSize: 13.5, color: "var(--n-800)" }}>{p.yes}</div>
              </div>
              <div style={{ background: "var(--error-50)", border: "1px solid #FECDCA", borderRadius: 8, padding: 12, display: "flex", gap: 10 }}>
                <Icon name="x-circle" size={16} color="var(--error-700)" />
                <div style={{ fontSize: 13.5, color: "var(--n-800)" }}>{p.no}</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--n-500)", paddingTop: 4 }}>{p.reason}</div>
            </div>
          ))}

          <h4 className="ds-subsection-title" style={{ marginTop: 28 }}>Approved vocabulary</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["coverage options", "licensed agent", "enrollment support", "plan guidance", "clear next step", "no cost to you", "compare carriers", "qualifying life event", "open enrollment", "premium estimate", "eligibility check"].map((w) => (
              <span key={w} style={{ background: "var(--fhe-soft-blue)", color: "var(--fhe-navy)", padding: "6px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 500 }}>{w}</span>
            ))}
          </div>
          <h4 className="ds-subsection-title" style={{ marginTop: 24 }}>Avoid</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["guaranteed approval", "lowest rate ever", "free money", "Obamacare loophole", "act now or lose it", "government-approved", "limited spots", "exclusive deal", "instant savings"].map((w) => (
              <span key={w} style={{ background: "var(--error-50)", color: "var(--error-700)", padding: "6px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 500, textDecoration: "line-through", textDecorationColor: "rgba(180,35,24,0.4)" }}>{w}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
window.VoiceTone = VoiceTone;

/* ---------- Templates section wrapper ---------- */
const Templates = () => (
  <section className="ds-section" id="templates">
    <div className="ds-shell">
      <SectionHeader label="11 — Applied Templates" title="The system in real use">
        Real surfaces show whether the system is internally consistent. Here are four canonical placements: the marketing email, a marketing landing hero, official letterhead, and the agent dashboard — each built only from the components and tokens above.
      </SectionHeader>

      <h4 className="ds-subsection-title">Marketing email · SendGrid-friendly</h4>
      <EmailTemplate />

      <h4 className="ds-subsection-title" style={{ marginTop: 32 }}>Landing page hero</h4>
      <LandingHero />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16, marginTop: 32 }}>
        <div>
          <h4 className="ds-subsection-title">Letterhead</h4>
          <Letterhead />
        </div>
        <div>
          <h4 className="ds-subsection-title">Agent dashboard</h4>
          <DashboardPreview />
        </div>
      </div>
    </div>
  </section>
);
window.Templates = Templates;
