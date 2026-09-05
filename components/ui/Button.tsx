import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "amber";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004F72] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer";

    const variants = {
      primary:
        "bg-[#004F72] hover:bg-[#092734] text-white shadow-md hover:shadow-lg hover:shadow-[#004F72]/20 hover:-translate-y-0.5",
      secondary:
        "bg-[#092734] hover:bg-[#004F72] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
      outline:
        "border-2 border-[#004F72]/30 hover:border-[#004F72] text-[#004F72] hover:bg-[#004F72]/5 bg-white hover:-translate-y-0.5 shadow-xs",
      ghost:
        "text-[#092734] hover:text-[#004F72] hover:bg-slate-100/80 bg-transparent",
      amber:
        "bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold border border-amber-500 shadow-md hover:shadow-lg hover:shadow-amber-400/25 hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
