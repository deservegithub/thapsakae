import { z } from "zod";

export const createMarketplaceItemSchema = z.object({
  title: z.string().min(1, "กรุณากรอกชื่อสินค้า").max(255),
  slug: z.string().optional(),
  description: z.string().min(1, "กรุณากรอกรายละเอียดสินค้า"),
  price: z.string().min(1, "กรุณากรอกราคา"),
  category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
  condition: z.enum(["new", "used", "like-new"], { message: "กรุณาเลือกสภาพสินค้า" }),
  images: z.array(z.string().url()).optional(),
  location: z.string().min(1, "กรุณากรอกพื้นที่"),
  sellerId: z.string().uuid(),
});

export const updateMarketplaceItemSchema = createMarketplaceItemSchema.partial().omit({ sellerId: true });
