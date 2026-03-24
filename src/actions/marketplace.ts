"use server";

import { db } from "@/lib/db";
import { marketplaceItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getMarketplaceItems() {
  try {
    const result = await db.select().from(marketplaceItems).orderBy(desc(marketplaceItems.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลสินค้าได้" };
  }
}

export async function getMarketplaceItemById(id: string) {
  try {
    const result = await db.select().from(marketplaceItems).where(eq(marketplaceItems.id, id)).limit(1);
    if (result.length === 0) {
      return { success: false, error: "ไม่พบสินค้าที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching marketplace item:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลสินค้าได้" };
  }
}

export async function createMarketplaceItem(data: {
  title: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  condition: "new" | "used" | "like-new";
  images?: string[];
  location: string;
  sellerId: string;
}) {
  try {
    await db.insert(marketplaceItems).values({
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      category: data.category,
      condition: data.condition,
      images: data.images || [],
      location: data.location,
      sellerId: data.sellerId,
    });
    revalidatePath("/marketplace");
    return { success: true, message: "สร้างประกาศขายสำเร็จ" };
  } catch (error) {
    console.error("Error creating marketplace item:", error);
    return { success: false, error: "ไม่สามารถสร้างประกาศขายได้" };
  }
}

export async function updateMarketplaceItem(id: string, data: {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  condition?: "new" | "used" | "like-new";
  images?: string[];
  location?: string;
  contactPhone?: string;
  status?: "available" | "sold" | "reserved";
}) {
  try {
    await db.update(marketplaceItems).set(data).where(eq(marketplaceItems.id, id));
    revalidatePath("/marketplace");
    revalidatePath(`/marketplace/${id}`);
    return { success: true, message: "อัปเดตประกาศขายสำเร็จ" };
  } catch (error) {
    console.error("Error updating marketplace item:", error);
    return { success: false, error: "ไม่สามารถอัปเดตประกาศขายได้" };
  }
}

export async function deleteMarketplaceItem(id: string) {
  try {
    await db.delete(marketplaceItems).where(eq(marketplaceItems.id, id));
    revalidatePath("/marketplace");
    return { success: true, message: "ลบประกาศขายสำเร็จ" };
  } catch (error) {
    console.error("Error deleting marketplace item:", error);
    return { success: false, error: "ไม่สามารถลบประกาศขายได้" };
  }
}
