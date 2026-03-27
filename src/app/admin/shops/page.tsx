"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, CheckCircle, XCircle, Phone } from "lucide-react";
import Link from "next/link";
import { getShops, deleteShop, updateShop } from "@/actions/shops";

const categoryLabels: Record<string, string> = {
  restaurant: "ร้านอาหาร",
  retail: "ค้าปลีก",
  service: "บริการ",
};

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
      loadShops();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleToggleApproved = async (id: string, current: boolean) => {
    const response = await updateShop(id, { approved: !current });
    if (response.success) {
      loadShops();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการร้านค้า</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบร้านค้า ({shops.length} ร้าน)</p>
        </div>
        <Link href="/admin/shops/create">
          <Button><Plus className="h-4 w-4 mr-2" />เพิ่มร้านค้าใหม่</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {shops.length > 0 ? (
            <div className="divide-y">
              {shops.map((shop) => (
                <div key={shop.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{shop.name}</h3>
                      {shop.approved ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> อนุมัติ
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> รออนุมัติ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{categoryLabels[shop.category] || shop.category}</span>
                      <span className="truncate">{shop.address}</span>
                      {shop.phone && (
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{shop.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => handleToggleApproved(shop.id, shop.approved)}
                      title={shop.approved ? "ยกเลิกอนุมัติ" : "อนุมัติ"}>
                      {shop.approved ? <XCircle className="h-4 w-4 text-amber-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Button>
                    <Link href={`/admin/shops/edit/${shop.id}`}>
                      <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                    </Link>
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
