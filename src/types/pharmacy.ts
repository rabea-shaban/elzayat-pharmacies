export interface PharmacyInfo {
  name: string;
  doctorName: string;
  brandName: string;
  brandNameEn: string;
  doctorNameEn: string;
  tagline: string;
  welcomeMessage: string;
  historyText: string;
  since: number;
  phone: string;
  formattedPhone: string;
  whatsappNumber: string;
  address: {
    governorate: string;
    city: string;
    village: string;
    fullAddress: string;
    fullAddressEn: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
  };
  workingHours: {
    days: string;
    hours: string;
    is24Hours: boolean;
    notes: string;
  };
  social: {
    facebook: string;
    whatsapp: string;
    instagram?: string;
  };
  stats: {
    experienceYears: number;
    sinceYear: number;
    happyClients: string;
    medicinesAvailable: string;
  };
}
