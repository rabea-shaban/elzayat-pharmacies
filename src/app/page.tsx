import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MedicineRequestSection } from "@/components/home/MedicineRequestSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { OffersSection } from "@/components/home/OffersSection";
import { NewBeginningSection } from "@/components/home/NewBeginningSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Quick Actions (4 Cards) */}
      <QuickActions />

      {/* 3. Product Categories */}
      <CategoriesSection />

      {/* 4. About Pharmacy & History since 2019 */}
      <AboutSection />

      {/* 5. Medical & Pharmaceutical Services */}
      <ServicesSection />

      {/* 6. Instant Medicine Request & Prescription Form */}
      <MedicineRequestSection />

      {/* 7. Featured & Top Products */}
      <FeaturedProductsSection />

      {/* 8. Exclusive Offers & Bundles */}
      <OffersSection />

      {/* 9. Special "New Beginning" Branding Section */}
      <NewBeginningSection />

      {/* 10. Pharmacy Photo Gallery */}
      <GalleryPreviewSection />

      {/* 11. Customer Reviews */}
      <ReviewsSection />

      {/* 12. Location & Google Maps */}
      <LocationSection />

      {/* 13. Contact & Direct Help CTA */}
      <ContactCtaSection />
    </>
  );
}
