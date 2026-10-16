import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../lib/utils";

export function Select({ ...props }) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export function SelectValue({ ...props }) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-(--border-radius-md) border border-(--color-border) bg-(--color-bg-secondary) px-3 text-sm text-(--color-text-primary) transition-colors outline-none",
        "hover:border-(--color-border-strong)",
        "focus-visible:ring-2 focus-visible:ring-(--color-accent)",
        "disabled:opacity-60",
        "[&>span]:truncate",
        className
      )}
      {...props}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-(--color-text-muted)"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ className, children, position = "popper", ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "z-(--z-dropdown) max-h-72 min-w-44 overflow-y-auto rounded-(--border-radius-md) border border-(--color-border) bg-(--color-bg-secondary) p-1.5 text-(--color-text-primary)",
          "data-[state=open]:animate-[dropdownIn_var(--transition-fast)] data-[state=closed]:animate-[dropdownOut_var(--transition-fast)]",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 rounded-(--border-radius-sm) px-3 py-2 text-sm text-(--color-text-secondary) transition-colors outline-none select-none",
        "hover:bg-(--color-bg-tertiary) hover:text-(--color-text-primary)",
        "focus-visible:bg-(--color-bg-tertiary) focus-visible:text-(--color-text-primary)",
        "data-[state=checked]:text-(--color-text-primary)",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator aria-hidden="true">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="text-(--color-accent)"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
