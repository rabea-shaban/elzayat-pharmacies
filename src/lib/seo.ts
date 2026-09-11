import { pharmacyInfo } from "@/data/pharmacy";

export function generatePharmacySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": "https://elzayatpharmacies.com/#pharmacy",
    name: pharmacyInfo.name,
    alternateName: [pharmacyInfo.brandName, pharmacyInfo.brandNameEn, pharmacyInfo.doctorNameEn],
    description: pharmacyInfo.welcomeMessage,
    url: "https://elzayatpharmacies.com",
    telephone: `+${pharmacyInfo.whatsappNumber}`,
    priceRange: "$$",
    image: "https://elzayatpharmacies.com/images/hero/pharmacy-front.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: pharmacyInfo.address.village,
      addressLocality: pharmacyInfo.address.city,
      addressRegion: pharmacyInfo.address.governorate,
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.5983",
      longitude: "30.8211",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "02:00",
      },
    ],
    sameAs: [
      pharmacyInfo.social.facebook,
      `https://wa.me/${pharmacyInfo.whatsappNumber}`,
    ],
  };
}
