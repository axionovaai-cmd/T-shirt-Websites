import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-label-caps transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 select-none uppercase tracking-[0.2em] font-sans font-semibold cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-black text-on-surface-variant border border-border-hairline hover:text-on-surface hover:border-on-surface transition-all duration-500",
        secondary:
          "bg-transparent border border-border-hairline text-on-surface-variant hover:border-gold hover:text-on-surface transition-all duration-500",
        technical:
          "bg-gold text-black hover:bg-gold-hover transition-all duration-300 font-bold border border-gold hover:border-gold-hover",
        link: "text-on-surface-variant hover:text-on-surface underline-offset-4 hover:underline transition-all duration-300 border-none bg-transparent p-0",
      },
      size: {
        default: "h-12 px-8 py-3 text-[11px]",
        sm: "h-10 px-6 py-2 text-[10px]",
        lg: "h-14 px-10 py-4 text-[12px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
