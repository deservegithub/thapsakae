"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, Building2, MapPin, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { getJobs, deleteJob, updateJob } from "@/actions/jobs";

const typeLabels: Record<string, string> = {
  "full-time": "เต็มเวลา",
  "part-time": "พาร์ทไทม์",
  contract: "สัญญาจ้าง",
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const response = await getJobs();
    if (response.success && response.data) {
      setJobs(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบประกาศงานนี้?")) return;
    const response = await deleteJob(id);
    if (response.success) {
      loadJobs();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const response = await updateJob(id, { active: !current });
    if (response.success) {
      loadJobs();
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการประกาศงาน</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบประกาศงาน ({jobs.length} รายการ)</p>
        </div>
        <Link href="/admin/jobs/create">
          <Button><Plus className="h-4 w-4 mr-2" />เพิ่มประกาศงาน</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {jobs.length > 0 ? (
            <div className="divide-y">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{job.title}</h3>
                      {job.active ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">เปิดรับ</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">ปิดรับ</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{typeLabels[job.employmentType] || job.employmentType}</span>
                      {job.salary && <span className="font-medium text-primary">{job.salary}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => handleToggleActive(job.id, job.active)}
                      title={job.active ? "ปิดรับสมัคร" : "เปิดรับสมัคร"}>
                      {job.active ? <XCircle className="h-4 w-4 text-amber-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Button>
                    <Link href={`/admin/jobs/edit/${job.id}`}>
                      <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                    </Link>
                    <Link href={`/jobs/${job.id}`} target="_blank">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">ยังไม่มีประกาศงานในระบบ</p></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
