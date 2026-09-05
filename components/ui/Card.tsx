import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-200 shadow-natural p-6",
        hoverEffect && "hover:border-slate-300 hover:shadow-card transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
