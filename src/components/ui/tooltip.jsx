import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

export function TooltipProvider({ delayDuration = 200, ...props }) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

export function Tooltip({ ...props }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

export function TooltipTrigger({ ...props }) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipContent({ className, sideOffset = 6, ...props }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        data-slot="tooltip-content"
        className={cn(
          "z-(--z-tooltip) max-w-xs rounded-(--border-radius) border border-(--color-border) bg-(--color-bg-secondary) px-2.5 py-1.5 text-xs leading-snug text-(--color-text-secondary) shadow-md",
          "data-[state=delayed-open]:animate-[fadeIn_var(--transition-base)] data-[state=closed]:animate-[fadeOut_var(--transition-base)]",
          className
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
