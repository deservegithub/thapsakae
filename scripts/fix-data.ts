import "dotenv/config";
import { db } from "../src/lib/db";
import { news, shops } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

async function fixData() {
  console.log("Updating news published=true ...");
  const newsResult = await db.update(news).set({ published: true }).where(eq(news.published, false));
  console.log("News updated");

  console.log("Updating shops approved=true ...");
  const shopsResult = await db.update(shops).set({ approved: true }).where(eq(shops.approved, false));
  console.log("Shops updated");

  console.log("Done!");
  process.exit(0);
}

fixData().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
