import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock, Mail, Phone, ArrowLeft, Calendar } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import Link from "next/link";
import { getJobById } from "@/actions/jobs";
import { notFound } from "next/navigation";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getJobById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const job = response.data;

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "full-time": "เต็มเวลา",
      "part-time": "พาร์ทไทม์",
      contract: "สัญญาจ้าง",
    };
    return labels[type] || type;
  };

  const getEmploymentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "full-time": "bg-primary/10 text-primary",
      "part-time": "bg-secondary/10 text-secondary",
      contract: "bg-accent/10 text-accent",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Link href="/jobs">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้าหางาน
            </Button>
          </Link>

          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-sm px-3 py-1 rounded ${getEmploymentTypeColor(job.employmentType)}`}>
                    {getEmploymentTypeLabel(job.employmentType)}
                  </span>
                  {job.active ? (
                    <span className="text-sm px-3 py-1 rounded bg-green-100 text-green-800">เปิดรับสมัคร</span>
                  ) : (
                    <span className="text-sm px-3 py-1 rounded bg-red-100 text-red-800">ปิดรับสมัคร</span>
                  )}
                </div>

                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl text-muted-foreground">{job.company}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">สถานที่</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">เงินเดือน</p>
                    <p className="font-medium">{job.salary || "ตามตกลง"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">ประเภทงาน</p>
                    <p className="font-medium">{getEmploymentTypeLabel(job.employmentType)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">รายละเอียดงาน</h2>
                <div className="prose prose-lg max-w-none whitespace-pre-line">
                  {job.description}
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">ข้อมูลการติดต่อ</h2>
                <div className="space-y-3">
                  {job.contactEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <a href={`mailto:${job.contactEmail}`} className="text-primary hover:underline">
                        {job.contactEmail}
                      </a>
                    </div>
                  )}
                  {job.contactPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <a href={`tel:${job.contactPhone}`} className="text-primary hover:underline">
                        {job.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>โพสต์เมื่อ {new Date(job.createdAt).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <ShareButton title={job.title} text={`${job.company} - ${job.location}`} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
