"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTourismSpotById, updateTourismSpot } from "@/actions/tourism";

export default function EditTourismPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "nature",
    address: "",
    latitude: "",
    longitude: "",
    images: "",
  });

  useEffect(() => {
    loadSpot();
  }, [id]);

  const loadSpot = async () => {
    const response = await getTourismSpotById(id);
    if (response.success && response.data) {
      const s = response.data;
      setFormData({
        name: s.name,
        description: s.description,
        category: s.category,
        address: s.address,
        latitude: s.latitude || "",
        longitude: s.longitude || "",
        images: (s.images || []).join("\n"),
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await updateTourismSpot(id, {
      name: formData.name,
      description: formData.description,
      category: formData.category as any,
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

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <Link href="/admin/tourism">
        <Button variant="ghost" className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />กลับ</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>แก้ไขสถานที่ท่องเที่ยว</CardTitle>
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
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ลองจิจูด</label>
                <input type="text" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL รูปภาพ (บรรทัดละ 1 URL)</label>
              <textarea value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows={3} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}</Button>
              <Link href="/admin/tourism"><Button type="button" variant="outline">ยกเลิก</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
