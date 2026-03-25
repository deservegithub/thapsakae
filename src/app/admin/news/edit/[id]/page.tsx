"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getNewsById, updateNews } from "@/actions/news";

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "general",
    coverImage: "",
    published: false,
  });

  useEffect(() => {
    loadNews();
  }, [id]);

  const loadNews = async () => {
    const response = await getNewsById(id);
    if (response.success && response.data) {
      const n = response.data;
      setFormData({
        title: n.title,
        content: n.content,
        excerpt: n.excerpt,
        category: n.category,
        coverImage: n.coverImage || "",
        published: n.published,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await updateNews(id, {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      coverImage: formData.coverImage || undefined,
      published: formData.published,
    });

    setSaving(false);

    if (response.success) {
      alert("อัปเดตข่าวสำเร็จ");
      router.push("/admin/news");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/news">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>แก้ไขข่าว</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">หัวข้อข่าว *</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">หมวดหมู่ *</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="general">ทั่วไป</option>
                <option value="announcement">ประกาศ</option>
                <option value="event">กิจกรรม</option>
                <option value="emergency">เร่งด่วน</option>
              </select>
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">สรุปข่าว *</label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">เนื้อหาข่าว *</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium mb-2">URL รูปภาพหน้าปก</label>
              <input
                id="coverImage"
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="published" className="text-sm font-medium">เผยแพร่ข่าว</label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
              </Button>
              <Link href="/admin/news">
                <Button type="button" variant="outline">ยกเลิก</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
