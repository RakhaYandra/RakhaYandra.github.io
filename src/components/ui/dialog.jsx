import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

export function Dialog({ ...props }) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-(--z-modal-backdrop) bg-(--color-bg-overlay) backdrop-blur-sm",
        "data-[state=open]:animate-[fadeIn_var(--transition-base)] data-[state=closed]:animate-[fadeOut_var(--transition-base)]",
        className
      )}
      {...props}
    />
  );
}

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-(--z-modal) grid max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-(--border-radius-lg) border border-(--color-border) bg-(--color-bg-secondary) p-6 text-(--color-text-primary) shadow-none",
          "data-[state=open]:animate-[dialogIn_var(--transition-base)] data-[state=closed]:animate-[dialogOut_var(--transition-base)]",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          data-slot="dialog-close"
          aria-label="Close dialog"
          className="absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg-tertiary) text-xl leading-none text-(--color-text-secondary) transition-colors hover:text-(--color-error)"
        >
          ×
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "m-0 text-xl font-semibold tracking-tight text-(--color-text-primary)",
        className
      )}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("m-0 text-sm leading-relaxed text-(--color-text-secondary)", className)}
      {...props}
    />
  );
}
