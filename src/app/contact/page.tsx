"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ติดต่อเรา</h1>
            <p className="text-lg text-muted-foreground">
              ติดต่อโฆษณา สอบถามข้อมูล หรือให้คำแนะนำ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลติดต่อ</CardTitle>
                <CardDescription>ช่องทางการติดต่อเทศบาลตำบลทับสะแก</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">โทรศัพท์</p>
                    <p className="text-sm text-muted-foreground">032-123-456</p>
                    <p className="text-sm text-muted-foreground">032-123-457 (แฟกซ์)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">อีเมล</p>
                    <p className="text-sm text-muted-foreground">info@thapsakae.go.th</p>
                    <p className="text-sm text-muted-foreground">contact@thapsakae.go.th</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">ที่อยู่</p>
                    <p className="text-sm text-muted-foreground">
                      เทศบาลตำบลทับสะแก<br />
                      อำเภอเมือง จังหวัดประจวบคีรีขันธ์ 77000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Facebook className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">โซเชียลมีเดีย</p>
                    <p className="text-sm text-muted-foreground">Facebook: เทศบาลตำบลทับสะแก</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-semibold mb-2">เวลาทำการ</p>
                  <p className="text-sm text-muted-foreground">จันทร์ - เสาร์: 08:30 - 16:30 น.</p>
                  <p className="text-sm text-muted-foreground">อาทิทย์และวันหยุดนักขัตฤกษ์: ปิดทำการ</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ส่งข้อความถึงเรา</CardTitle>
                <CardDescription>กรอกแบบฟอร์มด้านล่างเพื่อติดต่อเรา</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ชื่อ-นามสกุล *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">อีเมล *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0xx-xxx-xxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">หัวข้อ *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">เลือกหัวข้อ</option>
                      <option value="advertising">ติดต่อโฆษณา</option>
                      <option value="inquiry">สอบถามข้อมูล</option>
                      <option value="suggestion">ข้อเสนอแนะ</option>
                      <option value="complaint">ร้องเรียน</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">ข้อความ *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="กรอกข้อความของคุณ..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 text-green-800 px-4 py-3 rounded-md text-sm">
                      ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>แผนที่</CardTitle>
              <CardDescription>ที่ตั้งเทศบาลตำบลทับสะแก</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Google Maps Embed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
