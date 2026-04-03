import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, User, ArrowLeft } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import Link from "next/link";
import { getNewsById, getRelatedNews } from "@/actions/news";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getNewsById(id);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const news = response.data;
  const relatedRes = await getRelatedNews(id, news.category);
  const relatedNews = relatedRes.success ? relatedRes.data || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Link href="/news">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้าข่าว
            </Button>
          </Link>

          <Card>
            {news.coverImage && (
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img 
                  src={news.coverImage} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardContent className="p-8">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm font-semibold mb-4">
                  {news.category}
                </span>
                <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(news.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{news.views || 0} ครั้ง</span>
                  </div>
                  {news.authorId && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>ผู้เขียน</span>
                    </div>
                  )}
                </div>
              </div>

              {news.excerpt && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-lg text-blue-900 font-medium">{news.excerpt}</p>
                </div>
              )}

              <div className="prose prose-lg max-w-none whitespace-pre-wrap">
                {news.content}
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    อัปเดตล่าสุด: {new Date(news.updatedAt).toLocaleDateString('th-TH')}
                  </div>
                  <ShareButton title={news.title} text={news.excerpt || ""} />
                </div>
              </div>
            </CardContent>
          </Card>

          {relatedNews.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">ข่าวที่เกี่ยวข้อง</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedNews.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-slate-200 rounded mb-3 overflow-hidden">
                          {item.coverImage && <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />}
                        </div>
                        <h3 className="font-semibold line-clamp-2 mb-2">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString('th-TH')}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
