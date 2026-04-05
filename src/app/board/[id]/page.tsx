import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Eye } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import Link from "next/link";
import { getBoardPostById, getCommentsByPostId } from "@/actions/board";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/board/CommentSection";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const response = await getBoardPostById(id);
  if (!response.success || !response.data) return { title: "ไม่พบกระทู้" };
  const post = response.data;
  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      type: "article",
      images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}&type=board`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.content.slice(0, 160) },
  };
}

export default async function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [postResponse, commentsResponse] = await Promise.all([
    getBoardPostById(id),
    getCommentsByPostId(id),
  ]);

  if (!postResponse.success || !postResponse.data) {
    notFound();
  }

  const post = postResponse.data;
  const comments = commentsResponse.success ? commentsResponse.data || [] : [];

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
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {post.authorAvatar ? (
                      <img src={post.authorAvatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <span className="font-medium text-foreground">{post.authorName || "ไม่ระบุชื่อ"}</span>
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
              <div className="mt-6 pt-6 border-t flex justify-end">
                <ShareButton title={post.title} text={post.content.slice(0, 100)} />
              </div>
            </CardContent>
          </Card>

          <CommentSection postId={id} comments={comments} locked={post.locked} />
        </div>
      </div>
    </div>
  );
}
