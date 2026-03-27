"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createTourismSpot } from "@/actions/tourism";

export default function CreateTourismPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "nature" as "temple" | "nature" | "culture" | "other",
    address: "",
    latitude: "",
    longitude: "",
    images: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await createTourismSpot({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: formData.description,
      category: formData.category,
      address: formData.address,
      latitude: formData.latitude || "0",
      longitude: formData.longitude || "0",
      images: formData.images ? formData.images.split("\n").filter(Boolean) : [],
    });

    setSaving(false);
    if (response.success) {
      router.push("/admin/tourism");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div>
      <Link href="/admin/tourism">
        <Button variant="ghost" className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />กลับ</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>เพิ่มสถานที่ท่องเที่ยวใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อสถานที่ *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ประเภท *</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md" required>
                <option value="temple">วัด/ศาสนสถาน</option>
                <option value="nature">ธรรมชาติ</option>
                <option value="culture">วัฒนธรรม</option>
                <option value="other">อื่นๆ</option>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ละติจูด</label>
                <input type="text" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" placeholder="เช่น 11.4565" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ลองจิจูด</label>
                <input type="text" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" placeholder="เช่น 99.6078" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL รูปภาพ (บรรทัดละ 1 URL)</label>
              <textarea value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows={3} className="w-full px-3 py-2 border rounded-md" placeholder="https://example.com/image1.jpg" />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึก"}</Button>
              <Link href="/admin/tourism"><Button type="button" variant="outline">ยกเลิก</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
