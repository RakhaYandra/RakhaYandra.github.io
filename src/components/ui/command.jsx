import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { cn } from "../../lib/utils";

export function Command({ className, ...props }) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden text-(--color-text-primary)",
        className
      )}
      {...props}
    />
  );
}

export function CommandDialog({ className, children, ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent className={cn("overflow-hidden p-0 max-w-xl", className)}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-(--color-text-muted)">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export function CommandInput({ className, ...props }) {
  return (
    <div className="flex items-center gap-2 border-b border-(--color-border) px-3">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0 text-(--color-text-muted)"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-11 w-full bg-transparent py-3 pr-11 text-sm outline-none placeholder:text-(--color-text-muted) disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, ...props }) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[320px] overflow-y-auto overflow-x-hidden p-1.5",
        className
      )}
      {...props}
    />
  );
}

export function CommandEmpty({ className, ...props }) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "py-8 text-center text-sm text-(--color-text-muted)",
        className
      )}
      {...props}
    />
  );
}

export function CommandGroup({ className, ...props }) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("overflow-hidden p-1", className)}
      {...props}
    />
  );
}

export function CommandItem({ className, ...props }) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2.5 rounded-(--border-radius-sm) px-2.5 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-(--color-bg-tertiary) data-[selected=true]:text-(--color-text-primary) data-[disabled=true]:opacity-50 [&_svg]:shrink-0 [&_svg]:text-(--color-text-muted)",
        className
      )}
      {...props}
    />
  );
}

export function CommandSeparator({ className, ...props }) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-(--color-border)", className)}
      {...props}
    />
  );
}
