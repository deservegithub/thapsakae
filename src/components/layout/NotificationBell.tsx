"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getNotificationsByUser, getUnreadCount, markAsRead, markAllAsRead } from "@/actions/notifications";

export function NotificationBell() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const userId = (session?.user as any)?.id;

  useEffect(() => {
    if (!userId) return;
    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadUnreadCount = async () => {
    if (!userId) return;
    const res = await getUnreadCount(userId);
    if (res.success) setUnreadCount(res.count);
  };

  const loadNotifications = async () => {
    if (!userId) return;
    const res = await getNotificationsByUser(userId);
    if (res.success && res.data) setNotifications(res.data);
  };

  const handleOpen = () => {
    if (!open) loadNotifications();
    setOpen(!open);
  };

  const handleMarkAllRead = async () => {
    if (!userId) return;
    await markAllAsRead(userId);
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClickNotification = async (n: any) => {
    if (!n.read) {
      await markAsRead(n.id);
      setUnreadCount((c) => Math.max(0, c - 1));
      setNotifications((prev) => prev.map((item) => item.id === n.id ? { ...item, read: true } : item));
    }
    setOpen(false);
  };

  if (!session?.user) return null;

  return (
    <div className="relative" ref={ref}>
      <Button variant="ghost" size="icon" onClick={handleOpen} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-sm">การแจ้งเตือน</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-primary hover:underline">
                อ่านทั้งหมด
              </button>
            )}
          </div>
          <div className="overflow-y-auto max-h-72">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id}>
                  {n.link ? (
                    <Link href={n.link} onClick={() => handleClickNotification(n)}>
                      <div className={`px-4 py-3 hover:bg-slate-50 border-b last:border-b-0 ${!n.read ? "bg-blue-50" : ""}`}>
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(n.createdAt).toLocaleDateString("th-TH")}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div
                      onClick={() => handleClickNotification(n)}
                      className={`px-4 py-3 hover:bg-slate-50 border-b last:border-b-0 cursor-pointer ${!n.read ? "bg-blue-50" : ""}`}
                    >
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(n.createdAt).toLocaleDateString("th-TH")}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                ไม่มีการแจ้งเตือน
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
