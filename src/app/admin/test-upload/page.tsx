"use client";

import { ImageUpload } from "@/components/shared/ImageUpload";
import { useState } from "react";

export default function TestUploadPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">ทดสอบอัปโหลดรูป R2</h1>
      <ImageUpload
        value={images}
        onChange={setImages}
        folder="test"
        maxFiles={3}
      />
      {images.length > 0 && (
        <div className="mt-4 p-4 bg-slate-100 rounded-xl">
          <p className="text-sm font-medium mb-2">URLs:</p>
          {images.map((url) => (
            <p key={url} className="text-xs text-muted-foreground break-all">{url}</p>
          ))}
        </div>
      )}
    </div>
  );
}
