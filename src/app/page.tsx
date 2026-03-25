import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { AdBanner } from "@/components/home/AdBanner";
import {
  Calendar, Eye, MapPin, Phone, Clock, Briefcase, DollarSign,
  MessageSquare, User, ShoppingCart, Newspaper, Store, Map, Tag
} from "lucide-react";
import { getNews } from "@/actions/news";
import { getShops } from "@/actions/shops";
import { getTourismSpots } from "@/actions/tourism";
import { getJobs } from "@/actions/jobs";
import { getBoardPosts } from "@/actions/board";
import { getMarketplaceItems } from "@/actions/marketplace";

export default async function Home() {
  const [newsRes, shopsRes, tourismRes, jobsRes, boardRes, marketRes] = await Promise.all([
    getNews(),
    getShops(),
    getTourismSpots(),
    getJobs(),
    getBoardPosts(),
    getMarketplaceItems(),
  ]);

  const newsList = (newsRes.success ? newsRes.data || [] : []).slice(0, 3);
  const shopsList = (shopsRes.success ? shopsRes.data || [] : []).slice(0, 3);
  const tourismList = (tourismRes.success ? tourismRes.data || [] : []).slice(0, 3);
  const jobsList = (jobsRes.success ? jobsRes.data || [] : []).slice(0, 3);
  const boardList = (boardRes.success ? boardRes.data || [] : []).slice(0, 3);
  const marketList = (marketRes.success ? marketRes.data || [] : []).slice(0, 3);

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = { "full-time": "เต็มเวลา", "part-time": "พาร์ทไทม์", contract: "สัญญาจ้าง" };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-6">
        <HeroBanner newsSlides={newsList.filter(n => n.coverImage).map(n => ({ id: n.id, title: n.title, coverImage: n.coverImage, category: n.category }))} />
      </div>
      <div className="container py-6">
        <CategorySection />
      </div>

      {/* แบนเนอร์ 1 */}
      <AdBanner variant="highlight" position="A1 - หลัง Hero" />

      {/* ข่าวสาร */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">ข่าวสารล่าสุด</h2>
            </div>
            <Link href="/news" className="text-primary hover:underline font-medium">ดูทั้งหมด →</Link>
          </div>
          {newsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsList.map((news) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48 overflow-hidden">
                      {news.coverImage ? (
                        <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">รูปภาพข่าว</div>
                      )}
                      <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-semibold">{news.category}</span>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg">{news.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{news.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(news.createdAt).toLocaleDateString('th-TH')}</span>
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{news.views || 0}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีข่าวสาร</p>
          )}
        </div>
      </section>

      {/* แบนเนอร์ 2 */}
      <AdBanner position="A2 - หลังข่าวสาร" />

      {/* ร้านค้า */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Store className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold">ร้านค้าและบริการ</h2>
            </div>
            <Link href="/shops" className="text-primary hover:underline font-medium">ดูทั้งหมด →</Link>
          </div>
          {shopsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shopsList.map((shop) => (
                <Link key={shop.id} href={`/shops/${shop.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48 overflow-hidden">
                      {shop.images && shop.images.length > 0 ? (
                        <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">รูปภาพร้านค้า</div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1 text-lg">{shop.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{shop.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 flex-shrink-0" /><span className="line-clamp-1">{shop.address}</span>
                      </div>
                      {shop.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 flex-shrink-0" /><span>{shop.phone}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีร้านค้า</p>
          )}
        </div>
      </section>

      {/* แบนเนอร์ 3 */}
      <AdBanner variant="highlight" position="A3 - หลังร้านค้า" />

      {/* ท่องเที่ยว */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">
                <Map className="h-5 w-5 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold">สถานที่ท่องเที่ยว</h2>
            </div>
            <Link href="/tourism" className="text-primary hover:underline font-medium">ดูทั้งหมด →</Link>
          </div>
          {tourismList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tourismList.map((spot) => (
                <Link key={spot.id} href={`/tourism/${spot.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48 overflow-hidden">
                      {spot.images && spot.images.length > 0 ? (
                        <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-200 to-teal-200 flex items-center justify-center text-slate-600">รูปภาพสถานที่</div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1 text-lg">{spot.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{spot.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 flex-shrink-0" /><span className="line-clamp-1">{spot.address}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีสถานที่ท่องเที่ยว</p>
          )}
        </div>
      </section>

      {/* แบนเนอร์ 4 */}
      <AdBanner position="A4 - หลังท่องเที่ยว" />

      {/* หางาน */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold">หางาน</h2>
            </div>
            <Link href="/jobs" className="text-primary hover:underline font-medium">ดูทั้งหมด →</Link>
          </div>
          {jobsList.length > 0 ? (
            <div className="space-y-4">
              {jobsList.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                              {getEmploymentTypeLabel(job.employmentType)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(job.createdAt).toLocaleDateString('th-TH')}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                          <p className="text-muted-foreground mb-3">{job.company}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                            <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{job.salary || 'ตามตกลง'}</span>
                          </div>
                        </div>
                        <Briefcase className="h-8 w-8 text-amber-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีประกาศงาน</p>
          )}
        </div>
      </section>

      {/* แบนเนอร์ 5 */}
      <AdBanner variant="highlight" position="A5 - หลังหางาน" />

      {/* เว็บบอร์ด */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">เว็บบอร์ด</h2>
            </div>
            <Link href="/board" className="text-primary hover:underline font-medium">ดูทั้งหมด →</Link>
          </div>
          {boardList.length > 0 ? (
            <div className="space-y-4">
              {boardList.map((post) => (
                <Link key={post.id} href={`/board/${post.id}`}>
                  <Card className={`hover:shadow-lg transition-shadow ${post.pinned ? 'border-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {post.pinned && <span className="text-xs bg-primary text-white px-2 py-1 rounded">ปักหมุด</span>}
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />ผู้เขียน</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('th-TH')}</span>
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views} ครั้ง</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีกระทู้</p>
          )}
        </div>
      </section>

      {/* แบนเนอร์ 6 */}
      <AdBanner position="A6 - หลังเว็บบอร์ด" />

      {/* ซื้อขาย */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold">ซื้อขาย</h2>
            </div>
            <Link href="/marketplace" className="text-primary hover:underline font-medium">ดูทั้งหมด →</Link>
          </div>
          {marketList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketList.map((item) => (
                <Link key={item.id} href={`/marketplace/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48 overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">รูปภาพสินค้า</div>
                      )}
                      <span className="absolute top-3 right-3 bg-white/90 text-primary font-bold px-3 py-1 rounded text-sm">
                        ฿{Number(item.price).toLocaleString()}
                      </span>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 flex-shrink-0" /><span>{item.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีสินค้า</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sky-500 to-teal-500 text-white py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">เข้าร่วมชุมชนออนไลน์ทับสะแก</h2>
          <p className="text-lg mb-6 text-sky-50">สมัครสมาชิกเพื่อใช้งานฟีเจอร์ครบครันและเข้าถึงบริการทั้งหมด</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">สมัครสมาชิก</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
              <Link href="/login">เข้าสู่ระบบ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
