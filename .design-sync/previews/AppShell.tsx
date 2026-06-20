import {
  AppShell,
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  PageHeader,
  Btn,
  Badge,
  Logo,
} from '@fhe/brand';

export const CrmShell = () => (
  <AppShell
    sidebar={
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
          </SidebarSection>
        </SidebarNav>
        <SidebarFooter>
          <SidebarItem icon="settings" label="Settings" />
        </SidebarFooter>
      </Sidebar>
    }
    header={
      <PageHeader
        title="Leads"
        description="138,402 leads · 24 new today"
        actions={
          <>
            <Btn variant="outline" icon="download">Export</Btn>
            <Btn variant="primary" icon="plus">New lead</Btn>
          </>
        }
      />
    }
  >
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {[
        { label: 'New today', value: '24', tone: 'info' },
        { label: 'Quoted', value: '312', tone: 'soft' },
        { label: 'Enrolled (MTD)', value: '1,084', tone: 'success' },
      ].map((c) => (
        <div
          key={c.label}
          style={{
            background: 'white',
            border: '1px solid var(--n-200)',
            borderRadius: 'var(--r-lg)',
            padding: 20,
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--n-500)', marginBottom: 8 }}>{c.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--fhe-navy)', fontVariantNumeric: 'tabular-nums' }}>
            {c.value}
          </div>
          <div style={{ marginTop: 10 }}>
            <Badge tone={c.tone}>Live</Badge>
          </div>
        </div>
      ))}
    </div>
  </AppShell>
);
