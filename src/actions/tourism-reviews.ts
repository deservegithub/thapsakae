"use server";

import { db } from "@/lib/db";
import { tourismReviews, tourism, users } from "@/lib/db/schema";
import { eq, desc, avg } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-check";

export async function getReviewsByTourismId(tourismId: string) {
  try {
    const result = await db
      .select({
        id: tourismReviews.id,
        rating: tourismReviews.rating,
        comment: tourismReviews.comment,
        createdAt: tourismReviews.createdAt,
        userName: users.name,
        userAvatar: users.avatar,
      })
      .from(tourismReviews)
      .innerJoin(users, eq(tourismReviews.userId, users.id))
      .where(eq(tourismReviews.tourismId, tourismId))
      .orderBy(desc(tourismReviews.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: true, data: [] };
  }
}

export async function createReview(data: {
  tourismId: string;
  userId: string;
  rating: number;
  comment: string;
}) {
  try {
    await requireAuth();
    await db.insert(tourismReviews).values({
      tourismId: data.tourismId,
      userId: data.userId,
      rating: data.rating,
      comment: data.comment,
    });

    // Update average rating on tourism spot
    const avgResult = await db
      .select({ avgRating: avg(tourismReviews.rating) })
      .from(tourismReviews)
      .where(eq(tourismReviews.tourismId, data.tourismId));

    if (avgResult[0]?.avgRating) {
      await db.update(tourism)
        .set({ rating: avgResult[0].avgRating })
        .where(eq(tourism.id, data.tourismId));
    }

    revalidatePath(`/tourism/${data.tourismId}`);
    return { success: true, message: "เพิ่มรีวิวสำเร็จ" };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, error: "ไม่สามารถเพิ่มรีวิวได้" };
  }
}
