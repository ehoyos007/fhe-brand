import { Select } from '@fhe/brand';

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Select defaultValue="ppo">
      <option value="hmo">HMO — Bronze</option>
      <option value="ppo">PPO — Silver</option>
      <option value="epo">EPO — Gold</option>
    </Select>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Select defaultValue="">
      <option value="" disabled>Select enrollment status…</option>
      <option value="active">Active</option>
      <option value="pending">Pending review</option>
      <option value="terminated">Terminated</option>
    </Select>
    <Select error defaultValue="">
      <option value="" disabled>Select metal tier…</option>
      <option value="bronze">Bronze</option>
      <option value="silver">Silver</option>
      <option value="gold">Gold</option>
    </Select>
    <Select disabled defaultValue="fl">
      <option value="fl">Florida — Marketplace</option>
    </Select>
  </div>
);

export const Carriers = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Select defaultValue="ambetter">
      <option value="ambetter">Ambetter Health</option>
      <option value="oscar">Oscar Health</option>
      <option value="florida-blue">Florida Blue</option>
      <option value="aetna">Aetna CVS Health</option>
    </Select>
  </div>
);
