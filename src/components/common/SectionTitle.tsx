import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  badgeVariant?: "primary" | "gold" | "emerald" | "outline";
  title: string;
  subtitle?: string;
  align?: "center" | "right";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  badgeVariant = "primary",
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-right",
        className
      )}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-[1.42] sm:leading-[1.45]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 flex items-center gap-1.5",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        <span className="h-1 w-12 rounded-full bg-brand-primary"></span>
        <span className="h-1 w-3 rounded-full bg-brand-primaryLight"></span>
      </div>
    </div>
  );
};
