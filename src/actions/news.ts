"use server";

import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { eq, desc, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-check";

export async function getNews() {
  try {
    const result = await db.select().from(news).orderBy(desc(news.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลข่าวได้" };
  }
}

export async function getPublishedNews() {
  try {
    const result = await db.select().from(news).where(eq(news.published, true)).orderBy(desc(news.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching published news:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลข่าวได้" };
  }
}

export async function getNewsById(id: string) {
  try {
    const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
    if (result.length === 0) {
      return { success: false, error: "ไม่พบข่าวที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลข่าวได้" };
  }
}

export async function getRelatedNews(id: string, category: string, limit = 3) {
  try {
    const result = await db.select().from(news)
      .where(and(eq(news.category, category), ne(news.id, id), eq(news.published, true)))
      .orderBy(desc(news.createdAt))
      .limit(limit);
    return { success: true, data: result };
  } catch (error) {
    return { success: true, data: [] };
  }
}

export async function createNews(data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  authorId: string;
}) {
  try {
    await requireAdmin();
    await db.insert(news).values({
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      category: data.category,
      authorId: data.authorId,
      published: true,
    });
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true, message: "สร้างข่าวสำเร็จ" };
  } catch (error) {
    console.error("Error creating news:", error);
    return { success: false, error: "ไม่สามารถสร้างข่าวได้" };
  }
}

export async function updateNews(id: string, data: {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  published?: boolean;
}) {
  try {
    await requireAdmin();
    await db.update(news).set(data).where(eq(news.id, id));
    revalidatePath("/news");
    revalidatePath(`/news/${id}`);
    revalidatePath("/admin/news");
    return { success: true, message: "อัปเดตข่าวสำเร็จ" };
  } catch (error) {
    console.error("Error updating news:", error);
    return { success: false, error: "ไม่สามารถอัปเดตข่าวได้" };
  }
}

export async function deleteNews(id: string) {
  try {
    await requireAdmin();
    await db.delete(news).where(eq(news.id, id));
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true, message: "ลบข่าวสำเร็จ" };
  } catch (error) {
    console.error("Error deleting news:", error);
    return { success: false, error: "ไม่สามารถลบข่าวได้" };
  }
}
