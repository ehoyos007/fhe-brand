import { Board, Badge, Avatar } from '@fhe/brand';

interface Lead {
  id: string;
  name: string;
  stage: string;
  plan: string;
  premium: string;
  state: string;
}

const COLUMNS = [
  { id: 'new', title: 'New' },
  { id: 'contacted', title: 'Contacted' },
  { id: 'quoted', title: 'Quoted' },
  { id: 'enrolled', title: 'Enrolled' },
];

const LEADS: Lead[] = [
  { id: 'l1', name: 'Maria Gonzalez', stage: 'new', plan: 'ACA Silver', premium: '$312/mo', state: 'TX' },
  { id: 'l2', name: 'James Whitfield', stage: 'new', plan: 'ACA Bronze', premium: '$198/mo', state: 'FL' },
  { id: 'l3', name: 'Aisha Patel', stage: 'contacted', plan: 'PPO Gold', premium: '$486/mo', state: 'GA' },
  { id: 'l4', name: 'Robert Chen', stage: 'contacted', plan: 'Term Life', premium: '$54/mo', state: 'CA' },
  { id: 'l5', name: 'Dana Brooks', stage: 'quoted', plan: 'ACA Silver', premium: '$367/mo', state: 'NC' },
  { id: 'l6', name: 'Luis Ramirez', stage: 'quoted', plan: 'HMO Bronze', premium: '$221/mo', state: 'AZ' },
  { id: 'l7', name: 'Sandra Okoro', stage: 'enrolled', plan: 'PPO Silver', premium: '$402/mo', state: 'NY' },
];

const LeadCard = (lead: Lead) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid var(--n-200)',
      borderRadius: 'var(--r-md)',
      padding: 10,
      boxShadow: 'var(--shadow-sm)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <Avatar name={lead.name} size="sm" />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--fhe-navy)',
            fontFamily: 'var(--font-head)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {lead.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--n-500)' }}>{lead.state}</div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
      <Badge tone="info">{lead.plan}</Badge>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--n-700)' }} className="tabular-nums">
        {lead.premium}
      </span>
    </div>
  </div>
);

export const LeadPipeline = () => (
  <div style={{ padding: 16, maxWidth: 1240 }}>
    <Board<Lead>
      columns={COLUMNS}
      items={LEADS}
      getId={(l) => l.id}
      getColumnId={(l) => l.stage}
      renderCard={LeadCard}
    />
  </div>
);

export const TwoStage = () => (
  <div style={{ padding: 16, maxWidth: 620 }}>
    <Board<Lead>
      columns={[
        { id: 'quoted', title: 'Quoted' },
        { id: 'enrolled', title: 'Enrolled' },
      ]}
      items={LEADS.filter((l) => l.stage === 'quoted' || l.stage === 'enrolled')}
      getId={(l) => l.id}
      getColumnId={(l) => l.stage}
      renderCard={LeadCard}
    />
  </div>
);
