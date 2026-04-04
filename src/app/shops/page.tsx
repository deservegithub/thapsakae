import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import Link from "next/link";
import { getApprovedShops } from "@/actions/shops";
import { FilterBar } from "@/components/ui/filter-bar";
import { Pagination, paginateData } from "@/components/shared/Pagination";

const ITEMS_PER_PAGE = 12;

const shopFilters = [
  { label: "ทั้งหมด", value: "" },
  { label: "ร้านอาหาร", value: "restaurant" },
  { label: "ร้านค้า", value: "retail" },
  { label: "บริการ", value: "service" },
];

export default async function ShopsPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const response = await getApprovedShops();
  const allShops = response.success ? response.data || [] : [];
  const filtered = category ? allShops.filter((s) => s.category === category) : allShops;
  const shops = paginateData(filtered, currentPage, ITEMS_PER_PAGE);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      restaurant: "ร้านอาหาร",
      retail: "ร้านค้า",
      service: "บริการ",
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      restaurant: "bg-primary/10 text-primary",
      retail: "bg-secondary/10 text-secondary",
      service: "bg-accent/10 text-accent",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">ร้านค้าและบริการ</h1>
        <p className="text-lg text-muted-foreground">
          ค้นหาร้านค้าและบริการในตำบลทับสะแก
        </p>
      </div>

      <FilterBar filters={shopFilters} />

      {shops && shops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <Link key={shop.id} href={`/shops/${shop.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-video bg-slate-200 rounded-t-lg relative overflow-hidden">
                  {shop.images && shop.images.length > 0 ? (
                    <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      รูปภาพร้านค้า
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(shop.category)}`}>
                      {getCategoryLabel(shop.category)}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{shop.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {shop.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{shop.address}</span>
                  </div>
                  {shop.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{shop.phone}</span>
                    </div>
                  )}
                  {shop.openingHours && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>
                        {typeof shop.openingHours === 'object'
                          ? Object.entries(shop.openingHours).map(([k, v]) => `${k}: ${v}`).join(', ')
                          : 'เปิดทำการ'}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ยังไม่มีร้านค้าในระบบ</p>
        </div>
      )}

      <Pagination totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
    </div>
  );
}
