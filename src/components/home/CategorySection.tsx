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
    { name: "ข่าวสาร", icon: Newspaper, href: "/news", gradient: "from-blue-500 to-cyan-400", bg: "bg-blue-50", text: "text-blue-600", count: counts?.news ?? 0 },
    { name: "ร้านค้า", icon: Store, href: "/shops", gradient: "from-emerald-500 to-green-400", bg: "bg-emerald-50", text: "text-emerald-600", count: counts?.shops ?? 0 },
    { name: "ท่องเที่ยว", icon: MapPin, href: "/tourism", gradient: "from-violet-500 to-purple-400", bg: "bg-violet-50", text: "text-violet-600", count: counts?.tourism ?? 0 },
    { name: "หางาน", icon: Briefcase, href: "/jobs", gradient: "from-amber-500 to-orange-400", bg: "bg-amber-50", text: "text-amber-600", count: counts?.jobs ?? 0 },
    { name: "เว็บบอร์ด", icon: MessageSquare, href: "/board", gradient: "from-pink-500 to-rose-400", bg: "bg-pink-50", text: "text-pink-600", count: counts?.board ?? 0 },
    // { name: "ซื้อขาย", icon: ShoppingCart, href: "/marketplace", gradient: "from-teal-500 to-cyan-400", bg: "bg-teal-50", text: "text-teal-600", count: counts?.marketplace ?? 0 }, // ปิดไว้ชั่วคราว
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {categories.map((category, i) => {
        const Icon = category.icon;
        return (
          <Link key={category.name} href={category.href} className={`group stagger-${i + 1}`}>
            <div className="relative overflow-hidden rounded-2xl bg-white border border-border/50 p-5 text-center hover-lift cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`relative w-14 h-14 rounded-2xl ${category.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-6 w-6 ${category.text}`} />
              </div>
              <h3 className="font-bold text-sm mb-0.5">{category.name}</h3>
              <p className={`text-xs font-semibold ${category.text}`}>{category.count} รายการ</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
