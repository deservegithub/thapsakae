"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  Newspaper,
  Store,
  MapPin,
  Briefcase,
  MessageSquare,
  ShoppingCart,
  CalendarDays,
  Users,
  ArrowLeft,
  Waves,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "แดชบอร์ด" },
  { href: "/admin/news", icon: Newspaper, label: "ข่าวสาร" },
  { href: "/admin/shops", icon: Store, label: "ร้านค้า" },
  { href: "/admin/tourism", icon: MapPin, label: "ท่องเที่ยว" },
  { href: "/admin/jobs", icon: Briefcase, label: "หางาน" },
  { href: "/admin/board", icon: MessageSquare, label: "เว็บบอร์ด" },
  { href: "/admin/marketplace", icon: ShoppingCart, label: "ซื้อขาย" },
  { href: "/admin/appointments", icon: CalendarDays, label: "จองคิว" },
  { href: "/admin/users", icon: Users, label: "ผู้ใช้งาน" },
];

interface AdminMobileNavProps {
  userName: string;
}

export function AdminMobileNav({ userName }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center">
            <Waves className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">ทับสะแก</p>
            <p className="text-[9px] text-slate-400 leading-tight flex items-center gap-0.5">
              <Shield className="h-2 w-2" /> Admin
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay + Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 left-0 w-[260px] h-full bg-slate-900 shadow-2xl pt-[60px]"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="px-3 py-4 space-y-0.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">เมนูหลัก</p>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500/20 to-teal-500/20 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                    {item.label}
                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-400" />}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-white truncate">{userName}</p>
              </div>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                กลับหน้าหลัก
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
