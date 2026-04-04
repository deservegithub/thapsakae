import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Store, Palmtree, Briefcase, MessageSquare, ShoppingCart, Users, CalendarDays } from "lucide-react";
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
    { title: "ข่าวทั้งหมด", value: newsCount[0].count, icon: Newspaper, color: "text-blue-600", href: "/admin/news" },
    { title: "ร้านค้า", value: shopsCount[0].count, icon: Store, color: "text-emerald-600", href: "/admin/shops" },
    { title: "สถานที่ท่องเที่ยว", value: tourismCount[0].count, icon: Palmtree, color: "text-sky-600", href: "/admin/tourism" },
    { title: "ประกาศงาน", value: jobsCount[0].count, icon: Briefcase, color: "text-amber-600", href: "/admin/jobs" },
    { title: "กระทู้", value: boardCount[0].count, icon: MessageSquare, color: "text-purple-600", href: "/admin/board" },
    { title: "สินค้าซื้อขาย", value: marketCount[0].count, icon: ShoppingCart, color: "text-rose-600", href: "/admin/marketplace" },
    { title: "จองคิว", value: appointmentsCount[0].count, icon: CalendarDays, color: "text-cyan-600", href: "/admin/appointments" },
    { title: "ผู้ใช้งาน", value: usersCount[0].count, icon: Users, color: "text-indigo-600", href: "/admin/users" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้ดูแลระบบ</h1>
        <p className="text-muted-foreground">ภาพรวมและจัดการเว็บไซต์ตำบลทับสะแก</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ข่าวล่าสุด</CardTitle>
            <CardDescription>ข่าวที่เพิ่มเข้ามาล่าสุดในระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            {recentNews.length > 0 ? (
              <div className="space-y-4">
                {recentNews.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">ยังไม่มีข่าว</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การจองคิวล่าสุด</CardTitle>
            <CardDescription>รายการจองคิวที่เข้ามาล่าสุด</CardDescription>
          </CardHeader>
          <CardContent>
            {recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-start gap-4">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      apt.status === "pending" ? "bg-amber-500" :
                      apt.status === "confirmed" ? "bg-green-500" :
                      apt.status === "completed" ? "bg-blue-500" : "bg-red-500"
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{apt.serviceType}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(apt.appointmentDate).toLocaleDateString('th-TH')} เวลา {apt.appointmentTime}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.status === "pending" ? "bg-amber-100 text-amber-800" :
                      apt.status === "confirmed" ? "bg-green-100 text-green-800" :
                      apt.status === "completed" ? "bg-blue-100 text-blue-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {apt.status === "pending" ? "รอ" : apt.status === "confirmed" ? "ยืนยัน" : apt.status === "completed" ? "เสร็จ" : "ยกเลิก"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">ยังไม่มีการจอง</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การจัดการ</CardTitle>
            <CardDescription>เข้าถึงเมนูจัดการต่างๆ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/news" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Newspaper className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-sm">จัดการข่าว</p>
              </Link>
              <Link href="/admin/shops" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Store className="h-6 w-6 text-emerald-600 mb-2" />
                <p className="font-medium text-sm">จัดการร้านค้า</p>
              </Link>
              <Link href="/admin/tourism" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Palmtree className="h-6 w-6 text-sky-600 mb-2" />
                <p className="font-medium text-sm">จัดการท่องเที่ยว</p>
              </Link>
              <Link href="/admin/jobs" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Briefcase className="h-6 w-6 text-amber-600 mb-2" />
                <p className="font-medium text-sm">จัดการงาน</p>
              </Link>
              <Link href="/admin/appointments" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <CalendarDays className="h-6 w-6 text-cyan-600 mb-2" />
                <p className="font-medium text-sm">จัดการจองคิว</p>
              </Link>
              <Link href="/admin/users" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Users className="h-6 w-6 text-indigo-600 mb-2" />
                <p className="font-medium text-sm">จัดการผู้ใช้</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
