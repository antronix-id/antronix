"use client";

import { useEffect, useState } from "react";
import { Inbox, Mail, Phone, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      console.error("Gagal mengambil pesan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function markAsRead(id: number) {
    try {
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    } catch {
      console.error("Gagal update status");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Inbox className="w-6 h-6 text-teal-400" />
          Pesan Masuk (Inbox)
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Pesan dari formulir kontak di website
        </p>
      </div>

      {messages.length === 0 ? (
        <Card className="border-white/[0.08] bg-white/[0.02] p-12 text-center text-white/40">
          Belum ada pesan masuk.
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`p-5 transition-all border ${
                msg.isRead
                  ? "border-white/[0.08] bg-white/[0.01]"
                  : "border-teal-500/30 bg-teal-500/[0.03]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-white">{msg.name}</div>
                  {!msg.isRead && (
                    <Badge variant="outline" className="border-teal-500/30 bg-teal-500/20 text-teal-300 uppercase tracking-wider text-[10px]">
                      Pesan Baru
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(msg.createdAt).toLocaleString("id-ID")}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-white/60 mb-3">
                <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3.5 h-3.5" /> {msg.email}
                </a>
                {msg.phone && (
                  <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 hover:text-white">
                    <Phone className="w-3.5 h-3.5" /> {msg.phone}
                  </a>
                )}
              </div>

              {msg.subject && (
                <p className="text-sm font-medium text-white/90 mb-2">
                  Subjek: {msg.subject}
                </p>
              )}

              <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </p>

              {!msg.isRead && (
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(msg.id)}
                    className="gap-1.5 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
                  >
                    <CheckCircle className="w-4 h-4" /> Tandai Sudah Dibaca
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
