"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getMarketplaceItems, deleteMarketplaceItem } from "@/actions/marketplace";

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
      alert("ลบสินค้าสำเร็จ");
      loadItems();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการกระดานซื้อขาย</h1>
          <p className="text-muted-foreground mt-2">จัดการและลบสินค้า</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้าทั้งหมด ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{item.category}</span>
                      <span className="font-bold text-primary">฿{parseFloat(item.price).toLocaleString()}</span>
                      <span>{item.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
