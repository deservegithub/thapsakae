import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { news, shops } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Update all news to published = true
    await db.update(news).set({ published: true }).where(eq(news.published, false));
    
    // Update all shops to approved = true
    await db.update(shops).set({ approved: true }).where(eq(shops.approved, false));

    return NextResponse.json({ 
      success: true, 
      message: "อัปเดตข้อมูลเรียบร้อย — news published, shops approved" 
    });
  } catch (error) {
    console.error("Error fixing data:", error);
    return NextResponse.json({ success: false, error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
