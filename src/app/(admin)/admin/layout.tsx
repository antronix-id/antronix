"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FolderOpen,
  MessageSquareQuote,
  BarChart3,
  Award,
  Inbox,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Agency Info", href: "/admin/agency", icon: Building2 },
  { label: "Layanan", href: "/admin/services", icon: Briefcase },
  { label: "Portofolio", href: "/admin/portfolio", icon: FolderOpen },
  { label: "Testimoni", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Statistik", href: "/admin/stats", icon: BarChart3 },
  { label: "Keunggulan", href: "/admin/why-us", icon: Award },
  { label: "Inbox", href: "/admin/inbox", icon: Inbox },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.06] bg-[#0d0d0d] transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-sm font-bold text-white">AR</span>
            </div>
            <span className="font-semibold text-white text-sm">
              Admin Panel
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                )}
              >
                <item.icon
                  className={cn(
                    "w-[18px] h-[18px] shrink-0 transition-colors",
                    isActive ? "text-blue-400" : "text-white/30 group-hover:text-white/60"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white/30" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="border-t border-white/[0.06] px-3 py-4">
          <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 mb-2 bg-white/[0.02]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-xs text-white/40 truncate">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 rounded-xl text-red-400/80 hover:bg-red-500/10 hover:text-red-400 font-medium"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </Button>

          <div className="flex-1" />

          <Link href="/" target="_blank">
            <Button variant="outline" size="xs" className="gap-1.5 text-xs text-white/70 border-white/10 hover:text-white">
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
