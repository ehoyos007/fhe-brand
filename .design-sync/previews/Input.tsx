import { Input, Icon } from '@fhe/brand';

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input defaultValue="Maria Gonzalez" />
    <Input type="email" defaultValue="maria.gonzalez@example.com" />
  </div>
);

export const WithLeadingIcon = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input leadingIcon={<Icon name="search" size={16} />} defaultValue="FHE-2026-0481" />
    <Input leadingIcon={<Icon name="phone" size={16} />} defaultValue="(305) 555-0142" />
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input placeholder="Enter member SSN" />
    <Input error defaultValue="123-45" />
    <Input disabled defaultValue="O30481 — locked" />
  </div>
);
