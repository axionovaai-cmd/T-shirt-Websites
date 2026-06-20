import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border-b border-border-hairline bg-transparent px-3 py-2 text-base md:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-gold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 font-sans rounded-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
