import { RadioGroup, RadioGroupItem } from '@fhe/brand';

const row = { display: 'flex', alignItems: 'center', gap: 10 } as const;
const lbl = { fontSize: 14, color: 'var(--n-800)', fontFamily: 'var(--font-body)' } as const;

export const Default = () => (
  <div style={{ maxWidth: 360, padding: 4 }}>
    <RadioGroup defaultValue="ppo">
      <label style={row}>
        <RadioGroupItem value="hmo" id="r-hmo" />
        <span style={lbl}>HMO — Bronze ($212/mo)</span>
      </label>
      <label style={row}>
        <RadioGroupItem value="ppo" id="r-ppo" />
        <span style={lbl}>PPO — Silver ($318/mo)</span>
      </label>
      <label style={row}>
        <RadioGroupItem value="epo" id="r-epo" />
        <span style={lbl}>EPO — Gold ($401/mo)</span>
      </label>
    </RadioGroup>
  </div>
);

export const States = () => (
  <div style={{ maxWidth: 360, padding: 4 }}>
    <RadioGroup defaultValue="active">
      <label style={row}>
        <RadioGroupItem value="active" id="s-active" />
        <span style={lbl}>Active enrollment</span>
      </label>
      <label style={row}>
        <RadioGroupItem value="pending" id="s-pending" />
        <span style={lbl}>Pending carrier review</span>
      </label>
      <label style={{ ...row, opacity: 0.6 }}>
        <RadioGroupItem value="terminated" id="s-term" disabled />
        <span style={lbl}>Terminated (unavailable)</span>
      </label>
    </RadioGroup>
  </div>
);

export const Contact = () => (
  <div style={{ maxWidth: 360, padding: 4 }}>
    <RadioGroup defaultValue="phone">
      <label style={row}>
        <RadioGroupItem value="phone" id="c-phone" />
        <span style={lbl}>Call — preferred contact</span>
      </label>
      <label style={row}>
        <RadioGroupItem value="text" id="c-text" />
        <span style={lbl}>Text message</span>
      </label>
      <label style={row}>
        <RadioGroupItem value="email" id="c-email" />
        <span style={lbl}>Email</span>
      </label>
    </RadioGroup>
  </div>
);
