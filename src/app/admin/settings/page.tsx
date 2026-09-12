"use client";

import React, { useState } from "react";
import {
  Settings,
  Lock,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Download,
  Save,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminData } from "@/context/AdminDataContext";

export default function AdminSettingsPage() {
  const { user, updatePassword } = useAdminAuth();
  const { pharmacyInfo, updatePharmacyInfo, resetAllDataToDefault, products, orders, offers } = useAdminData();

  // Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  // Pharmacy Info Form State
  const [infoData, setInfoData] = useState({
    name: pharmacyInfo.name,
    doctorName: pharmacyInfo.doctorName,
    phone: pharmacyInfo.phone,
    whatsappNumber: pharmacyInfo.whatsappNumber,
    fullAddress: pharmacyInfo.address.fullAddress,
    workingHours: pharmacyInfo.workingHours.hours,
    workingNotes: pharmacyInfo.workingHours.notes || "",
  });
  const [infoSuccess, setInfoSuccess] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (newPassword !== confirmPassword) {
      setPassError("كلمة المرور الجديدة غير متطابقة مع تأكيد كلمة المرور");
      return;
    }

    const res = await updatePassword(oldPassword, newPassword);
    if (res.success) {
      setPassSuccess("تم تغيير كلمة المرور بنجاح! يمكنك استخدامها لتسجيل الدخول القادم.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPassError(res.error || "حدث خطأ أثناء تغيير كلمة المرور");
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePharmacyInfo({
      name: infoData.name,
      doctorName: infoData.doctorName,
      phone: infoData.phone,
      whatsappNumber: infoData.whatsappNumber,
      address: {
        ...pharmacyInfo.address,
        fullAddress: infoData.fullAddress,
      },
      workingHours: {
        ...pharmacyInfo.workingHours,
        hours: infoData.workingHours,
        notes: infoData.workingNotes,
      },
    });

    setInfoSuccess(true);
    setTimeout(() => setInfoSuccess(false), 4000);
  };

  const exportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      pharmacyInfo,
      products,
      orders,
      offers,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `elzayat-pharmacy-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-emerald-400" />
          <span>إعدادات الصيدلية وأمان لوحة المدير</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          تعديل أرقام التواصل وساعات العمل، وتغيير كلمة مرور المدير وتصدير البيانات
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pharmacy Contact & Info Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <Phone className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">بيانات التواصل والتشغيل</h2>
          </div>

          {infoSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>تم حفظ بيانات الصيدلية بنجاح!</span>
            </div>
          )}

          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                اسم الصيدلية
              </label>
              <input
                type="text"
                required
                value={infoData.name}
                onChange={(e) => setInfoData({ ...infoData, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                اسم الصيدلي المسؤول
              </label>
              <input
                type="text"
                required
                value={infoData.doctorName}
                onChange={(e) => setInfoData({ ...infoData, doctorName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رقم هاتف الاتصال
                </label>
                <input
                  type="text"
                  required
                  value={infoData.phone}
                  onChange={(e) => setInfoData({ ...infoData, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رقم الواتساب (بدون +)
                </label>
                <input
                  type="text"
                  required
                  value={infoData.whatsappNumber}
                  onChange={(e) => setInfoData({ ...infoData, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                العنوان التفصيلي
              </label>
              <input
                type="text"
                required
                value={infoData.fullAddress}
                onChange={(e) => setInfoData({ ...infoData, fullAddress: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                مواعيد وساعات العمل
              </label>
              <input
                type="text"
                required
                value={infoData.workingHours}
                onChange={(e) => setInfoData({ ...infoData, workingHours: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                ملاحظات خدمة الطوارئ والتوصيل
              </label>
              <input
                type="text"
                value={infoData.workingNotes}
                onChange={(e) => setInfoData({ ...infoData, workingNotes: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>حفظ بيانات الصيدلية</span>
            </button>
          </form>
        </div>

        {/* Manager Password & Security */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">تغيير كلمة مرور المدير</h2>
            </div>

            {passError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-bold animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  كلمة المرور الحالية *
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  كلمة المرور الجديدة (6 خانات على الأقل) *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  تأكيد كلمة المرور الجديدة *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>تحديث كلمة المرور</span>
              </button>
            </form>
          </div>

          {/* Backup and Factory Reset */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>النسخ الاحتياطي والبيانات</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={exportBackup}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>تصدير نسخة احتياطية (JSON)</span>
              </button>

              <button
                onClick={() => {
                  if (confirm("هل ترغب بالفعل في إعادة تعيين كافة البيانات إلى الحالة الافتراضية؟")) {
                    resetAllDataToDefault();
                    alert("تمت استعادة البيانات الافتراضية بنجاح.");
                  }
                }}
                className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>استعادة البيانات الافتراضية</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
