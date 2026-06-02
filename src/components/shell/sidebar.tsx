"use client";

/**
 * @fhe/brand · Sidebar (brand-neutral)
 * Collapsible app sidebar. Active item = navy (NO role-accent — that system is retired).
 * Compose: Sidebar > SidebarHeader / SidebarNav > SidebarSection > SidebarItem / SidebarFooter.
 *
 * SidebarItem uses an `as` prop so consumers can render a framework link:
 *   <SidebarItem as={Link} href="/cs" icon="home" label="Dashboard" active={isActive} />
 */
import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../../icons";

const SidebarContext = React.createContext<{ collapsed: boolean }>({ collapsed: false });
const useSidebar = () => React.useContext(SidebarContext);

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false, className, children, ...rest }: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside
        data-collapsed={collapsed || undefined}
        className={cn(
          "flex h-full shrink-0 flex-col border-r border-[var(--n-200)] bg-white transition-[width] duration-200",
          "font-[family-name:var(--font-body)]",
          collapsed ? "w-16" : "w-64",
          className,
        )}
        {...rest}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-14 items-center gap-2 border-b border-[var(--n-100)] px-3", className)}
      {...rest}
    />
  );
}

export function SidebarNav({ className, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={cn("flex-1 overflow-y-auto p-2", className)} {...rest} />;
}

export function SidebarFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-[var(--n-100)] p-2", className)} {...rest} />;
}

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export function SidebarSection({ label, className, children, ...rest }: SidebarSectionProps) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("mb-2", className)} {...rest}>
      {label && !collapsed && (
        <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--n-400)]">
          {label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

export type SidebarItemProps = {
  as?: React.ElementType;
  icon?: IconName;
  label: React.ReactNode;
  active?: boolean;
  className?: string;
} & Record<string, unknown>;

export function SidebarItem({ as, icon, label, active, className, ...rest }: SidebarItemProps) {
  const { collapsed } = useSidebar();
  const Comp = (as ?? "button") as React.ElementType;
  return (
    <Comp
      data-active={active || undefined}
      title={collapsed && typeof label === "string" ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-[var(--r-sm)] px-2.5 py-2 text-sm text-[var(--n-600)] transition-colors",
        "hover:bg-[var(--n-50)] hover:text-[var(--n-800)]",
        "data-[active=true]:bg-[var(--fhe-soft-blue)] data-[active=true]:font-semibold data-[active=true]:text-[var(--fhe-navy)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        collapsed && "justify-center px-0",
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} className="shrink-0" />}
      {!collapsed && <span className="truncate">{label}</span>}
    </Comp>
  );
}
