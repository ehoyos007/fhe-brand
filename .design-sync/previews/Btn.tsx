import { Btn } from '@fhe/brand';

export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    <Btn variant="primary">Enroll member</Btn>
    <Btn variant="blue">Save policy</Btn>
    <Btn variant="secondary">Add dependent</Btn>
    <Btn variant="outline">View quote</Btn>
    <Btn variant="ghost">Cancel</Btn>
    <Btn variant="subtle">Reassign</Btn>
    <Btn variant="danger">Void application</Btn>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Btn size="sm">Small</Btn>
    <Btn size="md">Medium</Btn>
    <Btn size="lg">Large</Btn>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    <Btn variant="blue" icon="phone">Call lead</Btn>
    <Btn variant="primary" icon="check">Mark enrolled</Btn>
    <Btn variant="outline" iconRight="arrow-right">Next step</Btn>
    <Btn variant="ghost" icon="mail">Email</Btn>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 260 }}>
    <Btn variant="primary" disabled>Disabled</Btn>
    <Btn variant="primary" full>Full width primary</Btn>
  </div>
);
