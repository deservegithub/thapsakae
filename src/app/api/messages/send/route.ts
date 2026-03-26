import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { getPusherServer } from "@/lib/pusher";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, content } = await request.json();

    if (!conversationId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMessage = await db.insert(messages).values({
      conversationId,
      senderId: (session.user as any).id,
      content,
    }).returning();

    await getPusherServer().trigger(
      `conversation-${conversationId}`,
      "new-message",
      {
        id: newMessage[0].id,
        content: newMessage[0].content,
        senderId: newMessage[0].senderId,
        senderName: session.user.name,
        conversationId: newMessage[0].conversationId,
        createdAt: newMessage[0].createdAt,
      }
    );

    return NextResponse.json(newMessage[0]);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
