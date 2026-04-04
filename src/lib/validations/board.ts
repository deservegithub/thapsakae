import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "กรุณากรอกหัวข้อกระทู้").max(500),
  content: z.string().min(1, "กรุณากรอกเนื้อหา"),
  category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
  authorId: z.string().uuid(),
});

export const createCommentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1, "กรุณากรอกความคิดเห็น").max(5000),
  userId: z.string().uuid(),
});
