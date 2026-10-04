"use client";

import { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { renderMarkdown } from "../markdown";
import type { Project } from "@/types";

function getCategoryAccent(tags: string[]) {
  if (tags.some((t) => ["ai", "multimodal"].includes(t.toLowerCase()))) {
    return {
      bar: "bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400",
      accentText: "text-sky-700",
      dot: "bg-sky-500",
      pillBorder: "border-sky-200",
      pillBg: "bg-sky-50/80",
    };
  }
  if (tags.some((t) => ["backend", "infra", "security"].includes(t.toLowerCase()))) {
    return {
      bar: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400",
      accentText: "text-amber-800",
      dot: "bg-amber-500",
      pillBorder: "border-amber-200",
      pillBg: "bg-amber-50/80",
    };
  }
  if (tags.some((t) => ["frontend", "fullstack", "typescript"].includes(t.toLowerCase()))) {
    return {
      bar: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
      accentText: "text-emerald-800",
      dot: "bg-emerald-500",
      pillBorder: "border-emerald-200",
      pillBg: "bg-emerald-50/80",
    };
  }
  if (tags.some((t) => ["music", "education", "german"].includes(t.toLowerCase()))) {
    return {
      bar: "bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400",
      accentText: "text-rose-800",
      dot: "bg-rose-500",
      pillBorder: "border-rose-200",
      pillBg: "bg-rose-50/80",
    };
  }
  return {
    bar: "bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-400",
    accentText: "text-indigo-800",
    dot: "bg-indigo-500",
    pillBorder: "border-indigo-200",
    pillBg: "bg-indigo-50/80",
  };
}

function getTagStyle(tag: string) {
  const t = tag.toLowerCase();
  if (["ai", "multimodal"].includes(t)) {
    return "bg-sky-100/80 text-sky-800 border-sky-200/90";
  }
  if (["backend", "infra", "security"].includes(t)) {
    return "bg-amber-100/80 text-amber-900 border-amber-200/90";
  }
  if (["frontend", "fullstack", "typescript"].includes(t)) {
    return "bg-emerald-100/80 text-emerald-900 border-emerald-200/90";
  }
  if (["python", "tool", "kotlin"].includes(t)) {
    return "bg-indigo-100/80 text-indigo-900 border-indigo-200/90";
  }
  if (["music", "education", "german"].includes(t)) {
    return "bg-rose-100/80 text-rose-900 border-rose-200/90";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const accent = getCategoryAccent(project.tags);

  return (
    <article
      className="group bg-white/95 rounded-3xl border border-amber-900/10 shadow-sm
                 hover:shadow-xl hover:-translate-y-1 hover:border-sky-300/80 hover:ring-2 hover:ring-sky-100
                 transition-all duration-300 overflow-hidden relative"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Category Gradient Top Accent Line */}
      <div className={`h-1.5 w-full ${accent.bar}`} />

      <div className="p-6 sm:p-7">
        {/* Top row: title + date chip + tags */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3.5">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
              {project.title}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-medium shadow-2xs">
              <Calendar size={12} className="text-amber-600" />
              <time dateTime={project.date}>{formattedDate}</time>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider
                           rounded-full border shadow-2xs ${getTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Short description (markdown) */}
        <p className="text-slate-700 leading-relaxed mb-4 text-[15px] font-normal">
          {renderMarkdown(project.description)}
        </p>

        {/* Expandable full description */}
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{ maxHeight: expanded ? `${contentHeight}px` : "0px" }}
        >
          <div className="pt-1 pb-4">
            <div className="bg-amber-50/60 rounded-2xl p-4 border-l-4 border-sky-500 shadow-inner">
              <div className="text-slate-800 leading-relaxed text-[14.5px] font-normal">
                {renderMarkdown(project.fullDescription)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: links as pill buttons + expand button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-amber-900/10">
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800
                           text-white text-xs font-semibold shadow-xs transition-all transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-slate-400 group/link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="group-hover/link:scale-110 transition-transform">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Code</span>
              </a>
            )}
            {project.deployedUrl && (
              <a
                href={project.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-600 hover:bg-sky-700
                           text-white text-xs font-semibold shadow-xs transition-all transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-sky-500 group/link"
              >
                <ExternalLink
                  size={14}
                  className="group-hover/link:scale-110 transition-transform"
                />
                <span>Live Demo</span>
              </a>
            )}
            {project.devpostUrl && (
              <a
                href={project.devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700
                           text-white text-xs font-semibold shadow-xs transition-all transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-rose-500 group/link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="group-hover/link:scale-110 transition-transform">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-7l6 3.5-6 3.5z"/>
                </svg>
                <span>Devpost</span>
              </a>
            )}
            {project.linkedinUrl && (
              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182]
                           text-white text-xs font-semibold shadow-xs transition-all transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-[#0a66c2] group/link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="group-hover/link:scale-110 transition-transform">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                onClick={(e) => {
                  e.preventDefault();
                  setVideoPlaying(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700
                           text-white text-xs font-semibold shadow-xs transition-all transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-rose-500 group/link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="group-hover/link:scale-110 transition-transform">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>{project.videoLabel ?? "Demo"}</span>
              </a>
            )}
            {project.reportUrl && (
              <a
                href={project.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700
                           text-white text-xs font-semibold shadow-xs transition-all transform hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 group/link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="group-hover/link:scale-110 transition-transform">
                  <path d="M12 3l2.5 0v10l-2.5 0M5 3l2.5 0v10l-2.5 0M8 3v12" />
                </svg>
                <span>{project.reportLabel ?? "Report"}</span>
              </a>
            )}
          </div>

          {videoPlaying && project.videoUrl && (
            <div className="w-full mt-4">
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="w-full max-h-[420px] rounded-xl bg-black shadow-lg"
              />
              <button
                onClick={() => setVideoPlaying(false)}
                className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                Close video
              </button>
            </div>
          )}

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100/80
                       text-sky-700 text-xs font-bold border border-sky-200/70 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-expanded={expanded}
          >
            <span>{expanded ? "Show less" : "Read details"}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
