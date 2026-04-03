"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/layout/NotificationBell";

const navLinks = [
  { href: "/news", label: "ข่าวสาร" },
  { href: "/shops", label: "ร้านค้า" },
  { href: "/tourism", label: "ท่องเที่ยว" },
  { href: "/jobs", label: "หางาน" },
  { href: "/board", label: "เว็บบอร์ด" },
  { href: "/marketplace", label: "ซื้อขาย" },
  { href: "/appointments", label: "จองคิว" },
];

export function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <span className="font-bold text-xl">ตำบลทับสะแก</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <NotificationBell />
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Shield className="h-4 w-4 mr-1" />
                    แอดมิน
                  </Button>
                </Link>
              )}
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {session.user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">ออกจากระบบ</span>
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                <User className="h-4 w-4 mr-1" />
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="text-sm font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors text-primary"
                onClick={() => setMobileOpen(false)}
              >
                <Shield className="h-4 w-4 inline mr-1" />
                แอดมิน
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
