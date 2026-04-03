import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Newspaper, 
  Store, 
  MapPin, 
  Briefcase, 
  MessageSquare, 
  ShoppingCart,
  LogOut 
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden md:block w-64 bg-white border-r min-h-screen fixed left-0 top-0">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">ตำบลทับสะแก</p>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">{session.user.email}</p>
            </div>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2" />
                กลับหน้าหลัก
              </Link>
            </Button>
          </div>
        </aside>

        {/* Mobile Nav */}
        <AdminMobileNav userName={session.user.name || ""} />

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="p-4 pt-16 md:pt-8 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
