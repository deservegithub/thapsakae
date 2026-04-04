import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Newspaper, Store, Palmtree, Briefcase, MessageSquare, ShoppingCart, Users, CalendarDays,
  TrendingUp, ArrowRight, Clock
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { news, shops, tourism, jobs, boardPosts, marketplaceItems, users, appointments } from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";

export default async function AdminDashboard() {
  const [newsCount, shopsCount, tourismCount, jobsCount, boardCount, marketCount, usersCount, appointmentsCount] = await Promise.all([
    db.select({ count: count() }).from(news),
    db.select({ count: count() }).from(shops),
    db.select({ count: count() }).from(tourism),
    db.select({ count: count() }).from(jobs),
    db.select({ count: count() }).from(boardPosts),
    db.select({ count: count() }).from(marketplaceItems),
    db.select({ count: count() }).from(users),
    db.select({ count: count() }).from(appointments),
  ]);

  const recentNews = await db.select({ id: news.id, title: news.title, createdAt: news.createdAt }).from(news).orderBy(desc(news.createdAt)).limit(5);
  const recentAppointments = await db.select().from(appointments).orderBy(desc(appointments.createdAt)).limit(5);

  const stats = [
    { title: "ข่าวสาร", value: newsCount[0].count, icon: Newspaper, bg: "bg-blue-50", iconColor: "text-blue-600", href: "/admin/news" },
    { title: "ร้านค้า", value: shopsCount[0].count, icon: Store, bg: "bg-emerald-50", iconColor: "text-emerald-600", href: "/admin/shops" },
    { title: "ท่องเที่ยว", value: tourismCount[0].count, icon: Palmtree, bg: "bg-sky-50", iconColor: "text-sky-600", href: "/admin/tourism" },
    { title: "ประกาศงาน", value: jobsCount[0].count, icon: Briefcase, bg: "bg-amber-50", iconColor: "text-amber-600", href: "/admin/jobs" },
    { title: "กระทู้", value: boardCount[0].count, icon: MessageSquare, bg: "bg-purple-50", iconColor: "text-purple-600", href: "/admin/board" },
    { title: "ซื้อขาย", value: marketCount[0].count, icon: ShoppingCart, bg: "bg-rose-50", iconColor: "text-rose-600", href: "/admin/marketplace" },
    { title: "จองคิว", value: appointmentsCount[0].count, icon: CalendarDays, bg: "bg-cyan-50", iconColor: "text-cyan-600", href: "/admin/appointments" },
    { title: "ผู้ใช้งาน", value: usersCount[0].count, icon: Users, bg: "bg-indigo-50", iconColor: "text-indigo-600", href: "/admin/users" },
  ];

  const quickLinks = [
    { href: "/admin/news", icon: Newspaper, label: "จัดการข่าว", bg: "bg-blue-50", iconColor: "text-blue-600" },
    { href: "/admin/shops", icon: Store, label: "จัดการร้านค้า", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { href: "/admin/tourism", icon: Palmtree, label: "จัดการท่องเที่ยว", bg: "bg-sky-50", iconColor: "text-sky-600" },
    { href: "/admin/jobs", icon: Briefcase, label: "จัดการงาน", bg: "bg-amber-50", iconColor: "text-amber-600" },
    { href: "/admin/appointments", icon: CalendarDays, label: "จัดการจองคิว", bg: "bg-cyan-50", iconColor: "text-cyan-600" },
    { href: "/admin/users", icon: Users, label: "จัดการผู้ใช้", bg: "bg-indigo-50", iconColor: "text-indigo-600" },
  ];

  const statusMap: Record<string, { label: string; bg: string; dot: string }> = {
    pending: { label: "รอดำเนินการ", bg: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    confirmed: { label: "ยืนยันแล้ว", bg: "bg-green-50 text-green-700", dot: "bg-green-500" },
    completed: { label: "เสร็จสิ้น", bg: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
    cancelled: { label: "ยกเลิก", bg: "bg-red-50 text-red-700", dot: "bg-red-500" },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
            <p className="text-sm text-muted-foreground">ภาพรวมเว็บไซต์ตำบลทับสะแก</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="border-0 shadow-sm hover-lift bg-white group cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-10 w-10 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-3xl font-bold mb-0.5">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent News */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Newspaper className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle className="text-base">ข่าวล่าสุด</CardTitle>
              </div>
              <Link href="/admin/news" className="text-xs text-primary hover:underline font-medium">ดูทั้งหมด</Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentNews.length > 0 ? (
              <div className="space-y-3">
                {recentNews.map((item, i) => (
                  <Link key={item.id} href={`/admin/news`} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">ยังไม่มีข่าว</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 text-cyan-600" />
                </div>
                <CardTitle className="text-base">จองคิวล่าสุด</CardTitle>
              </div>
              <Link href="/admin/appointments" className="text-xs text-primary hover:underline font-medium">ดูทั้งหมด</Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentAppointments.length > 0 ? (
              <div className="space-y-3">
                {recentAppointments.map((apt) => {
                  const s = statusMap[apt.status] || statusMap.pending;
                  return (
                    <div key={apt.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className={`h-2 w-2 rounded-full flex-shrink-0 ${s.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{apt.serviceType}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(apt.appointmentDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} {apt.appointmentTime}
                        </p>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full font-semibold flex-shrink-0 ${s.bg}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">ยังไม่มีการจอง</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-slate-600" />
              </div>
              <CardTitle className="text-base">ลิงก์ด่วน</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2.5">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all group"
                  >
                    <div className={`h-9 w-9 rounded-xl ${link.bg} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${link.iconColor}`} />
                    </div>
                    <p className="font-medium text-xs leading-tight">{link.label}</p>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
