"use server";

import { db } from "@/lib/db";
import { boardPosts, boardComments, users } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireAuth } from "@/lib/auth-check";

export async function getBoardPosts() {
  try {
    const result = await db
      .select({
        id: boardPosts.id,
        title: boardPosts.title,
        slug: boardPosts.slug,
        content: boardPosts.content,
        category: boardPosts.category,
        authorId: boardPosts.authorId,
        views: boardPosts.views,
        pinned: boardPosts.pinned,
        locked: boardPosts.locked,
        createdAt: boardPosts.createdAt,
        updatedAt: boardPosts.updatedAt,
        authorName: users.name,
        authorAvatar: users.avatar,
        commentCount: sql<number>`(SELECT COUNT(*) FROM board_comments WHERE board_comments.post_id = ${boardPosts.id})`.as("comment_count"),
      })
      .from(boardPosts)
      .leftJoin(users, eq(boardPosts.authorId, users.id))
      .orderBy(desc(boardPosts.pinned), desc(boardPosts.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching board posts:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลโพสต์ได้" };
  }
}

export async function getBoardPostById(id: string) {
  try {
    const result = await db
      .select({
        id: boardPosts.id,
        title: boardPosts.title,
        slug: boardPosts.slug,
        content: boardPosts.content,
        category: boardPosts.category,
        authorId: boardPosts.authorId,
        views: boardPosts.views,
        pinned: boardPosts.pinned,
        locked: boardPosts.locked,
        createdAt: boardPosts.createdAt,
        updatedAt: boardPosts.updatedAt,
        authorName: users.name,
        authorAvatar: users.avatar,
      })
      .from(boardPosts)
      .leftJoin(users, eq(boardPosts.authorId, users.id))
      .where(eq(boardPosts.id, id))
      .limit(1);
    if (result.length === 0) {
      return { success: false, error: "ไม่พบโพสต์ที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching board post:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลโพสต์ได้" };
  }
}

export async function getCommentsByPostId(postId: string) {
  try {
    const result = await db
      .select({
        id: boardComments.id,
        postId: boardComments.postId,
        userId: boardComments.userId,
        content: boardComments.content,
        createdAt: boardComments.createdAt,
        updatedAt: boardComments.updatedAt,
        userName: users.name,
        userAvatar: users.avatar,
      })
      .from(boardComments)
      .leftJoin(users, eq(boardComments.userId, users.id))
      .where(eq(boardComments.postId, postId))
      .orderBy(boardComments.createdAt);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลความคิดเห็นได้" };
  }
}

export async function createBoardPost(data: {
  title: string;
  slug: string;
  content: string;
  category: string;
  authorId: string;
}) {
  try {
    await requireAuth();
    await db.insert(boardPosts).values({
      title: data.title,
      slug: data.slug,
      content: data.content,
      category: data.category,
      authorId: data.authorId,
    });
    revalidatePath("/board");
    return { success: true, message: "สร้างโพสต์สำเร็จ" };
  } catch (error) {
    console.error("Error creating board post:", error);
    return { success: false, error: "ไม่สามารถสร้างโพสต์ได้" };
  }
}

export async function createComment(data: {
  postId: string;
  content: string;
  userId: string;
}) {
  try {
    await requireAuth();
    await db.insert(boardComments).values({
      postId: data.postId,
      content: data.content,
      userId: data.userId,
    });
    revalidatePath(`/board/${data.postId}`);
    return { success: true, message: "เพิ่มความคิดเห็นสำเร็จ" };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: "ไม่สามารถเพิ่มความคิดเห็นได้" };
  }
}

export async function updateBoardPost(id: string, data: {
  title?: string;
  content?: string;
  category?: string;
  pinned?: boolean;
  locked?: boolean;
}) {
  try {
    await requireAdmin();
    await db.update(boardPosts).set(data).where(eq(boardPosts.id, id));
    revalidatePath("/board");
    revalidatePath(`/board/${id}`);
    return { success: true, message: "อัปเดตโพสต์สำเร็จ" };
  } catch (error) {
    console.error("Error updating board post:", error);
    return { success: false, error: "ไม่สามารถอัปเดตโพสต์ได้" };
  }
}

export async function deleteBoardPost(id: string) {
  try {
    await requireAdmin();
    await db.delete(boardPosts).where(eq(boardPosts.id, id));
    revalidatePath("/board");
    return { success: true, message: "ลบโพสต์สำเร็จ" };
  } catch (error) {
    console.error("Error deleting board post:", error);
    return { success: false, error: "ไม่สามารถลบโพสต์ได้" };
  }
}

export async function deleteComment(id: string, postId: string) {
  try {
    await requireAdmin();
    await db.delete(boardComments).where(eq(boardComments.id, id));
    revalidatePath(`/board/${postId}`);
    return { success: true, message: "ลบความคิดเห็นสำเร็จ" };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, error: "ไม่สามารถลบความคิดเห็นได้" };
  }
}
