import { Alert, Btn } from '@fhe/brand';

export const Tones = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
    <Alert tone="info" title="Open enrollment ends Jan 15">
      Members must finalize plan selection before the deadline.
    </Alert>
    <Alert tone="success" title="Application submitted">
      Policy #FHE-2026-0481 was sent to the carrier.
    </Alert>
    <Alert tone="warning" title="Missing income verification">
      Upload a pay stub to avoid a coverage gap.
    </Alert>
    <Alert tone="error" title="Payment failed">
      The card on file was declined. Update billing to keep coverage active.
    </Alert>
  </div>
);

export const WithAction = () => (
  <div style={{ maxWidth: 520 }}>
    <Alert
      tone="warning"
      title="Consent expires in 3 days"
      action={<Btn size="sm" variant="primary">Renew</Btn>}
    >
      Re-capture TCPA consent to continue outbound calls to this lead.
    </Alert>
  </div>
);
