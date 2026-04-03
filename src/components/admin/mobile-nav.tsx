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
  LogOut,
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg pt-14"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <p className="text-sm font-medium px-3 mb-3">{userName}</p>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/" onClick={() => setOpen(false)}>
                  <LogOut className="h-4 w-4 mr-2" />
                  กลับหน้าหลัก
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
