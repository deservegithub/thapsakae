import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Share2, Star } from "lucide-react";
import Link from "next/link";
import { getTourismSpotById } from "@/actions/tourism";
import { notFound } from "next/navigation";

export default async function TourismDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getTourismSpotById(id);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const spot = response.data;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      temple: "วัด",
      nature: "ธรรมชาติ",
      culture: "วัฒนธรรม",
      other: "อื่นๆ",
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Link href="/tourism">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปสถานที่ท่องเที่ยว
            </Button>
          </Link>

          <Card>
            {spot.images && spot.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="col-span-2 aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={spot.images[0]} 
                    alt={spot.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {spot.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${spot.name} ${index + 2}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <CardContent className="p-8">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm font-semibold mb-4">
                  {getCategoryLabel(spot.category)}
                </span>
                <h1 className="text-4xl font-bold mb-4">{spot.name}</h1>
                <p className="text-lg text-muted-foreground">{spot.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-slate-50">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">ข้อมูลสถานที่</h3>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">ที่อยู่</p>
                        <p className="text-sm text-muted-foreground">{spot.address}</p>
                      </div>
                    </div>

                    {spot.latitude && spot.longitude && (
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          พิกัด: {spot.latitude}, {spot.longitude}
                        </p>
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
                  <p className="text-sm text-muted-foreground mt-2">เป็นคนแรกที่รีวิวสถานที่นี้</p>
                  <Button className="mt-4">เขียนรีวิว</Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  อัปเดตล่าสุด: {new Date(spot.updatedAt).toLocaleDateString('th-TH')}
                </div>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  แชร์สถานที่นี้
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">สถานที่ท่องเที่ยวที่เกี่ยวข้อง</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-sky-200 to-teal-200 rounded mb-3"></div>
                  <h3 className="font-semibold line-clamp-2 mb-2">สถานที่ท่องเที่ยวที่เกี่ยวข้อง 1</h3>
                  <p className="text-xs text-muted-foreground">ธรรมชาติ</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-sky-200 to-teal-200 rounded mb-3"></div>
                  <h3 className="font-semibold line-clamp-2 mb-2">สถานที่ท่องเที่ยวที่เกี่ยวข้อง 2</h3>
                  <p className="text-xs text-muted-foreground">วัด</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-sky-200 to-teal-200 rounded mb-3"></div>
                  <h3 className="font-semibold line-clamp-2 mb-2">สถานที่ท่องเที่ยวที่เกี่ยวข้อง 3</h3>
                  <p className="text-xs text-muted-foreground">วัฒนธรรม</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
