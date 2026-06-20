import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@fhe/brand';

export const EnrollmentFAQ = () => (
  <div style={{ maxWidth: 600, padding: 16 }}>
    <Accordion type="single" collapsible defaultValue="sep">
      <AccordionItem value="sep">
        <AccordionTrigger>Do I qualify for a Special Enrollment Period?</AccordionTrigger>
        <AccordionContent>
          You may qualify if you recently lost coverage, moved, married, or had a baby. A
          qualifying life event opens a 60-day window to enroll outside Open Enrollment.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="subsidy">
        <AccordionTrigger>How is my premium subsidy calculated?</AccordionTrigger>
        <AccordionContent>
          Subsidies are based on household size and projected annual income relative to the
          federal poverty level. We estimate it from your application before you finalize a plan.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="docs">
        <AccordionTrigger>What documents do I need to submit?</AccordionTrigger>
        <AccordionContent>
          A government-issued ID, proof of income, and — for a SEP — documentation of your
          qualifying life event.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export const EligibilityFAQ = () => (
  <div style={{ maxWidth: 600, padding: 16 }}>
    <Accordion type="single" collapsible defaultValue="medicaid">
      <AccordionItem value="medicaid">
        <AccordionTrigger>Am I eligible for Medicaid instead?</AccordionTrigger>
        <AccordionContent>
          Households below 138% of the federal poverty level may qualify for Medicaid in expansion
          states. We screen for this before quoting Marketplace plans.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dependents">
        <AccordionTrigger>Can I add dependents to my application?</AccordionTrigger>
        <AccordionContent>
          Yes. Add a spouse and children under 26; each dependent affects your subsidy and plan
          pricing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
