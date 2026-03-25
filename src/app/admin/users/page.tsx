"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p>กำลังโหลด...</p></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">จัดการผู้ใช้งาน</h1>
        <p className="text-muted-foreground mt-2">ดูและจัดการผู้ใช้ในระบบ</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ผู้ใช้งานทั้งหมด ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {user.role === "admin" ? (
                        <Shield className="h-5 w-5 text-primary" />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{user.email}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          user.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {user.role === "admin" ? "ผู้ดูแลระบบ" : "สมาชิก"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    สมัคร {new Date(user.createdAt).toLocaleDateString('th-TH')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">ยังไม่มีผู้ใช้งานในระบบ</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
