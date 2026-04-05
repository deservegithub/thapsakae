"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value = [],
  onChange,
  folder = "uploads",
  maxFiles = 5,
  maxSizeMB = 5,
  disabled = false,
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`ไฟล์ "${file.name}" ใหญ่เกิน ${maxSizeMB}MB`);
        return null;
      }

      // 1. Get presigned URL
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: file.type,
          folder,
          fileSize: file.size,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "ไม่สามารถอัปโหลดได้");
      }

      const { presignedUrl, publicUrl } = await res.json();

      // 2. Upload directly to R2
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("อัปโหลดไฟล์ไม่สำเร็จ");
      }

      return publicUrl as string;
    },
    [folder, maxSizeMB]
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxFiles - value.length;

      if (remaining <= 0) {
        setError(`อัปโหลดได้สูงสุด ${maxFiles} รูป`);
        return;
      }

      const toUpload = fileArray.slice(0, remaining);
      setUploading(true);
      setError(null);

      try {
        const results = await Promise.all(toUpload.map(uploadFile));
        const newUrls = results.filter(Boolean) as string[];
        onChange([...value, ...newUrls]);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาดในการอัปโหลด");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, maxFiles, uploadFile]
  );

  const handleRemove = useCallback(
    async (url: string) => {
      // Remove from UI immediately
      onChange(value.filter((u) => u !== url));

      // Delete from R2 in background
      try {
        await fetch("/api/upload/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } catch {
        // Silent fail — image already removed from form
      }
    },
    [value, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return (
    <div className={className}>
      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {value.map((url, i) => (
            <div
              key={url}
              className="relative group aspect-square rounded-xl overflow-hidden border border-border/50 bg-slate-50"
            >
              <img
                src={url}
                alt={`uploaded-${i}`}
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-black/60 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full font-medium">
                  หน้าปก
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {value.length < maxFiles && !disabled && (
        <label
          className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border/60 hover:border-primary/40 hover:bg-slate-50"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple={maxFiles - value.length > 1}
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
              e.target.value = "";
            }}
            disabled={uploading || disabled}
          />
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground font-medium">กำลังอัปโหลด...</p>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  ลากไฟล์มาวาง หรือ <span className="text-primary">คลิกเพื่อเลือก</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG, PNG, WebP, GIF — สูงสุด {maxSizeMB}MB ({value.length}/{maxFiles} รูป)
                </p>
              </div>
            </>
          )}
        </label>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}

interface SingleImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  className?: string;
}

export function SingleImageUpload({
  value,
  onChange,
  folder = "uploads",
  maxSizeMB = 5,
  disabled = false,
  className = "",
}: SingleImageUploadProps) {
  return (
    <ImageUpload
      value={value ? [value] : []}
      onChange={(urls) => onChange(urls[0] || "")}
      folder={folder}
      maxFiles={1}
      maxSizeMB={maxSizeMB}
      disabled={disabled}
      className={className}
    />
  );
}
