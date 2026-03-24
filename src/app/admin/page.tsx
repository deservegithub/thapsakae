import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Store, Palmtree, Briefcase, MessageSquare, ShoppingCart, Calendar, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "ข่าวทั้งหมด",
      value: "24",
      change: "+3 ใหม่",
      icon: Newspaper,
      color: "text-primary",
    },
    {
      title: "ร้านค้า",
      value: "52",
      change: "+5 รออนุมัติ",
      icon: Store,
      color: "text-secondary",
    },
    {
      title: "สถานที่ท่องเที่ยว",
      value: "12",
      change: "ทั้งหมด",
      icon: Palmtree,
      color: "text-accent",
    },
    {
      title: "ประกาศงาน",
      value: "18",
      change: "+2 ใหม่",
      icon: Briefcase,
      color: "text-primary",
    },
    {
      title: "กระทู้",
      value: "156",
      change: "+12 วันนี้",
      icon: MessageSquare,
      color: "text-secondary",
    },
    {
      title: "สินค้าซื้อขาย",
      value: "89",
      change: "+7 ใหม่",
      icon: ShoppingCart,
      color: "text-accent",
    },
    {
      title: "การจองคิว",
      value: "34",
      change: "+8 วันนี้",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "ผู้ใช้งาน",
      value: "245",
      change: "+15 เดือนนี้",
      icon: Users,
      color: "text-secondary",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "ข่าวใหม่ถูกเผยแพร่",
      title: "ประชุมคณะกรรมการตำบล",
      time: "5 นาทีที่แล้ว",
    },
    {
      id: 2,
      action: "ร้านค้าใหม่รออนุมัติ",
      title: "ร้านกาแฟมะพร้าวทะเล",
      time: "15 นาทีที่แล้ว",
    },
    {
      id: 3,
      action: "การจองคิวใหม่",
      title: "ติดต่อราชการทั่วไป - คุณสมชาย",
      time: "1 ชั่วโมงที่แล้ว",
    },
  ];

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">แดชบอร์ดผู้ดูแลระบบ</h1>
        <p className="text-lg text-muted-foreground">
          ภาพรวมและจัดการเว็บไซต์ตำบลทับสะแก
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>กิจกรรมล่าสุด</CardTitle>
            <CardDescription>กิจกรรมที่เกิดขึ้นในระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>การจัดการ</CardTitle>
            <CardDescription>เข้าถึงเมนูจัดการต่างๆ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a href="/admin/news" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Newspaper className="h-6 w-6 text-primary mb-2" />
                <p className="font-medium text-sm">จัดการข่าว</p>
              </a>
              <a href="/admin/shops" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Store className="h-6 w-6 text-secondary mb-2" />
                <p className="font-medium text-sm">จัดการร้านค้า</p>
              </a>
              <a href="/admin/tourism" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Palmtree className="h-6 w-6 text-accent mb-2" />
                <p className="font-medium text-sm">จัดการท่องเที่ยว</p>
              </a>
              <a href="/admin/jobs" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Briefcase className="h-6 w-6 text-primary mb-2" />
                <p className="font-medium text-sm">จัดการงาน</p>
              </a>
              <a href="/admin/board" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <MessageSquare className="h-6 w-6 text-secondary mb-2" />
                <p className="font-medium text-sm">จัดการบอร์ด</p>
              </a>
              <a href="/admin/marketplace" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <ShoppingCart className="h-6 w-6 text-accent mb-2" />
                <p className="font-medium text-sm">จัดการซื้อขาย</p>
              </a>
              <a href="/admin/users" className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <Users className="h-6 w-6 text-secondary mb-2" />
                <p className="font-medium text-sm">จัดการผู้ใช้</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
