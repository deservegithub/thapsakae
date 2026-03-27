"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Pin, PinOff, Lock, Unlock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getBoardPosts, deleteBoardPost, updateBoardPost } from "@/actions/board";

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
      loadPosts();
    } else {
      alert(response.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleTogglePin = async (id: string, current: boolean) => {
    const response = await updateBoardPost(id, { pinned: !current });
    if (response.success) loadPosts();
  };

  const handleToggleLock = async (id: string, current: boolean) => {
    const response = await updateBoardPost(id, { locked: !current });
    if (response.success) loadPosts();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">จัดการเว็บบอร์ด</h1>
          <p className="text-muted-foreground mt-2">ปักหมุด ล็อก และลบกระทู้ ({posts.length} กระทู้)</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {posts.length > 0 ? (
            <div className="divide-y">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{post.title}</h3>
                      {post.pinned && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Pin className="h-3 w-3" /> ปักหมุด
                        </span>
                      )}
                      {post.locked && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="h-3 w-3" /> ล็อก
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{post.category}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views} ครั้ง</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => handleTogglePin(post.id, post.pinned)}
                      title={post.pinned ? "เลิกปักหมุด" : "ปักหมุด"}>
                      {post.pinned ? <PinOff className="h-4 w-4 text-blue-500" /> : <Pin className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleLock(post.id, post.locked)}
                      title={post.locked ? "ปลดล็อก" : "ล็อกกระทู้"}>
                      {post.locked ? <Unlock className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                    <Link href={`/board/${post.id}`} target="_blank">
                      <Button variant="ghost" size="sm"><MessageSquare className="h-4 w-4" /></Button>
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
