"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createShop } from "@/actions/shops";

export default function CreateShopPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "restaurant" as "restaurant" | "retail" | "service",
    address: "",
    phone: "",
    images: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await createShop({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: formData.description,
      category: formData.category,
      address: formData.address,
      phone: formData.phone || undefined,
      images: formData.images ? formData.images.split("\n").filter(Boolean) : [],
      ownerId: (session?.user as any)?.id || "",
    });

    setSaving(false);
    if (response.success) {
      router.push("/admin/shops");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div>
      <Link href="/admin/shops">
        <Button variant="ghost" className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />กลับ</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>เพิ่มร้านค้าใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อร้านค้า *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ประเภทร้านค้า *</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md" required>
                <option value="restaurant">ร้านอาหาร</option>
                <option value="retail">ค้าปลีก</option>
                <option value="service">บริการ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">รายละเอียด *</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5} className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ที่อยู่ *</label>
              <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">เบอร์โทร</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL รูปภาพ (บรรทัดละ 1 URL)</label>
              <textarea value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows={3} className="w-full px-3 py-2 border rounded-md" placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึก"}</Button>
              <Link href="/admin/shops"><Button type="button" variant="outline">ยกเลิก</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
