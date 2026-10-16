import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

export function Sheet({ ...props }) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

export function SheetTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

const sheetVariants = cva(
  "fixed z-(--z-modal) flex flex-col gap-4 bg-(--color-bg-secondary) text-(--color-text-primary) shadow-none transition ease-in-out",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-(--color-border) data-[state=open]:animate-[sheetInRight_var(--transition-base)] data-[state=closed]:animate-[sheetOutRight_var(--transition-base)]",
        left:
          "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-(--color-border) data-[state=open]:animate-[sheetInLeft_var(--transition-base)] data-[state=closed]:animate-[sheetOutLeft_var(--transition-base)]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export function SheetContent({ className, side = "right", children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="sheet-overlay"
        className="fixed inset-0 z-(--z-modal-backdrop) bg-(--color-bg-overlay) backdrop-blur-sm data-[state=open]:animate-[fadeIn_var(--transition-base)] data-[state=closed]:animate-[fadeOut_var(--transition-base)]"
      />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          data-slot="sheet-close"
          aria-label="Close menu"
          className="absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg-tertiary) text-xl leading-none text-(--color-text-secondary) transition-colors hover:text-(--color-error)"
        >
          ×
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 px-6 pt-6", className)}
      {...props}
    />
  );
}

export function SheetTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "m-0 font-mono text-xs font-semibold tracking-widest text-(--color-text-muted) uppercase",
        className
      )}
      {...props}
    />
  );
}
