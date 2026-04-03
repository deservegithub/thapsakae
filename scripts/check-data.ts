import "dotenv/config";
import { db } from "../src/lib/db";
import { news, shops, tourism, jobs, boardPosts, marketplaceItems } from "../src/lib/db/schema";
import { count } from "drizzle-orm";

async function checkData() {
  const [newsCount] = await db.select({ count: count() }).from(news);
  const [shopsCount] = await db.select({ count: count() }).from(shops);
  const [tourismCount] = await db.select({ count: count() }).from(tourism);
  const [jobsCount] = await db.select({ count: count() }).from(jobs);
  const [boardCount] = await db.select({ count: count() }).from(boardPosts);
  const [marketCount] = await db.select({ count: count() }).from(marketplaceItems);

  console.log("=== DB Record Counts ===");
  console.log("News:", newsCount.count);
  console.log("Shops:", shopsCount.count);
  console.log("Tourism:", tourismCount.count);
  console.log("Jobs:", jobsCount.count);
  console.log("Board Posts:", boardCount.count);
  console.log("Marketplace:", marketCount.count);

  // Check published/approved status
  const allNews = await db.select().from(news).limit(3);
  console.log("\n=== Sample News ===");
  allNews.forEach(n => console.log(`  ${n.title} | published: ${n.published}`));

  const allShops = await db.select().from(shops).limit(3);
  console.log("\n=== Sample Shops ===");
  allShops.forEach(s => console.log(`  ${s.name} | approved: ${s.approved}`));

  process.exit(0);
}

checkData().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
