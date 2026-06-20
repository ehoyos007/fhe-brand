import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Btn,
} from '@fhe/brand';

export const RowActions = () => (
  <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Btn variant="outline" iconRight="chev-down">Actions</Btn>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Lead actions</DropdownMenuLabel>
        <DropdownMenuItem>Call lead</DropdownMenuItem>
        <DropdownMenuItem>Send email</DropdownMenuItem>
        <DropdownMenuItem>Reassign agent</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Mark do-not-contact</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
