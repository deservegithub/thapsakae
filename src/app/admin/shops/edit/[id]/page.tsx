"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getShopById, updateShop } from "@/actions/shops";

export default function EditShopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "restaurant",
    address: "",
    phone: "",
    images: "",
    approved: false,
  });

  useEffect(() => {
    loadShop();
  }, [id]);

  const loadShop = async () => {
    const response = await getShopById(id);
    if (response.success && response.data) {
      const s = response.data;
      setFormData({
        name: s.name,
        description: s.description,
        category: s.category,
        address: s.address,
        phone: s.phone || "",
        images: (s.images || []).join("\n"),
        approved: s.approved,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await updateShop(id, {
      name: formData.name,
      description: formData.description,
      category: formData.category as any,
      address: formData.address,
      phone: formData.phone || null,
      images: formData.images ? formData.images.split("\n").filter(Boolean) : [],
      approved: formData.approved,
    });

    setSaving(false);
    if (response.success) {
      router.push("/admin/shops");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <Link href="/admin/shops">
        <Button variant="ghost" className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />กลับ</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>แก้ไขร้านค้า</CardTitle>
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
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                rows={3} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="approved" checked={formData.approved}
                onChange={(e) => setFormData({ ...formData, approved: e.target.checked })} className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="approved" className="text-sm font-medium">อนุมัติร้านค้า</label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}</Button>
              <Link href="/admin/shops"><Button type="button" variant="outline">ยกเลิก</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
