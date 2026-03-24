import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ตำบลทับสะแก - เมืองมะพร้าวทะเล",
  description: "เว็บไซต์ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์ ข่าวสาร ร้านค้า ท่องเที่ยว หางาน",
  keywords: "ทับสะแก, ประจวบคีรีขันธ์, ท่องเที่ยว, ร้านค้า, หางาน",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
