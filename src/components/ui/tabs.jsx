import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export function Tabs({ ...props }) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex flex-wrap gap-1.5 rounded-(--border-radius-lg) border border-(--color-border) bg-(--color-bg-secondary) p-2",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer rounded-(--border-radius-md) px-4 py-2 font-mono text-xs font-medium tracking-wide whitespace-nowrap text-(--color-text-secondary) uppercase transition-colors outline-none",
        "hover:bg-(--color-bg-tertiary) hover:text-(--color-text-primary)",
        "focus-visible:ring-2 focus-visible:ring-(--color-accent)",
        "data-[state=active]:bg-(--color-primary) data-[state=active]:text-(--color-bg-primary)",
        "disabled:pointer-events-none disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "outline-none",
        "data-[state=inactive]:hidden",
        "data-[state=active]:animate-[tabIn_var(--transition-base)]",
        className
      )}
      {...props}
    />
  );
}
