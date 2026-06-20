import { Field, Input, Textarea, Select } from '@fhe/brand';

export const TextFields = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Field label="Member first name" htmlFor="fn" required>
      <Input id="fn" defaultValue="Maria" />
    </Field>
    <Field label="Email address" htmlFor="em" hint="Policy documents are sent here.">
      <Input id="em" type="email" defaultValue="maria.g@example.com" />
    </Field>
  </div>
);

export const ErrorState = () => (
  <div style={{ maxWidth: 360 }}>
    <Field label="Social Security Number" htmlFor="ssn" required error="SSN must be 9 digits.">
      <Input id="ssn" error defaultValue="123-45" />
    </Field>
  </div>
);

export const Notes = () => (
  <div style={{ maxWidth: 360 }}>
    <Field label="Agent notes" htmlFor="notes" hint="Visible to CS reps only.">
      <Textarea id="notes" defaultValue="Member prefers afternoon calls. Spouse to be added during OEP." />
    </Field>
  </div>
);

export const SelectField = () => (
  <div style={{ maxWidth: 360 }}>
    <Field label="Plan type" htmlFor="plan" required>
      <Select id="plan" defaultValue="ppo">
        <option value="hmo">HMO — Bronze</option>
        <option value="ppo">PPO — Silver</option>
        <option value="epo">EPO — Gold</option>
      </Select>
    </Field>
  </div>
);
