import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/shared/SearchBar";
import Link from "next/link";
import { db } from "@/lib/db";
import { news, shops, tourism, jobs, boardPosts } from "@/lib/db/schema"; // marketplaceItems ปิดไว้ชั่วคราว
import { ilike, or } from "drizzle-orm";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let results: { type: string; id: string; title: string; description: string; href: string }[] = [];

  if (query) {
    const pattern = `%${query}%`;

    const [newsResults, shopsResults, tourismResults, jobsResults, boardResults] = await Promise.all([
      db.select().from(news).where(or(ilike(news.title, pattern), ilike(news.content, pattern))).limit(10),
      db.select().from(shops).where(or(ilike(shops.name, pattern), ilike(shops.description, pattern))).limit(10),
      db.select().from(tourism).where(or(ilike(tourism.name, pattern), ilike(tourism.description, pattern))).limit(10),
      db.select().from(jobs).where(or(ilike(jobs.title, pattern), ilike(jobs.description, pattern))).limit(10),
      db.select().from(boardPosts).where(or(ilike(boardPosts.title, pattern), ilike(boardPosts.content, pattern))).limit(10),
      // db.select().from(marketplaceItems).where(or(ilike(marketplaceItems.title, pattern), ilike(marketplaceItems.description, pattern))).limit(10), // ปิดไว้ชั่วคราว
    ]);

    results = [
      ...newsResults.map((n) => ({ type: "ข่าวสาร", id: n.id, title: n.title, description: n.excerpt, href: `/news/${n.id}` })),
      ...shopsResults.map((s) => ({ type: "ร้านค้า", id: s.id, title: s.name, description: s.description.slice(0, 120), href: `/shops/${s.id}` })),
      ...tourismResults.map((t) => ({ type: "ท่องเที่ยว", id: t.id, title: t.name, description: t.description.slice(0, 120), href: `/tourism/${t.id}` })),
      ...jobsResults.map((j) => ({ type: "หางาน", id: j.id, title: j.title, description: j.description.slice(0, 120), href: `/jobs/${j.id}` })),
      ...boardResults.map((b) => ({ type: "เว็บบอร์ด", id: b.id, title: b.title, description: b.content.slice(0, 120), href: `/board/${b.id}` })),
      // ...marketResults.map(...) // ปิดไว้ชั่วคราว
    ];
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4">ค้นหา</h1>
      <p className="text-lg text-muted-foreground mb-8">ค้นหาข้อมูลข่าวสาร ร้านค้า สถานที่ท่องเที่ยว งาน และเว็บบอร์ด</p>

      <SearchBar placeholder="พิมพ์คำค้นหา..." className="max-w-2xl mb-8" />

      {query && (
        <p className="text-muted-foreground mb-6">
          ผลการค้นหา &quot;{query}&quot; — พบ {results.length} รายการ
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((item) => (
            <Link key={`${item.type}-${item.id}`} href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{item.type}</span>
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;</p>
        </div>
      ) : null}
    </div>
  );
}
