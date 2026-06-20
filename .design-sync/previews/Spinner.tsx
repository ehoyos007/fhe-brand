import { Spinner } from '@fhe/brand';

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 24 }}>
    <Spinner size={16} />
    <Spinner size={24} />
    <Spinner size={36} />
    <Spinner size={48} />
  </div>
);

export const InlineLoading = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--n-700)',
    }}
  >
    <Spinner size={18} />
    <span>Verifying eligibility…</span>
  </div>
);

export const CardLoading = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      width: 280,
      height: 160,
      background: '#fff',
      border: '1px solid var(--n-200)',
      borderRadius: 12,
      fontFamily: 'var(--font-body)',
    }}
  >
    <Spinner size={32} />
    <span style={{ fontSize: 13, color: 'var(--n-500)' }}>Loading enrollment queue…</span>
  </div>
);
