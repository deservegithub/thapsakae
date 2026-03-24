"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createNews } from "@/actions/news";

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "general",
    coverImage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await createNews({
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      coverImage: formData.coverImage || undefined,
      authorId: "temp-user-id", // ควรใช้ session.user.id จริง
    });

    setLoading(false);

    if (response.success) {
      alert("สร้างข่าวสำเร็จ");
      router.push("/admin/news");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

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
          <CardTitle>เพิ่มข่าวใหม่</CardTitle>
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
              <label htmlFor="slug" className="block text-sm font-medium mb-2">Slug (URL)</label>
              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="จะถูกสร้างอัตโนมัติถ้าไม่ระบุ"
                className="w-full px-3 py-2 border rounded-md"
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

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
              <Link href="/admin/news">
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
