import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Btn,
  Badge,
} from '@fhe/brand';

export const LeadDetail = () => (
  <Drawer defaultOpen>
    <DrawerContent side="right">
      <DrawerHeader>
        <DrawerTitle>Maria Gonzalez</DrawerTitle>
        <DrawerDescription>Lead #FHE-204817</DrawerDescription>
      </DrawerHeader>
      <div style={{ display: 'flex', gap: 8 }}>
        <Badge tone="info">Quoted</Badge>
        <Badge tone="soft">PPO Silver</Badge>
      </div>
      <dl style={{ display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 10, fontSize: 14, margin: 0 }}>
        <dt style={{ color: 'var(--n-500)' }}>Premium</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>$312.40 / mo</dd>
        <dt style={{ color: 'var(--n-500)' }}>Effective</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>Feb 1, 2026</dd>
        <dt style={{ color: 'var(--n-500)' }}>Agent</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>J. Rivera</dd>
        <dt style={{ color: 'var(--n-500)' }}>Phone</dt><dd style={{ margin: 0, color: 'var(--n-800)' }}>(305) 555-0142</dd>
      </dl>
      <Btn variant="primary" full icon="phone">Call lead</Btn>
    </DrawerContent>
  </Drawer>
);
