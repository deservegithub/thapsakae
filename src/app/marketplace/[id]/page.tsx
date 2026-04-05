import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import Link from "next/link";
import { getMarketplaceItemById, getRelatedMarketplaceItems } from "@/actions/marketplace";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const response = await getMarketplaceItemById(id);
  if (!response.success || !response.data) return { title: "ไม่พบสินค้า" };
  const item = response.data;
  const desc = `${item.title} - ฿${Number(item.price).toLocaleString()} ${item.location || "ทับสะแก"}`.slice(0, 160);
  const ogImage = item.images?.[0] || `/api/og?title=${encodeURIComponent(item.title)}&type=marketplace`;
  return {
    title: item.title,
    description: desc,
    openGraph: {
      title: item.title,
      description: desc,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: item.title, description: desc },
  };
}

export default async function MarketplaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getMarketplaceItemById(id);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const item = response.data;
  const relatedRes = await getRelatedMarketplaceItems(id, item.category);
  const relatedItems = relatedRes.success ? relatedRes.data || [] : [];

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

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "พร้อมขาย",
      sold: "ขายแล้ว",
      reserved: "จองแล้ว",
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Link href="/marketplace">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปกระดานซื้อขาย
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {item.images && item.images.length > 0 ? (
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={item.images[0]} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {item.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {item.images.slice(1, 5).map((image, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg">
                          <img 
                            src={image} 
                            alt={`${item.title} ${index + 2}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">ไม่มีรูปภาพ</p>
                </div>
              )}
            </div>

            <div>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded ${getConditionColor(item.condition)}`}>
                        {getConditionLabel(item.condition)}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
                    <div className="text-4xl font-bold text-primary mb-4">
                      ฿{parseFloat(item.price).toLocaleString()}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">รายละเอียดสินค้า</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{item.description}</p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">ข้อมูลผู้ขาย</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">สถานที่</p>
                          <p className="text-sm text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.status === "available" && (
                    <div className="border-t pt-6 space-y-3">
                      <Button className="w-full" size="lg">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        ติดต่อผู้ขาย
                      </Button>
                      <ShareButton title={item.title} text={`สินค้า ฿${parseFloat(item.price).toLocaleString()}`} size="lg" className="w-full" />
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                    โพสต์เมื่อ {new Date(item.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {relatedItems.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">สินค้าที่เกี่ยวข้อง</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {relatedItems.map((ri) => (
                  <Link key={ri.id} href={`/marketplace/${ri.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-slate-200 rounded mb-3 overflow-hidden">
                          {ri.images && ri.images.length > 0 && <img src={ri.images[0]} alt={ri.title} className="w-full h-full object-cover" />}
                        </div>
                        <h3 className="font-semibold line-clamp-2 mb-2">{ri.title}</h3>
                        <p className="text-primary font-bold">฿{parseFloat(ri.price).toLocaleString()}</p>
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
