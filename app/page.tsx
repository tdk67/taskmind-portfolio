"use client";

import { useState, useMemo, useCallback } from "react";
import projects from "@/data/projects.json";
import type { Project } from "@/types";
import { FilterBar } from "./components/FilterBar";
import { ProjectCard } from "./components/ProjectCard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";

const typedProjects = projects as Project[];
const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number } | null>(null);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  const handleCategorySelect = useCallback((cat: string | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleDateSelect = useCallback((date: { year: number; month: number } | null) => {
    setSelectedDate(date);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((s: string) => {
    setSearch(s);
    setCurrentPage(1);
  }, []);

  const filtered = useMemo(() => {
    let result = typedProjects;

    // Text search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.tags.includes(selectedCategory));
    }

    // Date filter
    if (selectedDate) {
      result = result.filter((p) => {
        const d = new Date(p.date);
        return d.getFullYear() === selectedDate.year && d.getMonth() === selectedDate.month;
      });
    }

    // Sort by date descending
    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [search, selectedCategory, selectedDate]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProjects = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed left side */}
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <Header />

        <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-12 pb-8">
          {/* Intro */}
          <section className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Projects &amp; Experiments
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              A curated timeline of software projects spanning backend systems,
              AI/ML tooling, and creative web applications.
            </p>
          </section>

          {/* Search Bar */}
          <section className="mb-12">
            <FilterBar
              search={search}
              onSearchChange={handleSearchChange}
            />
          </section>

          {/* Timeline */}
          <section>
            <div className="relative pl-0 sm:pl-10">
              {/* Vertical line */}
              <div className="hidden sm:block absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-100" />

              {paginatedProjects.length === 0 ? (
                <div className="py-20 text-center text-slate-400">
                  <p className="text-lg font-medium">No matching projects</p>
                  <p className="text-sm mt-1">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <>
                  <ul className="space-y-10 mb-12">
                    {paginatedProjects.map((project, i) => (
                      <li
                        key={project.id}
                        className="relative animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        {/* Dot on the timeline */}
                        <div className="hidden sm:flex absolute -left-[31px] top-7 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white z-[1]" />

                        <ProjectCard project={project} index={i} />
                      </li>
                    ))}
                  </ul>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-50 text-slate-700
                                   hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-slate-500">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-50 text-slate-700
                                   hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}