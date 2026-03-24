"use server";

import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getJobs() {
  try {
    const result = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลงานได้" };
  }
}

export async function getJobById(id: string) {
  try {
    const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    if (result.length === 0) {
      return { success: false, error: "ไม่พบงานที่ต้องการ" };
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching job:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลงานได้" };
  }
}

export async function createJob(data: {
  title: string;
  slug: string;
  company: string;
  description: string;
  category: string;
  salary?: string;
  location: string;
  employmentType: "full-time" | "part-time" | "contract";
  contactEmail?: string;
  contactPhone?: string;
  posterId: string;
}) {
  try {
    await db.insert(jobs).values({
      title: data.title,
      slug: data.slug,
      company: data.company,
      description: data.description,
      category: data.category,
      salary: data.salary || null,
      location: data.location,
      employmentType: data.employmentType,
      contactEmail: data.contactEmail || null,
      contactPhone: data.contactPhone || null,
      posterId: data.posterId,
    });
    revalidatePath("/jobs");
    revalidatePath("/admin/jobs");
    return { success: true, message: "สร้างประกาศงานสำเร็จ" };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "ไม่สามารถสร้างประกาศงานได้" };
  }
}

export async function updateJob(id: string, data: {
  title?: string;
  company?: string;
  description?: string;
  requirements?: string;
  salary?: string;
  location?: string;
  employmentType?: "full-time" | "part-time" | "contract";
  contactEmail?: string;
  contactPhone?: string;
  active?: boolean;
}) {
  try {
    await db.update(jobs).set(data).where(eq(jobs.id, id));
    revalidatePath("/jobs");
    revalidatePath(`/jobs/${id}`);
    revalidatePath("/admin/jobs");
    return { success: true, message: "อัปเดตประกาศงานสำเร็จ" };
  } catch (error) {
    console.error("Error updating job:", error);
    return { success: false, error: "ไม่สามารถอัปเดตประกาศงานได้" };
  }
}

export async function deleteJob(id: string) {
  try {
    await db.delete(jobs).where(eq(jobs.id, id));
    revalidatePath("/jobs");
    revalidatePath("/admin/jobs");
    return { success: true, message: "ลบประกาศงานสำเร็จ" };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, error: "ไม่สามารถลบประกาศงานได้" };
  }
}
