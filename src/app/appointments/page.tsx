"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createAppointment, getAppointmentsByUser, cancelAppointment } from "@/actions/appointments";

const serviceTypes = [
  { value: "government", label: "ติดต่อราชการ" },
  { value: "consultation", label: "ปรึกษาเรื่องทั่วไป" },
  { value: "certificate", label: "ขอใบรับรอง/เอกสาร" },
  { value: "complaint", label: "ร้องเรียน/ร้องทุกข์" },
  { value: "other", label: "อื่นๆ" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "รอยืนยัน", color: "bg-amber-100 text-amber-800" },
  confirmed: { label: "ยืนยันแล้ว", color: "bg-green-100 text-green-800" },
  cancelled: { label: "ยกเลิก", color: "bg-red-100 text-red-800" },
  completed: { label: "เสร็จสิ้น", color: "bg-blue-100 text-blue-800" },
};

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const [myAppointments, setMyAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "government",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  useEffect(() => {
    if (session?.user) {
      loadAppointments();
    } else {
      setLoading(false);
    }
  }, [session]);

  const loadAppointments = async () => {
    const userId = (session?.user as any)?.id;
    if (!userId) return;
    const res = await getAppointmentsByUser(userId);
    if (res.success && res.data) {
      setMyAppointments(res.data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setSubmitting(true);

    const res = await createAppointment({
      userId: (session.user as any).id,
      serviceType: formData.serviceType,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      notes: formData.notes || undefined,
    });

    setSubmitting(false);
    if (res.success) {
      alert("จองคิวสำเร็จ!");
      setFormData({ serviceType: "government", appointmentDate: "", appointmentTime: "", notes: "" });
      loadAppointments();
    } else {
      alert(res.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะยกเลิกการจอง?")) return;
    const res = await cancelAppointment(id);
    if (res.success) {
      loadAppointments();
    } else {
      alert(res.error || "เกิดข้อผิดพลาด");
    }
  };

  // Get min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">จองคิว/นัดหมาย</h1>
        <p className="text-lg text-muted-foreground">จองคิวติดต่อราชการ หรือนัดหมายบริการต่างๆ ของตำบลทับสะแก</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              จองคิวใหม่
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">ประเภทบริการ *</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  {serviceTypes.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">วันที่ *</label>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  min={minDate}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">เวลา *</label>
                <select
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">เลือกเวลา</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">หมายเหตุ</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  placeholder="รายละเอียดเพิ่มเติม..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />กำลังจอง...</> : "จองคิว"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Appointments */}
        <div>
          <h2 className="text-2xl font-bold mb-4">การจองของฉัน</h2>
          {loading ? (
            <p className="text-muted-foreground">กำลังโหลด...</p>
          ) : myAppointments.length > 0 ? (
            <div className="space-y-4">
              {myAppointments.map((apt) => {
                const status = statusLabels[apt.status] || statusLabels.pending;
                const serviceLabel = serviceTypes.find((s) => s.value === apt.serviceType)?.label || apt.serviceType;
                return (
                  <Card key={apt.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{serviceLabel}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" />
                              {new Date(apt.appointmentDate).toLocaleDateString("th-TH")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {apt.appointmentTime}
                            </span>
                          </div>
                          {apt.notes && <p className="text-sm mt-2 text-muted-foreground">{apt.notes}</p>}
                          {apt.adminNotes && (
                            <p className="text-sm mt-1 text-blue-600">หมายเหตุจากเจ้าหน้าที่: {apt.adminNotes}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                          {apt.status === "pending" && (
                            <Button variant="ghost" size="sm" onClick={() => handleCancel(apt.id)} className="text-red-500 hover:text-red-700">
                              <XCircle className="h-4 w-4 mr-1" />ยกเลิก
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">ยังไม่มีการจอง</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
