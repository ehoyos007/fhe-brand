import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Icon,
} from '@fhe/brand';

const shell = {
  maxWidth: 560,
  border: '1px solid var(--n-200)',
  borderTop: '2px solid var(--fhe-navy)',
  borderRadius: 'var(--r-lg)',
  background: '#fff',
  boxShadow: 'var(--shadow-lg)',
  overflow: 'hidden' as const,
};

export const Palette = () => (
  <div style={{ padding: 16, maxWidth: 600 }}>
    <div style={shell}>
      <Command label="Command palette">
        <CommandInput placeholder="Search leads, orders, or run a command…" />
        <CommandList>
          <CommandGroup heading="Leads">
            <CommandItem>
              <Icon name="user-plus" size={16} className="text-[var(--n-400)]" />
              Create new lead
            </CommandItem>
            <CommandItem>
              <Icon name="search" size={16} className="text-[var(--n-400)]" />
              Search lead — Maria Gonzalez
            </CommandItem>
            <CommandItem>
              <Icon name="phone-incoming" size={16} className="text-[var(--n-400)]" />
              View today&apos;s call queue
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Applications">
            <CommandItem>
              <Icon name="doc" size={16} className="text-[var(--n-400)]" />
              Start ACA application
            </CommandItem>
            <CommandItem>
              <Icon name="heartbeat" size={16} className="text-[var(--n-400)]" />
              Quote life policy (Compulife)
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigate">
            <CommandItem>
              <Icon name="dashboard" size={16} className="text-[var(--n-400)]" />
              Go to dashboard
            </CommandItem>
            <CommandItem>
              <Icon name="trophy" size={16} className="text-[var(--n-400)]" />
              Open leaderboard
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
);

export const QueryFiltered = () => (
  <div style={{ padding: 16, maxWidth: 600 }}>
    <div style={shell}>
      <Command label="Command palette" defaultValue="enroll">
        <CommandInput placeholder="Type a command…" defaultValue="enroll" />
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem value="enroll member">
              <Icon name="check-circle" size={16} className="text-[var(--n-400)]" />
              Enroll member in selected plan
            </CommandItem>
            <CommandItem value="enrollment report">
              <Icon name="bar-chart" size={16} className="text-[var(--n-400)]" />
              Open enrollment report
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
);

export const EmptyResult = () => (
  <div style={{ padding: 16, maxWidth: 600 }}>
    <div style={shell}>
      <Command label="Command palette" defaultValue="zzzznomatch">
        <CommandInput placeholder="Search…" defaultValue="zzzznomatch" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Leads">
            <CommandItem value="create lead">
              <Icon name="user-plus" size={16} className="text-[var(--n-400)]" />
              Create new lead
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
);
