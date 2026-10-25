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
      <div className="relative flex items-center rounded-md bg-paper-hi border border-rule-2 shadow-card focus-within:border-accent-edge focus-within:ring-2 focus-within:ring-accent">
        <Search
          size={18}
          className="absolute left-4 text-muted pointer-events-none group-focus-within:text-accent"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, technology, or keywords (e.g. Python, Agentic, RAG)…"
          className="w-full pl-11 pr-12 py-3.5 text-sm text-ink rounded-md bg-transparent
                     placeholder:text-muted focus:outline-none font-medium"
          aria-label="Search projects"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 p-1 rounded-md text-muted hover:text-ink hover:bg-paper-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}