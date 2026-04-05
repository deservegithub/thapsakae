"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

const sortOptions = [
  { label: "ล่าสุด", value: "" },
  { label: "ราคาต่ำ-สูง", value: "price-asc" },
  { label: "ราคาสูง-ต่ำ", value: "price-desc" },
];

const priceRanges = [
  { label: "ทุกราคา", value: "" },
  { label: "≤ 100", value: "100" },
  { label: "≤ 500", value: "500" },
  { label: "≤ 1,000", value: "1000" },
  { label: "≤ 5,000", value: "5000" },
];

export function MarketSearchSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const currentSort = searchParams.get("sort") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: query.trim() });
  };

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้า..."
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
              onClick={() => updateParams({ sort: opt.value })}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5 items-center flex-wrap">
        <span className="text-sm text-muted-foreground mr-1">ช่วงราคา:</span>
        {priceRanges.map((opt) => (
          <Button
            key={opt.value}
            variant={currentMaxPrice === opt.value ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams({ maxPrice: opt.value })}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
