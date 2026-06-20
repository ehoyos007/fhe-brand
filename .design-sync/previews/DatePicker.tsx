import { DatePicker } from '@fhe/brand';

export const Empty = () => (
  <div style={{ maxWidth: 280, padding: 16 }}>
    <DatePicker placeholder="Coverage effective date" />
  </div>
);

export const Selected = () => (
  <div style={{ maxWidth: 280, padding: 16 }}>
    <DatePicker value={new Date(2026, 1, 1)} />
  </div>
);
