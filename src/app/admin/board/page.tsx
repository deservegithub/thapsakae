"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getBoardPosts, deleteBoardPost } from "@/actions/board";

export default function AdminBoardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const response = await getBoardPosts();
    if (response.success && response.data) {
      setPosts(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบกระทู้นี้?")) return;
    const response = await deleteBoardPost(id);
    if (response.success) {
      alert("ลบกระทู้สำเร็จ");
      loadPosts();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการเว็บบอร์ด</h1>
          <p className="text-muted-foreground mt-2">จัดการและลบกระทู้</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการกระทู้ทั้งหมด ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{post.category}</span>
                      <span>{post.views} ครั้ง</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/board/${post.id}`} target="_blank">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">ยังไม่มีกระทู้ในระบบ</p></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
