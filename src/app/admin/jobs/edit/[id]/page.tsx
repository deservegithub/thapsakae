"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getJobById, updateJob } from "@/actions/jobs";

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    category: "",
    salary: "",
    location: "",
    employmentType: "full-time",
    contactEmail: "",
    contactPhone: "",
    active: true,
  });

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    const response = await getJobById(id);
    if (response.success && response.data) {
      const j = response.data;
      setFormData({
        title: j.title,
        company: j.company,
        description: j.description,
        category: j.category,
        salary: j.salary || "",
        location: j.location,
        employmentType: j.employmentType,
        contactEmail: j.contactEmail || "",
        contactPhone: j.contactPhone || "",
        active: j.active,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const response = await updateJob(id, {
      title: formData.title,
      company: formData.company,
      description: formData.description,
      salary: formData.salary || undefined,
      location: formData.location,
      employmentType: formData.employmentType as any,
      contactEmail: formData.contactEmail || undefined,
      contactPhone: formData.contactPhone || undefined,
      active: formData.active,
    });

    setSaving(false);
    if (response.success) {
      router.push("/admin/jobs");
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <Link href="/admin/jobs">
        <Button variant="ghost" className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />กลับ</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>แก้ไขประกาศงาน</CardTitle>
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
                <select value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" required>
                  <option value="full-time">เต็มเวลา</option>
                  <option value="part-time">พาร์ทไทม์</option>
                  <option value="contract">สัญญาจ้าง</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">หมวดหมู่</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md" />
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
                  className="w-full px-3 py-2 border rounded-md" />
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

            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="active" className="text-sm font-medium">เปิดรับสมัคร</label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}</Button>
              <Link href="/admin/jobs"><Button type="button" variant="outline">ยกเลิก</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
