"use client";

import { useState, useMemo, useCallback } from "react";
import projects from "@/data/projects.json";
import type { Project } from "@/types";
import { FilterBar } from "./components/FilterBar";
import { ProjectCard } from "./components/ProjectCard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { Sparkles, Calendar, X } from "lucide-react";

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

  const clearAllFilters = useCallback(() => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedDate(null);
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
    <div className="flex min-h-screen bg-paper">
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
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">


          {/* Search & Active Filters Header */}
          <section className="mb-10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-accent" aria-hidden="true" />
                <h2 className="text-lg font-display font-semibold text-ink tracking-tight">
                  Project archive
                </h2>
              </div>
              <span className="text-xs text-muted font-medium">
                Showing {filtered.length} of {typedProjects.length} projects
              </span>
            </div>

            <FilterBar search={search} onSearchChange={handleSearchChange} />

            {/* Active filter pills */}
            {(search || selectedCategory || selectedDate) && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="font-medium text-muted">Active filters:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent-wash text-accent border border-accent-edge font-medium">
                    Search: &ldquo;{search}&rdquo;
                    <button
                      onClick={() => handleSearchChange("")}
                      className="hover:text-accent p-0.5"
                      aria-label="Remove search filter"
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent-wash text-accent border border-accent-edge font-medium">
                    Category: {selectedCategory}
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className="hover:text-accent p-0.5"
                      aria-label="Remove category filter"
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {selectedDate && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent-wash text-accent border border-accent-edge font-medium">
                    Date: {new Date(selectedDate.year, selectedDate.month).toLocaleString("default", { month: "short", year: "numeric" })}
                    <button
                      onClick={() => handleDateSelect(null)}
                      className="hover:text-accent p-0.5"
                      aria-label="Remove date filter"
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-accent hover:underline font-medium underline-offset-2 ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="scroll-mt-24">
            <div className="relative pl-0 sm:pl-10">
              {/* Vertical hairline on the timeline */}
              <div className="hidden sm:block absolute left-[19px] top-4 bottom-4 w-0.5 bg-rule rounded-full" />

              {paginatedProjects.length === 0 ? (
                <div className="py-20 text-center bg-paper-2 rounded-md border border-dashed border-rule p-8">
                  <div className="w-12 h-12 rounded-md bg-paper-3 text-muted flex items-center justify-center mx-auto mb-3">
                    <Calendar size={24} aria-hidden="true" />
                  </div>
                  <p className="text-lg font-display font-semibold text-ink">No matching projects</p>
                  <p className="text-sm text-muted mt-1 max-w-sm mx-auto">
                    Try adjusting your search query or selecting a different category or date filter.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-4 py-2 text-xs font-medium rounded-md bg-accent text-accent-ink keycap-accent"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <>
                  <ul className="space-y-10 mb-12">
                    {paginatedProjects.map((project, i) => {
                      const projectYear = new Date(project.date).getFullYear();
                      const prevYear =
                        i > 0
                          ? new Date(paginatedProjects[i - 1].date).getFullYear()
                          : null;
                      const isNewYear = i === 0 || projectYear !== prevYear;

                      return (
                        <li
                          key={project.id}
                          className="relative animate-fade-in-up"
                          style={{ animationDelay: `${i * 0.08}s` }}
                        >
                          {/* Year marker chip on year transition */}
                          {isNewYear && (
                            <div className="relative flex items-center gap-3 mb-6 sm:-ml-10">
                              <div className="hidden sm:flex items-center justify-center px-2.5 py-1 rounded-md bg-graphite text-graphite-ink font-display font-semibold text-xs shadow-card z-10">
                                {projectYear}
                              </div>
                              <span className="sm:hidden px-3 py-1 rounded-md bg-paper-2 text-ink border border-rule text-xs font-medium">
                                {projectYear}
                              </span>
                              <div className="h-px flex-1 bg-rule" />
                            </div>
                          )}

                          {/* Marker on the timeline */}
                          <div className="hidden sm:flex absolute -left-[31px] top-8 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-paper shadow-sm z-[1]" />

                          <ProjectCard project={project} index={i} />
                        </li>
                      );
                    })}
                  </ul>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rule pt-6">
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          const el = document.getElementById("timeline");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        disabled={currentPage === 1}
                        className="px-5 py-2.5 text-sm font-medium rounded-md bg-paper-hi border border-rule text-ink-2
                                   hover:text-accent hover:border-accent-edge disabled:opacity-40
                                   disabled:pointer-events-none transition-colors w-full sm:w-auto text-center"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-md bg-paper-2 border border-rule text-xs font-medium text-ink-2">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          const el = document.getElementById("timeline");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2.5 text-sm font-medium rounded-md bg-paper-hi border border-rule text-ink-2
                                   hover:text-accent hover:border-accent-edge disabled:opacity-40
                                   disabled:pointer-events-none transition-colors w-full sm:w-auto text-center"
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
