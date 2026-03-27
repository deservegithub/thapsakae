"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, MapPin, ShoppingCart, Package, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getMarketplaceItems, deleteMarketplaceItem, updateMarketplaceItem } from "@/actions/marketplace";

const statusLabels: Record<string, string> = { available: "ขายอยู่", sold: "ขายแล้ว", reserved: "จองแล้ว" };
const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  sold: "bg-gray-100 text-gray-500",
  reserved: "bg-amber-100 text-amber-700",
};
const conditionLabels: Record<string, string> = { new: "ของใหม่", used: "มือสอง", "like-new": "เหมือนใหม่" };

export default function AdminMarketplacePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await getMarketplaceItems();
    if (response.success && response.data) {
      setItems(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?")) return;
    const response = await deleteMarketplaceItem(id);
    if (response.success) {
      loadItems();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleStatusChange = async (id: string, status: "available" | "sold" | "reserved") => {
    const response = await updateMarketplaceItem(id, { status });
    if (response.success) loadItems();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการกระดานซื้อขาย</h1>
          <p className="text-muted-foreground mt-2">จัดการสถานะและลบสินค้า ({items.length} รายการ)</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {items.length > 0 ? (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{item.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[item.status] || "bg-gray-100"}`}>
                        {statusLabels[item.status] || item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{item.category}</span>
                      <span className="font-bold text-primary">฿{parseFloat(item.price).toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Package className="h-3 w-3" />{conditionLabels[item.condition] || item.condition}</span>
                      <span className="flex items-center gap-1 truncate"><MapPin className="h-3 w-3" />{item.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="available">ขายอยู่</option>
                      <option value="reserved">จองแล้ว</option>
                      <option value="sold">ขายแล้ว</option>
                    </select>
                    <Link href={`/marketplace/${item.id}`} target="_blank">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">ยังไม่มีสินค้าในระบบ</p></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
