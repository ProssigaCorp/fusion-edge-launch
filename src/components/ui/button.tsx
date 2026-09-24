import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border text-xs font-bold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary px-6 text-primary-foreground hover:bg-primary/80",
        outline: "border-border bg-surface-glass px-6 text-foreground backdrop-blur-sm hover:border-foreground/50 hover:bg-accent",
        icon: "size-11 border-border bg-surface-glass p-0 text-foreground backdrop-blur-sm hover:border-foreground/60 hover:bg-accent",
        ghost: "border-transparent bg-transparent px-3 text-foreground hover:bg-accent",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-4",
        lg: "min-h-12 px-8",
        icon: "size-11 min-h-0 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";
