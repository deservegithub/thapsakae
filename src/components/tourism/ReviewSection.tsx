"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import Link from "next/link";
import { getReviewsByTourismId, createReview } from "@/actions/tourism-reviews";

interface ReviewSectionProps {
  tourismId: string;
}

export function ReviewSection({ tourismId }: ReviewSectionProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    loadReviews();
  }, [tourismId]);

  const loadReviews = async () => {
    const res = await getReviewsByTourismId(tourismId);
    if (res.success && res.data) setReviews(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !comment.trim()) return;
    setSubmitting(true);

    const res = await createReview({
      tourismId,
      userId: (session.user as any).id,
      rating,
      comment: comment.trim(),
    });

    setSubmitting(false);
    if (res.success) {
      setComment("");
      setRating(5);
      loadReviews();
    } else {
      alert(res.error || "เกิดข้อผิดพลาด");
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>รีวิวและคะแนน</span>
            <span className="flex items-center gap-1 text-base font-normal">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              {avgRating} ({reviews.length} รีวิว)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.userName}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(r.createdAt).toLocaleDateString("th-TH")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">ยังไม่มีรีวิว</p>
          )}
        </CardContent>
      </Card>

      {session?.user ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">เขียนรีวิว</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">คะแนน</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1"
                    >
                      <Star className={`h-6 w-6 transition-colors ${
                        s <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ความคิดเห็น</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="เขียนรีวิวของคุณ..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting ? "กำลังส่ง..." : "ส่งรีวิว"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground">
              กรุณา <Link href="/login" className="text-primary hover:underline">เข้าสู่ระบบ</Link> เพื่อเขียนรีวิว
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
