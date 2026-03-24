import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">นโยบายความเป็นส่วนตัว</h1>
            <p className="text-lg text-muted-foreground">
              Privacy Policy - อัปเดตล่าสุด: มีนาคม 2567
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. ข้อมูลที่เรารวบรวม</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1.1 ข้อมูลส่วนบุคคล</h4>
                <p>เมื่อท่านสมัครสมาชิกหรือใช้บริการ เราอาจเก็บรวบรวมข้อมูลดังต่อไปนี้:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>ชื่อ-นามสกุล</li>
                  <li>อีเมล</li>
                  <li>เบอร์โทรศัพท์</li>
                  <li>ที่อยู่</li>
                  <li>รูปโปรไฟล์</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">1.2 ข้อมูลการใช้งาน</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP Address</li>
                  <li>ประเภทเบราว์เซอร์</li>
                  <li>หน้าที่เข้าชม</li>
                  <li>เวลาที่ใช้งาน</li>
                  <li>Cookies และเทคโนโลยีติดตามอื่นๆ</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">1.3 ข้อมูลจากบุคคลที่สาม</h4>
                <p>
                  เราอาจได้รับข้อมูลจากบริการภายนอก เช่น การเข้าสู่ระบบผ่าน Social Media
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>2. วัตถุประสงค์การใช้ข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>เราใช้ข้อมูลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>ให้บริการและปรับปรุงคุณภาพการให้บริการ</li>
                <li>ติดต่อสื่อสารและส่งข้อมูลข่าวสาร</li>
                <li>ตอบคำถามและแก้ไขปัญหา</li>
                <li>วิเคราะห์การใช้งานเพื่อพัฒนาเว็บไซต์</li>
                <li>ป้องกันการฉ้อโกงและรักษาความปลอดภัย</li>
                <li>ปฏิบัติตามกฎหมายและข้อบังคับ</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. การเปิดเผยข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่บุคคลที่สาม ยกเว้นในกรณีต่อไปนี้:</p>
              
              <div>
                <h4 className="font-semibold mb-2">3.1 ด้วยความยินยอม</h4>
                <p>เมื่อได้รับความยินยอมจากท่าน</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.2 ผู้ให้บริการ</h4>
                <p>
                  บริษัทหรือบุคคลที่ช่วยให้บริการแทนเรา (เช่น โฮสติ้ง, ระบบอีเมล)
                  ซึ่งมีหน้าที่รักษาความลับข้อมูล
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.3 ตามกฎหมาย</h4>
                <p>
                  เมื่อมีคำสั่งศาล หรือเพื่อปฏิบัติตามกฎหมาย
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.4 ปกป้องสิทธิ์</h4>
                <p>
                  เพื่อปกป้องสิทธิ์ ทรัพย์สิน หรือความปลอดภัยของเทศบาล ผู้ใช้ หรือสาธารณะ
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. ความปลอดภัยของข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของท่าน รวมถึง:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>การเข้ารหัสข้อมูล (SSL/TLS)</li>
                <li>การควบคุมการเข้าถึงข้อมูล</li>
                <li>การสำรองข้อมูลสำรอง</li>
                <li>การตรวจสอบและอัปเดตระบบความปลอดภัยอย่างสม่ำเสมอ</li>
              </ul>
              <p className="mt-4">
                อย่างไรก็ตาม ไม่มีระบบใดที่ปลอดภัย 100% 
                เราไม่สามารถรับประกันความปลอดภัยของข้อมูลได้อย่างสมบูรณ์
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>5. สิทธิ์ของท่าน</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>ท่านมีสิทธิ์ดังต่อไปนี้เกี่ยวกับข้อมูลส่วนบุคคลของท่าน:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>สิทธิ์เข้าถึง:</strong> ขอดูข้อมูลส่วนบุคคลที่เรามี</li>
                <li><strong>สิทธิ์แก้ไข:</strong> แก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์</li>
                <li><strong>สิทธิ์ลบ:</strong> ขอลบข้อมูลส่วนบุคคล (ภายใต้เงื่อนไขบางประการ)</li>
                <li><strong>สิทธิ์คัดค้าน:</strong> คัดค้านการประมวลผลข้อมูล</li>
                <li><strong>สิทธิ์ถอนความยินยอม:</strong> ถอนความยินยอมที่ให้ไว้ได้ตลอดเวลา</li>
                <li><strong>สิทธิ์ร้องเรียน:</strong> ร้องเรียนต่อหน่วยงานที่เกี่ยวข้อง</li>
              </ul>
              <p className="mt-4">
                หากต้องการใช้สิทธิ์ใดๆ กรุณาติดต่อเราที่ info@thapsakae.go.th
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <div>
                <h4 className="font-semibold mb-2">6.1 Cookies คืออะไร</h4>
                <p>
                  Cookies คือไฟล์ข้อความขนาดเล็กที่เก็บไว้ในอุปกรณ์ของท่าน
                  เพื่อช่วยให้เว็บไซต์จดจำการตั้งค่าและปรับปรุงประสบการณ์การใช้งาน
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">6.2 ประเภท Cookies ที่เราใช้</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Cookies จำเป็น:</strong> สำหรับการทำงานพื้นฐานของเว็บไซต์</li>
                  <li><strong>Cookies การวิเคราะห์:</strong> เพื่อวิเคราะห์การใช้งาน</li>
                  <li><strong>Cookies การตลาด:</strong> เพื่อแสดงเนื้อหาที่เหมาะสม</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">6.3 การจัดการ Cookies</h4>
                <p>
                  ท่านสามารถตั้งค่าเบราว์เซอร์เพื่อปฏิเสธ Cookies ได้
                  แต่อาจส่งผลต่อการใช้งานบางส่วนของเว็บไซต์
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>7. การเก็บรักษาข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านตามระยะเวลาที่จำเป็น
                เพื่อบรรลุวัตถุประสงค์ที่ระบุไว้ในนโยบายนี้
                หรือตามที่กฎหมายกำหนด
              </p>
              <p className="mt-4">
                เมื่อไม่จำเป็นต้องใช้ข้อมูลแล้ว เราจะลบหรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>8. การเปลี่ยนแปลงนโยบาย</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว
                การเปลี่ยนแปลงที่สำคัญจะแจ้งให้ท่านทราบผ่านเว็บไซต์หรืออีเมล
              </p>
              <p className="mt-4">
                เราแนะนำให้ท่านตรวจสอบนโยบายนี้เป็นประจำ
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>9. ติดต่อเรา</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                หากมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:
              </p>
              <ul className="list-none space-y-1">
                <li><strong>เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล</strong></li>
                <li><strong>อีเมล:</strong> privacy@thapsakae.go.th</li>
                <li><strong>โทรศัพท์:</strong> 032-123-456</li>
                <li><strong>ที่อยู่:</strong> เทศบาลตำบลทับสะแก อ.เมือง จ.ประจวบคีรีขันธ์ 77000</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>นโยบายนี้มีผลบังคับใช้ตั้งแต่วันที่ 1 มีนาคม พ.ศ. 2567</p>
            <p className="mt-2">เทศบาลตำบลทับสะแกให้ความสำคัญกับความเป็นส่วนตัวและความปลอดภัยของข้อมูลของท่าน</p>
          </div>
        </div>
      </div>
    </div>
  );
}
