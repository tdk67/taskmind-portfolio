"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

/**
 * Minimal, dependency-free Markdown renderer.
 * Supports the subset used in portfolio descriptions:
 *   - **bold**
 *   - *italic*
 *   - `inline code`
 *   - [text](url) links (auto-opens in new tab)
 *   - - bullet list items (top-level, consecutive)
 *   - blank-line separated paragraphs
 *   - \n (actual newlines) within a paragraph become <br/>
 * Everything else is escaped and rendered verbatim — safe by construction.
 */

type Segment = { type: "text"; text: string } | { type: "bold"; text: string } | { type: "italic"; text: string } | { type: "code"; text: string } | { type: "link"; text: string; href: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TOKEN_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function parseInline(text: string, keyPrefix: string): Segment[] {
  const parts = text.split(TOKEN_RE);
  const segs: Segment[] = [];
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      segs.push({ type: "bold", text: part.slice(2, -2) });
    } else if (part.startsWith("`") && part.endsWith("`")) {
      segs.push({ type: "code", text: part.slice(1, -1) });
    } else if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        segs.push({ type: "link", text: m[1], href: m[2] });
      } else {
        segs.push({ type: "text", text: part });
      }
    } else if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      segs.push({ type: "italic", text: part.slice(1, -1) });
    } else {
      segs.push({ type: "text", text: part });
    }
  });
  return segs;
}

function renderSegments(segs: Segment[]): React.ReactNode[] {
  return segs.map((s, i) => {
    switch (s.type) {
      case "bold":
        return <strong key={i}>{s.text}</strong>;
      case "italic":
        return <em key={i}>{s.text}</em>;
      case "code":
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded-md bg-paper-2 text-ink text-[12.5px] font-mono border border-rule"
          >
            {s.text}
          </code>
        );
      case "link":
        return (
          <a
            key={i}
            href={escapeHtml(s.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-2 hover:text-accent inline-flex items-center gap-0.5"
          >
            {s.text}
            <ExternalLink size={12} className="shrink-0" />
          </a>
        );
      default:
        return <React.Fragment key={i}>{s.text}</React.Fragment>;
    }
  });
}

function renderParagraph(text: string, keyPrefix: string): React.ReactNode {
  // list item detection (line starting with "- " or "-")
  const lines = text.split("\n");
  if (lines.every((l) => /^\s*[-*]\s+/.test(l) || l.trim() === "")) {
    const items = lines
      .filter((l) => l.trim() !== "")
      .map((l) => l.replace(/^\s*[-*]\s+/, ""));
    return (
      <ul key={keyPrefix} className="list-disc pl-5 space-y-1 my-1">
        {items.map((it, i) => (
          <li key={i} className="leading-relaxed">
            {renderSegments(parseInline(it, `${keyPrefix}-li${i}`))}
          </li>
        ))}
      </ul>
    );
  }
  // plain paragraph: collapse with <br/> on internal newlines
  const lns = lines.map((ln) => ln.trim()).filter((ln) => ln !== "");
  if (lns.length <= 1) {
    return <span key={keyPrefix}>{renderSegments(parseInline(lines[0].trim(), keyPrefix))}</span>;
  }
  return (
    <span key={keyPrefix}>
      {lns.map((ln, i) => (
        <React.Fragment key={i}>
          {renderSegments(parseInline(ln, `${keyPrefix}-l${i}`))}
          {i < lns.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </span>
  );
}

/** Renders a full markdown string (paragraphs / bullet-list blocks separated by blank lines). */
export function renderMarkdown(md: string): React.ReactNode {
  // split into blocks on blank lines (also handle literal \n\n)
  const normalized = md.replace(/\\n\\n/g, "\n\n").replace(/\\n/g, "\n");
  const blocks = normalized.split(/\n\s*\n/).map((b) => b.trim()).filter((b) => b !== "");
  return (
    <>
      {blocks.map((b, i) => renderParagraph(b, `blk${i}`))}
    </>
  );
}