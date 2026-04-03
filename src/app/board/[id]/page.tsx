"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Eye, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { getBoardPostById, getCommentsByPostId, createComment } from "@/actions/board";

export default function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    const [postResponse, commentsResponse] = await Promise.all([
      getBoardPostById(id),
      getCommentsByPostId(id)
    ]);

    if (postResponse.success && postResponse.data) {
      setPost(postResponse.data);
    }
    if (commentsResponse.success && commentsResponse.data) {
      setComments(commentsResponse.data);
    }
    setLoading(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    const response = await createComment({
      postId: id,
      content: newComment,
      userId: (session?.user as any)?.id || "",
    });

    if (response.success) {
      setNewComment("");
      loadData();
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-center">กำลังโหลด...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-center">ไม่พบกระทู้</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Link href="/board">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปเว็บบอร์ด
            </Button>
          </Link>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                {post.pinned && (
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                    ปักหมุด
                  </span>
                )}
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>ผู้เขียน</span>
                </div>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} ครั้ง</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none whitespace-pre-wrap">
                {post.content}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                ความคิดเห็น ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">ผู้แสดงความคิดเห็น</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('th-TH')}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">ยังไม่มีความคิดเห็น</p>
              )}
            </CardContent>
          </Card>

          {post.locked ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">กระทู้นี้ถูกล็อก ไม่สามารถแสดงความคิดเห็นได้</p>
              </CardContent>
            </Card>
          ) : session?.user ? (
            <Card>
              <CardHeader>
                <CardTitle>แสดงความคิดเห็น</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="เขียนความคิดเห็นของคุณ..."
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={submitting}
                  />
                  <Button type="submit" disabled={submitting || !newComment.trim()}>
                    {submitting ? "กำลังส่ง..." : "ส่งความคิดเห็น"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">กรุณา<Link href="/login" className="text-primary hover:underline">เข้าสู่ระบบ</Link>เพื่อแสดงความคิดเห็น</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
