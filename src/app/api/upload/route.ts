import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generatePresignedUploadUrl, ALLOWED_TYPES, MAX_FILE_SIZE } from "@/lib/r2";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { contentType, folder, fileSize } = body as {
      contentType: string;
      folder?: string;
      fileSize?: number;
    };

    if (!contentType) {
      return NextResponse.json({ error: "ต้องระบุ contentType" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: `ไม่รองรับไฟล์ประเภท ${contentType} — รองรับเฉพาะ JPEG, PNG, WebP, GIF, AVIF` },
        { status: 400 }
      );
    }

    if (fileSize && fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `ไฟล์ใหญ่เกินไป — ขนาดสูงสุด ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const result = await generatePresignedUploadUrl(contentType, folder || "uploads");

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Upload presign error:", error);
    return NextResponse.json(
      { error: error.message || "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
