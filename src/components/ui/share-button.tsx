"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Link2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function ShareButton({ title, text, className, size = "sm" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUrl = () => typeof window !== "undefined" ? window.location.href : "";

  const shareOptions = [
    {
      label: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-50 hover:text-blue-600",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, "_blank", "width=600,height=400"),
    },
    {
      label: "LINE",
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      color: "hover:bg-green-50 hover:text-green-600",
      action: () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(getUrl())}`, "_blank", "width=600,height=400"),
    },
    {
      label: "X (Twitter)",
      icon: Twitter,
      color: "hover:bg-slate-50 hover:text-slate-900",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`, "_blank", "width=600,height=400"),
    },
    {
      label: copied ? "คัดลอกแล้ว!" : "คัดลอกลิงก์",
      icon: copied ? Check : Link2,
      color: copied ? "text-green-600 bg-green-50" : "hover:bg-slate-50",
      action: async () => {
        await navigator.clipboard.writeText(getUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <Button variant="outline" size={size} onClick={() => setOpen(!open)} className={className}>
        <Share2 className="h-4 w-4 mr-2" />
        แชร์
      </Button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {shareOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.label}
                onClick={() => { opt.action(); if (opt.label !== "คัดลอกลิงก์" && opt.label !== "คัดลอกแล้ว!") setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${opt.color}`}
              >
                <Icon className="h-4 w-4" />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
