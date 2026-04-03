import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Store, MapPin, Briefcase, MessageSquare, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CategorySectionProps {
  counts?: {
    news: number;
    shops: number;
    tourism: number;
    jobs: number;
    board: number;
    marketplace: number;
  };
}

export function CategorySection({ counts }: CategorySectionProps) {
  const categories = [
    { name: "ข่าวสาร", icon: Newspaper, href: "/news", color: "bg-blue-500", count: counts?.news ?? 0 },
    { name: "ร้านค้า", icon: Store, href: "/shops", color: "bg-green-500", count: counts?.shops ?? 0 },
    { name: "ท่องเที่ยว", icon: MapPin, href: "/tourism", color: "bg-purple-500", count: counts?.tourism ?? 0 },
    { name: "หางาน", icon: Briefcase, href: "/jobs", color: "bg-orange-500", count: counts?.jobs ?? 0 },
    { name: "เว็บบอร์ด", icon: MessageSquare, href: "/board", color: "bg-pink-500", count: counts?.board ?? 0 },
    { name: "ซื้อขาย", icon: ShoppingCart, href: "/marketplace", color: "bg-teal-500", count: counts?.marketplace ?? 0 },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link key={category.name} href={category.href}>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} รายการ</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
