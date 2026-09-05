import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "teal" | "amber" | "slate" | "emerald" | "rose";
}

export function Badge({
  className,
  variant = "teal",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    teal: "bg-teal-50 text-teal-800 border-teal-200/80",
    amber: "bg-amber-50 text-amber-900 border-amber-200",
    slate: "bg-slate-100 text-slate-800 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-xs transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
