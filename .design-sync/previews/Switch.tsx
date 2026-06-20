import { Switch } from '@fhe/brand';

const row = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 } as const;
const lbl = { fontSize: 14, color: 'var(--n-800)', fontFamily: 'var(--font-body)' } as const;

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360, padding: 4 }}>
    <label style={row}>
      <span style={lbl}>Enroll in auto-pay</span>
      <Switch defaultChecked />
    </label>
    <label style={row}>
      <span style={lbl}>Paperless policy documents</span>
      <Switch />
    </label>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360, padding: 4 }}>
    <label style={row}>
      <span style={lbl}>SMS appointment reminders (on)</span>
      <Switch defaultChecked />
    </label>
    <label style={row}>
      <span style={lbl}>Marketing emails (off)</span>
      <Switch />
    </label>
    <label style={{ ...row, opacity: 0.6 }}>
      <span style={lbl}>OEP carry-over (locked on)</span>
      <Switch checked disabled />
    </label>
    <label style={{ ...row, opacity: 0.6 }}>
      <span style={lbl}>Dependent portal access (locked off)</span>
      <Switch disabled />
    </label>
  </div>
);
