"use client";

import { useEffect, useState } from "react";
import { getPusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  conversationId: string;
  createdAt: Date;
}

export function useChat(conversationId: string) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const channel = getPusherClient().subscribe(`conversation-${conversationId}`);

    channel.bind("pusher:subscription_succeeded", () => {
      setIsConnected(true);
    });

    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [conversationId]);

  const sendMessage = async (content: string) => {
    if (!session?.user || !content.trim()) return;

    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
