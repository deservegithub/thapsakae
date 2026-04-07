import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    {
      id: "line",
      name: "LINE",
      type: "oidc",
      issuer: "https://access.line.me",
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
      authorization: {
        params: { scope: "openid profile email" },
      },
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.select().from(users).where(eq(users.email, credentials.email as string)).limit(1);

        if (!user[0] || !user[0].password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user[0].password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          role: user[0].role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "credentials") {
        return true;
      }

      // Social login — auto-create or link user
      if (user.email) {
        try {
          const existing = await db.select().from(users).where(eq(users.email, user.email)).limit(1);

          if (existing.length === 0) {
            // สร้างผู้ใช้ใหม่
            await db.insert(users).values({
              email: user.email,
              name: user.name || "ผู้ใช้งาน",
              avatar: user.image || null,
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
              role: "user",
            });
          } else {
            // อัพเดท avatar + provider ถ้ายังไม่มี
            const updates: any = {};
            if (!existing[0].avatar && user.image) updates.avatar = user.image;
            if (!existing[0].provider) {
              updates.provider = account?.provider;
              updates.providerAccountId = account?.providerAccountId;
            }
            if (Object.keys(updates).length > 0) {
              await db.update(users).set(updates).where(eq(users.email, user.email));
            }
          }
        } catch (error) {
          console.error("Social login error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        // Credentials login — user object already has id/role
        if (account?.provider === "credentials") {
          token.id = user.id;
          token.role = user.role;
        }
      }

      // Social login — fetch id/role from DB by email
      if (account && account.provider !== "credentials" && token.email) {
        const dbUser = await db.select().from(users).where(eq(users.email, token.email as string)).limit(1);
        if (dbUser[0]) {
          token.id = dbUser[0].id;
          token.role = dbUser[0].role;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
});
