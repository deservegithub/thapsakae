"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  filters: { label: string; value: string }[];
  paramName?: string;
}

export function FilterBar({ filters, paramName = "category" }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const current = searchParams.get(paramName) || "";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={current === f.value ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilter(f.value)}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
}
