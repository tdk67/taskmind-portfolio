"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

interface FilterBarProps {
  activeTags: string[];
  search: string;
  onSearchChange: (s: string) => void;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

// Pull all unique tags from projects, sorted alphabetically
const allTags: string[] = [
  ...new Set(projects.flatMap((p: Project) => p.tags)),
].sort();

export function FilterBar({
  activeTags,
  search,
  onSearchChange,
  onTagToggle,
  onClearAll,
}: FilterBarProps) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects or tags…"
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

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all
                ${
                  active
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                }`}
            >
              {tag}
            </button>
          );
        })}
        {activeTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}