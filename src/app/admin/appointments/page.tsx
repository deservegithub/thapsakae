"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { getAppointments, updateAppointmentStatus, deleteAppointment } from "@/actions/appointments";

const serviceLabels: Record<string, string> = {
  government: "ติดต่อราชการ",
  consultation: "ปรึกษาเรื่องทั่วไป",
  certificate: "ขอใบรับรอง/เอกสาร",
  complaint: "ร้องเรียน/ร้องทุกข์",
  other: "อื่นๆ",
};

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "รอยืนยัน", color: "bg-amber-100 text-amber-800" },
  confirmed: { label: "ยืนยันแล้ว", color: "bg-green-100 text-green-800" },
  cancelled: { label: "ยกเลิก", color: "bg-red-100 text-red-800" },
  completed: { label: "เสร็จสิ้น", color: "bg-blue-100 text-blue-800" },
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getAppointments();
    if (res.success && res.data) {
      setAppointments(res.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: "confirmed" | "completed" | "cancelled") => {
    const res = await updateAppointmentStatus(id, status);
    if (res.success) {
      loadData();
    } else {
      alert(res.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบรายการนี้?")) return;
    const res = await deleteAppointment(id);
    if (res.success) {
      loadData();
    } else {
      alert(res.error || "เกิดข้อผิดพลาด");
    }
  };

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">จัดการการจองคิว</h1>
        <p className="text-muted-foreground mt-2">ดูและจัดการการจองคิวทั้งหมด ({appointments.length} รายการ)</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "ทั้งหมด" },
          { value: "pending", label: "รอยืนยัน" },
          { value: "confirmed", label: "ยืนยันแล้ว" },
          { value: "completed", label: "เสร็จสิ้น" },
          { value: "cancelled", label: "ยกเลิก" },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <div className="divide-y">
              {filtered.map((apt) => {
                const status = statusConfig[apt.status] || statusConfig.pending;
                return (
                  <div key={apt.id} className="p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{serviceLabels[apt.serviceType] || apt.serviceType}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {new Date(apt.appointmentDate).toLocaleDateString("th-TH")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {apt.appointmentTime}
                          </span>
                        </div>
                        {apt.notes && <p className="text-sm mt-1 text-muted-foreground">{apt.notes}</p>}
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        {apt.status === "pending" && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleStatusChange(apt.id, "confirmed")} title="ยืนยัน">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleStatusChange(apt.id, "cancelled")} title="ยกเลิก">
                              <XCircle className="h-4 w-4 text-amber-500" />
                            </Button>
                          </>
                        )}
                        {apt.status === "confirmed" && (
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(apt.id, "completed")} title="เสร็จสิ้น">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(apt.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">ไม่มีรายการจองคิว</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
