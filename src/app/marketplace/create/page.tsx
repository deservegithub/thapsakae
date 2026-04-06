// NOTE: ฟีเจอร์ซื้อขายปิดไว้ชั่วคราว — redirect ไปหน้า coming soon
import { redirect } from "next/navigation";

export default function CreateMarketplaceItemPage() {
  redirect("/marketplace");
}

/* --- โค้ดเดิมเก็บไว้ด้านล่าง เปิดใช้ใหม่ได้จาก git history ---

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { createMarketplaceItem } from "@/actions/marketplace";

const categoryOptions = [
  { label: "อาหาร", value: "อาหาร" },
  { label: "เฟอร์นิเจอร์", value: "เฟอร์นิเจอร์" },
  { label: "อิเล็กทรอนิกส์", value: "อิเล็กทรอนิกส์" },
  { label: "กีฬา", value: "กีฬา" },
  { label: "อื่นๆ", value: "อื่นๆ" },
];

const conditionOptions = [
  { label: "ของใหม่", value: "new" as const },
  { label: "เหมือนใหม่", value: "like-new" as const },
  { label: "มือสอง", value: "used" as const },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0E00-\u0E7Fa-z0-9-]/g, "")
    .slice(0, 200) + "-" + Date.now().toString(36);
}

export default function CreateMarketplaceItemPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("อื่นๆ");
  const [condition, setCondition] = useState<"new" | "used" | "like-new">("used");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<string[]>([]);
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
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto" />
              <h2 className="text-xl font-semibold">กรุณาเข้าสู่ระบบ</h2>
              <p className="text-muted-foreground">คุณต้องเข้าสู่ระบบก่อนจึงจะลงประกาศขายได้</p>
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
    if (!title.trim() || !description.trim() || !price || !location.trim()) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError("กรุณาระบุราคาที่ถูกต้อง");
      return;
    }
    setError("");
    setSubmitting(true);

    const result = await createMarketplaceItem({
      title: title.trim(),
      slug: generateSlug(title.trim()),
      description: description.trim(),
      price: Number(price).toFixed(2),
      category,
      condition,
      images,
      location: location.trim(),
      sellerId: (session.user as any).id,
    });

    if (result.success) {
      router.push("/marketplace");
      router.refresh();
    } else {
      setError(result.error || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl">
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปกระดานซื้อขาย
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              ลงประกาศขายสินค้า
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
                <label className="text-sm font-medium">ชื่อสินค้า *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="เช่น iPhone 15 Pro Max 256GB"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  maxLength={255}
                  disabled={submitting}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ราคา (บาท) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                    step="0.01"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">สถานที่ *</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="เช่น ตำบลทับสะแก"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    maxLength={255}
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">หมวดหมู่ *</label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
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
                <label className="text-sm font-medium">สภาพสินค้า *</label>
                <div className="flex flex-wrap gap-2">
                  {conditionOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      type="button"
                      variant={condition === opt.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCondition(opt.value)}
                      disabled={submitting}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">รูปภาพสินค้า</label>
                <ImageUpload
                  value={images}
                  onChange={setImages}
                  folder="marketplace"
                  maxFiles={5}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">รายละเอียดสินค้า *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="อธิบายรายละเอียดสินค้า สภาพ เหตุผลที่ขาย..."
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[150px]"
                  disabled={submitting}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Link href="/marketplace">
                  <Button type="button" variant="outline" disabled={submitting}>
                    ยกเลิก
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting || !title.trim() || !description.trim() || !price || !location.trim()}
                >
                  {submitting ? "กำลังลงประกาศ..." : "ลงประกาศขาย"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
*/
