import { Skeleton } from '@fhe/brand';

export const Lines = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, width: 320 }}>
    <Skeleton style={{ height: 14, width: '70%' }} />
    <Skeleton style={{ height: 14, width: '90%' }} />
    <Skeleton style={{ height: 14, width: '55%' }} />
  </div>
);

export const MemberCard = () => (
  <div
    style={{
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      padding: 16,
      width: 340,
      background: '#fff',
      border: '1px solid var(--n-200)',
      borderRadius: 12,
    }}
  >
    <Skeleton style={{ height: 44, width: 44, borderRadius: '9999px', flexShrink: 0 }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      <Skeleton style={{ height: 14, width: '60%' }} />
      <Skeleton style={{ height: 12, width: '85%' }} />
      <Skeleton style={{ height: 12, width: '40%' }} />
    </div>
  </div>
);

export const TableRows = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, width: 420 }}>
    {[0, 1, 2, 3].map((r) => (
      <div key={r} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton style={{ height: 32, width: 32, borderRadius: '9999px', flexShrink: 0 }} />
        <Skeleton style={{ height: 12, width: '30%' }} />
        <Skeleton style={{ height: 12, width: '20%' }} />
        <Skeleton style={{ height: 12, width: '15%', marginLeft: 'auto' }} />
      </div>
    ))}
  </div>
);
