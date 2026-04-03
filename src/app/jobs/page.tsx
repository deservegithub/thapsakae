import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { getActiveJobs } from "@/actions/jobs";
import { FilterBar } from "@/components/ui/filter-bar";

const jobFilters = [
  { label: "ทั้งหมด", value: "" },
  { label: "เต็มเวลา", value: "full-time" },
  { label: "พาร์ทไทม์", value: "part-time" },
  { label: "สัญญาจ้าง", value: "contract" },
];

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const response = await getActiveJobs();
  const allJobs = response.success ? response.data || [] : [];
  const jobs = category ? allJobs.filter((j) => j.employmentType === category) : allJobs;

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
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">หางาน</h1>
        <p className="text-lg text-muted-foreground">
          ประกาศรับสมัครงานในตำบลทับสะแก
        </p>
      </div>

      <FilterBar filters={jobFilters} />

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${getEmploymentTypeColor(job.employmentType)}`}>
                          {getEmploymentTypeLabel(job.employmentType)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          โพสต์เมื่อ {new Date(job.createdAt).toLocaleDateString('th-TH')}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{job.salary || 'ตามตกลง'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{getEmploymentTypeLabel(job.employmentType)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">ยังไม่มีประกาศงานในระบบ</p>
        </div>
      )}
    </div>
  );
}
