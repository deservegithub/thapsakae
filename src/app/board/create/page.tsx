"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { createBoardPost } from "@/actions/board";

const categories = [
  { label: "แนะนำ", value: "แนะนำ" },
  { label: "ถาม-ตอบ", value: "ถาม-ตอบ" },
  { label: "กิจกรรม", value: "กิจกรรม" },
  { label: "ทั่วไป", value: "ทั่วไป" },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0E00-\u0E7Fa-z0-9-]/g, "")
    .slice(0, 200) + "-" + Date.now().toString(36);
}

export default function CreateBoardPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ทั่วไป");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-3xl">
          <p className="text-center text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-3xl">
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
              <h2 className="text-xl font-semibold">กรุณาเข้าสู่ระบบ</h2>
              <p className="text-muted-foreground">คุณต้องเข้าสู่ระบบก่อนจึงจะสร้างกระทู้ได้</p>
              <div className="flex gap-3 justify-center">
                <Link href="/login">
                  <Button>เข้าสู่ระบบ</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">สมัครสมาชิก</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("กรุณากรอกหัวข้อและเนื้อหา");
      return;
    }
    setError("");
    setSubmitting(true);

    const result = await createBoardPost({
      title: title.trim(),
      slug: generateSlug(title.trim()),
      content: content.trim(),
      category,
      authorId: (session.user as any).id,
    });

    if (result.success) {
      router.push("/board");
      router.refresh();
    } else {
      setError(result.error || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl">
        <Link href="/board">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปเว็บบอร์ด
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              สร้างกระทู้ใหม่
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">หัวข้อกระทู้ *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="พิมพ์หัวข้อกระทู้..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  maxLength={500}
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">หมวดหมู่ *</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      type="button"
                      variant={category === cat.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategory(cat.value)}
                      disabled={submitting}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">เนื้อหา *</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="เขียนเนื้อหากระทู้ของคุณ..."
                  rows={10}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[200px]"
                  disabled={submitting}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Link href="/board">
                  <Button type="button" variant="outline" disabled={submitting}>
                    ยกเลิก
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting || !title.trim() || !content.trim()}>
                  {submitting ? "กำลังสร้าง..." : "สร้างกระทู้"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
