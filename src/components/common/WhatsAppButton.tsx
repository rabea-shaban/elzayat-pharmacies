import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  variant?: "primary" | "floating" | "outline" | "inline";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "السلام عليكم، أود الاستفسار من صيدلية الدكتور محمد شعبان (صيدليات الزيات)",
  label = "WhatsApp",
  variant = "primary",
  className,
  size = "md",
}) => {
  const href = getWhatsAppBaseUrl(message);

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
    md: "text-sm px-4 py-2.5 rounded-xl gap-2",
    lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg focus:ring-emerald-500 active:scale-[0.98]",
    floating:
      "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl rounded-full p-3.5 sm:p-4 focus:ring-emerald-400 active:scale-95 animate-bounce-subtle",
    outline:
      "border border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-400 bg-white/80",
    inline:
      "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded-lg",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      <MessageCircle className={cn(size === "lg" ? "w-5 h-5" : "w-4 h-4")} />
      {label && <span>{label}</span>}
    </a>
  );
};
