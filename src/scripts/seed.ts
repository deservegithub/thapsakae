import "dotenv/config";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { 
  users, 
  news, 
  shops, 
  tourism, 
  jobs, 
  boardPosts, 
  boardComments, 
  marketplaceItems 
} from "@/lib/db/schema";

async function seed() {
  console.log("🌱 Starting seed...");

  try {
    // Clear existing data
    console.log("🗑️ Clearing existing data...");
    await db.delete(marketplaceItems);
    await db.delete(boardComments);
    await db.delete(boardPosts);
    await db.delete(jobs);
    await db.delete(tourism);
    await db.delete(shops);
    await db.delete(news);
    await db.delete(users);
    console.log("✅ Existing data cleared!");

    // Seed Users
    console.log("👤 Seeding users...");
    const hashedPassword = await hash("password123", 10);
    const [user1, user2, user3] = await db.insert(users).values([
      {
        name: "ผู้ดูแลระบบ",
        email: "admin@thapsakae.go.th",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "สมชาย ใจดี",
        email: "somchai@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "สมหญิง รักษ์ดี",
        email: "somying@example.com",
        password: hashedPassword,
        role: "user",
      },
    ]).returning();

    // Seed News
    console.log("📰 Seeding news...");
    await db.insert(news).values([
      {
        title: "ประชุมคณะกรรมการตำบลทับสะแก ครั้งที่ 1/2567",
        slug: "meeting-2567-1",
        content: "เมื่อวันที่ 15 มกราคม 2567 นายกองค์การบริหารส่วนตำบลทับสะแก ได้เรียกประชุมคณะกรรมการตำบล เพื่อพิจารณาแผนพัฒนาตำบลประจำปี 2567 โดยมีผู้เข้าร่วมประชุมจากทุกหมู่บ้านในตำบล",
        excerpt: "ประชุมคณะกรรมการตำบลเพื่อพิจารณาแผนพัฒนาตำบลประจำปี 2567",
        category: "announcement",
        coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        authorId: user1.id,
      },
      {
        title: "กิจกรรมวันเด็กแห่งชาติ ประจำปี 2567",
        slug: "children-day-2567",
        content: "องค์การบริหารส่วนตำบลทับสะแก จัดกิจกรรมวันเด็กแห่งชาติ ประจำปี 2567 ในวันเสาร์ที่ 13 มกราคม 2567 ณ สนามกีฬาตำบลทับสะแก มีกิจกรรมมากมาย เช่น การแสดง การแข่งขัน และของรางวัลมากมาย",
        excerpt: "จัดกิจกรรมวันเด็กแห่งชาติ พร้อมกิจกรรมและของรางวัลมากมาย",
        category: "event",
        coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        authorId: user1.id,
      },
      {
        title: "โครงการปลูกป่าชายเลน เพื่ออนุรักษ์ทรัพยากรธรรมชาติ",
        slug: "mangrove-planting-2567",
        content: "ตำบลทับสะแกร่วมกับชุมชนจัดโครงการปลูกป่าชายเลน เพื่ออนุรักษ์ทรัพยากรธรรมชาติและสิ่งแวดล้อม ในวันอาทิตย์ที่ 21 มกราคม 2567 ณ ชายหาดทับสะแก ขอเชิญชวนประชาชนร่วมกิจกรรม",
        excerpt: "ร่วมปลูกป่าชายเลนเพื่ออนุรักษ์ทรัพยากรธรรมชาติ",
        category: "event",
        coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
        authorId: user1.id,
      },
    ]);

    // Seed Shops
    console.log("🏪 Seeding shops...");
    await db.insert(shops).values([
      {
        name: "ร้านกาแฟมะพร้าวทะเล",
        slug: "coconut-sea-cafe",
        description: "ร้านกาแฟริมทะเล บรรยากาศดี วิวสวย เมนูเด็ด กาแฟสดชง น้ำมะพร้าวสด และขนมหวานหลากหลาย",
        category: "restaurant",
        images: ["https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800"],
        address: "123 หมู่ 1 ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์",
        phone: "032-123456",
        openingHours: { "ทุกวัน": "08:00-20:00" },
        ownerId: user2.id,
      },
      {
        name: "ร้านอาหารทะเลสด บ้านทับสะแก",
        slug: "fresh-seafood-thapsakae",
        description: "ร้านอาหารทะเลสด วัตถุดิบสดใหม่ทุกวัน ราคาประหยัด บรรยากาศครอบครัว",
        category: "restaurant",
        images: ["https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"],
        address: "456 หมู่ 2 ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์",
        phone: "032-234567",
        openingHours: { "ทุกวัน": "10:00-22:00" },
        ownerId: user3.id,
      },
      {
        name: "ร้านของฝากทับสะแก",
        slug: "thapsakae-souvenir",
        description: "ร้านขายของฝาก ของที่ระลึก ผลิตภัณฑ์จากมะพร้าว ขนมพื้นเมือง",
        category: "retail",
        images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"],
        address: "789 หมู่ 3 ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์",
        phone: "032-345678",
        openingHours: { "ทุกวัน": "09:00-19:00" },
        ownerId: user2.id,
      },
    ]);

    // Seed Tourism
    console.log("🗺️ Seeding tourism spots...");
    await db.insert(tourism).values([
      {
        name: "ชายหาดทับสะแก",
        slug: "thapsakae-beach",
        description: "ชายหาดที่สวยงาม น้ำทะเลใส ทรายขาว บรรยากาศเงียบสงบ เหมาะสำหรับการพักผ่อนและกิจกรรมทางน้ำ",
        category: "nature",
        images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"],
        address: "หมู่ 1 ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์",
        latitude: "11.8127",
        longitude: "99.7956",
      },
      {
        name: "วัดทับสะแก",
        slug: "wat-thapsakae",
        description: "วัดเก่าแก่ของตำบล มีพระพุทธรูปสำคัญ สถาปัตยกรรมสวยงาม เป็นศูนย์รวมจิตใจของชุมชน",
        category: "temple",
        images: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=800"],
        address: "หมู่ 2 ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์",
        latitude: "11.8145",
        longitude: "99.7923",
      },
      {
        name: "ตลาดชุมชนทับสะแก",
        slug: "thapsakae-market",
        description: "ตลาดชุมชนที่มีสินค้าพื้นเมือง อาหารสด ผลไม้ตามฤดูกาล และของฝากมากมาย",
        category: "culture",
        images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"],
        address: "หมู่ 3 ตำบลทับสะแก อำเภอเมือง จังหวัดประจวบคีรีขันธ์",
        latitude: "11.8156",
        longitude: "99.7945",
      },
    ]);

    // Seed Jobs
    console.log("💼 Seeding jobs...");
    await db.insert(jobs).values([
      {
        title: "พนักงานต้อนรับ - ร้านกาแฟมะพร้าวทะเล",
        slug: "barista-coconut-cafe",
        description: "รับสมัครพนักงานต้อนรับและบาริสต้า มีประสบการณ์หรือไม่มีก็รับ จะมีการอบรม เงินเดือน 12,000-15,000 บาท",
        company: "ร้านกาแฟมะพร้าวทะเล",
        category: "บริการ",
        salary: "12,000-15,000",
        location: "ตำบลทับสะแก",
        employmentType: "full-time",
        contactEmail: "job@coconutcafe.com",
        contactPhone: "032-123456",
        posterId: user1.id,
      },
      {
        title: "พ่อครัว/แม่ครัว - ร้านอาหารทะเลสด",
        slug: "chef-seafood-restaurant",
        description: "รับสมัครพ่อครัว/แม่ครัว มีประสบการณ์ทำอาหารทะเล เงินเดือน 15,000-20,000 บาท",
        company: "ร้านอาหารทะเลสด บ้านทับสะแก",
        category: "อาหาร",
        salary: "15,000-20,000",
        location: "ตำบลทับสะแก",
        employmentType: "full-time",
        contactEmail: "job@seafood.com",
        contactPhone: "032-234567",
        posterId: user1.id,
      },
      {
        title: "พนักงานขาย - ร้านของฝาก",
        slug: "sales-souvenir-shop",
        description: "รับสมัครพนักงานขาย ทำงานเสาร์-อาทิตย์ เงินเดือน 10,000 บาท",
        company: "ร้านของฝากทับสะแก",
        category: "ขาย",
        salary: "10,000",
        location: "ตำบลทับสะแก",
        employmentType: "part-time",
        contactEmail: "job@souvenir.com",
        contactPhone: "032-345678",
        posterId: user1.id,
      },
    ]);

    // Seed Board Posts
    console.log("💬 Seeding board posts...");
    const [post1, post2] = await db.insert(boardPosts).values([
      {
        title: "แนะนำร้านอาหารอร่อยๆ ในตำบลทับสะแก",
        slug: "recommend-restaurants",
        content: "อยากให้ทุกคนมาแนะนำร้านอาหารอร่อยๆ ในตำบลทับสะแกกันครับ จะได้ไปลองชิมกัน",
        category: "แนะนำ",
        authorId: user2.id,
        views: 245,
      },
      {
        title: "ถาม-ตอบ เกี่ยวกับการท่องเที่ยวในทับสะแก",
        slug: "tourism-qa",
        content: "มีคำถามเกี่ยวกับการท่องเที่ยวในทับสะแกไหมครับ ถามมาได้เลย จะตอบให้",
        category: "ถาม-ตอบ",
        authorId: user3.id,
        views: 189,
        pinned: true,
      },
    ]).returning();

    // Seed Board Comments
    console.log("💭 Seeding board comments...");
    await db.insert(boardComments).values([
      {
        postId: post1.id,
        userId: user3.id,
        content: "แนะนำร้านอาหารทะเลสด บ้านทับสะแกครับ อร่อยมาก ราคาไม่แพง",
      },
      {
        postId: post1.id,
        userId: user1.id,
        content: "ร้านกาแฟมะพร้าวทะเลก็ดีนะครับ วิวสวย กาแฟอร่อย",
      },
      {
        postId: post2.id,
        userId: user2.id,
        content: "ชายหาดทับสะแกสวยมากครับ น้ำใส ทรายขาว แนะนำเลย",
      },
    ]);

    // Seed Marketplace Items
    console.log("🛒 Seeding marketplace items...");
    await db.insert(marketplaceItems).values([
      {
        title: "น้ำมะพร้าวสด ขายส่ง ขายปลีก",
        slug: "fresh-coconut-water",
        description: "น้ำมะพร้าวสดจากสวน หวาน อร่อม สดใหม่ทุกวัน ขายส่ง ขายปลีก ราคาถูก",
        price: "25.00",
        category: "อาหาร",
        condition: "new",
        images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800"],
        location: "หมู่ 1 ตำบลทับสะแก",
        sellerId: user2.id,
        status: "available",
      },
      {
        title: "จักรยานเสือภูเขา มือสอง สภาพดี",
        slug: "mountain-bike-used",
        description: "จักรยานเสือภูเขา ใช้งานมา 1 ปี สภาพดีมาก ล้อใหม่ เกียร์ใหม่",
        price: "3500.00",
        category: "กีฬา",
        condition: "used",
        images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800"],
        location: "หมู่ 2 ตำบลทับสะแก",
        sellerId: user3.id,
        status: "available",
      },
      {
        title: "โต๊ะทำงานไม้สัก ขนาด 120x60 ซม.",
        slug: "teak-desk-120x60",
        description: "โต๊ะทำงานไม้สักแท้ ขนาด 120x60 ซม. สภาพเหมือนใหม่ ใช้งานน้อย",
        price: "2800.00",
        category: "เฟอร์นิเจอร์",
        condition: "like-new",
        images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800"],
        location: "หมู่ 3 ตำบลทับสะแก",
        sellerId: user2.id,
        status: "available",
      },
    ]);

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
