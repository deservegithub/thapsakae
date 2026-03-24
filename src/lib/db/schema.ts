import { pgTable, uuid, varchar, text, timestamp, boolean, integer, decimal, json, date, time, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const shopCategoryEnum = pgEnum("shop_category", ["restaurant", "retail", "service"]);
export const tourismCategoryEnum = pgEnum("tourism_category", ["temple", "nature", "culture", "other"]);
export const employmentTypeEnum = pgEnum("employment_type", ["full-time", "part-time", "contract"]);
export const itemConditionEnum = pgEnum("item_condition", ["new", "used", "like-new"]);
export const itemStatusEnum = pgEnum("item_status", ["available", "sold", "reserved"]);
export const appointmentStatusEnum = pgEnum("appointment_status", ["pending", "confirmed", "cancelled", "completed"]);
export const relatedTypeEnum = pgEnum("related_type", ["marketplace", "general"]);
export const notificationTypeEnum = pgEnum("notification_type", ["message", "appointment", "news", "job", "marketplace", "board"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  avatar: varchar("avatar", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// News table
export const news = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  coverImage: varchar("cover_image", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  views: integer("views").default(0).notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Shops table
export const shops = pgTable("shops", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  description: text("description").notNull(),
  category: shopCategoryEnum("category").notNull(),
  images: json("images").$type<string[]>().notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 50 }),
  openingHours: json("opening_hours").$type<Record<string, string>>(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  ownerId: uuid("owner_id").references(() => users.id).notNull(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tourism table
export const tourism = pgTable("tourism", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  description: text("description").notNull(),
  category: tourismCategoryEnum("category").notNull(),
  images: json("images").$type<string[]>().notNull(),
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tourism Reviews table
export const tourismReviews = pgTable("tourism_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  tourismId: uuid("tourism_id").references(() => tourism.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  description: text("description").notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  salary: varchar("salary", { length: 100 }),
  location: varchar("location", { length: 255 }).notNull(),
  employmentType: employmentTypeEnum("employment_type").notNull(),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  posterId: uuid("poster_id").references(() => users.id).notNull(),
  expiresAt: timestamp("expires_at"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Board Posts table
export const boardPosts = pgTable("board_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  views: integer("views").default(0).notNull(),
  pinned: boolean("pinned").default(false).notNull(),
  locked: boolean("locked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Board Comments table
export const boardComments = pgTable("board_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").references(() => boardPosts.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Marketplace Items table
export const marketplaceItems = pgTable("marketplace_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  condition: itemConditionEnum("condition").notNull(),
  images: json("images").$type<string[]>().notNull(),
  sellerId: uuid("seller_id").references(() => users.id).notNull(),
  status: itemStatusEnum("status").default("available").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Settings table
export const settings = pgTable("settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Appointments table
export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  serviceType: varchar("service_type", { length: 255 }).notNull(),
  appointmentDate: date("appointment_date").notNull(),
  appointmentTime: time("appointment_time").notNull(),
  status: appointmentStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Conversations table
export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  participant1Id: uuid("participant1_id").references(() => users.id).notNull(),
  participant2Id: uuid("participant2_id").references(() => users.id).notNull(),
  relatedType: relatedTypeEnum("related_type"),
  relatedId: uuid("related_id"),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages table
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  senderId: uuid("sender_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  attachments: json("attachments").$type<string[]>(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  link: varchar("link", { length: 500 }),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Translations table
export const translations = pgTable("translations", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  th: text("th").notNull(),
  en: text("en").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  news: many(news),
  shops: many(shops),
  jobs: many(jobs),
  boardPosts: many(boardPosts),
  boardComments: many(boardComments),
  marketplaceItems: many(marketplaceItems),
  appointments: many(appointments),
  tourismReviews: many(tourismReviews),
  sentMessages: many(messages),
  notifications: many(notifications),
}));

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.authorId],
    references: [users.id],
  }),
}));

export const shopsRelations = relations(shops, ({ one }) => ({
  owner: one(users, {
    fields: [shops.ownerId],
    references: [users.id],
  }),
}));

export const tourismRelations = relations(tourism, ({ many }) => ({
  reviews: many(tourismReviews),
}));

export const tourismReviewsRelations = relations(tourismReviews, ({ one }) => ({
  tourism: one(tourism, {
    fields: [tourismReviews.tourismId],
    references: [tourism.id],
  }),
  user: one(users, {
    fields: [tourismReviews.userId],
    references: [users.id],
  }),
}));

export const jobsRelations = relations(jobs, ({ one }) => ({
  poster: one(users, {
    fields: [jobs.posterId],
    references: [users.id],
  }),
}));

export const boardPostsRelations = relations(boardPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [boardPosts.authorId],
    references: [users.id],
  }),
  comments: many(boardComments),
}));

export const boardCommentsRelations = relations(boardComments, ({ one }) => ({
  post: one(boardPosts, {
    fields: [boardComments.postId],
    references: [boardPosts.id],
  }),
  user: one(users, {
    fields: [boardComments.userId],
    references: [users.id],
  }),
}));

export const marketplaceItemsRelations = relations(marketplaceItems, ({ one }) => ({
  seller: one(users, {
    fields: [marketplaceItems.sellerId],
    references: [users.id],
  }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  participant1: one(users, {
    fields: [conversations.participant1Id],
    references: [users.id],
  }),
  participant2: one(users, {
    fields: [conversations.participant2Id],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
