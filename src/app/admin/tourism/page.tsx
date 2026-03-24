"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getTourismSpots, deleteTourismSpot } from "@/actions/tourism";

export default function AdminTourismPage() {
  const [spots, setSpots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpots();
  }, []);

  const loadSpots = async () => {
    const response = await getTourismSpots();
    if (response.success && response.data) {
      setSpots(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบสถานที่นี้?")) return;
    const response = await deleteTourismSpot(id);
    if (response.success) {
      alert("ลบสถานที่สำเร็จ");
      loadSpots();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการสถานที่ท่องเที่ยว</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบสถานที่ท่องเที่ยว</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการสถานที่ท่องเที่ยวทั้งหมด ({spots.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {spots.length > 0 ? (
            <div className="space-y-4">
              {spots.map((spot) => (
                <div key={spot.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{spot.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{spot.category}</span>
                      <span>{spot.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/tourism/${spot.id}`} target="_blank">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(spot.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">ยังไม่มีสถานที่ท่องเที่ยวในระบบ</p></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
