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
        className="md:hidden fixed bottom-6 right-6 z-40 bg-slate-900 hover:bg-slate-800 text-white p-3.5 rounded-full shadow-xl border border-amber-300/40 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all transform hover:scale-105"
        aria-label="Open filter sidebar menu"
      >
        <Menu size={22} />
      </button>

      {/* Overlay for mobile */}
      {isOpenMobile && (
        <div
          className="md:hidden fixed inset-0 bg-slate-950/40 z-40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-68 bg-[#FAF6EE] border-r border-amber-900/10 p-5 sm:p-6 overflow-y-auto
        transition-transform duration-300 z-50 md:translate-x-0 shadow-sm ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-900/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-slate-900 text-white shadow-xs transform -rotate-2">
              <Folder size={18} className="text-amber-400" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight block text-base leading-none">
                Navigation
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                Filter Archive
              </span>
            </div>
          </div>
          <button
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-amber-100/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={() => setIsOpenMobile(false)}
            aria-label="Close sidebar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-7">
          {/* Views */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
              <span>Views</span>
              {(selectedCategory || selectedDate) && (
                <button
                  onClick={() => {
                    onSelectCategory(null);
                    onSelectDate(null);
                  }}
                  className="text-[10px] text-sky-700 hover:underline font-semibold lowercase"
                >
                  reset
                </button>
              )}
            </h4>
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    !selectedCategory && !selectedDate
                      ? "bg-amber-100/80 text-amber-950 font-bold border border-amber-300/70 shadow-2xs"
                      : "text-slate-700 hover:bg-amber-100/40 hover:text-slate-900"
                  }`}
                  onClick={() => {
                    onSelectCategory(null);
                    onSelectDate(null);
                    setIsOpenMobile(false);
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutTemplate size={16} className={!selectedCategory && !selectedDate ? "text-amber-700" : "text-slate-500"} />
                    <span>All Projects</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      !selectedCategory && !selectedDate
                        ? "bg-amber-200/90 text-amber-950"
                        : "bg-amber-100/60 text-slate-600"
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
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-1 flex items-center gap-1.5">
              <CalendarIcon size={12} className="text-amber-600" />
              <span>Timeline Archive</span>
            </h4>
            <ul className="space-y-1">
              {dates.map((d) => {
                const isActive =
                  selectedDate?.year === d.year && selectedDate?.month === d.month;
                return (
                  <li key={`${d.year}-${d.month}`}>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? "bg-sky-100 text-sky-900 font-bold border border-sky-300/80 shadow-2xs"
                          : "text-slate-700 hover:bg-amber-100/40 hover:text-slate-900"
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
                            isActive ? "bg-sky-600 ring-2 ring-sky-300" : "bg-slate-300"
                          }`}
                        />
                        <span>{d.label}</span>
                      </div>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                          isActive
                            ? "bg-sky-200/90 text-sky-900"
                            : "text-slate-400 bg-amber-50"
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
                <Tag size={12} className="text-amber-600" />
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-800 transition-colors">
                  Categories
                </h4>
              </div>
              <div className="text-slate-400 group-hover:text-slate-700 transition-colors">
                {isCategoriesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            </button>
            
            {isCategoriesOpen && (
              <ul className="space-y-1 pl-1.5 border-l-2 border-amber-900/10 ml-2 mt-1">
                {categories.map(([tag, count]) => {
                  const isActive = selectedCategory === tag;
                  return (
                    <li key={tag}>
                      <button
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-sm transition-all ${
                          isActive
                            ? "bg-sky-100 text-sky-900 font-bold border border-sky-300/80 shadow-2xs"
                            : "text-slate-700 hover:bg-amber-100/40 hover:text-slate-900"
                        }`}
                        onClick={() => {
                          onSelectCategory(isActive ? null : tag);
                          setIsOpenMobile(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-sky-600 ring-2 ring-sky-300" : "bg-amber-400/80"
                            }`}
                          />
                          <span className="capitalize font-medium">{tag}</span>
                        </div>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? "bg-sky-200/90 text-sky-900 font-semibold"
                              : "text-slate-400 bg-amber-50"
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
