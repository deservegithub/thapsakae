import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import Link from "next/link";
import { getTourismSpots } from "@/actions/tourism";
import { FilterBar } from "@/components/ui/filter-bar";
import { Pagination } from "@/components/shared/Pagination";
import { paginateData } from "@/lib/utils/paginate";

const ITEMS_PER_PAGE = 12;

const tourismFilters = [
  { label: "ทั้งหมด", value: "" },
  { label: "ธรรมชาติ", value: "nature" },
  { label: "วัด", value: "temple" },
  { label: "วัฒนธรรม", value: "culture" },
  { label: "อื่นๆ", value: "other" },
];

export default async function TourismPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const response = await getTourismSpots();
  const allAttractions = response.success ? response.data || [] : [];
  const filtered = category ? allAttractions.filter((a) => a.category === category) : allAttractions;
  const attractions = paginateData(filtered, currentPage, ITEMS_PER_PAGE);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      temple: "วัด",
      nature: "ธรรมชาติ",
      culture: "วัฒนธรรม",
      other: "อื่นๆ",
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      temple: "bg-amber-100 text-amber-800",
      nature: "bg-green-100 text-green-800",
      culture: "bg-purple-100 text-purple-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">สถานที่ท่องเที่ยว</h1>
        <p className="text-lg text-muted-foreground">
          แหล่งท่องเที่ยวน่าสนใจในตำบลทับสะแก
        </p>
      </div>

      <FilterBar filters={tourismFilters} />

      {attractions && attractions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <Link key={attraction.id} href={`/tourism/${attraction.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-video bg-gradient-to-br from-sky-200 to-teal-200 rounded-t-lg relative overflow-hidden">
                  {attraction.images && attraction.images.length > 0 ? (
                    <img src={attraction.images[0]} alt={attraction.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                      รูปภาพสถานที่
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(attraction.category)}`}>
                      {getCategoryLabel(attraction.category)}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{attraction.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {attraction.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {attraction.address}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ยังไม่มีสถานที่ท่องเที่ยวในระบบ</p>
        </div>
      )}

      <Pagination totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
    </div>
  );
}
