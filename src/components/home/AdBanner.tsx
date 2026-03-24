import Link from "next/link";
import { Megaphone } from "lucide-react";

interface AdBannerProps {
  variant?: "horizontal" | "highlight";
  position?: string;
}

export function AdBanner({ variant = "horizontal", position = "" }: AdBannerProps) {
  if (variant === "highlight") {
    return (
      <section className="py-4">
        <div className="container">
          <Link href="/contact?subject=ads" className="block">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-[2px]">
              <div className="rounded-xl bg-white px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">ลงโฆษณากับเรา!</p>
                    <p className="text-sm text-muted-foreground">โปรโมทธุรกิจของคุณให้คนในชุมชนทับสะแกเห็น — เริ่มต้นเพียง 500 บาท/เดือน</p>
                  </div>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:shadow-lg transition-shadow">
                    สนใจลงโฆษณา →
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <p className="text-[10px] text-muted-foreground text-right mt-1 pr-1">โฆษณา • ตำแหน่ง {position}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="container">
        <Link href="/contact?subject=ads" className="block">
          <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-gray-300 hover:border-primary/50 bg-gray-50 hover:bg-primary/5 transition-all duration-300 group">
            <div className="px-6 py-8 flex flex-col items-center justify-center text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Megaphone className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-gray-500 group-hover:text-primary transition-colors">พื้นที่โฆษณา</p>
                <p className="text-xs text-gray-400 mt-1">ติดต่อลงโฆษณา — แบนเนอร์ขนาด 728×90</p>
              </div>
            </div>
          </div>
        </Link>
        <p className="text-[10px] text-muted-foreground text-right mt-1 pr-1">โฆษณา • ตำแหน่ง {position}</p>
      </div>
    </section>
  );
}
