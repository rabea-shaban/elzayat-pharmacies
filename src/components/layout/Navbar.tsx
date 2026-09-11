"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Pill,
  Clock,
  MapPin,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { cn } from "@/lib/utils";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/products", label: "المنتجات" },
  { href: "/offers", label: "العروض" },
  { href: "/gallery", label: "المعرض" },
  { href: "/contact", label: "تواصل معنا" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 border-b border-white/10 hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-amber-300 font-semibold whitespace-nowrap">
              منذ 2019 | بحلتها وتجربتها الجديدة
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-brand-primaryLight" />
              {pharmacyInfo.address.fullAddress}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {pharmacyInfo.workingHours.hours}
            </span>
            <span className="text-white/20">|</span>
            <a
              href={`tel:${pharmacyInfo.phone}`}
              className="flex items-center gap-1.5 text-white hover:text-brand-primaryLight transition-colors font-bold dir-ltr whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{pharmacyInfo.formattedPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 bg-white/95 backdrop-blur-md",
          scrolled
            ? "shadow-md py-3 border-b border-slate-200"
            : "py-4 sm:py-5 border-b border-slate-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo - Logo Only (Prominent Size) */}
            <NextLink href="/" className="inline-flex items-center group shrink-0 py-0.5" aria-label="الرئيسية - صيدليات الزيات">
              <Image
                src="/logo.png"
                alt="صيدليات الزيات - Elzayat Pharmacies"
                width={240}
                height={80}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                priority
              />
            </NextLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <NextLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-sm md:text-[15px] font-bold transition-all whitespace-nowrap",
                      isActive
                        ? "text-brand-primary bg-sky-50 shadow-sm"
                        : "text-slate-700 hover:text-brand-primary hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </NextLink>
                );
              })}
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              {/* Call Button */}
              <a
                href={`tel:${pharmacyInfo.phone}`}
                className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>اتصل الآن</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={getWhatsAppBaseUrl("السلام عليكم دكتور، أود الاستفسار من صيدليات الزيات")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>واتساب الصيدلية</span>
              </a>

              {/* Order Medicine Button */}
              <NextLink
                href="/order"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-brand-primary hover:bg-brand-primaryDark shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>اطلب دواء</span>
              </NextLink>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <a
                href={getWhatsAppBaseUrl("السلام عليكم")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-emerald-600 bg-emerald-50 rounded-xl sm:hidden"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                aria-label="القائمة"
              >
                {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {isOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <NextLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-bold transition-colors text-right",
                      isActive
                        ? "bg-sky-50 text-brand-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </NextLink>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${pharmacyInfo.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>اتصال هاتفياً</span>
              </a>
              <NextLink
                href="/order"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-bold transition-colors shadow-sm"
              >
                <Pill className="w-4 h-4" />
                <span>اطلب دواء</span>
              </NextLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
