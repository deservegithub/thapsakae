# เว็บไซต์ตำบลทับสะแก 🌊🥥

เว็บไซต์ตำบลทับสะแกแบบครบวงจร ธีมเมืองมะพร้าวทะเล พัฒนาด้วย Next.js 14+ พร้อมฟีเจอร์ Real-time Chat, Multi-language และระบบจองคิว

## 🎨 Features

- ✅ **8+ หน้าหลัก**: หน้าแรก, ข่าว, ร้านค้า, ท่องเที่ยว, หางาน, เว็บบอร์ด, ซื้อขาย, จองคิว
- ✅ **Real-time Chat**: แชทแบบ Real-time ด้วย Pusher
- ✅ **Multi-language**: รองรับภาษาไทยและอังกฤษ (next-intl)
- ✅ **Notification System**: การแจ้งเตือนแบบ Real-time
- ✅ **Appointment Booking**: ระบบจองคิว/นัดหมาย
- ✅ **Admin Dashboard**: ระบบจัดการแบบครบวงจร
- ✅ **Ocean Theme**: ธีมสีฟ้าทะเล-มะพร้าว

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 19, TypeScript
- **Styling**: TailwindCSS 4, shadcn/ui
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js v5
- **Real-time**: Pusher
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **File Upload**: Uploadthing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thapsakae
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Setup environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
- Database URL (Neon PostgreSQL)
- NextAuth Secret
- Pusher credentials
- Uploadthing credentials
- Google Maps API key (optional)

5. Generate and push database schema:
```bash
npm run db:push
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
thapsakae/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # Multi-language routes
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...           # Feature components
│   ├── lib/              # Utilities & configs
│   │   ├── db/           # Database schema & client
│   │   └── ...           # Other utilities
│   ├── actions/          # Server Actions
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization
│   └── types/            # TypeScript types
├── public/               # Static assets
└── drizzle/              # Database migrations
```

## 🗄️ Database Schema

- **users**: ผู้ใช้งานและผู้ดูแลระบบ
- **news**: ข่าวประชาสัมพันธ์
- **shops**: ร้านค้าและบริการ
- **tourism**: สถานที่ท่องเที่ยว
- **tourism_reviews**: รีวิวสถานที่ท่องเที่ยว
- **jobs**: ประกาศหางาน
- **board_posts**: กระทู้เว็บบอร์ด
- **board_comments**: ความคิดเห็นในกระทู้
- **marketplace_items**: สินค้าในกระดานซื้อขาย
- **appointments**: การจองคิว/นัดหมาย
- **conversations**: การสนทนา
- **messages**: ข้อความแชท
- **notifications**: การแจ้งเตือน
- **translations**: คำแปลสำหรับ Multi-language
- **settings**: การตั้งค่าระบบ

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio

## 🎨 Color Scheme (Ocean Theme)

- **Primary**: Ocean Blue (#0EA5E9) - สีฟ้าทะเล
- **Secondary**: Teal (#14B8A6) - สีเขียวมะพร้าว
- **Accent**: Amber (#F59E0B) - สีทรายชายหาด
- **Background**: Slate (#F8FAFC) - สีขาวอ่อน

## 📝 License

This project is private and proprietary.

## 👥 Contributors

- Development Team - ตำบลทับสะแก
