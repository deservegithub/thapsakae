import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
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
import { AdminMobileNav } from "@/components/admin/mobile-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if ((session.user as any).role !== "admin") {
    redirect("/");
  }

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[260px] bg-slate-900 min-h-screen fixed left-0 top-0">
          {/* Logo */}
          <div className="p-5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">ทับสะแก</p>
                <p className="text-[10px] text-slate-400 leading-tight flex items-center gap-1">
                  <Shield className="h-2.5 w-2.5" /> Admin Panel
                </p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">เมนูหลัก</p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all group"
              >
                <item.icon className="h-[18px] w-[18px] text-slate-400 group-hover:text-sky-400 transition-colors" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{session.user.email}</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับหน้าหลัก
            </Link>
          </div>
        </aside>

        {/* Mobile Nav */}
        <AdminMobileNav userName={session.user.name || ""} />

        {/* Main Content */}
        <main className="flex-1 md:ml-[260px]">
          <div className="p-4 pt-16 md:pt-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
