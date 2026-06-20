import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  Logo,
} from '@fhe/brand';

export const CrmNav = () => (
  <div style={{ height: 580, display: 'flex' }}>
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarNav>
        <SidebarSection label="Workspace">
          <SidebarItem icon="dashboard" label="Dashboard" />
          <SidebarItem icon="users" label="Leads" active />
          <SidebarItem icon="doc" label="Applications" />
          <SidebarItem icon="phone" label="Calls" />
          <SidebarItem icon="cart" label="Orders" />
        </SidebarSection>
        <SidebarSection label="Admin">
          <SidebarItem icon="bar-chart" label="Reports" />
          <SidebarItem icon="users" label="Team" />
        </SidebarSection>
      </SidebarNav>
      <SidebarFooter>
        <SidebarItem icon="settings" label="Settings" />
      </SidebarFooter>
    </Sidebar>
  </div>
);
