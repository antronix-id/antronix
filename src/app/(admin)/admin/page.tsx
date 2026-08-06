"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FolderOpen,
  MessageSquareQuote,
  BarChart3,
  Inbox,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  portfolioCount: number;
  testimonialCount: number;
  contactCount: number;
  unreadCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [portfolioRes, testimonialRes, contactRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/testimonials"),
          fetch("/api/contact"),
        ]);

        const portfolio = portfolioRes.ok ? await portfolioRes.json() : [];
        const testimonials = testimonialRes.ok
          ? await testimonialRes.json()
          : [];
        const contacts = contactRes.ok ? await contactRes.json() : [];

        setStats({
          portfolioCount: Array.isArray(portfolio) ? portfolio.length : 0,
          testimonialCount: Array.isArray(testimonials)
            ? testimonials.length
            : 0,
          contactCount: Array.isArray(contacts) ? contacts.length : 0,
          unreadCount: Array.isArray(contacts)
            ? contacts.filter(
                (c: { isRead: boolean }) => !c.isRead
              ).length
            : 0,
        });
      } catch {
        console.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Portofolio",
      value: stats?.portfolioCount ?? 0,
      icon: FolderOpen,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Testimoni Klien",
      value: stats?.testimonialCount ?? 0,
      icon: MessageSquareQuote,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/10 text-purple-400",
    },
    {
      label: "Total Pesan Masuk",
      value: stats?.contactCount ?? 0,
      icon: Inbox,
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Pesan Belum Dibaca",
      value: stats?.unreadCount ?? 0,
      icon: Users,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10 text-amber-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/50 mt-1">
          Selamat datang di panel admin Antronix
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.label}
            className="relative overflow-hidden border-white/[0.08] bg-white/[0.02] p-5 gap-0"
          >
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-10 w-10 rounded-xl bg-white/5" />
                <div className="h-8 w-20 rounded-lg bg-white/5" />
                <div className="h-4 w-32 rounded bg-white/5" />
              </div>
            ) : (
              <>
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${card.bg}`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-bold text-white mt-3">
                  {card.value}
                </p>
                <p className="text-sm text-white/50 mt-1">{card.label}</p>
                {/* Gradient accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.color} opacity-40`}
                />
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card className="border-white/[0.08] bg-white/[0.02] p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Tambah Portofolio", href: "/admin/portfolio", icon: FolderOpen },
            { label: "Kelola Testimoni", href: "/admin/testimonials", icon: MessageSquareQuote },
            { label: "Lihat Pesan", href: "/admin/inbox", icon: Inbox },
            { label: "Edit Statistik", href: "/admin/stats", icon: BarChart3 },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="w-full">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 rounded-xl border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white/80 hover:text-white h-auto py-3 px-4"
              >
                <action.icon className="w-4 h-4 text-white/50" />
                <span>{action.label}</span>
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
