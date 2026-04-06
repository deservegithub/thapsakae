"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, Shield, Search, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/layout/NotificationBell";

const navLinks = [
  { href: "/news", label: "ข่าวสาร" },
  { href: "/shops", label: "ร้านค้า" },
  { href: "/tourism", label: "ท่องเที่ยว" },
  { href: "/jobs", label: "หางาน" },
  { href: "/board", label: "เว็บบอร์ด" },
  // { href: "/marketplace", label: "ซื้อขาย" }, // ปิดไว้ชั่วคราว
];

export function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = (session?.user as any)?.role === "admin";
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight gradient-text">ทับสะแก</span>
              <span className="text-[10px] text-muted-foreground leading-tight -mt-0.5 hidden sm:block">เมืองมะพร้าวทะเล</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-sky-500 to-teal-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-xl hover:bg-primary/5 hover:text-primary">
              <Search className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          {session?.user ? (
            <>
              <NotificationBell />
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="hidden sm:flex rounded-xl hover:bg-primary/5 hover:text-primary gap-1.5">
                    <Shield className="h-4 w-4" />
                    แอดมิน
                  </Button>
                </Link>
              )}
              <div className="hidden sm:flex items-center gap-2 px-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium max-w-24 truncate">{session.user.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-red-50 hover:text-red-500"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 shadow-md shadow-sky-500/20 text-white border-0">
                <User className="h-4 w-4 mr-1.5" />
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="container py-4 flex flex-col gap-1 border-t border-border/50">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 text-sm font-medium py-3 px-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500/10 to-teal-500/10 text-primary"
                    : "hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
          <Link href="/search" className="flex items-center gap-3 text-sm font-medium py-3 px-4 rounded-xl hover:bg-muted" onClick={() => setMobileOpen(false)}>
            <Search className="h-4 w-4" /> ค้นหา
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-3 text-sm font-medium py-3 px-4 rounded-xl bg-primary/5 text-primary mt-2"
              onClick={() => setMobileOpen(false)}
            >
              <Shield className="h-4 w-4" />
              แอดมิน
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
