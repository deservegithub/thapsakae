"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function ShareButton({ title, text, className, size = "sm" }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text || title, url });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("คัดลอกลิงก์แล้ว!");
    }
  };

  return (
    <Button variant="outline" size={size} onClick={handleShare} className={className}>
      <Share2 className="h-4 w-4 mr-2" />
      แชร์
    </Button>
  );
}
