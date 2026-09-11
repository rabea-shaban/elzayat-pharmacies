import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Pill,
  Truck,
  HeartHandshake,
} from "lucide-react";
import { products } from "@/data/products";
import { pharmacyInfo } from "@/data/pharmacy";
import { createWhatsAppProductInquiryLink } from "@/lib/whatsapp";
import { Badge } from "@/components/common/Badge";
import { ProductCard } from "@/components/products/ProductCard";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "المنتج غير موجود",
    };
  }

  return {
    title: `${product.name} | ${pharmacyInfo.brandName}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - صيدلية د. محمد شعبان`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappUrl = createWhatsAppProductInquiryLink(
    product.name,
    product.categoryName
  );

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-10 sm:py-16 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <NextLink
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-brand-primary transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى دليل المنتجات</span>
          </NextLink>
        </div>

        {/* Product Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                />

                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="gold" size="md">
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div>
                <span className="text-xs font-bold text-brand-primary bg-sky-50 px-3 py-1 rounded-full inline-block mb-3 border border-sky-200">
                  {product.categoryName}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-snug">
                  {product.name}
                </h1>
                {product.nameEn && (
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 dir-ltr text-right">
                    {product.nameEn}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-xs font-bold text-slate-900 mb-2.5">
                    الفوائد والمميزات الرئيسية:
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Instructions */}
              {product.usage && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/60">
                  <h3 className="text-xs font-bold text-brand-navy mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    طريقة الاستخدام المقترحة:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">أصلي 100% ومضمون</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-primary shrink-0" />
                  <span className="text-xs font-bold text-slate-800">توصيل سريع للقيات والعدوة</span>
                </div>
              </div>

              {/* WhatsApp Inquiry Button */}
              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>طلب المنتج أو الاستفسار عبر WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-6">
              منتجات مشابهة قد تهمك
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
