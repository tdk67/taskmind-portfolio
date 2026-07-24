"use client";

import { useState, useMemo, useCallback } from "react";
import projects from "@/data/projects.json";
import type { Project } from "@/types";
import { FilterBar } from "./components/FilterBar";
import { ProjectCard } from "./components/ProjectCard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const typedProjects = projects as Project[];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearAll = useCallback(() => {
    setActiveTags([]);
    setSearch("");
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

    // Tag filter
    if (activeTags.length > 0) {
      result = result.filter((p) =>
        activeTags.every((tag) => p.tags.includes(tag))
      );
    }

    // Sort by date descending
    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [search, activeTags]);

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-16 pb-8">
        {/* Intro */}
        <section className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Projects &amp; Experiments
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
            A curated timeline of software projects spanning backend systems,
            AI/ML tooling, and creative web applications.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-12">
          <FilterBar
            activeTags={activeTags}
            search={search}
            onSearchChange={setSearch}
            onTagToggle={toggleTag}
            onClearAll={clearAll}
          />
        </section>

        {/* Timeline */}
        <section>
          <div className="relative pl-0 sm:pl-10">
            {/* Vertical line */}
            <div className="hidden sm:block absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-100" />

            {filtered.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <p className="text-lg font-medium">No matching projects</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <ul className="space-y-10">
                {filtered.map((project, i) => (
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}