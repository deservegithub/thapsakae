"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createJob } from "@/actions/jobs";

export default function CreateJobPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    category: "",
    salary: "",
    location: "",
    employmentType: "full-time" as "full-time" | "part-time" | "contract",
    contactEmail: "",
    contactPhone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await createJob({
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      company: formData.company,
      description: formData.description,
      category: formData.category,
      salary: formData.salary || undefined,
      location: formData.location,
      employmentType: formData.employmentType,
      contactEmail: formData.contactEmail || undefined,
      contactPhone: formData.contactPhone || undefined,
      posterId: (session?.user as any)?.id || "",
    });

    setSaving(false);
    if (response.success) {
      router.push("/admin/jobs");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div>
      <Link href="/admin/jobs">
        <Button variant="ghost" className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />กลับ</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>เพิ่มประกาศงานใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">ตำแหน่งงาน *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">บริษัท/สถานประกอบการ *</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ประเภทงาน *</label>
                <select value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md" required>
                  <option value="full-time">เต็มเวลา</option>
                  <option value="part-time">พาร์ทไทม์</option>
                  <option value="contract">สัญญาจ้าง</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">หมวดหมู่ *</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" required placeholder="เช่น IT, บัญชี, ขาย" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">รายละเอียดงาน *</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6} className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">สถานที่ทำงาน *</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">เงินเดือน</label>
                <input type="text" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" placeholder="เช่น 15,000 - 25,000 บาท" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">อีเมลติดต่อ</label>
                <input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">เบอร์โทรติดต่อ</label>
                <input type="text" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึก"}</Button>
              <Link href="/admin/jobs"><Button type="button" variant="outline">ยกเลิก</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
