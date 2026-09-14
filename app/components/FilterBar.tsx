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
    <div className="relative group">
      <div className="relative flex items-center rounded-2xl bg-white/95 border border-amber-900/15 shadow-xs hover:border-sky-300/80 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/15 focus-within:shadow-md transition-all duration-200">
        <Search
          size={18}
          className="absolute left-4 text-sky-600 pointer-events-none group-focus-within:text-sky-700 transition-colors"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, technology, or keywords (e.g. Python, Agentic, RAG)…"
          className="w-full pl-11 pr-12 py-3.5 text-sm text-slate-900 rounded-2xl bg-transparent
                     placeholder:text-slate-400 focus:outline-none transition-all font-medium"
          aria-label="Search projects"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
