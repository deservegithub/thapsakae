"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { createComment } from "@/actions/board";
import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userName: string | null;
  userAvatar: string | null;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  locked: boolean;
}

export function CommentSection({ postId, comments, locked }: CommentSectionProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    const response = await createComment({
      postId,
      content: newComment,
      userId: (session?.user as any)?.id || "",
    });

    if (response.success) {
      setNewComment("");
      router.refresh();
    }
    setSubmitting(false);
  };

  return (
    <>
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
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {comment.userAvatar ? (
                      <img src={comment.userAvatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{comment.userName || "ไม่ระบุชื่อ"}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความเห็น!</p>
          )}
        </CardContent>
      </Card>

      {locked ? (
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
            <p className="text-muted-foreground">
              กรุณา<Link href="/login" className="text-primary hover:underline">เข้าสู่ระบบ</Link>เพื่อแสดงความคิดเห็น
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
