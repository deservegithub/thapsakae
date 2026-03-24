import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Eye } from "lucide-react";
import Link from "next/link";
import { getBoardPosts } from "@/actions/board";

export default async function BoardPage() {
  const response = await getBoardPosts();
  const posts = response.success ? response.data : [];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "แนะนำ": "bg-primary/10 text-primary",
      "ถาม-ตอบ": "bg-secondary/10 text-secondary",
      "กิจกรรม": "bg-accent/10 text-accent",
      "ทั่วไป": "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">เว็บบอร์ด</h1>
          <p className="text-lg text-muted-foreground">
            พูดคุยแลกเปลี่ยนความคิดเห็นกับชาวตำบล
          </p>
        </div>
        <Button size="lg">
          <MessageSquare className="mr-2 h-5 w-5" />
          สร้างกระทู้ใหม่
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Button variant="outline">ทั้งหมด</Button>
        <Button variant="outline">แนะนำ</Button>
        <Button variant="outline">ถาม-ตอบ</Button>
        <Button variant="outline">กิจกรรม</Button>
        <Button variant="outline">ทั่วไป</Button>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/board/${post.id}`}>
              <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${post.pinned ? 'border-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {post.pinned && (
                          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                            ปักหมุด
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>ผู้เขียน</span>
                        </span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('th-TH')}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views} ครั้ง</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>ความคิดเห็น</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ยังไม่มีกระทู้ในระบบ</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          โหลดกระทู้เพิ่มเติม
        </Button>
      </div>
    </div>
  );
}
