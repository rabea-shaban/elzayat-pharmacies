import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "gold" | "emerald" | "outline" | "slate";
  className?: string;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className,
  size = "md",
}) => {
  const variantStyles = {
    primary: "bg-sky-50 text-brand-primary border border-sky-200/80 font-medium",
    gold: "bg-amber-50 text-amber-800 border border-amber-300 font-semibold shadow-sm",
    emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium",
    outline: "bg-white/80 text-slate-700 border border-slate-200 shadow-sm",
    slate: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1 rounded-full",
    md: "text-xs sm:text-sm px-3.5 py-1.5 rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 tracking-wide transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
