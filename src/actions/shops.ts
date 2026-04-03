"use server";

import { db } from "@/lib/db";
import { shops } from "@/lib/db/schema";
import { eq, desc, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-check";

export async function getShops() {
  try {
    const result = await db.select().from(shops).orderBy(desc(shops.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching shops:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลร้านค้าได้" };
  }
}

export async function getApprovedShops() {
  try {
    const result = await db.select().from(shops).where(eq(shops.approved, true)).orderBy(desc(shops.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching approved shops:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลร้านค้าได้" };
  }
}

export async function getShopById(id: string) {
  try {
    const result = await db.select().from(shops).where(eq(shops.id, id)).limit(1);
    if (result.length === 0) {
      return { success: false, error: "ไม่พบร้านค้าที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching shop:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลร้านค้าได้" };
  }
}

export async function getRelatedShops(id: string, category: string, limit = 3) {
  try {
    const result = await db.select().from(shops)
      .where(and(eq(shops.category, category as any), ne(shops.id, id), eq(shops.approved, true)))
      .orderBy(desc(shops.createdAt))
      .limit(limit);
    return { success: true, data: result };
  } catch (error) {
    return { success: true, data: [] };
  }
}

export async function createShop(data: {
  name: string;
  slug: string;
  description: string;
  category: "restaurant" | "retail" | "service";
  images: string[];
  address: string;
  phone?: string;
  openingHours?: Record<string, string>;
  ownerId: string;
}) {
  try {
    await requireAdmin();
    await db.insert(shops).values({
      name: data.name,
      slug: data.slug,
      description: data.description,
      category: data.category as "restaurant" | "retail" | "service",
      images: data.images,
      address: data.address,
      phone: data.phone || null,
      openingHours: data.openingHours || null,
      ownerId: data.ownerId,
      approved: true,
    });
    revalidatePath("/shops");
    revalidatePath("/admin/shops");
    return { success: true, message: "สร้างร้านค้าสำเร็จ" };
  } catch (error) {
    console.error("Error creating shop:", error);
    return { success: false, error: "ไม่สามารถสร้างร้านค้าได้" };
  }
}

export async function updateShop(id: string, data: Partial<typeof shops.$inferInsert>) {
  try {
    await requireAdmin();
    await db.update(shops).set(data).where(eq(shops.id, id));
    revalidatePath("/shops");
    revalidatePath(`/shops/${id}`);
    revalidatePath("/admin/shops");
    return { success: true, message: "อัปเดตร้านค้าสำเร็จ" };
  } catch (error) {
    console.error("Error updating shop:", error);
    return { success: false, error: "ไม่สามารถอัปเดตร้านค้าได้" };
  }
}

export async function deleteShop(id: string) {
  try {
    await requireAdmin();
    await db.delete(shops).where(eq(shops.id, id));
    revalidatePath("/shops");
    revalidatePath("/admin/shops");
    return { success: true, message: "ลบร้านค้าสำเร็จ" };
  } catch (error) {
    console.error("Error deleting shop:", error);
    return { success: false, error: "ไม่สามารถลบร้านค้าได้" };
  }
}
