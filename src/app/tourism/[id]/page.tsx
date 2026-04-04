import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Star } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import Link from "next/link";
import { getTourismSpotById, getRelatedTourismSpots } from "@/actions/tourism";
import { ReviewSection } from "@/components/tourism/ReviewSection";
import { notFound } from "next/navigation";

export default async function TourismDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getTourismSpotById(id);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const spot = response.data;
  const relatedRes = await getRelatedTourismSpots(id, spot.category);
  const relatedSpots = relatedRes.success ? relatedRes.data || [] : [];

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
                    {spot.latitude && spot.longitude ? (
                      <>
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <iframe
                            src={`https://maps.google.com/maps?q=${spot.latitude},${spot.longitude}&z=15&output=embed`}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <div className="mt-4">
                          <a href={`https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="w-full">
                              เปิดใน Google Maps
                            </Button>
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">ไม่มีข้อมูลพิกัด</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="border-t pt-6">
                <ReviewSection tourismId={spot.id} />
              </div>

              <div className="mt-6 pt-6 border-t flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  อัปเดตล่าสุด: {new Date(spot.updatedAt).toLocaleDateString('th-TH')}
                </div>
                <ShareButton title={spot.name} text={spot.description} />
              </div>
            </CardContent>
          </Card>

          {relatedSpots.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">สถานที่ท่องเที่ยวที่เกี่ยวข้อง</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedSpots.map((s) => (
                  <Link key={s.id} href={`/tourism/${s.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gradient-to-br from-sky-200 to-teal-200 rounded mb-3 overflow-hidden">
                          {s.images && s.images.length > 0 && <img src={s.images[0]} alt={s.name} className="w-full h-full object-cover" />}
                        </div>
                        <h3 className="font-semibold line-clamp-2 mb-2">{s.name}</h3>
                        <p className="text-xs text-muted-foreground">{getCategoryLabel(s.category)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
