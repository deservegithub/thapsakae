import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Eye, TrendingUp, Calendar, MessageSquare, Store, Newspaper } from "lucide-react";

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">สถิติเว็บไซต์</h1>
            <p className="text-lg text-muted-foreground">
              ข้อมูลสถิติการใช้งานเว็บไซต์ตำบลทับสะแก
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ผู้เข้าชมวันนี้</p>
                    <p className="text-3xl font-bold mt-2">1,234</p>
                    <p className="text-xs text-green-600 mt-1">↑ 12% จากเมื่อวาน</p>
                  </div>
                  <Eye className="h-10 w-10 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ผู้เข้าชมเดือนนี้</p>
                    <p className="text-3xl font-bold mt-2">45,678</p>
                    <p className="text-xs text-green-600 mt-1">↑ 8% จากเดือนก่อน</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">สมาชิกทั้งหมด</p>
                    <p className="text-3xl font-bold mt-2">2,456</p>
                    <p className="text-xs text-green-600 mt-1">↑ 156 คนใหม่</p>
                  </div>
                  <Users className="h-10 w-10 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">โพสต์ทั้งหมด</p>
                    <p className="text-3xl font-bold mt-2">3,789</p>
                    <p className="text-xs text-green-600 mt-1">↑ 45 โพสต์ใหม่</p>
                  </div>
                  <MessageSquare className="h-10 w-10 text-purple-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>สถิติการใช้งานตามหมวดหมู่</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">ข่าวสาร</span>
                      </div>
                      <span className="text-sm text-muted-foreground">12,345 ครั้ง</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">ร้านค้า</span>
                      </div>
                      <span className="text-sm text-muted-foreground">8,234 ครั้ง</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">เว็บบอร์ด</span>
                      </div>
                      <span className="text-sm text-muted-foreground">6,789 ครั้ง</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">ท่องเที่ยว</span>
                      </div>
                      <span className="text-sm text-muted-foreground">5,432 ครั้ง</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-teal-500" />
                        <span className="text-sm font-medium">หางาน</span>
                      </div>
                      <span className="text-sm text-muted-foreground">3,456 ครั้ง</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ข่าวยอดนิยม (7 วันล่าสุด)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "เทศบาลทับสะแกเปิดรับสมัครงาน 5 อัตรา", views: 3200 },
                    { title: "เทศกาลอาหารทะเลทับสะแก 2567", views: 2890 },
                    { title: "เปิดตัวแอปพลิเคชันท่องเที่ยวทับสะแก", views: 2100 },
                    { title: "ตลาดโต้รุ่งทับสะแก เปิดให้บริการแล้ว", views: 1560 },
                    { title: "โครงการปลูกป่าชายเลนเพื่ออนุรักษ์", views: 890 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <Eye className="h-3 w-3 inline mr-1" />
                          {item.views.toLocaleString()} ครั้ง
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>อุปกรณ์ที่ใช้เข้าชม</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">📱 มือถือ</span>
                    <span className="text-sm font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">💻 คอมพิวเตอร์</span>
                    <span className="text-sm font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">📲 แท็บเล็ต</span>
                    <span className="text-sm font-semibold">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>เบราว์เซอร์ที่ใช้</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chrome</span>
                    <span className="text-sm font-semibold">55%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Safari</span>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Firefox</span>
                    <span className="text-sm font-semibold">12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">อื่นๆ</span>
                    <span className="text-sm font-semibold">8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>เวลาที่เข้าชมมากที่สุด</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">09:00 - 12:00</span>
                    <span className="text-sm font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">13:00 - 17:00</span>
                    <span className="text-sm font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">18:00 - 21:00</span>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">อื่นๆ</span>
                    <span className="text-sm font-semibold">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>สถิติรายเดือน (ปี 2567)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {[
                  { month: "ม.ค.", value: 35000 },
                  { month: "ก.พ.", value: 38000 },
                  { month: "มี.ค.", value: 45678 },
                  { month: "เม.ย.", value: 42000 },
                  { month: "พ.ค.", value: 48000 },
                  { month: "มิ.ย.", value: 52000 },
                  { month: "ก.ค.", value: 49000 },
                  { month: "ส.ค.", value: 51000 },
                  { month: "ก.ย.", value: 47000 },
                  { month: "ต.ค.", value: 50000 },
                  { month: "พ.ย.", value: 53000 },
                  { month: "ธ.ค.", value: 55000 },
                ].map((item, index) => {
                  const maxValue = 55000;
                  const heightPercent = (item.value / maxValue) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-semibold text-muted-foreground">
                        {(item.value / 1000).toFixed(0)}k
                      </div>
                      <div
                        className="w-full bg-primary rounded-t"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                      <div className="text-xs text-muted-foreground">{item.month}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>ข้อมูลสถิติอัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
