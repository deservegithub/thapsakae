import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ซื้อขายทับสะแก — เร็วๆ นี้",
  description: "กระดานซื้อขายสินค้ามือสอง ของใหม่ ในตำบลทับสะแก อำเภอทับสะแก ประจวบคีรีขันธ์",
};

// NOTE: ฟีเจอร์ซื้อขายปิดไว้ชั่วคราว — เปิดใช้ใหม่ได้จาก git history (commit ก่อนหน้า)

export default function MarketplacePage() {
  return (
    <div className="container py-24">
      <Card className="max-w-lg mx-auto text-center">
        <CardContent className="py-16 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3">เร็วๆ นี้</h1>
            <p className="text-muted-foreground text-lg">
              กระดานซื้อขายกำลังเตรียมพร้อมเปิดให้บริการ
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              ขอบคุณที่ให้ความสนใจ — เราจะแจ้งให้ทราบเมื่อพร้อมเปิดใช้งาน
            </p>
          </div>
          <Link href="/">
            <Button size="lg">กลับหน้าหลัก</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
