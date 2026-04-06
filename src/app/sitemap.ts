 import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { news, shops, tourism, jobs, boardPosts } from "@/lib/db/schema"; // marketplaceItems ปิดไว้ชั่วคราว
import { desc, eq } from "drizzle-orm";

const BASE_URL = "https://www.thapsakaefocus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/shops`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tourism`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/jobs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/board`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    // { url: `${BASE_URL}/marketplace`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 }, // ปิดไว้ชั่วคราว
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic pages from DB
  const [allNews, allShops, allTourism, allJobs, allBoard] = await Promise.all([
    db.select({ id: news.id, updatedAt: news.updatedAt }).from(news).orderBy(desc(news.createdAt)),
    db.select({ id: shops.id, updatedAt: shops.updatedAt }).from(shops).where(eq(shops.approved, true)).orderBy(desc(shops.createdAt)),
    db.select({ id: tourism.id, updatedAt: tourism.updatedAt }).from(tourism).orderBy(desc(tourism.createdAt)),
    db.select({ id: jobs.id, updatedAt: jobs.updatedAt }).from(jobs).where(eq(jobs.active, true)).orderBy(desc(jobs.createdAt)),
    db.select({ id: boardPosts.id, updatedAt: boardPosts.updatedAt }).from(boardPosts).orderBy(desc(boardPosts.createdAt)),
    // db.select({ id: marketplaceItems.id, updatedAt: marketplaceItems.updatedAt }).from(marketplaceItems).where(eq(marketplaceItems.status, "available")).orderBy(desc(marketplaceItems.createdAt)), // ปิดไว้ชั่วคราว
  ]);

  const newsPages: MetadataRoute.Sitemap = allNews.map((item) => ({
    url: `${BASE_URL}/news/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const shopPages: MetadataRoute.Sitemap = allShops.map((item) => ({
    url: `${BASE_URL}/shops/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tourismPages: MetadataRoute.Sitemap = allTourism.map((item) => ({
    url: `${BASE_URL}/tourism/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const jobPages: MetadataRoute.Sitemap = allJobs.map((item) => ({
    url: `${BASE_URL}/jobs/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const boardPages: MetadataRoute.Sitemap = allBoard.map((item) => ({
    url: `${BASE_URL}/board/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // marketPages ปิดไว้ชั่วคราว
  // const marketPages: MetadataRoute.Sitemap = allMarket.map((item) => ({
  //   url: `${BASE_URL}/marketplace/${item.id}`,
  //   lastModified: item.updatedAt,
  //   changeFrequency: "weekly",
  //   priority: 0.5,
  // }));

  return [
    ...staticPages,
    ...newsPages,
    ...shopPages,
    ...tourismPages,
    ...jobPages,
    ...boardPages,
    // ...marketPages, // ปิดไว้ชั่วคราว
  ];
}
