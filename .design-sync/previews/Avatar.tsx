import { Avatar } from '@fhe/brand';

export const Tones = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', padding: 16 }}>
    <Avatar name="MR" tone="soft" />
    <Avatar name="DJ" tone="blue" />
    <Avatar name="AK" tone="navy" />
    <Avatar name="LP" tone="light" />
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
    <Avatar name="MR" size="sm" tone="blue" />
    <Avatar name="DJ" size="md" tone="blue" />
    <Avatar name="AK" size="lg" tone="blue" />
    <Avatar name="LP" size={56} tone="navy" />
  </div>
);

export const AgentRoster = () => (
  <div style={{ display: 'flex', alignItems: 'center', padding: 16 }}>
    <Avatar name="MR" tone="navy" style={{ marginRight: -8, border: '2px solid #fff' }} />
    <Avatar name="DJ" tone="blue" style={{ marginRight: -8, border: '2px solid #fff' }} />
    <Avatar name="AK" tone="soft" style={{ marginRight: -8, border: '2px solid #fff' }} />
    <Avatar name="+6" tone="light" style={{ border: '2px solid #fff' }} />
  </div>
);

export const MemberRow = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, maxWidth: 320 }}>
    <Avatar name="MD" size="lg" tone="soft" />
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <div style={{ fontWeight: 600, color: 'var(--fhe-navy)' }}>Maria Delgado</div>
      <div style={{ fontSize: 13, color: 'var(--n-500)' }}>Policy #FHE-204817 · Gold PPO</div>
    </div>
  </div>
);
