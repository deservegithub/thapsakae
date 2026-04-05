import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!; // e.g. https://pub-xxx.r2.dev or custom domain

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function getExtension(contentType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  return map[contentType] || "jpg";
}

export async function generatePresignedUploadUrl(
  contentType: string,
  folder: string = "uploads"
) {
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw new Error(`ไม่รองรับไฟล์ประเภท ${contentType}`);
  }

  const ext = getExtension(contentType);
  const key = `${folder}/${randomUUID()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(r2Client, command, {
    expiresIn: 300, // 5 minutes
  });

  const publicUrl = `${R2_PUBLIC_URL}/${key}`;

  return { presignedUrl, publicUrl, key };
}

export async function deleteR2Object(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });
  await r2Client.send(command);
}

export function getKeyFromUrl(url: string): string | null {
  if (!url.startsWith(R2_PUBLIC_URL)) return null;
  return url.replace(`${R2_PUBLIC_URL}/`, "");
}

export { R2_BUCKET_NAME, R2_PUBLIC_URL, MAX_FILE_SIZE, ALLOWED_TYPES };
