import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, User } from "lucide-react";
import Link from "next/link";
import { getMarketplaceItems } from "@/actions/marketplace";
import { FilterBar } from "@/components/ui/filter-bar";
import { Pagination } from "@/components/shared/Pagination";
import { paginateData } from "@/lib/utils/paginate";
import { MarketSearchSort } from "@/components/marketplace/MarketSearchSort";

export const metadata: Metadata = {
  title: "ซื้อขายทับสะแก",
  description: "กระดานซื้อขายสินค้ามือสอง ของใหม่ ในตำบลทับสะแก อำเภอทับสะแก ประจวบคีรีขันธ์",
  openGraph: {
    title: "ซื้อขายทับสะแก",
    description: "ซื้อขายสินค้า ของมือสอง ของใหม่ในทับสะแก",
    images: [{ url: "/api/og?title=ซื้อขายทับสะแก&type=marketplace", width: 1200, height: 630 }],
  },
};

const ITEMS_PER_PAGE = 12;

const marketFilters = [
  { label: "ทั้งหมด", value: "" },
  { label: "อาหาร", value: "อาหาร" },
  { label: "เฟอร์นิเจอร์", value: "เฟอร์นิเจอร์" },
  { label: "อิเล็กทรอนิกส์", value: "อิเล็กทรอนิกส์" },
  { label: "กีฬา", value: "กีฬา" },
  { label: "อื่นๆ", value: "อื่นๆ" },
];

export default async function MarketplacePage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string; q?: string; sort?: string; maxPrice?: string }> }) {
  const { category, page, q, sort, maxPrice } = await searchParams;
  const currentPage = Number(page) || 1;
  const response = await getMarketplaceItems();
  const allItems = response.success ? response.data || [] : [];

  let filtered = category ? allItems.filter((i) => i.category === category) : allItems;

  if (q?.trim()) {
    const query = q.trim().toLowerCase();
    filtered = filtered.filter((i) =>
      i.title.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)
    );
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) {
      filtered = filtered.filter((i) => parseFloat(i.price) <= max);
    }
  }

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  const items = paginateData(filtered, currentPage, ITEMS_PER_PAGE);

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      new: "ของใหม่",
      used: "มือสอง",
      "like-new": "เหมือนใหม่",
    };
    return labels[condition] || condition;
  };

  const getConditionColor = (condition: string) => {
    const colors: Record<string, string> = {
      new: "bg-green-100 text-green-800",
      used: "bg-amber-100 text-amber-800",
      "like-new": "bg-blue-100 text-blue-800",
    };
    return colors[condition] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">กระดานซื้อขาย</h1>
          <p className="text-lg text-muted-foreground">
            ซื้อขายสินค้าในชุมชนตำบลทับสะแก
          </p>
        </div>
        <Link href="/marketplace/create">
          <Button size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            ลงประกาศขาย
          </Button>
        </Link>
      </div>

      <MarketSearchSort />
      <FilterBar filters={marketFilters} />

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-square bg-slate-200 rounded-t-lg relative overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      รูปภาพสินค้า
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded ${getConditionColor(item.condition)}`}>
                      {getConditionLabel(item.condition)}
                    </span>
                  </div>
                  {item.status !== "available" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {item.status === "sold" ? "ขายแล้ว" : "จองแล้ว"}
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    ฿{parseFloat(item.price).toLocaleString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>{item.sellerName || "ผู้ขาย"}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">{q ? `ไม่พบสินค้าที่ตรงกับ "${q}"` : "ยังไม่มีสินค้าในระบบ"}</p>
          <Link href="/marketplace/create">
            <Button>ลงประกาศขายชิ้นแรก</Button>
          </Link>
        </div>
      )}

      <Pagination totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
    </div>
  );
}
