import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/utils";

export function DropdownMenu({ ...props }) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export function DropdownMenuTrigger({ ...props }) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export function DropdownMenuContent({ className, sideOffset = 8, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "z-(--z-dropdown) min-w-48 overflow-hidden rounded-(--border-radius-md) border border-(--color-border) bg-(--color-bg-secondary) p-1.5 text-(--color-text-primary)",
          "data-[state=open]:animate-[dropdownIn_var(--transition-fast)] data-[state=closed]:animate-[dropdownOut_var(--transition-fast)]",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-(--border-radius-sm) px-3 py-2 text-sm text-(--color-text-secondary) transition-colors outline-none select-none",
        "hover:bg-(--color-bg-tertiary) hover:text-(--color-text-primary)",
        "focus-visible:bg-(--color-bg-tertiary) focus-visible:text-(--color-text-primary)",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("my-1.5 h-px bg-(--color-border-muted)", className)}
      {...props}
    />
  );
}
