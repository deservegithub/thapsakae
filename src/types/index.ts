import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as schema from "@/lib/db/schema";

// User types
export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;

// News types
export type News = InferSelectModel<typeof schema.news>;
export type NewNews = InferInsertModel<typeof schema.news>;

// Shop types
export type Shop = InferSelectModel<typeof schema.shops>;
export type NewShop = InferInsertModel<typeof schema.shops>;

// Tourism types
export type Tourism = InferSelectModel<typeof schema.tourism>;
export type NewTourism = InferInsertModel<typeof schema.tourism>;
export type TourismReview = InferSelectModel<typeof schema.tourismReviews>;
export type NewTourismReview = InferInsertModel<typeof schema.tourismReviews>;

// Job types
export type Job = InferSelectModel<typeof schema.jobs>;
export type NewJob = InferInsertModel<typeof schema.jobs>;

// Board types
export type BoardPost = InferSelectModel<typeof schema.boardPosts>;
export type NewBoardPost = InferInsertModel<typeof schema.boardPosts>;
export type BoardComment = InferSelectModel<typeof schema.boardComments>;
export type NewBoardComment = InferInsertModel<typeof schema.boardComments>;

// Marketplace types
export type MarketplaceItem = InferSelectModel<typeof schema.marketplaceItems>;
export type NewMarketplaceItem = InferInsertModel<typeof schema.marketplaceItems>;

// Appointment types
export type Appointment = InferSelectModel<typeof schema.appointments>;
export type NewAppointment = InferInsertModel<typeof schema.appointments>;

// Message types
export type Conversation = InferSelectModel<typeof schema.conversations>;
export type NewConversation = InferInsertModel<typeof schema.conversations>;
export type Message = InferSelectModel<typeof schema.messages>;
export type NewMessage = InferInsertModel<typeof schema.messages>;

// Notification types
export type Notification = InferSelectModel<typeof schema.notifications>;
export type NewNotification = InferInsertModel<typeof schema.notifications>;

// Translation types
export type Translation = InferSelectModel<typeof schema.translations>;
export type NewTranslation = InferInsertModel<typeof schema.translations>;

// Settings types
export type Setting = InferSelectModel<typeof schema.settings>;
export type NewSetting = InferInsertModel<typeof schema.settings>;
