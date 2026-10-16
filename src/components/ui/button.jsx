import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-(--border-radius-md) text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-(--color-primary) text-(--color-bg-primary) hover:opacity-90",
        secondary:
          "border border-(--color-border) bg-transparent text-(--color-text-primary) hover:bg-(--color-bg-tertiary)",
        ghost:
          "bg-transparent text-(--color-text-secondary) hover:bg-(--color-bg-tertiary) hover:text-(--color-text-primary)",
        accent:
          "bg-(--color-accent) text-white hover:bg-(--color-accent-dark)",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-5",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
