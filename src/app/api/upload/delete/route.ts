import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteR2Object, getKeyFromUrl } from "@/lib/r2";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  }

  try {
    const { url } = (await req.json()) as { url: string };

    if (!url) {
      return NextResponse.json({ error: "ต้องระบุ url" }, { status: 400 });
    }

    const key = getKeyFromUrl(url);
    if (!key) {
      return NextResponse.json({ error: "URL ไม่ถูกต้อง" }, { status: 400 });
    }

    await deleteR2Object(key);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete R2 error:", error);
    return NextResponse.json(
      { error: error.message || "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
