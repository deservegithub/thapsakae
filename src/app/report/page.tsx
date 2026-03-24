"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Send } from "lucide-react";

export default function ReportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    title: "",
    description: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", category: "", title: "", description: "", url: "" });
    
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">แจ้งปัญหาการใช้งาน</h1>
            <p className="text-lg text-muted-foreground">
              พบปัญหาหรือข้อผิดพลาด? แจ้งให้เราทราบเพื่อแก้ไขโดยเร็ว
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>แบบฟอร์มแจ้งปัญหา</CardTitle>
              <CardDescription>
                กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้เราสามารถแก้ไขปัญหาได้อย่างรวดเร็ว
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ประเภทปัญหา *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">เลือกประเภทปัญหา</option>
                    <option value="login">ปัญหาการเข้าสู่ระบบ</option>
                    <option value="display">ปัญหาการแสดงผล</option>
                    <option value="function">ฟีเจอร์ไม่ทำงาน</option>
                    <option value="performance">ความเร็วช้า</option>
                    <option value="content">เนื้อหาผิดพลาด</option>
                    <option value="security">ปัญหาความปลอดภัย</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">หัวข้อปัญหา *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="สรุปปัญหาสั้นๆ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL หน้าที่พบปัญหา</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://thapsakae.go.th/..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    คัดลอก URL จากแถบที่อยู่ของเบราว์เซอร์
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">รายละเอียดปัญหา *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="อธิบายปัญหาที่พบโดยละเอียด เช่น&#10;- ทำอะไรก่อนพบปัญหา&#10;- ข้อความ error ที่แสดง (ถ้ามี)&#10;- เบราว์เซอร์และอุปกรณ์ที่ใช้&#10;- ขั้นตอนการทำซ้ำปัญหา"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 text-green-800 px-4 py-3 rounded-md text-sm">
                    ✓ แจ้งปัญหาเรียบร้อยแล้ว! เราจะดำเนินการแก้ไขโดยเร็วที่สุด
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "กำลังส่ง..." : "ส่งรายงานปัญหา"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">เคล็ดลับการแจ้งปัญหา</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
              <p>📝 <strong>ให้รายละเอียดมากที่สุด:</strong> ยิ่งมีข้อมูลมาก เราจะแก้ไขได้เร็วขึ้น</p>
              <p>📸 <strong>แนบภาพหน้าจอ:</strong> ถ้าทำได้ ส่งภาพหน้าจอมาที่อีเมล info@thapsakae.go.th</p>
              <p>🔄 <strong>ลองทำซ้ำ:</strong> บอกเราว่าปัญหาเกิดขึ้นทุกครั้งหรือเป็นบางครั้ง</p>
              <p>💻 <strong>ระบุอุปกรณ์:</strong> บอกเบราว์เซอร์ (Chrome, Safari, etc.) และอุปกรณ์ที่ใช้</p>
              <p>⏱️ <strong>เวลาตอบกลับ:</strong> เราจะตอบกลับภายใน 24-48 ชั่วโมง</p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>ต้องการความช่วยเหลือเร่งด่วน?</p>
            <p className="mt-2">
              โทร: <a href="tel:032123456" className="text-primary hover:underline">032-123-456</a> หรือ 
              อีเมล: <a href="mailto:support@thapsakae.go.th" className="text-primary hover:underline">support@thapsakae.go.th</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
