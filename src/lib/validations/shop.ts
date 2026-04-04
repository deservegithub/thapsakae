import { z } from "zod";

export const createShopSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อร้านค้า").max(255),
  slug: z.string().optional(),
  description: z.string().min(1, "กรุณากรอกรายละเอียด"),
  category: z.enum(["restaurant", "retail", "service"], { message: "กรุณาเลือกประเภทร้านค้า" }),
  images: z.array(z.string().url()).min(1, "กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูป"),
  address: z.string().min(1, "กรุณากรอกที่อยู่"),
  phone: z.string().optional(),
  openingHours: z.record(z.string()).optional(),
  ownerId: z.string().uuid(),
});

export const updateShopSchema = createShopSchema.partial().omit({ ownerId: true });
