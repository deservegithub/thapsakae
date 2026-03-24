import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Globe, Facebook, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { getShopById } from "@/actions/shops";
import { notFound } from "next/navigation";

export default async function ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getShopById(id);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const shop = response.data;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      restaurant: "ร้านอาหาร",
      retail: "ร้านค้า",
      service: "บริการ",
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Link href="/shops">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้าร้านค้า
            </Button>
          </Link>

          <Card>
            {shop.images && shop.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="col-span-2 aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={shop.images[0]} 
                    alt={shop.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {shop.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${shop.name} ${index + 2}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <CardContent className="p-8">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm font-semibold mb-4">
                  {getCategoryLabel(shop.category)}
                </span>
                <h1 className="text-4xl font-bold mb-4">{shop.name}</h1>
                <p className="text-lg text-muted-foreground">{shop.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-slate-50">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">ข้อมูลติดต่อ</h3>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">ที่อยู่</p>
                        <p className="text-sm text-muted-foreground">{shop.address}</p>
                      </div>
                    </div>

                    {shop.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">โทรศัพท์</p>
                          <a href={`tel:${shop.phone}`} className="text-sm text-primary hover:underline">
                            {shop.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {shop.openingHours && (
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">เวลาทำการ</p>
                          <p className="text-sm text-muted-foreground">
                            {typeof shop.openingHours === 'string' 
                              ? shop.openingHours 
                              : 'เปิดทำการ'}
                          </p>
                        </div>
                      </div>
                    )}

                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">แผนที่</h3>
                    <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Google Maps</p>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        เปิดใน Google Maps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">รีวิวและคะแนน</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">ยังไม่มีรีวิว</p>
                  <p className="text-sm text-muted-foreground mt-2">เป็นคนแรกที่รีวิวร้านนี้</p>
                  <Button className="mt-4">เขียนรีวิว</Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-muted-foreground">
                  อัปเดตล่าสุด: {new Date(shop.updatedAt).toLocaleDateString('th-TH')}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">ร้านค้าที่เกี่ยวข้อง</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-slate-200 rounded mb-3"></div>
                  <h3 className="font-semibold line-clamp-2 mb-2">ร้านค้าที่เกี่ยวข้อง 1</h3>
                  <p className="text-xs text-muted-foreground">ร้านอาหาร</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-slate-200 rounded mb-3"></div>
                  <h3 className="font-semibold line-clamp-2 mb-2">ร้านค้าที่เกี่ยวข้อง 2</h3>
                  <p className="text-xs text-muted-foreground">ร้านค้า</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-slate-200 rounded mb-3"></div>
                  <h3 className="font-semibold line-clamp-2 mb-2">ร้านค้าที่เกี่ยวข้อง 3</h3>
                  <p className="text-xs text-muted-foreground">บริการ</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
