import { BandedDialog, BandedDialogContent, Btn, Field, Select } from '@fhe/brand';

export const Disposition = () => (
  <BandedDialog defaultOpen>
    <BandedDialogContent
      icon="phone"
      title="Call disposition required"
      subtitle="Maria Gonzalez &middot; 4:12 outbound call"
      footer={
        <>
          <Btn variant="ghost">Skip</Btn>
          <Btn variant="primary" icon="check">Save disposition</Btn>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14, color: 'var(--n-700)' }}>
        <p style={{ margin: 0 }}>Record the outcome of this call before continuing to the next lead.</p>
        <Field label="Outcome" htmlFor="outcome" required>
          <Select id="outcome" defaultValue="quoted">
            <option value="quoted">Quoted — follow up scheduled</option>
            <option value="enrolled">Enrolled</option>
            <option value="callback">Callback requested</option>
            <option value="dnc">Do not contact</option>
          </Select>
        </Field>
      </div>
    </BandedDialogContent>
  </BandedDialog>
);
