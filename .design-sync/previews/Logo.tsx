import { Logo } from '@fhe/brand';

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', padding: 24 }}>
    <Logo width={120} />
    <Logo width={180} />
    <Logo width={260} />
  </div>
);

export const OnNavyHeader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      padding: '16px 24px',
      background: 'var(--fhe-navy)',
      borderRadius: 12,
      maxWidth: 480,
    }}
  >
    <Logo width={200} style={{ filter: 'brightness(0) invert(1)' }} />
    <span style={{ color: '#fff', fontSize: 13, fontFamily: 'var(--font-body)', opacity: 0.85 }}>
      Enrollment Portal
    </span>
  </div>
);

export const SidebarLockup = () => (
  <div
    style={{
      padding: '20px 24px',
      background: '#fff',
      border: '1px solid var(--n-200)',
      borderRadius: 12,
      maxWidth: 300,
    }}
  >
    <Logo width={170} title="First Health Enrollment" />
  </div>
);
