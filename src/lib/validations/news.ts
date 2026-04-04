import { z } from "zod";

export const createNewsSchema = z.object({
  title: z.string().min(1, "กรุณากรอกหัวข้อข่าว").max(500),
  slug: z.string().optional(),
  content: z.string().min(1, "กรุณากรอกเนื้อหาข่าว"),
  excerpt: z.string().min(1, "กรุณากรอกสรุปข่าว"),
  category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
  coverImage: z.string().url("URL รูปภาพไม่ถูกต้อง").optional().or(z.literal("")),
  authorId: z.string().uuid(),
});

export const updateNewsSchema = createNewsSchema.partial().omit({ authorId: true });
