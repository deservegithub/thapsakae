"use server";

import { db } from "@/lib/db";
import { tourism } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTourismSpots() {
  try {
    const result = await db.select().from(tourism).orderBy(desc(tourism.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching tourism spots:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลสถานที่ท่องเที่ยวได้" };
  }
}

export async function getTourismSpotById(id: string) {
  try {
    const result = await db.select().from(tourism).where(eq(tourism.id, id)).limit(1);
    if (result.length === 0) {
      return { success: false, error: "ไม่พบสถานที่ท่องเที่ยวที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching tourism spot:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลสถานที่ท่องเที่ยวได้" };
  }
}

type TourismCategory = "temple" | "nature" | "culture" | "other";

export async function createTourismSpot(data: {
  name: string;
  slug: string;
  description: string;
  category: TourismCategory;
  images?: string[];
  address: string;
  latitude: string;
  longitude: string;
}) {
  try {
    await db.insert(tourism).values({
      name: data.name,
      slug: data.slug,
      description: data.description,
      category: data.category as "temple" | "nature" | "culture" | "other",
      images: data.images || [],
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    revalidatePath("/tourism");
    revalidatePath("/admin/tourism");
    return { success: true, message: "สร้างสถานที่ท่องเที่ยวสำเร็จ" };
  } catch (error) {
    console.error("Error creating tourism spot:", error);
    return { success: false, error: "ไม่สามารถสร้างสถานที่ท่องเที่ยวได้" };
  }
}

export async function updateTourismSpot(id: string, data: {
  name?: string;
  description?: string;
  category?: TourismCategory;
  images?: string[];
  address?: string;
  latitude?: string;
  longitude?: string;
}) {
  try {
    await db.update(tourism).set(data as any).where(eq(tourism.id, id));
    revalidatePath("/tourism");
    revalidatePath(`/tourism/${id}`);
    revalidatePath("/admin/tourism");
    return { success: true, message: "อัปเดตสถานที่ท่องเที่ยวสำเร็จ" };
  } catch (error) {
    console.error("Error updating tourism spot:", error);
    return { success: false, error: "ไม่สามารถอัปเดตสถานที่ท่องเที่ยวได้" };
  }
}

export async function deleteTourismSpot(id: string) {
  try {
    await db.delete(tourism).where(eq(tourism.id, id));
    revalidatePath("/tourism");
    revalidatePath("/admin/tourism");
    return { success: true, message: "ลบสถานที่ท่องเที่ยวสำเร็จ" };
  } catch (error) {
    console.error("Error deleting tourism spot:", error);
    return { success: false, error: "ไม่สามารถลบสถานที่ท่องเที่ยวได้" };
  }
}
