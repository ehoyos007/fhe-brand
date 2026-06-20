import { Checkbox } from '@fhe/brand';

const row = { display: 'flex', alignItems: 'center', gap: 10 } as const;
const lbl = { fontSize: 14, color: 'var(--n-800)', fontFamily: 'var(--font-body)' } as const;

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, padding: 4 }}>
    <label style={row}>
      <Checkbox id="consent" defaultChecked />
      <span style={lbl}>Member consents to e-signature</span>
    </label>
    <label style={row}>
      <Checkbox id="tcpa" />
      <span style={lbl}>TCPA call consent on file</span>
    </label>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, padding: 4 }}>
    <label style={row}>
      <Checkbox defaultChecked />
      <span style={lbl}>Spouse added to policy</span>
    </label>
    <label style={row}>
      <Checkbox />
      <span style={lbl}>Dependents added to policy</span>
    </label>
    <label style={{ ...row, opacity: 0.6 }}>
      <Checkbox checked disabled />
      <span style={lbl}>Application submitted (locked)</span>
    </label>
    <label style={{ ...row, opacity: 0.6 }}>
      <Checkbox disabled />
      <span style={lbl}>Auto-pay enrollment (unavailable)</span>
    </label>
  </div>
);

export const Indeterminate = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, padding: 4 }}>
    <label style={row}>
      <Checkbox checked="indeterminate" />
      <span style={lbl}>All household members (partial)</span>
    </label>
    <label style={row}>
      <Checkbox checked />
      <span style={lbl}>Maria Gonzalez (primary)</span>
    </label>
    <label style={row}>
      <Checkbox />
      <span style={lbl}>Carlos Gonzalez (spouse)</span>
    </label>
  </div>
);
