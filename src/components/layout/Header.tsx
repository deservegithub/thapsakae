import Link from "next/link";
import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <span className="font-bold text-xl">ตำบลทับสะแก</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/news" className="text-sm font-medium hover:text-primary transition-colors">
              ข่าวสาร
            </Link>
            <Link href="/shops" className="text-sm font-medium hover:text-primary transition-colors">
              ร้านค้า
            </Link>
            <Link href="/tourism" className="text-sm font-medium hover:text-primary transition-colors">
              ท่องเที่ยว
            </Link>
            <Link href="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
              หางาน
            </Link>
            <Link href="/board" className="text-sm font-medium hover:text-primary transition-colors">
              เว็บบอร์ด
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              ซื้อขาย
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
