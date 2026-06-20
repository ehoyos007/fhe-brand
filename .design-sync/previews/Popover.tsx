import { Popover, PopoverTrigger, PopoverContent, Btn } from '@fhe/brand';

export const CoverageSummary = () => (
  <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Btn variant="outline" icon="info">Coverage details</Btn>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600, color: 'var(--fhe-navy)' }}>PPO Silver — Ambetter</div>
          <div style={{ fontSize: 13, color: 'var(--n-600)', lineHeight: 1.6 }}>
            Deductible $2,500 · OOP max $8,200 · PCP copay $30. Network: Statewide PPO.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);
