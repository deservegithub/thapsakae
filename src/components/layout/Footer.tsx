import Link from "next/link";
import { Facebook, Mail, Phone, MapPin, Waves, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg text-white">ทับสะแก</p>
                <p className="text-xs text-slate-400">เมืองมะพร้าวทะเล</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              เว็บไซต์ชุมชนออนไลน์ตำบลทับสะแก อำเภอทับสะแก จังหวัดประจวบคีรีขันธ์ — ศูนย์รวมข้อมูลข่าวสาร ร้านค้า ท่องเที่ยว และบริการ
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors group">
                <Facebook className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a href="mailto:info@thapsakae.go.th" className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors group">
                <Mail className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a href="tel:032123456" className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors group">
                <Phone className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5">เมนูหลัก</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/news", label: "ข่าวสาร" },
                { href: "/shops", label: "ร้านค้า" },
                { href: "/tourism", label: "ท่องเที่ยว" },
                { href: "/jobs", label: "หางาน" },
                { href: "/board", label: "เว็บบอร์ด" },
                { href: "/marketplace", label: "ซื้อขาย" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5">เกี่ยวกับเรา</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/login", label: "ระบบสมาชิก" },
                { href: "/contact", label: "ติดต่อโฆษณา" },
                { href: "/terms", label: "ข้อตกลงการใช้บริการ" },
                { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
                { href: "/report", label: "แจ้งปัญหา" },
                { href: "/stats", label: "สถิติเว็บไซต์" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5">ติดต่อเรา</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">โทรศัพท์</p>
                  <p className="text-slate-300">032-123-456</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">อีเมล</p>
                  <p className="text-slate-300">info@thapsakae.go.th</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">ที่อยู่</p>
                  <p className="text-slate-300">ตำบลทับสะแก อ.ทับสะแก จ.ประจวบคีรีขันธ์</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ตำบลทับสะแก — All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Made with</span>
            <span className="text-red-400">&#9829;</span>
            <span>by ชุมชนทับสะแก</span>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
