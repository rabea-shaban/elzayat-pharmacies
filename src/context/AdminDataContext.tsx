"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Service } from "@/types/service";
import { Offer } from "@/types/offer";
import { PharmacyInfo } from "@/types/pharmacy";
import { Order, OrderStatus, ContactMessage } from "@/types/admin";

import { products as defaultProducts } from "@/data/products";
import { categories as defaultCategories } from "@/data/categories";
import { services as defaultServices } from "@/data/services";
import { offers as defaultOffers } from "@/data/offers";
import { pharmacyInfo as defaultPharmacyInfo } from "@/data/pharmacy";
import { initialOrders, initialMessages } from "@/data/adminInitialData";

interface AdminDataContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id"> & { id?: string }) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string) => void;

  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">) => void;
  deleteOrder: (id: string) => void;

  // Offers
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id"> & { id?: string }) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, "id"> & { id?: string }) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Services
  services: Service[];
  addService: (service: Omit<Service, "id"> & { id?: string }) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Messages
  messages: ContactMessage[];
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Pharmacy Info
  pharmacyInfo: PharmacyInfo;
  updatePharmacyInfo: (info: Partial<PharmacyInfo>) => void;

  // System
  resetAllDataToDefault: () => void;
}

const STORAGE_KEYS = {
  PRODUCTS: "elzayat_admin_products",
  ORDERS: "elzayat_admin_orders",
  OFFERS: "elzayat_admin_offers",
  CATEGORIES: "elzayat_admin_categories",
  SERVICES: "elzayat_admin_services",
  MESSAGES: "elzayat_admin_messages",
  PHARMACY: "elzayat_admin_pharmacy_info",
};

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [offers, setOffers] = useState<Offer[]>(defaultOffers);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [pharmacyInfo, setPharmacyInfo] = useState<PharmacyInfo>(defaultPharmacyInfo);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (storedOffers) setOffers(JSON.parse(storedOffers));

      const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (storedMessages) setMessages(JSON.parse(storedMessages));

      const storedPharmacy = localStorage.getItem(STORAGE_KEYS.PHARMACY);
      if (storedPharmacy) setPharmacyInfo(JSON.parse(storedPharmacy));
    } catch (e) {
      console.error("Error reading stored data", e);
    }
  }, []);

  // Sync to LocalStorage
  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key}`, e);
    }
  };

  // Products Handlers
  const addProduct = (product: Omit<Product, "id"> & { id?: string }) => {
    const newId = product.id || `prod-${Date.now()}`;
    const newProduct: Product = { ...product, id: newId };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const updateProduct = (id: string, patch: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const toggleProductAvailability = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
    );
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  // Orders Handlers
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === id
        ? { ...o, status, updatedAt: new Date().toISOString() }
        : o
    );
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);
  };

  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">) => {
    const orderNumber = `EZ-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, "0")}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);
  };

  // Offers Handlers
  const addOffer = (offer: Omit<Offer, "id"> & { id?: string }) => {
    const newId = offer.id || `offer-${Date.now()}`;
    const newOffer: Offer = { ...offer, id: newId };
    const updated = [newOffer, ...offers];
    setOffers(updated);
    saveToStorage(STORAGE_KEYS.OFFERS, updated);
  };

  const updateOffer = (id: string, patch: Partial<Offer>) => {
    const updated = offers.map((o) => (o.id === id ? { ...o, ...patch } : o));
    setOffers(updated);
    saveToStorage(STORAGE_KEYS.OFFERS, updated);
  };

  const deleteOffer = (id: string) => {
    const updated = offers.filter((o) => o.id !== id);
    setOffers(updated);
    saveToStorage(STORAGE_KEYS.OFFERS, updated);
  };

  // Categories Handlers
  const addCategory = (cat: Omit<Category, "id"> & { id?: string }) => {
    const newId = cat.id || `cat-${Date.now()}`;
    const newCat: Category = { ...cat, id: newId };
    const updated = [...categories, newCat];
    setCategories(updated);
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
  };

  const updateCategory = (id: string, patch: Partial<Category>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...patch } : c));
    setCategories(updated);
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
  };

  // Services Handlers
  const addService = (srv: Omit<Service, "id"> & { id?: string }) => {
    const newId = srv.id || `srv-${Date.now()}`;
    const newSrv: Service = { ...srv, id: newId };
    const updated = [...services, newSrv];
    setServices(updated);
    saveToStorage(STORAGE_KEYS.SERVICES, updated);
  };

  const updateService = (id: string, patch: Partial<Service>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...patch } : s));
    setServices(updated);
    saveToStorage(STORAGE_KEYS.SERVICES, updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveToStorage(STORAGE_KEYS.SERVICES, updated);
  };

  // Messages Handlers
  const markMessageAsRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, isRead: true } : m));
    setMessages(updated);
    saveToStorage(STORAGE_KEYS.MESSAGES, updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveToStorage(STORAGE_KEYS.MESSAGES, updated);
  };

  // Pharmacy Info
  const updatePharmacyInfo = (patch: Partial<PharmacyInfo>) => {
    const updated = { ...pharmacyInfo, ...patch };
    setPharmacyInfo(updated);
    saveToStorage(STORAGE_KEYS.PHARMACY, updated);
  };

  // Reset to default
  const resetAllDataToDefault = () => {
    setProducts(defaultProducts);
    setOrders(initialOrders);
    setOffers(defaultOffers);
    setCategories(defaultCategories);
    setServices(defaultServices);
    setMessages(initialMessages);
    setPharmacyInfo(defaultPharmacyInfo);

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,

        orders,
        updateOrderStatus,
        addOrder,
        deleteOrder,

        offers,
        addOffer,
        updateOffer,
        deleteOffer,

        categories,
        addCategory,
        updateCategory,
        deleteCategory,

        services,
        addService,
        updateService,
        deleteService,

        messages,
        markMessageAsRead,
        deleteMessage,

        pharmacyInfo,
        updatePharmacyInfo,

        resetAllDataToDefault,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }
  return context;
}
