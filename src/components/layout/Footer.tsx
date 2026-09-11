import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Pill,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  ChevronLeft,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="inline-block bg-white/95 p-2 rounded-2xl shadow-sm">
              <Image
                src="/logo.png"
                alt={pharmacyInfo.brandName}
                width={160}
                height={52}
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              شكل جديد، تجربة أفضل، ونفس الثقة الممتدة منذ عام 2019 في خدمة أهالينا بقرية القيات ومركز العدوة ومحافظة المنيا.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>مرخصة ومعتمدة رسمياً منذ 2019</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <NextLink href="/" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  الرئيسية
                </NextLink>
              </li>
              <li>
                <NextLink href="/about" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  من نحن (قصة النجاح منذ 2019)
                </NextLink>
              </li>
              <li>
                <NextLink href="/services" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  خدماتنا الطبية والصيدلانية
                </NextLink>
              </li>
              <li>
                <NextLink href="/products" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  دليل المنتجات والأقسام
                </NextLink>
              </li>
              <li>
                <NextLink href="/order" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  اطلب دواء / أرسل روشتة
                </NextLink>
              </li>
              <li>
                <NextLink href="/offers" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  عروض وباقات العناية
                </NextLink>
              </li>
              <li>
                <NextLink href="/gallery" className="hover:text-brand-primaryLight transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  معرض صور الصيدلية
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Working Hours & Health */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              مواعيد العمل والخدمة
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">{pharmacyInfo.workingHours.days}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{pharmacyInfo.workingHours.hours}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <p className="font-medium text-emerald-300 mb-1">⚡ خدمة الطوارئ والتوصيل:</p>
                <p>استقبال طلبات الأدوية والاستشارات متاح عبر واتساب على مدار اليوم.</p>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              بيانات التواصل والمقر
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                <span>{pharmacyInfo.address.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${pharmacyInfo.phone}`}
                  className="hover:text-brand-primaryLight transition-colors font-semibold dir-ltr text-white"
                >
                  {pharmacyInfo.formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppBaseUrl("السلام عليكم دكتور")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400"
                >
                  تواصل معنا عبر واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {pharmacyInfo.brandNameEn}. جميع الحقوق محفوظة لـ {pharmacyInfo.name}.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>صُنعت بكل</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>لخدمة ورعاية صحتكم</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
