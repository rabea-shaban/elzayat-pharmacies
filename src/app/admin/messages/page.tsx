"use client";

import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Trash2,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Filter,
  Eye,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { ContactMessage } from "@/types/admin";

export default function AdminMessagesPage() {
  const { messages, markMessageAsRead, deleteMessage } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.phone.includes(searchQuery) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        filterType === "all"
          ? true
          : filterType === "unread"
          ? !msg.isRead
          : msg.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [messages, searchQuery, filterType]);

  const getMessageTypeBadge = (type: ContactMessage["type"]) => {
    switch (type) {
      case "consultation":
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">استشارة طبية</span>;
      case "prescription":
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">طلب روشتة</span>;
      case "complaint":
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">شكوى / اقتراح</span>;
      case "inquiry":
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">استفسار عام</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            <span>صندوق الرسائل والاستشارات</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            متابعة استفسارات العملاء والاستشارات الصيدلانية والرد المباشر عبر الواتساب
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 font-bold">
            {messages.filter((m) => !m.isRead).length} غير مقروءة
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث بالاسم، رقم الهاتف، الموضوع، أو نص الرسالة..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 sm:w-60">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">جميع الرسائل ({messages.length})</option>
            <option value="unread">غير المقروءة فقط</option>
            <option value="inquiry">استفسارات عامة</option>
            <option value="consultation">استشارات طبية</option>
            <option value="prescription">طلبات روشتات</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-semibold">لا توجد رسائل مطابقة</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-slate-900/80 border rounded-3xl p-5 shadow-lg transition-all ${
                msg.isRead
                  ? "border-slate-800/80"
                  : "border-emerald-500/50 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {!msg.isRead && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    )}
                    <h3 className="text-base font-bold text-white">{msg.subject}</h3>
                    {getMessageTypeBadge(msg.type)}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-bold text-slate-200">{msg.name}</span>
                    <span>•</span>
                    <span className="font-sans text-slate-300">{msg.phone}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(msg.createdAt).toLocaleString("ar-EG")}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-3.5 rounded-2xl border border-slate-700/40">
                    {msg.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center md:flex-col justify-end gap-2 shrink-0 pt-2 md:pt-0">
                  {/* Mark as read */}
                  {!msg.isRead && (
                    <button
                      onClick={() => markMessageAsRead(msg.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تحديد كمقروء</span>
                    </button>
                  )}

                  {/* Reply WhatsApp */}
                  <a
                    href={`https://wa.me/2${msg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `أهلاً بك ${msg.name}، معك د. محمد شعبان من صيدليات الزيات بخصوص استفسارك: "${msg.subject}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>رد عبر واتساب</span>
                  </a>

                  {/* Call */}
                  <a
                    href={`tel:${msg.phone}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="اتصال هاتفي"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (confirm("هل تريد حذف هذه الرسالة؟")) {
                        deleteMessage(msg.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                    title="حذف الرسالة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
