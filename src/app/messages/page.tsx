import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      participant: "คุณสมชาย",
      lastMessage: "สินค้ายังมีอยู่ไหมครับ",
      timestamp: "10:30",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      participant: "ร้านอาหารทะเลสด",
      lastMessage: "ขอบคุณครับ",
      timestamp: "เมื่อวาน",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      participant: "คุณสมหญิง",
      lastMessage: "ได้ครับ พรุ่งนี้มารับได้เลย",
      timestamp: "2 วันที่แล้ว",
      unread: 0,
      online: true,
    },
  ];

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">ข้อความ</h1>
          <p className="text-lg text-muted-foreground">
            แชทกับผู้ขายและผู้ซื้อในตำบล
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="ค้นหาการสนทนา..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                      <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <MessageCircle className="h-6 w-6 text-primary" />
                            </div>
                            {conversation.online && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-sm truncate">
                                {conversation.participant}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                {conversation.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage}
                              </p>
                              {conversation.unread > 0 && (
                                <span className="ml-2 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                                  {conversation.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardContent className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">เลือกการสนทนา</h3>
                  <p className="text-muted-foreground">
                    เลือกการสนทนาจากรายการด้านซ้ายเพื่อเริ่มแชท
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8">
          <Card className="bg-sky-50 border-sky-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">เกี่ยวกับการแชท</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• แชทแบบ Real-time จะพร้อมใช้งานเร็วๆ นี้</li>
                <li>• สามารถส่งรูปภาพและไฟล์ได้</li>
                <li>• ระบบจะแจ้งเตือนเมื่อมีข้อความใหม่</li>
                <li>• กรุณาใช้ภาษาสุภาพและเคารพซึ่งกันและกัน</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
