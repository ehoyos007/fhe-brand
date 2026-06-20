import { Badge } from '@fhe/brand';

export const StateTones = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', padding: 16 }}>
    <Badge tone="success">Enrolled</Badge>
    <Badge tone="info">In review</Badge>
    <Badge tone="warning">Pending docs</Badge>
    <Badge tone="error">Lapsed</Badge>
    <Badge tone="neutral">Draft</Badge>
  </div>
);

export const VoiceTones = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', padding: 16 }}>
    <Badge tone="navy">Gold PPO</Badge>
    <Badge tone="soft">Silver HMO</Badge>
    <Badge tone="neutral">Bronze EPO</Badge>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', padding: 16 }}>
    <Badge tone="success" icon="check">Application approved</Badge>
    <Badge tone="warning" icon="clock">SEP closes in 3 days</Badge>
    <Badge tone="info" icon="phone">Callback scheduled</Badge>
    <Badge tone="navy" icon="shieldcheck">HIPAA verified</Badge>
  </div>
);

export const PolicyStatuses = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', padding: 16 }}>
    <Badge tone="success" icon="heartbeat">Active coverage</Badge>
    <Badge tone="error" icon="x">Terminated</Badge>
    <Badge tone="warning" icon="alert">Payment due</Badge>
    <Badge tone="soft" icon="star">VIP member</Badge>
  </div>
);
