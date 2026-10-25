"use client";

import { useMemo, useState } from "react";
import { Folder, Calendar as CalendarIcon, LayoutTemplate, Menu, X, ChevronDown, ChevronRight, Tag } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

interface SidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  selectedDate: { year: number; month: number } | null;
  onSelectDate: (date: { year: number; month: number } | null) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (isOpen: boolean) => void;
}

export function Sidebar({
  selectedCategory,
  onSelectCategory,
  selectedDate,
  onSelectDate,
  isOpenMobile,
  setIsOpenMobile,
}: SidebarProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  // Extract categories (tags) with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p: Project) => {
      p.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]); // Sort by count descending
  }, []);

  // Extract dates (Year/Month) with counts
  const dates = useMemo(() => {
    const counts: Record<number, Record<number, number>> = {};
    projects.forEach((p: Project) => {
      const date = new Date(p.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      if (!counts[year]) counts[year] = {};
      counts[year][month] = (counts[year][month] || 0) + 1;
    });

    const result = [];
    const sortedYears = Object.keys(counts)
      .map(Number)
      .sort((a, b) => b - a);

    for (const year of sortedYears) {
      const sortedMonths = Object.keys(counts[year])
        .map(Number)
        .sort((a, b) => b - a);
      for (const month of sortedMonths) {
        result.push({
          year,
          month,
          count: counts[year][month],
          label: new Date(year, month).toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
        });
      }
    }
    return result;
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpenMobile(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-graphite text-graphite-ink p-3.5 rounded-md border border-rule focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label="Open filter sidebar menu"
      >
        <Menu size={22} />
      </button>

      {/* Overlay for mobile */}
      {isOpenMobile && (
        <div
          className="md:hidden fixed inset-0 bg-graphite/40 z-40"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-68 bg-paper-2 border-r border-rule p-5 sm:p-6 overflow-y-auto
        transition-transform duration-300 z-50 md:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-rule">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-paper-hi border border-rule text-ink">
              <Folder size={18} className="text-ink-2" />
            </div>
            <div>
              <span className="font-display font-semibold text-ink tracking-tight block text-base leading-none">
                Archive
              </span>
              <span className="text-xs font-medium text-muted">
                filter &amp; browse
              </span>
            </div>
          </div>
          <button
            className="md:hidden p-1.5 rounded-md text-muted hover:text-ink hover:bg-paper-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setIsOpenMobile(false)}
            aria-label="Close sidebar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-7">
          {/* Views */}
          <div>
            <h4 className="text-xs font-medium text-muted mb-2.5 px-1 flex items-center justify-between">
              <span>Views</span>
              {(selectedCategory || selectedDate) && (
                <button
                  onClick={() => {
                    onSelectCategory(null);
                    onSelectDate(null);
                  }}
                  className="text-xs text-accent hover:underline font-medium"
                >
                  reset
                </button>
              )}
            </h4>
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                    !selectedCategory && !selectedDate
                      ? "bg-accent-wash text-accent font-semibold border border-accent-edge"
                      : "text-ink-2 hover:bg-paper-3 hover:text-ink"
                  }`}
                  onClick={() => {
                    onSelectCategory(null);
                    onSelectDate(null);
                    setIsOpenMobile(false);
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutTemplate size={16} className={!selectedCategory && !selectedDate ? "text-accent" : "text-muted"} />
                    <span>All Projects</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md border ${
                      !selectedCategory && !selectedDate
                        ? "bg-accent text-accent-ink border-accent-edge"
                        : "bg-paper-2 text-muted border-rule"
                    }`}
                  >
                    {projects.length}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Date Filter */}
          <div>
            <h4 className="text-xs font-medium text-muted mb-2.5 px-1 flex items-center gap-1.5">
              <CalendarIcon size={12} className="text-muted" />
              <span>Timeline</span>
            </h4>
            <ul className="space-y-1">
              {dates.map((d) => {
                const isActive =
                  selectedDate?.year === d.year && selectedDate?.month === d.month;
                return (
                  <li key={`${d.year}-${d.month}`}>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm ${
                        isActive
                          ? "bg-accent-wash text-accent font-semibold border border-accent-edge"
                          : "text-ink-2 hover:bg-paper-3 hover:text-ink"
                      }`}
                      onClick={() => {
                        onSelectDate(
                          isActive ? null : { year: d.year, month: d.month }
                        );
                        setIsOpenMobile(false);
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-accent" : "bg-muted"
                          }`}
                        />
                        <span>{d.label}</span>
                      </div>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-md border ${
                          isActive
                            ? "bg-accent text-accent-ink border-accent-edge"
                            : "text-muted bg-paper-2 border-rule"
                        }`}
                      >
                        {d.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="w-full flex items-center justify-between mb-2.5 px-1 group cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Tag size={12} className="text-muted" />
                <h4 className="text-xs font-medium text-muted group-hover:text-ink">
                  Categories
                </h4>
              </div>
              <div className="text-muted group-hover:text-ink transition-colors">
                {isCategoriesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            </button>

            {isCategoriesOpen && (
              <ul className="space-y-1 pl-1.5 border-l-2 border-rule ml-2 mt-1">
                {categories.map(([tag, count]) => {
                  const isActive = selectedCategory === tag;
                  return (
                    <li key={tag}>
                      <button
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-sm ${
                          isActive
                            ? "bg-accent-wash text-accent font-semibold border border-accent-edge"
                            : "text-ink-2 hover:bg-paper-3 hover:text-ink"
                        }`}
                        onClick={() => {
                          onSelectCategory(isActive ? null : tag);
                          setIsOpenMobile(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-accent" : "bg-muted"
                            }`}
                          />
                          <span className="font-medium">{tag}</span>
                        </div>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-md border ${
                            isActive
                              ? "bg-accent text-accent-ink border-accent-edge font-semibold"
                              : "text-muted bg-paper-2 border-rule"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}