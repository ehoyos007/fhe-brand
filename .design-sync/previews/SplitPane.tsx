import { SplitPane, Badge } from '@fhe/brand';

const leads = [
  { n: 'Maria Gonzalez', s: 'Quoted' },
  { n: 'David Okafor', s: 'New' },
  { n: 'Susan Whitfield', s: 'Pending' },
  { n: 'Carlos Mendez', s: 'Enrolled' },
];

export const MasterDetail = () => (
  <div style={{ height: 520 }}>
    <SplitPane
      leftWidth={280}
      left={
        <div>
          {leads.map((l, i) => (
            <div
              key={l.n}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--n-100)',
                background: i === 0 ? 'var(--fhe-soft-blue)' : 'white',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--fhe-navy)', fontSize: 14 }}>{l.n}</div>
              <div style={{ fontSize: 12, color: 'var(--n-500)' }}>{l.s}</div>
            </div>
          ))}
        </div>
      }
      right={
        <div style={{ padding: 24 }}>
          <h3 style={{ margin: 0, color: 'var(--fhe-navy)', fontFamily: 'var(--font-head)' }}>
            Maria Gonzalez
          </h3>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <Badge tone="info">Quoted</Badge>
            <Badge tone="soft">PPO Silver</Badge>
          </div>
          <p style={{ color: 'var(--n-600)', fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>
            Lead #FHE-204817 &middot; $312.40 / mo &middot; Effective Feb 1, 2026 &middot; Agent J. Rivera
          </p>
        </div>
      }
    />
  </div>
);
