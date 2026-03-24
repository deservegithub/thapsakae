import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getMarketplaceItems } from "@/actions/marketplace";

export default async function MarketplacePage() {
  const response = await getMarketplaceItems();
  const items = response.success ? response.data : [];

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      new: "ของใหม่",
      used: "มือสอง",
      "like-new": "เหมือนใหม่",
    };
    return labels[condition] || condition;
  };

  const getConditionColor = (condition: string) => {
    const colors: Record<string, string> = {
      new: "bg-green-100 text-green-800",
      used: "bg-amber-100 text-amber-800",
      "like-new": "bg-blue-100 text-blue-800",
    };
    return colors[condition] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">กระดานซื้อขาย</h1>
          <p className="text-lg text-muted-foreground">
            ซื้อขายสินค้าในชุมชนตำบลทับสะแก
          </p>
        </div>
        <Button size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          ลงประกาศขาย
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Button variant="outline">ทั้งหมด</Button>
        <Button variant="outline">อาหาร</Button>
        <Button variant="outline">เฟอร์นิเจอร์</Button>
        <Button variant="outline">อิเล็กทรอนิกส์</Button>
        <Button variant="outline">กีฬา</Button>
        <Button variant="outline">อื่นๆ</Button>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-square bg-slate-200 rounded-t-lg relative overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      รูปภาพสินค้า
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded ${getConditionColor(item.condition)}`}>
                      {getConditionLabel(item.condition)}
                    </span>
                  </div>
                  {item.status !== "available" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {item.status === "sold" ? "ขายแล้ว" : "จองแล้ว"}
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    ฿{parseFloat(item.price).toLocaleString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">ผู้ขาย</span>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      แชท
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ยังไม่มีสินค้าในระบบ</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          โหลดสินค้าเพิ่มเติม
        </Button>
      </div>
    </div>
  );
}
