import Link from "next/link";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ตำบลทับสะแก</h3>
            <p className="text-sm text-muted-foreground">
              เว็บไซต์ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">เมนูหลัก</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="hover:text-primary">ข่าวสาร</Link></li>
              <li><Link href="/shops" className="hover:text-primary">ร้านค้า</Link></li>
              <li><Link href="/tourism" className="hover:text-primary">ท่องเที่ยว</Link></li>
              <li><Link href="/jobs" className="hover:text-primary">หางาน</Link></li>
              <li><Link href="/board" className="hover:text-primary">เว็บบอร์ด</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary">ซื้อขาย</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">เกี่ยวกับเรา</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-primary">ระบบสมาชิก</Link></li>
              <li><Link href="/contact" className="hover:text-primary">ติดต่อโฆษณา/สอบถาม</Link></li>
              <li><Link href="/terms" className="hover:text-primary">ข้อตกลงการใช้บริการ</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">นโยบายความเป็นส่วนตัว</Link></li>
              <li><Link href="/report" className="hover:text-primary">แจ้งปัญหาการใช้งาน</Link></li>
              <li><Link href="/stats" className="hover:text-primary">สถิติเว็บไซต์</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">ติดต่อเรา</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>032-123-456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@thapsakae.go.th</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>ตำบลทับสะแก อ.เมือง จ.ประจวบคีรีขันธ์</span>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ตำบลทับสะแก. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
