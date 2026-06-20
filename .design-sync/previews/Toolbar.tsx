import { Toolbar, ToolbarSeparator, ToolbarSpacer, Btn, Input, Icon } from '@fhe/brand';

export const LeadsToolbar = () => (
  <div style={{ maxWidth: 720, padding: 16 }}>
    <Toolbar>
      <Input
        leadingIcon={<Icon name="search" size={16} />}
        placeholder="Search leads…"
        style={{ width: 220 }}
      />
      <ToolbarSeparator />
      <Btn variant="outline" icon="filter">Filter</Btn>
      <Btn variant="ghost" icon="tag">Status</Btn>
      <ToolbarSpacer />
      <Btn variant="outline" icon="download">Export</Btn>
      <Btn variant="primary" icon="plus">New lead</Btn>
    </Toolbar>
  </div>
);

export const OrdersToolbar = () => (
  <div style={{ maxWidth: 720, padding: 16 }}>
    <Toolbar>
      <Input
        leadingIcon={<Icon name="search" size={16} />}
        placeholder="Search orders…"
        style={{ width: 200 }}
      />
      <ToolbarSeparator />
      <Btn variant="ghost" icon="calendar">This month</Btn>
      <Btn variant="ghost" icon="user">Assigned to me</Btn>
      <ToolbarSpacer />
      <Btn variant="outline" icon="refresh">Refresh</Btn>
    </Toolbar>
  </div>
);
