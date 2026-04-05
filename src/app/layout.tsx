import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { LayoutShell } from "@/components/layout/LayoutShell";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thapsakaefocus.com"),
  title: {
    default: "ตำบลทับสะแก - เมืองมะพร้าวทะเล",
    template: "%s | ทับสะแกโฟกัส",
  },
  description: "เว็บไซต์ตำบลทับสะแก อำเภอทับสะแก จังหวัดประจวบคีรีขันธ์ ข่าวสาร ร้านค้า ท่องเที่ยว หางาน เว็บบอร์ด ซื้อขาย จองคิว",
  keywords: ["ทับสะแก", "ประจวบคีรีขันธ์", "ท่องเที่ยวทับสะแก", "ร้านค้าทับสะแก", "หางานทับสะแก", "ข่าวทับสะแก", "เมืองมะพร้าวทะเล"],
  authors: [{ name: "ทับสะแกโฟกัส" }],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ทับสะแกโฟกัส",
    title: "ตำบลทับสะแก - เมืองมะพร้าวทะเล",
    description: "เว็บไซต์ตำบลทับสะแก ข่าวสาร ร้านค้า ท่องเที่ยว หางาน เว็บบอร์ด ซื้อขาย",
    url: "https://www.thapsakaefocus.com",
    images: [{ url: "/api/og?title=ทับสะแกโฟกัส&type=home", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ตำบลทับสะแก - เมืองมะพร้าวทะเล",
    description: "เว็บไซต์ตำบลทับสะแก ข่าวสาร ร้านค้า ท่องเที่ยว หางาน เว็บบอร์ด ซื้อขาย",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-prompt" suppressHydrationWarning>
        <SessionProvider>
          <LayoutShell>{children}</LayoutShell>
        </SessionProvider>
      </body>
    </html>
  );
}
