import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Btn,
} from '@fhe/brand';

export const ConfirmEnroll = () => (
  <Dialog defaultOpen>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm enrollment</DialogTitle>
        <DialogDescription>
          Submit Maria Gonzalez&rsquo;s PPO Silver application to Ambetter for the 2026 plan year?
        </DialogDescription>
      </DialogHeader>
      <div style={{ fontSize: 14, color: 'var(--n-700)', lineHeight: 1.6 }}>
        Monthly premium <strong>$312.40</strong> &middot; Effective Feb 1, 2026 &middot; 2 dependents
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Btn variant="ghost">Cancel</Btn>
        </DialogClose>
        <Btn variant="primary" icon="check">Submit application</Btn>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
