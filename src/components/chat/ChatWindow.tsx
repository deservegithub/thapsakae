"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Circle } from "lucide-react";
import { useSession } from "next-auth/react";

interface ChatWindowProps {
  conversationId: string;
  recipientName: string;
}

export function ChatWindow({ conversationId, recipientName }: ChatWindowProps) {
  const { data: session } = useSession();
  const { messages, sendMessage, isConnected } = useChat(conversationId);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>{recipientName}</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <Circle
              className={`h-2 w-2 ${
                isConnected ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400"
              }`}
            />
            <span className="text-muted-foreground">
              {isConnected ? "เชื่อมต่อแล้ว" : "กำลังเชื่อมต่อ..."}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            ยังไม่มีข้อความ เริ่มต้นการสนทนาได้เลย
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === (session?.user as any)?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {!isOwn && (
                    <div className="text-xs font-semibold mb-1">
                      {message.senderName}
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!isConnected}
          />
          <Button type="submit" disabled={!input.trim() || !isConnected}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
