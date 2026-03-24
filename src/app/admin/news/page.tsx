"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getNews, deleteNews } from "@/actions/news";

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const response = await getNews();
    if (response.success && response.data) {
      setNews(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบข่าวนี้?")) return;

    const response = await deleteNews(id);
    if (response.success) {
      alert("ลบข่าวสำเร็จ");
      loadNews();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการข่าวสาร</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบข่าวสาร</p>
        </div>
        <Link href="/admin/news/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มข่าวใหม่
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการข่าวทั้งหมด ({news.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {news.length > 0 ? (
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                        {item.category}
                      </span>
                      <span>{new Date(item.createdAt).toLocaleDateString('th-TH')}</span>
                      <span>{item.views} ครั้ง</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/news/${item.id}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/news/edit/${item.id}`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">ยังไม่มีข่าวในระบบ</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
