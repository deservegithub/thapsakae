import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Store, MapPin, Briefcase, MessageSquare, ShoppingCart } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "ข่าวสาร",
    icon: Newspaper,
    href: "/news",
    color: "bg-blue-500",
    count: 156,
  },
  {
    name: "ร้านค้า",
    icon: Store,
    href: "/shops",
    color: "bg-green-500",
    count: 89,
  },
  {
    name: "ท่องเที่ยว",
    icon: MapPin,
    href: "/tourism",
    color: "bg-purple-500",
    count: 45,
  },
  {
    name: "หางาน",
    icon: Briefcase,
    href: "/jobs",
    color: "bg-orange-500",
    count: 23,
  },
  {
    name: "เว็บบอร์ด",
    icon: MessageSquare,
    href: "/board",
    color: "bg-pink-500",
    count: 234,
  },
  {
    name: "ซื้อขาย",
    icon: ShoppingCart,
    href: "/marketplace",
    color: "bg-teal-500",
    count: 67,
  },
];

export function CategorySection() {
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
