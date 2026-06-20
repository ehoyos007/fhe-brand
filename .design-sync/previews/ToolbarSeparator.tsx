import { Toolbar, ToolbarSeparator, ToolbarSpacer, Btn } from '@fhe/brand';

export const BetweenGroups = () => (
  <div style={{ padding: 16, maxWidth: 600 }}>
    <Toolbar>
      <Btn variant="ghost" size="sm" icon="filter">Filter</Btn>
      <Btn variant="ghost" size="sm" icon="search">Search</Btn>
      <ToolbarSeparator />
      <Btn variant="ghost" size="sm" icon="download">Export</Btn>
      <ToolbarSpacer />
      <Btn variant="primary" size="sm" icon="plus">New lead</Btn>
    </Toolbar>
  </div>
);
