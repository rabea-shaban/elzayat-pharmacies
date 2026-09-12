export type OrderStatus =
  | "pending" // قيد الانتظار
  | "confirmed" // تم التأكيد
  | "preparing" // جاري التجهيز
  | "delivering" // جاري التوصيل
  | "completed" // مكتمل
  | "cancelled"; // ملغي

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price?: number;
  requiresPrescription?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  prescriptionImage?: string;
  notes?: string;
  totalAmount?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  type: "inquiry" | "prescription" | "complaint" | "consultation";
  isRead: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  lastLogin?: string;
}
