import { Calendar } from '@fhe/brand';

// Fixed month so the render is deterministic across captures.
const MONTH = new Date(2026, 2, 1); // March 2026
const SELECTED = new Date(2026, 2, 18); // enrollment appointment
const TODAY = new Date(2026, 2, 11);

export const AppointmentDay = () => (
  <div style={{ padding: 16, display: 'inline-block', border: '1px solid var(--n-200)', borderRadius: 'var(--r-lg)', background: '#fff' }}>
    <Calendar month={MONTH} selected={SELECTED} />
  </div>
);

export const WithMinDate = () => (
  <div style={{ padding: 16, display: 'inline-block', border: '1px solid var(--n-200)', borderRadius: 'var(--r-lg)', background: '#fff' }}>
    <Calendar
      month={MONTH}
      selected={new Date(2026, 2, 24)}
      minDate={TODAY}
    />
  </div>
);

export const MondayStart = () => (
  <div style={{ padding: 16, display: 'inline-block', border: '1px solid var(--n-200)', borderRadius: 'var(--r-lg)', background: '#fff' }}>
    <Calendar month={MONTH} selected={new Date(2026, 2, 5)} weekStartsOn={1} />
  </div>
);
