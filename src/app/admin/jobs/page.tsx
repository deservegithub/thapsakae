"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { getJobs, deleteJob } from "@/actions/jobs";

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
      alert("ลบประกาศงานสำเร็จ");
      loadJobs();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการประกาศงาน</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบประกาศงาน</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการประกาศงานทั้งหมด ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{job.company}</span>
                      <span>{job.location}</span>
                      <span>{job.employmentType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
