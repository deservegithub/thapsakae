import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { getPublishedNews } from "@/actions/news";
import { FilterBar } from "@/components/ui/filter-bar";
import { Pagination } from "@/components/shared/Pagination";
import { paginateData } from "@/lib/utils/paginate";

export const dynamic = "force-dynamic";

const newsFilters = [
  { label: "ทั้งหมด", value: "" },
  { label: "ทั่วไป", value: "general" },
  { label: "ประกาศ", value: "announcement" },
  { label: "กิจกรรม", value: "event" },
  { label: "เร่งด่วน", value: "emergency" },
];

const ITEMS_PER_PAGE = 12;

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const response = await getPublishedNews();
  const allNews = response.success ? response.data || [] : [];
  const filtered = category ? allNews.filter((n) => n.category === category) : allNews;
  const newsItems = paginateData(filtered, currentPage, ITEMS_PER_PAGE);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">ข่าวประชาสัมพันธ์</h1>
        <p className="text-lg text-muted-foreground">
          ข่าวสารและกิจกรรมของตำบลทับสะแก
        </p>
      </div>

      <FilterBar filters={newsFilters} />

      {newsItems && newsItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <Link key={news.id} href={`/news/${news.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-video bg-slate-200 rounded-t-lg relative overflow-hidden">
                  {news.coverImage ? (
                    <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      รูปภาพข่าว
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {news.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {news.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(news.createdAt).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{news.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ยังไม่มีข่าวสาร</p>
        </div>
      )}

      <Pagination totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
    </div>
  );
}
