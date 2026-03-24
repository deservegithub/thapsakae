# ขั้นตอนถัดไป - เว็บไซต์ตำบลทับสะแก

## ✅ สิ่งที่เสร็จแล้ว (Phase 1-2)

### โครงสร้างพื้นฐาน
- ✅ Next.js 14+ project พร้อม TypeScript
- ✅ TailwindCSS 4 พร้อมธีมสีฟ้าทะเล-มะพร้าว
- ✅ Database Schema ครบ 15 tables
- ✅ UI Components (Button, Card)
- ✅ Layout Components (Header, Footer)

### หน้าเว็บไซต์
- ✅ Homepage (/)
- ✅ News (/news)
- ✅ Shops (/shops)
- ✅ Tourism (/tourism)
- ✅ Jobs (/jobs)
- ✅ Board (/board)
- ✅ Marketplace (/marketplace)
- ✅ Appointments (/appointments)
- ✅ Messages (/messages)
- ✅ Admin Dashboard (/admin)

## 🚀 ขั้นตอนถัดไป (Phase 3)

### 1. เชื่อมต่อ Database (สำคัญมาก!)
```bash
# ต้องทำก่อนทุกอย่าง
1. สร้าง Neon PostgreSQL database
2. คัดลอก DATABASE_URL ใส่ใน .env
3. รัน: npm run db:push
```

**ไฟล์ที่ต้องแก้:**
- `.env` - เพิ่ม DATABASE_URL

### 2. Setup Authentication (NextAuth.js)

**ไฟล์ที่ต้องสร้าง:**
- `src/lib/auth.ts` - NextAuth config
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API route
- `src/app/login/page.tsx` - หน้า Login
- `src/app/register/page.tsx` - หน้า Register
- `src/middleware.ts` - Protected routes

**ขั้นตอน:**
```bash
1. สร้าง NEXTAUTH_SECRET: openssl rand -base64 32
2. เพิ่มใน .env
3. สร้าง auth config
4. สร้างหน้า login/register
5. ทดสอบ authentication
```

### 3. Setup Multi-language (next-intl)

**ไฟล์ที่ต้องสร้าง:**
- `src/i18n/request.ts` - i18n config
- `src/i18n/locales/th.json` - คำแปลภาษาไทย
- `src/i18n/locales/en.json` - คำแปลภาษาอังกฤษ
- `src/middleware.ts` - Locale detection
- `src/components/layout/LanguageSwitcher.tsx` - ปุ่มสลับภาษา

**ขั้นตอน:**
```bash
1. ตั้งค่า next-intl
2. สร้างไฟล์แปล
3. อัปเดต layout ให้รองรับ [locale]
4. เพิ่ม LanguageSwitcher ใน Header
```

### 4. Setup Real-time (Pusher)

**ไฟล์ที่ต้องสร้าง:**
- `src/lib/pusher.ts` - Pusher client config
- `src/app/api/pusher/auth/route.ts` - Pusher auth
- `src/hooks/useRealtime.ts` - Real-time hook
- `src/hooks/useChat.ts` - Chat hook
- `src/components/layout/NotificationBell.tsx` - Notification component

**ขั้นตอน:**
```bash
1. สมัคร Pusher account
2. คัดลอก credentials ใส่ .env
3. ตั้งค่า Pusher client
4. สร้าง hooks สำหรับ real-time
5. เพิ่ม NotificationBell ใน Header
```

### 5. สร้าง Server Actions

**ไฟล์ที่ต้องสร้าง:**
- `src/actions/news.ts`
- `src/actions/shops.ts`
- `src/actions/tourism.ts`
- `src/actions/jobs.ts`
- `src/actions/board.ts`
- `src/actions/marketplace.ts`
- `src/actions/appointments.ts`
- `src/actions/messages.ts`
- `src/actions/notifications.ts`

**ตัวอย่าง (news.ts):**
```typescript
"use server"

import { db } from "@/lib/db"
import { news } from "@/lib/db/schema"

export async function getNews() {
  return await db.select().from(news)
}

export async function createNews(data: NewNews) {
  return await db.insert(news).values(data)
}
```

### 6. สร้าง Validation Schemas (Zod)

**ไฟล์ที่ต้องสร้าง:**
- `src/lib/validations/news.ts`
- `src/lib/validations/shop.ts`
- `src/lib/validations/tourism.ts`
- `src/lib/validations/job.ts`
- `src/lib/validations/board.ts`
- `src/lib/validations/marketplace.ts`
- `src/lib/validations/appointment.ts`
- `src/lib/validations/message.ts`

### 7. สร้างหน้า Admin CRUD

**สำหรับแต่ละโมดูล ต้องสร้าง:**
- `/admin/[module]/page.tsx` - รายการทั้งหมด
- `/admin/[module]/create/page.tsx` - สร้างใหม่
- `/admin/[module]/[id]/edit/page.tsx` - แก้ไข

**โมดูลที่ต้องทำ:**
- news
- shops
- tourism
- jobs
- board
- marketplace
- appointments
- users
- settings

### 8. สร้าง UI Components เพิ่มเติม

**Components ที่ยังขาด:**
- Input
- Textarea
- Select
- Dialog
- Dropdown Menu
- Tabs
- Toast
- Avatar
- Badge
- Separator

**วิธีติดตั้ง shadcn/ui components:**
```bash
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add separator
```

### 9. สร้างหน้ารายละเอียด (Detail Pages)

**ต้องสร้างสำหรับ:**
- `/news/[slug]/page.tsx`
- `/shops/[slug]/page.tsx`
- `/tourism/[slug]/page.tsx`
- `/jobs/[slug]/page.tsx`
- `/board/[slug]/page.tsx`
- `/marketplace/[slug]/page.tsx`
- `/messages/[conversationId]/page.tsx`

### 10. เพิ่มฟีเจอร์ขั้นสูง

- Image Upload (Uploadthing)
- Google Maps Integration
- Search & Filter
- Pagination
- SEO Optimization
- Error Handling
- Loading States

## 📋 Checklist สำหรับแต่ละ Phase

### Phase 3: Core Features (Week 1)
- [ ] เชื่อมต่อ Neon Database
- [ ] Setup NextAuth.js
- [ ] สร้างหน้า Login/Register
- [ ] สร้าง Server Actions พื้นฐาน
- [ ] สร้าง Validation Schemas

### Phase 4: Admin Features (Week 2)
- [ ] สร้างหน้า Admin CRUD ทั้งหมด
- [ ] เพิ่ม Image Upload
- [ ] สร้าง Form Components
- [ ] เพิ่ม Data Tables

### Phase 5: Real-time Features (Week 3)
- [ ] Setup Pusher
- [ ] สร้างระบบแชท Real-time
- [ ] สร้างระบบ Notifications
- [ ] เพิ่ม Online Status

### Phase 6: Multi-language (Week 3)
- [ ] Setup next-intl
- [ ] สร้างไฟล์แปลทั้งหมด
- [ ] เพิ่ม Language Switcher
- [ ] แปลทุกหน้า

### Phase 7: Polish & Deploy (Week 4)
- [ ] SEO Optimization
- [ ] Performance Optimization
- [ ] Error Handling
- [ ] Testing
- [ ] Deploy to Vercel

## 🔧 คำสั่งที่ใช้บ่อย

```bash
# Development
npm run dev

# Database
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio
npm run db:generate      # Generate migrations

# Build
npm run build
npm run start

# Lint
npm run lint
```

## 📞 ต้องการความช่วยเหลือ?

หากติดปัญหาในขั้นตอนใดๆ สามารถถามได้เลย ฉันพร้อมช่วยเหลือ!

## 🎯 เป้าหมายสุดท้าย

เว็บไซต์ตำบลทับสะแกที่:
- ✅ ทำงานได้ครบทุกฟีเจอร์
- ✅ รองรับ 2 ภาษา (ไทย/อังกฤษ)
- ✅ มี Real-time Chat
- ✅ มีระบบจองคิว
- ✅ มี Admin Dashboard ครบครัน
- ✅ สวยงามด้วยธีมเมืองมะพร้าวทะเล
- ✅ Deploy บน Vercel
