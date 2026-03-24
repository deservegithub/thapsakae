import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { getNews } from "@/actions/news";

export async function NewsGrid() {
  const response = await getNews();
  const newsItems = response.success ? (response.data || []).slice(0, 6) : [];

  if (newsItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">ยังไม่มีข่าวสาร</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((news) => (
        <Link key={news.id} href={`/news/${news.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <div className="relative h-48 overflow-hidden">
              {news.coverImage ? (
                <img
                  src={news.coverImage}
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                  รูปภาพข่าว
                </div>
              )}
              <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-semibold">
                {news.category}
              </span>
            </div>
            <CardHeader>
              <h3 className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">
                {news.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {news.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(news.createdAt).toLocaleDateString('th-TH')}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {(news.views || 0).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
