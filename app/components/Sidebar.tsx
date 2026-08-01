"use client";

import { useMemo, useState } from "react";
import { Folder, Calendar as CalendarIcon, LayoutTemplate, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
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
        className="md:hidden fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-3 rounded-full shadow-lg"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isOpenMobile && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/20 z-40 backdrop-blur-sm"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-50 border-r border-slate-200 p-6 overflow-y-auto
        transition-transform duration-300 z-50 md:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 rounded p-1.5">
              <Folder className="text-white" size={18} />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Portfolio</span>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsOpenMobile(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          {/* Views */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Views
            </h4>
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory && !selectedDate
                      ? "bg-slate-200/50 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    onSelectCategory(null);
                    onSelectDate(null);
                    setIsOpenMobile(false);
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutTemplate size={16} />
                    <span>Timeline</span>
                  </div>
                  <span className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                    {projects.length}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Date */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Date
            </h4>
            <ul className="space-y-1">
              {dates.map((d) => {
                const isActive =
                  selectedDate?.year === d.year && selectedDate?.month === d.month;
                return (
                  <li key={`${d.year}-${d.month}`}>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                      onClick={() => {
                        onSelectDate(
                          isActive ? null : { year: d.year, month: d.month }
                        );
                        setIsOpenMobile(false);
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <CalendarIcon size={16} className={isActive ? "text-blue-500" : "text-slate-400"} />
                        <span>{d.label}</span>
                      </div>
                      <span className="text-xs text-slate-400">{d.count}</span>
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
              className="w-full flex items-center gap-1.5 mb-3 group"
            >
              {isCategoriesOpen ? (
                <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
              ) : (
                <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-600" />
              )}
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
                Categories
              </h4>
            </button>
            
            {isCategoriesOpen && (
              <ul className="space-y-1 pl-2 border-l border-slate-200 ml-1.5 mt-2">
                {categories.map(([tag, count]) => {
                  const isActive = selectedCategory === tag;
                  return (
                    <li key={tag}>
                      <button
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                        onClick={() => {
                          onSelectCategory(isActive ? null : tag);
                          setIsOpenMobile(false);
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-1 h-1 rounded-full ${
                              isActive ? "bg-blue-500" : "bg-slate-300"
                            }`}
                          />
                          <span className="capitalize">{tag}</span>
                        </div>
                        <span className="text-xs text-slate-400">{count}</span>
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
