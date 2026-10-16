import { cn } from "../../lib/utils";

export function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-(--border-radius-md) border border-(--color-border) bg-(--color-bg-secondary) px-3 py-1 text-sm text-(--color-text-primary) transition-colors placeholder:text-(--color-text-muted) disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
