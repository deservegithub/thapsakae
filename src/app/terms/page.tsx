import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">ข้อตกลงการใช้บริการ</h1>
            <p className="text-lg text-muted-foreground">
              Terms of Service - อัปเดตล่าสุด: มีนาคม 2567
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. การยอมรับข้อตกลง</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                การเข้าใช้งานเว็บไซต์ตำบลทับสะแก (thapsakae.go.th) ถือว่าท่านได้อ่านและยอมรับข้อตกลงการใช้บริการนี้แล้ว
                หากท่านไม่ยอมรับข้อตกลงใดๆ กรุณาหยุดการใช้งานเว็บไซต์ทันที
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>2. การใช้งานเว็บไซต์</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <div>
                <h4 className="font-semibold mb-2">2.1 สิทธิ์การใช้งาน</h4>
                <p>
                  ผู้ใช้งานมีสิทธิ์เข้าถึงและใช้งานบริการต่างๆ บนเว็บไซต์ตามที่กำหนดไว้
                  โดยต้องไม่ใช้งานในทางที่ผิดกฎหมายหรือละเมิดสิทธิ์ของผู้อื่น
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.2 การสมัครสมาชิก</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องและเป็นจริง</li>
                  <li>ผู้ใช้ต้องรักษาความปลอดภัยของบัญชีและรหัสผ่าน</li>
                  <li>ห้ามใช้บัญชีของผู้อื่นโดยไม่ได้รับอนุญาต</li>
                  <li>ผู้ใช้รับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของตน</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.3 พฤติกรรมที่ห้าม</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>โพสต์เนื้อหาที่ผิดกฎหมาย ลามกอนาจาร หรือหมิ่นประมาท</li>
                  <li>แอบอ้างเป็นบุคคลหรือองค์กรอื่น</li>
                  <li>ส่งสแปม ไวรัส หรือโค้ดที่เป็นอันตราย</li>
                  <li>รบกวนหรือขัดขวางการทำงานของเว็บไซต์</li>
                  <li>เก็บรวบรวมข้อมูลผู้ใช้อื่นโดยไม่ได้รับอนุญาต</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. เนื้อหาและทรัพย์สินทางปัญญา</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <div>
                <h4 className="font-semibold mb-2">3.1 เนื้อหาของเทศบาล</h4>
                <p>
                  เนื้อหา ข้อมูล รูปภาพ และสื่อต่างๆ บนเว็บไซต์เป็นทรัพย์สินของเทศบาลตำบลทับสะแก
                  การนำไปใช้ต้องได้รับอนุญาตและระบุแหล่งที่มา
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.2 เนื้อหาของผู้ใช้</h4>
                <p>
                  เนื้อหาที่ผู้ใช้โพสต์บนเว็บไซต์ (เช่น ความคิดเห็น โพสต์ในบอร์ด) ยังคงเป็นของผู้ใช้
                  แต่ผู้ใช้อนุญาตให้เทศบาลใช้งานเนื้อหาดังกล่าวได้
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. ความรับผิดชอบ</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <div>
                <h4 className="font-semibold mb-2">4.1 ข้อจำกัดความรับผิด</h4>
                <p>
                  เทศบาลตำบลทับสะแกพยายามให้บริการที่ดีที่สุด แต่ไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาดหรือหยุดชะงัก
                  เทศบาลไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้งานเว็บไซต์
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4.2 ลิงก์ภายนอก</h4>
                <p>
                  เว็บไซต์อาจมีลิงก์ไปยังเว็บไซต์ภายนอก เทศบาลไม่รับผิดชอบต่อเนื้อหาหรือนโยบายของเว็บไซต์เหล่านั้น
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>5. การเปลี่ยนแปลงและการยกเลิก</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                เทศบาลตำบลทับสะแกขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อตกลงนี้ได้ตลอดเวลา
                การเปลี่ยนแปลงจะมีผลทันทีเมื่อประกาศบนเว็บไซต์
                เทศบาลอาจระงับหรือยกเลิกบัญชีผู้ใช้ที่ละเมิดข้อตกลงโดยไม่ต้องแจ้งล่วงหน้า
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. กฎหมายที่ใช้บังคับ</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                ข้อตกลงนี้อยู่ภายใต้กฎหมายของประเทศไทย
                ข้อพิพาทใดๆ จะอยู่ในเขตอำนาจศาลไทย
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>7. ติดต่อเรา</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                หากมีข้อสงสัยเกี่ยวกับข้อตกลงการใช้บริการ กรุณาติดต่อ:
              </p>
              <ul className="list-none space-y-1">
                <li><strong>อีเมล:</strong> info@thapsakae.go.th</li>
                <li><strong>โทรศัพท์:</strong> 032-123-456</li>
                <li><strong>ที่อยู่:</strong> เทศบาลตำบลทับสะแก อ.เมือง จ.ประจวบคีรีขันธ์ 77000</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>เอกสารนี้มีผลบังคับใช้ตั้งแต่วันที่ 1 มีนาคม พ.ศ. 2567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
