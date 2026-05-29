// ----- Core components: buttons, forms, badges, alerts, tabs, etc -----

/* Buttons */
const Btn = ({ variant = "primary", size = "md", icon, iconRight, children, full, disabled, ...rest }) => {
  const base = {
    fontFamily: "var(--font-body)", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent", borderRadius: "var(--r-md)",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    transition: "background 120ms, color 120ms, border 120ms, box-shadow 120ms",
    width: full ? "100%" : "auto",
    opacity: disabled ? 0.55 : 1, textDecoration: "none", whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 13, height: 32 },
    md: { padding: "10px 16px", fontSize: 14, height: 40 },
    lg: { padding: "14px 22px", fontSize: 15, height: 48 },
  };
  const variants = {
    primary: { background: "var(--fhe-navy)", color: "#fff" },
    secondary: { background: "var(--fhe-light-blue)", color: "var(--fhe-navy)" },
    blue: { background: "var(--fhe-blue)", color: "#fff" },
    outline: { background: "#fff", color: "var(--fhe-blue)", border: "1px solid var(--fhe-blue)" },
    ghost: { background: "transparent", color: "var(--fhe-navy)" },
    danger: { background: "var(--error-500)", color: "#fff" },
    subtle: { background: "var(--fhe-soft-blue)", color: "var(--fhe-navy)" },
  };
  return (
    <button disabled={disabled} {...rest} style={{ ...base, ...sizes[size], ...variants[variant], ...(rest.style||{}) }}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : 16} />}
    </button>
  );
};
window.Btn = Btn;

const ComponentsButtons = () => (
  <section className="ds-section" id="buttons">
    <div className="ds-shell">
      <SectionHeader label="06 — Buttons" title="Primary navy, secondary light blue, outline link">
        Navy is the dominant CTA — use one per surface. Light blue is for secondary support actions ("Speak with a licensed agent"). Outline buttons stay restrained — for tertiary actions inside dense UI. Never stack two navy CTAs side-by-side.
      </SectionHeader>

      <div className="panel panel-pad">
        <h4 className="ds-subsection-title">Variants</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Btn variant="primary">Get started today</Btn>
          <Btn variant="secondary">Speak with an agent</Btn>
          <Btn variant="blue">Compare plans</Btn>
          <Btn variant="outline">Learn more</Btn>
          <Btn variant="ghost" iconRight="arrow-right">View details</Btn>
          <Btn variant="subtle" icon="phone">(800) 123-4567</Btn>
          <Btn variant="danger" icon="alert">End session</Btn>
          <Btn variant="primary" disabled>Disabled</Btn>
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 32 }}>Sizes</h4>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Btn size="sm" variant="primary">Small</Btn>
          <Btn size="md" variant="primary">Medium</Btn>
          <Btn size="lg" variant="primary" icon="shieldcheck">Large with icon</Btn>
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 32 }}>Button groups</h4>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", borderRadius: 8, overflow: "hidden", border: "1px solid var(--n-200)" }}>
            {["All", "Active", "Pending", "Closed"].map((l, i) => (
              <button key={l} style={{
                padding: "8px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer",
                background: i === 1 ? "var(--fhe-navy)" : "#fff",
                color: i === 1 ? "#fff" : "var(--n-700)",
                border: "none", borderRight: i < 3 ? "1px solid var(--n-200)" : "none",
                fontFamily: "var(--font-body)"
              }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "inline-flex", gap: 4, padding: 4, background: "var(--n-50)", borderRadius: 8 }}>
            {["Day", "Week", "Month"].map((l, i) => (
              <button key={l} style={{
                padding: "6px 12px", fontSize: 13, fontWeight: 500, cursor: "pointer",
                background: i === 1 ? "#fff" : "transparent",
                boxShadow: i === 1 ? "var(--shadow-xs)" : "none",
                color: "var(--n-700)", border: "none", borderRadius: 6, fontFamily: "var(--font-body)"
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
window.ComponentsButtons = ComponentsButtons;

/* Forms */
const Field = ({ label, hint, required, error, children }) => (
  <label style={{ display: "block" }}>
    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--n-700)", marginBottom: 6 }}>
      {label}{required && <span style={{ color: "var(--error-500)" }}> *</span>}
    </div>
    {children}
    {error
      ? <div style={{ fontSize: 12, color: "var(--error-700)", marginTop: 6 }}>{error}</div>
      : hint ? <div style={{ fontSize: 12, color: "var(--n-500)", marginTop: 6 }}>{hint}</div> : null}
  </label>
);

const inputStyle = (state = "default") => ({
  width: "100%", height: 40, padding: "0 12px",
  border: `1px solid ${state === "error" ? "var(--error-500)" : state === "focus" ? "var(--fhe-blue)" : "var(--n-200)"}`,
  borderRadius: "var(--r-sm)", background: "#fff", fontFamily: "var(--font-body)", fontSize: 14,
  color: "var(--n-800)", outline: "none",
  boxShadow: state === "focus" ? "var(--shadow-focus)" : "none",
});

const ComponentsForms = () => (
  <section className="ds-section" id="forms">
    <div className="ds-shell">
      <SectionHeader label="07 — Forms" title="Clear labels, generous targets, honest errors">
        Always pair labels with inputs (no placeholder-as-label). Error states use red text plus a leading icon — never color alone. Hit targets are 40px standard, 48px on mobile. Required fields are marked with an asterisk in red.
      </SectionHeader>

      <div className="panel panel-pad">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Field label="Full name" required>
            <input style={inputStyle()} defaultValue="Jessica Morgan" />
          </Field>
          <Field label="ZIP code" required hint="We'll show plans available in your area.">
            <input style={inputStyle("focus")} defaultValue="78701" />
          </Field>
          <Field label="Email">
            <div style={{ position: "relative" }}>
              <Icon name="mail" size={16} color="var(--n-400)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input style={{ ...inputStyle(), paddingLeft: 38 }} defaultValue="jessica@example.com" />
            </div>
          </Field>
          <Field label="Date of birth" error="Please enter a valid date.">
            <input style={inputStyle("error")} defaultValue="13/45/1985" />
          </Field>
          <Field label="Coverage type">
            <select style={inputStyle()}>
              <option>Individual</option><option>Family</option><option>Medicare</option>
            </select>
          </Field>
          <Field label="Notes" hint="Visible to your assigned agent only.">
            <textarea style={{ ...inputStyle(), height: 88, padding: 10, resize: "vertical" }} defaultValue="Looking for a plan that covers my regular cardiologist." />
          </Field>
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 32 }}>Selection controls</h4>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Individual & family", "Medicare Advantage", "Short-term"].map((l, i) => (
              <label key={l} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--n-700)" }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 9,
                  border: `2px solid ${i === 0 ? "var(--fhe-blue)" : "var(--n-300)"}`,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: "#fff"
                }}>
                  {i === 0 && <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--fhe-blue)" }} />}
                </span>
                {l}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Dental", "Vision", "Prescription savings"].map((l, i) => (
              <label key={l} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--n-700)" }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 4,
                  border: `2px solid ${i < 2 ? "var(--fhe-blue)" : "var(--n-300)"}`,
                  background: i < 2 ? "var(--fhe-blue)" : "#fff",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  {i < 2 && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
                </span>
                {l}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 14, color: "var(--n-700)" }}>SMS reminders</span>
            <span style={{ width: 36, height: 22, background: "var(--fhe-blue)", borderRadius: 11, position: "relative", cursor: "pointer" }}>
              <span style={{ width: 18, height: 18, background: "#fff", borderRadius: 9, position: "absolute", top: 2, left: 16, boxShadow: "var(--shadow-xs)" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
window.ComponentsForms = ComponentsForms;

/* Badges, alerts, tooltips, breadcrumbs, pagination, tabs, accordion, toast */
const Badge = ({ tone = "neutral", icon, children }) => {
  const tones = {
    neutral: { bg: "var(--n-50)", fg: "var(--n-700)", bd: "var(--n-200)" },
    info: { bg: "var(--info-50)", fg: "var(--info-700)", bd: "#C7DBFB" },
    success: { bg: "var(--success-50)", fg: "var(--success-700)", bd: "#A6F4C5" },
    warning: { bg: "var(--warning-50)", fg: "var(--warning-700)", bd: "#FEDF89" },
    error: { bg: "var(--error-50)", fg: "var(--error-700)", bd: "#FECDCA" },
    navy: { bg: "var(--fhe-navy)", fg: "#fff", bd: "var(--fhe-navy)" },
    soft: { bg: "var(--fhe-soft-blue)", fg: "var(--fhe-navy)", bd: "#C7DBFB" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", fontSize: 11.5, fontWeight: 600,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      borderRadius: 999, fontFamily: "var(--font-body)", letterSpacing: "0.01em",
    }}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
};
window.Badge = Badge;

const Alert = ({ tone = "info", title, children, action }) => {
  const palette = {
    info: { bg: "var(--info-50)", bd: "#C7DBFB", fg: "var(--info-700)", icon: "info" },
    success: { bg: "var(--success-50)", bd: "#A6F4C5", fg: "var(--success-700)", icon: "check-circle" },
    warning: { bg: "var(--warning-50)", bd: "#FEDF89", fg: "var(--warning-700)", icon: "alert" },
    error: { bg: "var(--error-50)", bd: "#FECDCA", fg: "var(--error-700)", icon: "x-circle" },
  };
  const p = palette[tone];
  return (
    <div style={{ background: p.bg, border: `1px solid ${p.bd}`, borderRadius: 10, padding: 16, display: "flex", gap: 12 }}>
      <Icon name={p.icon} size={20} color={p.fg} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: p.fg }}>{title}</div>
        <div style={{ fontSize: 13.5, color: "var(--n-700)", marginTop: 4, lineHeight: 1.5 }}>{children}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
window.Alert = Alert;

const ComponentsBadgesAlerts = () => (
  <section className="ds-section" id="badges">
    <div className="ds-shell">
      <SectionHeader label="08 — Badges & Alerts" title="State, never decoration">
        Badges classify rows in tables, lead status, and policy state. Alerts only appear when there's a real next step or compliance signal — they should always be dismissable or actionable.
      </SectionHeader>

      <div className="panel panel-pad">
        <h4 className="ds-subsection-title">Badges</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Badge tone="success" icon="check-circle">Enrolled</Badge>
          <Badge tone="warning" icon="clock">Docs needed</Badge>
          <Badge tone="error" icon="alert">Compliance</Badge>
          <Badge tone="info" icon="info">In review</Badge>
          <Badge tone="neutral">Lead</Badge>
          <Badge tone="navy">Priority</Badge>
          <Badge tone="soft">Open enrollment</Badge>
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 28 }}>Alerts</h4>
        <div style={{ display: "grid", gap: 12 }}>
          <Alert tone="info" title="Open enrollment ends Jan 15" action={<Btn size="sm" variant="ghost" iconRight="arrow-right">Review options</Btn>}>
            Eligible members can still adjust 2026 coverage before the deadline.
          </Alert>
          <Alert tone="success" title="Application submitted">
            Carrier confirmation usually arrives within 2 business days. We'll notify you here.
          </Alert>
          <Alert tone="warning" title="Two documents required" action={<Btn size="sm" variant="outline">Upload</Btn>}>
            Proof of income and a copy of your government-issued ID are needed to complete this application.
          </Alert>
          <Alert tone="error" title="Compliance review flagged">
            This call recording was flagged for missing the licensed-agent disclosure. Reassign or escalate within 24 hours.
          </Alert>
        </div>

        <h4 className="ds-subsection-title" style={{ marginTop: 28 }}>Toasts</h4>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { t: "success", title: "Lead saved", body: "Assigned to Maya Chen.", icon: "check-circle" },
            { t: "info", title: "Recording uploaded", body: "Compliance review queued.", icon: "info" },
            { t: "error", title: "Couldn't sync", body: "Retrying in 30s.", icon: "x-circle" },
          ].map((t) => (
            <div key={t.t} style={{
              background: "#fff", border: "1px solid var(--n-100)",
              borderLeft: `3px solid var(--${t.t}-500)`,
              borderRadius: 10, padding: "12px 14px",
              boxShadow: "var(--shadow-md)", display: "flex", gap: 10, minWidth: 280,
            }}>
              <Icon name={t.icon} size={18} color={`var(--${t.t}-500)`} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--fhe-navy)" }}>{t.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--n-600)", marginTop: 2 }}>{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
window.ComponentsBadgesAlerts = ComponentsBadgesAlerts;

/* Nav patterns: tabs, breadcrumb, pagination, accordion, tooltip */
const ComponentsNav = () => {
  const [tab, setTab] = React.useState(1);
  const [open, setOpen] = React.useState(0);
  const faq = [
    { q: "Is First Health Enrollment an insurance carrier?", a: "No. We're a licensed enrollment agency. We help you compare and enroll in plans from carriers we're contracted with — at no cost to you." },
    { q: "Will I speak with a real, licensed agent?", a: "Yes. Every enrollment is supported by a state-licensed agent. We'll always identify ourselves and confirm your consent before recording." },
    { q: "Can I change my plan after I enroll?", a: "Most plans allow changes during open enrollment or after a qualifying life event. Your agent will review your specific options with you." },
  ];
  return (
    <section className="ds-section" id="nav">
      <div className="ds-shell">
        <SectionHeader label="09 — Navigation" title="Tabs, breadcrumbs, pagination, accordion">
          Navigation patterns are quiet and reliable. Active states use navy underlines or solid fills, never bright color shifts. Disclosure is preferred over hidden tabs in dense agent UI — agents should always see counts and statuses.
        </SectionHeader>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          <div className="panel panel-pad">
            <h4 className="ds-subsection-title">Tabs</h4>
            <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--n-100)" }}>
              {["Overview", "Documents", "Communications", "Policy"].map((l, i) => (
                <button key={l} onClick={() => setTab(i)} style={{
                  background: "none", border: "none", padding: "12px 0",
                  borderBottom: tab === i ? "2px solid var(--fhe-navy)" : "2px solid transparent",
                  color: tab === i ? "var(--fhe-navy)" : "var(--n-500)",
                  fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-body)",
                  marginBottom: -1, display: "inline-flex", alignItems: "center", gap: 8
                }}>
                  {l}
                  {i === 1 && <Badge tone="warning">2</Badge>}
                </button>
              ))}
            </div>
            <div style={{ padding: "20px 0 4px", color: "var(--n-600)", fontSize: 14 }}>
              {tab === 0 && "Lead profile, eligibility, and current plan summary."}
              {tab === 1 && "Two documents are pending agent review."}
              {tab === 2 && "Call history, SMS, and email threads with this lead."}
              {tab === 3 && "Active policy, premium schedule, and renewal date."}
            </div>

            <h4 className="ds-subsection-title" style={{ marginTop: 24 }}>Breadcrumb</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--n-500)" }}>
              <a style={{ color: "var(--n-500)", textDecoration: "none" }}>Leads</a>
              <Icon name="chevron" size={12} color="var(--n-300)" />
              <a style={{ color: "var(--n-500)", textDecoration: "none" }}>Open enrollment 2026</a>
              <Icon name="chevron" size={12} color="var(--n-300)" />
              <span style={{ color: "var(--fhe-navy)", fontWeight: 600 }}>Jessica Morgan</span>
            </div>

            <h4 className="ds-subsection-title" style={{ marginTop: 24 }}>Pagination</h4>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--n-500)" }}>Showing <strong style={{ color: "var(--fhe-navy)" }}>1–25</strong> of 4,218 leads</span>
              <div style={{ display: "flex", gap: 4 }}>
                {["‹", "1", "2", "3", "…", "169", "›"].map((p, i) => (
                  <button key={i} style={{
                    minWidth: 32, height: 32, padding: "0 10px",
                    border: "1px solid var(--n-200)",
                    background: p === "2" ? "var(--fhe-navy)" : "#fff",
                    color: p === "2" ? "#fff" : "var(--n-700)",
                    borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer",
                    fontFamily: "var(--font-body)"
                  }}>{p}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="panel panel-pad">
            <h4 className="ds-subsection-title">Accordion (FAQ)</h4>
            <div>
              {faq.map((f, i) => (
                <div key={i} style={{ borderTop: "1px solid var(--n-100)" }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px 0", background: "none", border: "none", cursor: "pointer",
                    fontSize: 14.5, fontWeight: 600, color: "var(--fhe-navy)", textAlign: "left",
                    fontFamily: "var(--font-body)"
                  }}>
                    {f.q}
                    <Icon name="chev-down" size={16} color="var(--n-500)" style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms" }} />
                  </button>
                  {open === i && <div style={{ paddingBottom: 16, fontSize: 13.5, color: "var(--n-600)", lineHeight: 1.6 }}>{f.a}</div>}
                </div>
              ))}
            </div>

            <h4 className="ds-subsection-title" style={{ marginTop: 24 }}>Tooltip</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, background: "var(--n-25)", borderRadius: 8, position: "relative" }}>
              <span style={{ fontSize: 14, color: "var(--n-700)" }}>Eligibility</span>
              <Icon name="info" size={14} color="var(--n-400)" />
              <div style={{
                position: "absolute", left: 100, top: -4,
                background: "var(--fhe-navy)", color: "#fff", fontSize: 12,
                padding: "8px 10px", borderRadius: 6, maxWidth: 220, lineHeight: 1.5,
                boxShadow: "var(--shadow-md)"
              }}>
                Determined by household size, income, and state of residence.
                <span style={{ position: "absolute", left: -5, top: 12, width: 10, height: 10, background: "var(--fhe-navy)", transform: "rotate(45deg)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.ComponentsNav = ComponentsNav;
