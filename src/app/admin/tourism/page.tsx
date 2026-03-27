"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { getTourismSpots, deleteTourismSpot } from "@/actions/tourism";

const categoryLabels: Record<string, string> = {
  temple: "วัด/ศาสนสถาน",
  nature: "ธรรมชาติ",
  culture: "วัฒนธรรม",
  other: "อื่นๆ",
};

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
      loadSpots();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการสถานที่ท่องเที่ยว</h1>
          <p className="text-muted-foreground mt-2">เพิ่ม แก้ไข และลบสถานที่ท่องเที่ยว ({spots.length} แห่ง)</p>
        </div>
        <Link href="/admin/tourism/create">
          <Button><Plus className="h-4 w-4 mr-2" />เพิ่มสถานที่ใหม่</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {spots.length > 0 ? (
            <div className="divide-y">
              {spots.map((spot) => (
                <div key={spot.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{spot.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{categoryLabels[spot.category] || spot.category}</span>
                      <span className="flex items-center gap-1 truncate"><MapPin className="h-3 w-3" />{spot.address}</span>
                      {parseFloat(spot.rating) > 0 && (
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-500" />{spot.rating}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Link href={`/admin/tourism/edit/${spot.id}`}>
                      <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                    </Link>
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
