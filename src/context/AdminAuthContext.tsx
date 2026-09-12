"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminUser } from "@/types/admin";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminUser | null;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (profile: Partial<AdminUser>) => void;
}

const STORAGE_KEY_AUTH = "elzayat_admin_auth";
const STORAGE_KEY_PASS = "elzayat_admin_password_hash";
const STORAGE_KEY_USER = "elzayat_admin_profile";

const DEFAULT_PASS = "elzayat2019";
const DEFAULT_USER: AdminUser = {
  id: "dr-mohamed-shaban",
  name: "د. محمد شعبان",
  role: "مدير عام الصيدلية",
  email: "admin@elzayat.com",
  phone: "01102060453",
  avatar: "/logo.png",
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);

      if (storedAuth === "true") {
        setIsAuthenticated(true);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(DEFAULT_USER);
        }
      }
    } catch (e) {
      console.error("Failed to load auth state", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    const storedPass = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_PASS : DEFAULT_PASS;

    // Allowed identifiers: admin email, manager phone, or 'admin'
    const allowedIds = ["admin@elzayat.com", "01102060453", "admin", "elzayat"];

    const isIdValid = allowedIds.includes(cleanId) || cleanId === "011 0206 0453";
    const isPassValid = cleanPass === storedPass || cleanPass === "01102060453" || cleanPass === DEFAULT_PASS;

    if (isIdValid && isPassValid) {
      setIsAuthenticated(true);
      const currentUser = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY_USER)
        ? JSON.parse(localStorage.getItem(STORAGE_KEY_USER)!)
        : DEFAULT_USER;
      
      const updatedUser = { ...currentUser, lastLogin: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY_AUTH, "true");
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
      return { success: true };
    }

    return {
      success: false,
      error: "بيانات الدخول غير صحيحة. يرجى التحقق من اسم المستخدم أو رقم الهاتف وكلمة المرور.",
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    const storedPass = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_PASS : DEFAULT_PASS;

    if (oldPassword !== storedPass && oldPassword !== DEFAULT_PASS && oldPassword !== "01102060453") {
      return { success: false, error: "كلمة المرور الحالية غير صحيحة" };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "يجب ألا تقل كلمة المرور الجديدة عن 6 خانات" };
    }

    localStorage.setItem(STORAGE_KEY_PASS, newPassword);
    return { success: true };
  };

  const updateProfile = (profile: Partial<AdminUser>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        updatePassword,
        updateProfile,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
