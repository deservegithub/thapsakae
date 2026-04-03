"use server";

import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireAuth } from "@/lib/auth-check";

export async function getAppointments() {
  try {
    const result = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลการจองได้" };
  }
}

export async function getAppointmentsByUser(userId: string) {
  try {
    const result = await db.select().from(appointments)
      .where(eq(appointments.userId, userId))
      .orderBy(desc(appointments.appointmentDate));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลการจองได้" };
  }
}

export async function getAppointmentById(id: string) {
  try {
    const result = await db.select().from(appointments).where(eq(appointments.id, id));
    if (result.length === 0) {
      return { success: false, error: "ไม่พบการจองที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลการจองได้" };
  }
}

export async function createAppointment(data: {
  userId: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}) {
  try {
    await requireAuth();
    await db.insert(appointments).values({
      userId: data.userId,
      serviceType: data.serviceType,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      notes: data.notes || null,
    });
    revalidatePath("/appointments");
    return { success: true, message: "จองคิวสำเร็จ" };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "ไม่สามารถจองคิวได้" };
  }
}

export async function updateAppointmentStatus(id: string, status: "pending" | "confirmed" | "cancelled" | "completed", adminNotes?: string) {
  try {
    await requireAdmin();
    const updateData: any = { status };
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }
    await db.update(appointments).set(updateData).where(eq(appointments.id, id));
    revalidatePath("/appointments");
    revalidatePath("/admin/appointments");
    return { success: true, message: "อัปเดตสถานะสำเร็จ" };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return { success: false, error: "ไม่สามารถอัปเดตสถานะได้" };
  }
}

export async function cancelAppointment(id: string) {
  try {
    await requireAuth();
    await db.update(appointments)
      .set({ status: "cancelled" })
      .where(eq(appointments.id, id));
    revalidatePath("/appointments");
    return { success: true, message: "ยกเลิกการจองสำเร็จ" };
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return { success: false, error: "ไม่สามารถยกเลิกการจองได้" };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await requireAdmin();
    await db.delete(appointments).where(eq(appointments.id, id));
    revalidatePath("/admin/appointments");
    return { success: true, message: "ลบการจองสำเร็จ" };
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return { success: false, error: "ไม่สามารถลบการจองได้" };
  }
}
