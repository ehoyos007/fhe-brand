import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Btn } from '@fhe/brand';

export const EligibilityHint = () => (
  <div style={{ padding: 56, display: 'flex', justifyContent: 'center' }}>
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Btn variant="outline" icon="info">SEP eligibility</Btn>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          A Special Enrollment Period requires a qualifying life event within the last 60 days.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);
