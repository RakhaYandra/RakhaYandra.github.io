import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-(--border-radius-sm) border px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-(--badge-tech-border) bg-(--badge-tech-bg) text-(--badge-tech-text)",
        accent:
          "border-(--color-tint-border) bg-(--color-tint-bg) text-(--color-accent-dark)",
        pass: "border-(--badge-pass-border) bg-(--badge-pass-bg) text-(--badge-pass-text)",
        qa: "border-(--badge-qa-border) bg-(--badge-qa-bg) text-(--badge-qa-text)",
        outline:
          "border-(--color-border) bg-transparent text-(--color-text-secondary)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant = "default", asSpan = false, ...props }) {
  const Comp = asSpan ? "span" : "div";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
