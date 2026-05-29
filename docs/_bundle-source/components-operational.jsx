// ----- Operational / CRM components: lead card, call status bar, application checklist,
//       document request, compliance alert, agent dashboard, customer profile, policy card -----

const SectionHeader2 = window.SectionHeader;

/* Helpers */
const Avatar = ({ name = "JM", size = 36, tone = "soft" }) => {
  const tones = {
    soft: { bg: "var(--fhe-soft-blue)", fg: "var(--fhe-navy)" },
    blue: { bg: "var(--fhe-blue)", fg: "#fff" },
    navy: { bg: "var(--fhe-navy)", fg: "#fff" },
    light: { bg: "var(--fhe-light-blue)", fg: "var(--fhe-navy)" },
  };
  const t = tones[tone];
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%",
      background: t.bg, color: t.fg,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-head)", fontWeight: 600, fontSize: size * 0.36,
      flexShrink: 0,
    }}>{name}</span>
  );
};
window.Avatar = Avatar;

/* ---------- Lead card ---------- */
const LeadCard = () => (
  <div className="panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ display: "flex", gap: 12 }}>
        <Avatar name="JM" size={44} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <strong style={{ fontFamily: "var(--font-head)", fontSize: 16, color: "var(--fhe-navy)" }}>Jessica Morgan</strong>
            <Badge tone="success" icon="check-circle">Eligible</Badge>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--n-500)", marginTop: 2 }}>Lead · Austin, TX 78701 · Age 34 · Family of 4</div>
        </div>
      </div>
      <button style={{ background: "none", border: "none", cursor: "pointer" }}>
        <Icon name="settings" size={16} color="var(--n-400)" />
      </button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, padding: "12px 0", borderTop: "1px dashed var(--n-100)", borderBottom: "1px dashed var(--n-100)" }}>
      <div><div style={{ fontSize: 10.5, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Source</div><div style={{ fontSize: 13, color: "var(--fhe-navy)", marginTop: 2, fontWeight: 500 }}>Inbound · Web</div></div>
      <div><div style={{ fontSize: 10.5, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Coverage</div><div style={{ fontSize: 13, color: "var(--fhe-navy)", marginTop: 2, fontWeight: 500 }}>Family · ACA</div></div>
      <div><div style={{ fontSize: 10.5, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Last contact</div><div style={{ fontSize: 13, color: "var(--fhe-navy)", marginTop: 2, fontWeight: 500 }}>3h ago</div></div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 6 }}>
        <Btn size="sm" variant="primary" icon="phone">Call</Btn>
        <Btn size="sm" variant="outline" icon="mail">Email</Btn>
        <Btn size="sm" variant="ghost" icon="doc">Notes</Btn>
      </div>
      <span style={{ fontSize: 12, color: "var(--n-500)" }}>Assigned · <strong style={{ color: "var(--fhe-navy)" }}>Maya Chen</strong></span>
    </div>
  </div>
);

/* ---------- Call status bar ---------- */
const CallStatusBar = () => (
  <div style={{
    background: "var(--fhe-navy)", color: "#fff", borderRadius: 12, padding: "12px 16px",
    display: "flex", alignItems: "center", gap: 16, boxShadow: "var(--shadow-md)"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 4px rgba(34,197,94,0.25)" }} />
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>On call</span>
    </div>
    <div style={{ height: 24, width: 1, background: "rgba(255,255,255,0.15)" }} />
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Avatar name="JM" size={28} tone="light" />
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>Jessica Morgan</div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>(512) 555-0119 · Austin, TX</div>
      </div>
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
      <Icon name="clock" size={14} color="rgba(255,255,255,0.8)" /> 04:23
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      {[
        { i: "phone", t: "var(--error-500)" },
        { i: "doc", t: "rgba(255,255,255,0.12)" },
        { i: "user-plus", t: "rgba(255,255,255,0.12)" },
      ].map((b, k) => (
        <button key={k} style={{
          width: 32, height: 32, borderRadius: 8, border: "none",
          background: b.t, color: "#fff", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon name={b.i} size={14} />
        </button>
      ))}
    </div>
  </div>
);

/* ---------- Application checklist ---------- */
const ApplicationChecklist = () => {
  const items = [
    { t: "Personal & household info", done: true },
    { t: "Income verification", done: true },
    { t: "Plan selection · Bronze HSA + Dental", done: true },
    { t: "Document upload · Photo ID, Pay stub", done: false, current: true },
    { t: "Carrier disclosure & consent", done: false },
    { t: "Submit application", done: false },
  ];
  const completed = items.filter(i => i.done).length;
  const pct = (completed / items.length) * 100;
  return (
    <div className="panel" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 600, color: "var(--fhe-navy)" }}>Application checklist</div>
          <div style={{ fontSize: 12.5, color: "var(--n-500)", marginTop: 2 }}>Carrier · BlueShield · Application #A-2026-0418</div>
        </div>
        <Badge tone="info">{completed}/{items.length}</Badge>
      </div>

      <div style={{ marginTop: 14, height: 6, borderRadius: 3, background: "var(--n-100)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--fhe-blue), var(--fhe-light-blue))" }} />
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderTop: i ? "1px dashed var(--n-100)" : "none"
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: "50%",
              border: it.done ? "none" : `2px solid ${it.current ? "var(--fhe-blue)" : "var(--n-200)"}`,
              background: it.done ? "var(--success-500)" : it.current ? "var(--fhe-soft-blue)" : "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              {it.done && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
              {it.current && <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--fhe-blue)" }} />}
            </span>
            <span style={{ fontSize: 13.5, color: it.done ? "var(--n-500)" : "var(--n-800)", textDecoration: it.done ? "line-through" : "none", fontWeight: it.current ? 600 : 400, flex: 1 }}>{it.t}</span>
            {it.current && <Badge tone="warning">In progress</Badge>}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- Document request card ---------- */
const DocRequestCard = () => (
  <div className="panel" style={{ padding: 20 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 600, color: "var(--fhe-navy)" }}>Document requests</div>
      <Badge tone="warning" icon="clock">Awaiting upload</Badge>
    </div>
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        { t: "Photo ID (front + back)", req: "Required · 2 files", icon: "id-card", state: "pending" },
        { t: "Most recent pay stub", req: "Required · 1 file", icon: "doc", state: "pending" },
        { t: "Proof of address", req: "Optional · for verification", icon: "home", state: "received" },
      ].map((d, i) => (
        <div key={i} style={{
          border: "1px solid var(--n-100)", borderRadius: 10, padding: 12,
          display: "flex", alignItems: "center", gap: 12, background: d.state === "received" ? "var(--success-50)" : "#fff"
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8,
            background: d.state === "received" ? "var(--success-100)" : "var(--fhe-soft-blue)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <Icon name={d.icon} size={18} color={d.state === "received" ? "var(--success-700)" : "var(--fhe-navy)"} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--fhe-navy)" }}>{d.t}</div>
            <div style={{ fontSize: 12, color: "var(--n-500)", marginTop: 2 }}>{d.req}</div>
          </div>
          {d.state === "received"
            ? <Badge tone="success" icon="check-circle">Received</Badge>
            : <Btn size="sm" variant="outline" icon="upload">Upload</Btn>}
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Compliance alert ---------- */
const ComplianceAlert = () => (
  <div style={{ background: "var(--error-50)", border: "1px solid #FECDCA", borderRadius: 12, overflow: "hidden" }}>
    <div style={{ display: "flex", gap: 14, padding: 16 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: "#FECDCA", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name="alert" size={20} color="var(--error-700)" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <strong style={{ color: "var(--error-700)", fontSize: 14 }}>Compliance flag · Missing disclosure</strong>
          <Badge tone="error">High</Badge>
        </div>
        <p style={{ fontSize: 13, color: "var(--n-700)", margin: "6px 0 0", lineHeight: 1.5 }}>
          Recording <span className="code">REC-44219</span> is missing the licensed-agent disclosure within the first 60 seconds. Reassign or escalate within 24 hours of the call timestamp.
        </p>
      </div>
    </div>
    <div style={{ background: "#fff", padding: "10px 16px", display: "flex", gap: 8, justifyContent: "flex-end", borderTop: "1px solid #FECDCA" }}>
      <Btn size="sm" variant="ghost">Dismiss</Btn>
      <Btn size="sm" variant="outline">Reassign</Btn>
      <Btn size="sm" variant="danger">Escalate</Btn>
    </div>
  </div>
);

/* ---------- Policy card ---------- */
const PolicyCard = () => (
  <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
    <div style={{ background: "var(--fhe-navy)", color: "#fff", padding: 20, position: "relative" }}>
      <div style={{ position: "absolute", right: -10, top: -10, opacity: 0.18 }}>
        <FHEMark size={120} tone="primary" />
      </div>
      <div style={{ fontSize: 11.5, color: "var(--fhe-light-blue)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>Active Policy</div>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 22, marginTop: 6 }}>BlueShield Bronze HSA</div>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Member ID · BS-2026-771458</div>
    </div>
    <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, columnGap: 12 }}>
      {[
        { l: "Premium", v: "$284.00", s: "/ month" },
        { l: "Effective", v: "Jan 1, 2026" },
        { l: "Deductible", v: "$3,500", s: "in-network" },
        { l: "Out-of-pocket max", v: "$8,150" },
      ].map((m, i) => (
        <div key={i}>
          <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{m.l}</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 600, color: "var(--fhe-navy)", marginTop: 2 }}>
            {m.v} {m.s && <span style={{ fontSize: 12, color: "var(--n-500)", fontWeight: 400, fontFamily: "var(--font-body)" }}>{m.s}</span>}
          </div>
        </div>
      ))}
    </div>
    <div style={{ padding: "12px 20px", borderTop: "1px solid var(--n-100)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12.5, color: "var(--n-500)" }}>Renewal · <strong style={{ color: "var(--fhe-navy)" }}>Dec 15, 2026</strong></span>
      <Btn size="sm" variant="ghost" iconRight="arrow-right">View details</Btn>
    </div>
  </div>
);

/* ---------- Customer profile panel ---------- */
const CustomerProfile = () => (
  <div className="panel" style={{ padding: 0 }}>
    <div style={{ padding: 20, display: "flex", gap: 14, borderBottom: "1px solid var(--n-100)" }}>
      <Avatar name="JM" size={56} tone="navy" />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <strong style={{ fontFamily: "var(--font-head)", fontSize: 18, color: "var(--fhe-navy)" }}>Jessica Morgan</strong>
          <Badge tone="success" icon="shieldcheck">Active</Badge>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--n-500)", marginTop: 2 }}>Member since Mar 2024 · TX · Family plan</div>
        <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12.5, color: "var(--n-700)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="phone" size={13} color="var(--n-500)" /> (512) 555-0119</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="mail" size={13} color="var(--n-500)" /> jessica.m@example.com</span>
        </div>
      </div>
    </div>
    <div style={{ padding: 20 }}>
      <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 10 }}>Activity</div>
      {[
        { i: "phone-incoming", t: "Inbound call · 12 min", s: "with Maya Chen", time: "2h" },
        { i: "doc", t: "Pay stub uploaded", s: "Application #A-2026-0418", time: "yesterday" },
        { i: "mail", t: "Plan options sent", s: "3 plans compared", time: "2d" },
      ].map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i ? "1px dashed var(--n-100)" : "none" }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--fhe-soft-blue)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={a.i} size={15} color="var(--fhe-navy)" />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, color: "var(--fhe-navy)", fontWeight: 500 }}>{a.t}</div>
            <div style={{ fontSize: 12, color: "var(--n-500)" }}>{a.s}</div>
          </div>
          <span style={{ fontSize: 11.5, color: "var(--n-400)", fontFamily: "var(--font-mono)" }}>{a.time}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Operational components section ---------- */
const ComponentsOperational = () => (
  <section className="ds-section" id="operational">
    <div className="ds-shell">
      <SectionHeader2 label="10 — Operational Components" title="Tools that get the work done">
        Components for the agent side of the product: lead triage, live calls, application progress, document collection, compliance, and policy snapshots. Density is intentional — agents work multiple windows and want signal first, decoration never.
      </SectionHeader2>

      <div style={{ display: "grid", gap: 16 }}>
        <CallStatusBar />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <LeadCard />
          <DocRequestCard />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <ApplicationChecklist />
          <PolicyCard />
        </div>
        <ComplianceAlert />
        <CustomerProfile />
      </div>
    </div>
  </section>
);
window.ComponentsOperational = ComponentsOperational;
