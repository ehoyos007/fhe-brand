import { DataTable, Badge } from '@fhe/brand';

const TONE = { Enrolled: 'success', Pending: 'warning', Quoted: 'info', Lapsed: 'error' };

const columns = [
  { accessorKey: 'name', header: 'Member' },
  { accessorKey: 'plan', header: 'Plan' },
  { accessorKey: 'premium', header: 'Premium' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue();
      return <Badge tone={TONE[v] || 'neutral'}>{v}</Badge>;
    },
  },
  { accessorKey: 'agent', header: 'Agent' },
];

const data = [
  { name: 'Maria Gonzalez', plan: 'PPO Silver', premium: '$312.40', status: 'Enrolled', agent: 'J. Rivera' },
  { name: 'David Okafor', plan: 'HMO Bronze', premium: '$198.10', status: 'Quoted', agent: 'A. Chen' },
  { name: 'Susan Whitfield', plan: 'EPO Gold', premium: '$441.75', status: 'Pending', agent: 'J. Rivera' },
  { name: 'Carlos Mendez', plan: 'PPO Silver', premium: '$305.00', status: 'Lapsed', agent: 'T. Boyd' },
  { name: 'Aisha Rahman', plan: 'HMO Bronze', premium: '$210.30', status: 'Enrolled', agent: 'A. Chen' },
];

export const LeadsTable = () => (
  <div style={{ padding: 16 }}>
    <DataTable columns={columns} data={data} />
  </div>
);

export const LoadingState = () => (
  <div style={{ padding: 16 }}>
    <DataTable columns={columns} data={[]} isLoading loadingRows={4} />
  </div>
);

export const EmptyResult = () => (
  <div style={{ padding: 16 }}>
    <DataTable columns={columns} data={[]} />
  </div>
);
