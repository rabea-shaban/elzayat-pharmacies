import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileFloatingBar } from "@/components/layout/MobileFloatingBar";
import { pharmacyInfo } from "@/data/pharmacy";
import { generatePharmacySchema } from "@/lib/seo";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A1D37",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${pharmacyInfo.name} | ${pharmacyInfo.brandName} - منذ 2019`,
    template: `%s | ${pharmacyInfo.brandName}`,
  },
  description:
    "صيدلية الدكتور محمد شعبان - إحدى صيدليات الزيات منذ 2019 بقرية القيات مركز العدوة المنيا. اطلب دواء أو أرسل روشتة واستشر الصيدلي مباشرة عبر واتساب.",
  keywords: [
    "صيدلية الدكتور محمد شعبان",
    "صيدليات الزيات",
    "صيدلية القيات",
    "صيدلية العدوة",
    "صيدلية المنيا",
    "اطلب دواء",
    "روشتة",
    "أدوية القيات",
    "Elzayat Pharmacies",
    "Dr Mohamed Shaban",
  ],
  authors: [{ name: pharmacyInfo.doctorName }],
  openGraph: {
    title: `${pharmacyInfo.name} | ${pharmacyInfo.brandName}`,
    description: pharmacyInfo.welcomeMessage,
    type: "website",
    locale: "ar_EG",
    url: "https://elzayatpharmacies.com",
    siteName: pharmacyInfo.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pharmacyInfo.name} | ${pharmacyInfo.brandName}`,
    description: pharmacyInfo.welcomeMessage,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaJson = JSON.stringify(generatePharmacySchema());

  return (
    <html lang="ar" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      </head>
      <body className="font-vazirmatn antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileFloatingBar />
      </body>
    </html>
  );
}
