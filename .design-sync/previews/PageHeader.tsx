import {
  PageHeader,
  Btn,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@fhe/brand';

export const LeadsHeader = () => (
  <div style={{ maxWidth: 720, padding: 16 }}>
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
  </div>
);

export const WithBreadcrumb = () => (
  <div style={{ maxWidth: 720, padding: 16 }}>
    <PageHeader
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Leads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Maria Gonzalez</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      title="Maria Gonzalez"
      description="Application #FHE-2026-0481 · Silver PPO"
      actions={
        <>
          <Btn variant="ghost" icon="phone">Call</Btn>
          <Btn variant="primary" icon="check">Mark enrolled</Btn>
        </>
      }
    />
  </div>
);

export const Minimal = () => (
  <div style={{ maxWidth: 720, padding: 16 }}>
    <PageHeader title="Dashboard" description="Your pipeline at a glance" />
  </div>
);
