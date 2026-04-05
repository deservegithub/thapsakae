"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

const sortOptions = [
  { label: "ล่าสุด", value: "" },
  { label: "ยอดนิยม", value: "popular" },
  { label: "ความคิดเห็นเยอะ", value: "comments" },
];

export function BoardSearchSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const currentSort = searchParams.get("sort") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("q", query.trim());
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-3">
      <form onSubmit={handleSearch} className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหากระทู้..."
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </form>
      <div className="flex gap-1.5 items-center">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        {sortOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={currentSort === opt.value ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("sort", opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
