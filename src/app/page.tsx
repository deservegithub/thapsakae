import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
// import { AdBanner } from "@/components/home/AdBanner"; // ปิดไว้ชั่วคราว
import {
  Calendar, Eye, MapPin, Phone, Briefcase, DollarSign,
  MessageSquare, User, ShoppingCart, Newspaper, Store, Map,
  ArrowRight, Sparkles
} from "lucide-react";
import { getPublishedNews } from "@/actions/news";
import { getApprovedShops } from "@/actions/shops";
import { getTourismSpots } from "@/actions/tourism";
import { getActiveJobs } from "@/actions/jobs";
import { getBoardPosts } from "@/actions/board";
import { getMarketplaceItems } from "@/actions/marketplace";

function SectionHeader({ icon: Icon, iconBg, iconColor, title, href }: {
  icon: any; iconBg: string; iconColor: string; title: string; href: string;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className={`h-11 w-11 rounded-2xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>
      <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
        ดูทั้งหมด
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const [newsRes, shopsRes, tourismRes, jobsRes, boardRes, marketRes] = await Promise.all([
    getPublishedNews(),
    getApprovedShops(),
    getTourismSpots(),
    getActiveJobs(),
    getBoardPosts(),
    getMarketplaceItems(),
  ]);

  const allNews = newsRes.success ? newsRes.data || [] : [];
  const allShops = shopsRes.success ? shopsRes.data || [] : [];
  const allTourism = tourismRes.success ? tourismRes.data || [] : [];
  const allJobs = jobsRes.success ? jobsRes.data || [] : [];
  const allBoard = boardRes.success ? boardRes.data || [] : [];
  const allMarket = marketRes.success ? marketRes.data || [] : [];

  const newsList = allNews.slice(0, 3);
  const shopsList = allShops.slice(0, 3);
  const tourismList = allTourism.slice(0, 3);
  const jobsList = allJobs.slice(0, 3);
  const boardList = allBoard.slice(0, 3);
  const marketList = allMarket.slice(0, 3);

  const categoryCounts = {
    news: allNews.length,
    shops: allShops.length,
    tourism: allTourism.length,
    jobs: allJobs.length,
    board: allBoard.length,
    marketplace: allMarket.length,
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = { "full-time": "เต็มเวลา", "part-time": "พาร์ทไทม์", contract: "สัญญาจ้าง" };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="container py-6">
        <HeroBanner newsSlides={newsList.filter(n => n.coverImage).map(n => ({ id: n.id, title: n.title, coverImage: n.coverImage, category: n.category }))} />
      </div>

      {/* Categories */}
      <div className="container py-4 pb-8">
        <CategorySection counts={categoryCounts} />
      </div>

      {/* ข่าวสาร */}
      <section className="py-12">
        <div className="container">
          <SectionHeader icon={Newspaper} iconBg="bg-blue-50" iconColor="text-blue-600" title="ข่าวสารล่าสุด" href="/news" />
          {newsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsList.map((news) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <Card className="overflow-hidden hover-lift h-full border-0 shadow-sm bg-white group">
                    <div className="relative h-52 overflow-hidden">
                      {news.coverImage ? (
                        <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center text-blue-300">
                          <Newspaper className="h-12 w-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold">{news.category}</span>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">{news.title}</CardTitle>
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

      {/* ร้านค้า */}
      <section className="py-12 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container">
          <SectionHeader icon={Store} iconBg="bg-emerald-50" iconColor="text-emerald-600" title="ร้านค้าและบริการ" href="/shops" />
          {shopsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shopsList.map((shop) => (
                <Link key={shop.id} href={`/shops/${shop.id}`}>
                  <Card className="overflow-hidden hover-lift h-full border-0 shadow-sm bg-white group">
                    <div className="relative h-52 overflow-hidden">
                      {shop.images && shop.images.length > 0 ? (
                        <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-emerald-300">
                          <Store className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{shop.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{shop.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" /><span className="line-clamp-1">{shop.address}</span>
                      </div>
                      {shop.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" /><span>{shop.phone}</span>
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

      {/* ท่องเที่ยว */}
      <section className="py-12">
        <div className="container">
          <SectionHeader icon={Map} iconBg="bg-violet-50" iconColor="text-violet-600" title="สถานที่ท่องเที่ยว" href="/tourism" />
          {tourismList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tourismList.map((spot) => (
                <Link key={spot.id} href={`/tourism/${spot.id}`}>
                  <Card className="overflow-hidden hover-lift h-full border-0 shadow-sm bg-white group">
                    <div className="relative h-52 overflow-hidden">
                      {spot.images && spot.images.length > 0 ? (
                        <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-violet-300">
                          <Map className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{spot.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{spot.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-violet-500" /><span className="line-clamp-1">{spot.address}</span>
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

      {/* หางาน */}
      <section className="py-12 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container">
          <SectionHeader icon={Briefcase} iconBg="bg-amber-50" iconColor="text-amber-600" title="หางาน" href="/jobs" />
          {jobsList.length > 0 ? (
            <div className="space-y-4">
              {jobsList.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="hover-lift border-0 shadow-sm bg-white group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
                              {getEmploymentTypeLabel(job.employmentType)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(job.createdAt).toLocaleDateString('th-TH')}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-muted-foreground mb-3">{job.company}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-amber-500" />{job.location}</span>
                            <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-amber-500" />{job.salary || 'ตามตกลง'}</span>
                          </div>
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0 ml-4">
                          <Briefcase className="h-6 w-6 text-amber-500" />
                        </div>
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

      {/* เว็บบอร์ด */}
      <section className="py-12">
        <div className="container">
          <SectionHeader icon={MessageSquare} iconBg="bg-pink-50" iconColor="text-pink-600" title="เว็บบอร์ด" href="/board" />
          {boardList.length > 0 ? (
            <div className="space-y-4">
              {boardList.map((post) => (
                <Link key={post.id} href={`/board/${post.id}`}>
                  <Card className={`hover-lift border-0 shadow-sm bg-white group ${post.pinned ? 'ring-1 ring-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {post.pinned && (
                          <span className="text-xs bg-gradient-to-r from-sky-500 to-teal-500 text-white px-2.5 py-1 rounded-full font-semibold">ปักหมุด</span>
                        )}
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />ผู้เขียน</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('th-TH')}</span>
                        <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{post.views} ครั้ง</span>
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

      {/* ซื้อขาย */}
      <section className="py-12 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container">
          <SectionHeader icon={ShoppingCart} iconBg="bg-rose-50" iconColor="text-rose-600" title="ซื้อขาย" href="/marketplace" />
          {marketList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketList.map((item) => (
                <Link key={item.id} href={`/marketplace/${item.id}`}>
                  <Card className="overflow-hidden hover-lift h-full border-0 shadow-sm bg-white group">
                    <div className="relative h-52 overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-rose-300">
                          <ShoppingCart className="h-12 w-12" />
                        </div>
                      )}
                      <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-primary font-bold px-3 py-1.5 rounded-full text-sm shadow-sm">
                        ฿{Number(item.price).toLocaleString()}
                      </span>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-rose-500" /><span>{item.location}</span>
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-sky-200 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
            <Sparkles className="h-4 w-4" />
            ร่วมเป็นส่วนหนึ่งของชุมชน
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            เข้าร่วมชุมชนออนไลน์
            <span className="block mt-2 bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent">ทับสะแก</span>
          </h2>
          <p className="text-lg mb-8 text-sky-100/80 max-w-2xl mx-auto">
            สมัครสมาชิกเพื่อใช้งานฟีเจอร์ครบครันและเข้าถึงบริการทั้งหมดของชุมชน
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-xl bg-white text-slate-900 hover:bg-sky-50 font-bold shadow-xl shadow-black/20 px-8" asChild>
              <Link href="/register">สมัครสมาชิก</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-sm px-8" asChild>
              <Link href="/login">เข้าสู่ระบบ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
