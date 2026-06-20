import { EmptyState, Btn } from '@fhe/brand';

export const NoLeads = () => (
  <div style={{ padding: 16, maxWidth: 460 }}>
    <EmptyState
      icon="inbox"
      title="No leads in this queue"
      description="New inbound leads will appear here as soon as they're assigned to you. Check back shortly or pull from the shared pool."
      action={<Btn variant="blue" icon="plus">Pull next lead</Btn>}
    />
  </div>
);

export const NoResults = () => (
  <div style={{ padding: 16, maxWidth: 460 }}>
    <EmptyState
      icon="search"
      title="No members match your filters"
      description="Try widening the plan tier or clearing the enrollment-status filter to see more results."
      action={<Btn variant="outline" icon="filter">Clear filters</Btn>}
    />
  </div>
);

export const NoDocuments = () => (
  <div style={{ padding: 16, maxWidth: 460 }}>
    <EmptyState
      icon="doc"
      title="No documents uploaded yet"
      description="Upload the signed application and proof-of-income before submitting this enrollment to the carrier."
      action={<Btn variant="primary" icon="upload">Upload document</Btn>}
    />
  </div>
);
