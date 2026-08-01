"use client";

import { Search, X } from "lucide-react";

interface FilterBarProps {
  search: string;
  onSearchChange: (s: string) => void;
}

export function FilterBar({
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search projects…"
        className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-slate-200 bg-white
                   placeholder:text-slate-400 focus:outline-none focus:border-blue-400
                   focus:ring-2 focus:ring-blue-100 transition-all"
        aria-label="Search projects"
      />
      {search && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}