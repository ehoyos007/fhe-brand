import { Icon } from '@fhe/brand';

const cell = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: 6,
  padding: '12px 8px',
  width: 84,
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  color: 'var(--n-500)',
  textAlign: 'center' as const,
};

const grid = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: 4,
  padding: 16,
  color: 'var(--fhe-navy)',
  maxWidth: 720,
};

const NAMES = [
  'shieldcheck', 'heartbeat', 'stethoscope', 'pill', 'phone', 'mail',
  'chat', 'calendar', 'clock', 'doc', 'upload', 'download',
  'search', 'filter', 'settings', 'user', 'users', 'bell',
  'star', 'check', 'trophy', 'gauge', 'dashboard', 'send',
] as const;

export const CoreGrid = () => (
  <div style={grid}>
    {NAMES.map((n) => (
      <div key={n} style={cell}>
        <Icon name={n} size={24} />
        <span>{n}</span>
      </div>
    ))}
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 16, color: 'var(--fhe-blue)' }}>
    <Icon name="shieldcheck" size={16} />
    <Icon name="shieldcheck" size={20} />
    <Icon name="shieldcheck" size={28} />
    <Icon name="shieldcheck" size={40} />
  </div>
);

export const ToneColors = () => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'center', padding: 16 }}>
    <Icon name="check" size={28} color="var(--success-700)" />
    <Icon name="alert" size={28} color="var(--warning-700)" />
    <Icon name="x" size={28} color="var(--error-700)" />
    <Icon name="info" size={28} color="var(--info-700)" />
    <Icon name="shieldcheck" size={28} color="var(--fhe-navy)" />
  </div>
);
