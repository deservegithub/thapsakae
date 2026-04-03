"use server";

import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-check";

export async function getNotificationsByUser(userId: string) {
  try {
    const result = await db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(20);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลการแจ้งเตือนได้" };
  }
}

export async function getUnreadCount(userId: string) {
  try {
    const result = await db.select().from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.read, false)));
    return { success: true, count: result.length };
  } catch (error) {
    return { success: false, count: 0 };
  }
}

export async function markAsRead(id: string) {
  try {
    await requireAuth();
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, error: "เกิดข้อผิดพลาด" };
  }
}

export async function markAllAsRead(userId: string) {
  try {
    await requireAuth();
    await db.update(notifications)
      .set({ read: true })
      .where(and(eq(notifications.userId, userId), eq(notifications.read, false)));
    return { success: true };
  } catch (error) {
    return { success: false, error: "เกิดข้อผิดพลาด" };
  }
}

export async function createNotification(data: {
  userId: string;
  type: "message" | "appointment" | "news" | "job" | "marketplace" | "board";
  title: string;
  content: string;
  link?: string;
}) {
  try {
    await db.insert(notifications).values({
      userId: data.userId,
      type: data.type,
      title: data.title,
      content: data.content,
      link: data.link || null,
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false };
  }
}
