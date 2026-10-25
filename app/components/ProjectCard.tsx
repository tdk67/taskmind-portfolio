"use client";

import { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { renderMarkdown } from "../markdown";
import type { Project } from "@/types";

// Cobalt: one accent (electric cobalt), no per-category rainbow.
function getTagStyle(_tag: string) {
  return "border-rule text-ink-2 bg-paper-2";
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

  return (
    <article
      className="group bg-paper-hi rounded-lg border border-rule shadow-card
                 hover:border-rule-2 transition-colors relative"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="p-6 sm:p-7">
        {/* Top row: title + date + tags */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3.5">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-ink group-hover:text-accent">
              {project.title}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-paper-2 text-muted border border-rule text-xs font-medium">
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={project.date}>{formattedDate}</time>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${getTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Short description (markdown) */}
        <p className="text-ink-2 leading-relaxed mb-4 text-[15px] font-normal">
          {renderMarkdown(project.description)}
        </p>

        {/* Expandable full description */}
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{
            maxHeight: expanded ? `${contentHeight}px` : "0px",
            transition: expanded ? "max-height 0.4s ease-out" : "none",
          }}
        >
          <div className="pt-1 pb-4">
            <div className="bg-paper-2 rounded-md p-4 border-l-4 border-accent-edge">
              <div className="text-ink-2 leading-relaxed text-[14.5px] font-normal">
                {renderMarkdown(project.fullDescription)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: links */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-rule">
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-key border border-rule
                           text-ink text-xs font-medium keycap focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-accent
                           text-accent-ink text-xs font-medium keycap-accent focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <ExternalLink
                  size={14}
                  aria-hidden="true"
                />
                <span>Live Demo</span>
              </a>
            )}
            {project.devpostUrl && (
              <a
                href={project.devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-key border border-rule
                           text-ink text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-key border border-rule
                           text-ink text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-key border border-rule
                           text-ink text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-key border border-rule
                           text-ink text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                muted
                playsInline
                className="w-full max-h-[420px] rounded-md bg-graphite shadow-card"
              />
              <button
                onClick={() => setVideoPlaying(false)}
                className="mt-2 text-xs font-medium text-muted hover:text-ink underline underline-offset-2"
              >
                Close video
              </button>
            </div>
          )}

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-key border border-rule
                       text-accent text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-expanded={expanded}
          >
            <span>{expanded ? "Show less" : "Read details"}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
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