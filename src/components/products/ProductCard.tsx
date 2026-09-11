"use client";

import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { Product } from "@/types/product";
import { createWhatsAppProductInquiryLink } from "@/lib/whatsapp";
import { Badge } from "../common/Badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappUrl = createWhatsAppProductInquiryLink(
    product.name,
    product.categoryName
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-primary/40 shadow-card hover:shadow-cardHover transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="gold" size="sm">
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Prescription notice badge */}
        {product.requiresPrescription && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
              يلزم روشتة
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-brand-primary mb-1.5 block">
          {product.categoryName}
        </span>

        <NextLink href={`/products/${product.slug}`} className="group-hover:text-brand-primary transition-colors">
          <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </NextLink>

        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Trust Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            أصلي ومضمون
          </span>
          <NextLink
            href={`/products/${product.slug}`}
            className="text-slate-600 hover:text-brand-primary font-medium flex items-center gap-1 group/link"
          >
            <span>التفاصيل</span>
            <ArrowLeft className="w-3 h-3 group-hover/link:-translate-x-0.5 transition-transform" />
          </NextLink>
        </div>

        {/* WhatsApp Request Button */}
        <div className="mt-3.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200/80 hover:border-emerald-600 text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>طلب / استفسار عبر WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
