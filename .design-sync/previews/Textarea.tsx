import { Textarea } from '@fhe/brand';

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <Textarea defaultValue="Member prefers afternoon calls. Spouse Carlos to be added as a dependent during the next Open Enrollment Period." />
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <Textarea placeholder="Add an enrollment note for CS reps…" />
    <Textarea error defaultValue="Income figure missing — cannot calculate subsidy." />
    <Textarea disabled defaultValue="Application FHE-2026-0481 submitted — notes locked." />
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <Textarea rows={2} defaultValue="Quick disposition: callback scheduled for Thursday 2pm." />
    <Textarea rows={6} defaultValue="Household summary: Maria Gonzalez (primary), Carlos Gonzalez (spouse), two dependents. Currently on PPO Silver, exploring EPO Gold for lower deductible. Estimated household income $54,200 — likely qualifies for premium tax credit." />
  </div>
);
