"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getShops, deleteShop } from "@/actions/shops";

export default function AdminShopsPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    const response = await getShops();
    if (response.success && response.data) {
      setShops(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบร้านค้านี้?")) return;

    const response = await deleteShop(id);
    if (response.success) {
      alert("ลบร้านค้าสำเร็จ");
      loadShops();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการร้านค้า</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบร้านค้า</p>
        </div>
        <Link href="/admin/shops/create">
          <Button><Plus className="h-4 w-4 mr-2" />เพิ่มร้านค้าใหม่</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการร้านค้าทั้งหมด ({shops.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {shops.length > 0 ? (
            <div className="space-y-4">
              {shops.map((shop) => (
                <div key={shop.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{shop.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{shop.category}</span>
                      <span>{shop.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/shops/${shop.id}`} target="_blank">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(shop.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">ยังไม่มีร้านค้าในระบบ</p></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
