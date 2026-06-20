import { Panel, PanelContent, Btn, Badge } from '@fhe/brand';

export const LeadPanel = () => (
  <Panel defaultOpen>
    <PanelContent icon="user" title="Maria Gonzalez" subtitle="Lead #FHE-204817 · PPO Silver">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, color: 'var(--n-700)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge tone="info">Quoted</Badge>
          <Badge tone="success">Subsidy eligible</Badge>
        </div>
        <dl style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 10, margin: 0 }}>
          <dt style={{ color: 'var(--n-500)' }}>Premium</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>$312.40 / mo</dd>
          <dt style={{ color: 'var(--n-500)' }}>APTC</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>$184 / mo</dd>
          <dt style={{ color: 'var(--n-500)' }}>Household</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>3 members</dd>
          <dt style={{ color: 'var(--n-500)' }}>Effective</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>Feb 1, 2026</dd>
        </dl>
        <Btn variant="primary" full icon="check">Continue to application</Btn>
      </div>
    </PanelContent>
  </Panel>
);
