import { Pagination } from '@fhe/brand';

const noop = () => {};

export const LeadsTable = () => (
  <div style={{ maxWidth: 560, padding: 16 }}>
    <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--n-500)' }}>
      Showing 51–75 of 138,402 leads
    </div>
    <Pagination page={3} pageCount={12} onPageChange={noop} />
  </div>
);

export const FirstPage = () => (
  <div style={{ maxWidth: 560, padding: 16 }}>
    <Pagination page={1} pageCount={8} onPageChange={noop} />
  </div>
);

export const DeepRange = () => (
  <div style={{ maxWidth: 560, padding: 16 }}>
    <Pagination page={42} pageCount={96} onPageChange={noop} />
  </div>
);
