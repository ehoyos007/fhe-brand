import { Tabs, TabsList, TabsTrigger, TabsContent } from '@fhe/brand';

export const MemberRecord = () => (
  <div style={{ maxWidth: 640, padding: 16 }}>
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="claims">Claims</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Maria Gonzalez · Age 41 · Miami, FL · Household of 3. Lead source: Facebook Ads.
        Assigned to agent Dana Pruitt.
      </TabsContent>
      <TabsContent value="plans">Silver PPO — Blue Cross · $312/mo after subsidy.</TabsContent>
      <TabsContent value="documents">3 documents on file — ID, proof of income, SEP attestation.</TabsContent>
      <TabsContent value="claims">No claims history on this policy.</TabsContent>
    </Tabs>
  </div>
);

export const PlansTab = () => (
  <div style={{ maxWidth: 640, padding: 16 }}>
    <Tabs defaultValue="plans">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="claims">Claims</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Member overview…</TabsContent>
      <TabsContent value="plans">
        Quoted: Silver PPO ($312/mo), Gold HMO ($389/mo). Recommended Silver PPO for the
        household subsidy tier.
      </TabsContent>
      <TabsContent value="documents">Document list…</TabsContent>
      <TabsContent value="claims">Claims history…</TabsContent>
    </Tabs>
  </div>
);
