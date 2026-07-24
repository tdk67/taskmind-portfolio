# Product Requirements Document (PRD): Tamas Deak Portfolio Site

## 1. Goal
Create a high-fidelity, professional portfolio site for Tamas Deak that effectively showcases technical projects, expertise, and activity. It must serve as a central hub for GitHub repositories, live deployments, and professional insights.

## 2. Target Audience
Recruiters, potential collaborators, and industry peers seeking evidence of Tamas Deak's engineering capability and technical depth.

## 3. Core Requirements
- **Design:** Modern, professional aesthetic. Avoid generic "AI" UI patterns (e.g., oversized padding, excessive shadows, purple gradients).
- **Tech Stack:** Next.js, React, Tailwind CSS. Modular design for easy content updates.
- **Content Strategy:**
    - No generic "hero" section.
    - Expandable 'Read More' panels for project cards to provide deep technical insight.
    - Accurate, meaningful summaries derived from real repository READMEs.
    - Unified project cards linking to GitHub, Live Demo, and LinkedIn (where applicable).
- **UX/UI Features:**
    - Search and filter by tags (e.g., "Python," "ML," "AI," "Web").
    - Timeline-based professional history.
- **Portfolio Inventory:**
    1. **FlyRank Assignments:** Python, containerized, focus on BE-04 deployment.
    2. **Handwritten Carousel:** Whiteboard-style generator (Vercel deployment).
    3. **CV Matcher:** Agentic ML matcher (Railway deployment).
    4. **Screencast Podcast:** Media automation (Vercel deployment).
    5. **Lyric Lens:** AI lyric analysis (Emergent deployment).

## 4. Non-Functional Requirements
- **Performance:** Fast loading, lighthouse optimization.
- **Maintainability:** Content decoupled from UI via JSON/Markdown files.
- **Accessibility:** WCAG 2.1 AA compliant.

---

# Implementation Plan: Tamas Deak Portfolio

## Overview
A modular, content-driven Next.js application built with Tailwind CSS. Projects will be stored as data objects and rendered dynamically.

## Architecture
- **Content:** `/data/projects.json` for project details.
- **UI:** Custom components (`ProjectCard`, `Timeline`, `FilterBar`).
- **Deployment:** Vercel (recommended).

## Task Breakdown

### Phase 1: Foundation (Setup)
- [ ] Task 1: Initialize Next.js project with TypeScript, Tailwind CSS.
- [ ] Task 2: Configure project directory structure and global styles.

### Phase 2: Core Components & Data
- [ ] Task 3: Define TypeScript interfaces and `projects.json` structure.
- [ ] Task 4: Implement `ProjectCard` component with expandable 'Read More' feature.
- [ ] Task 5: Implement project filtering and searching logic.

### Phase 3: Layout & Polish
- [ ] Task 6: Build the layout (header, footer, content area).
- [ ] Task 7: Implement responsive timeline view for projects/experience.
- [ ] Task 8: Refine UI design (typography, spacing, color contrast).

### Phase 4: Verification & Finalization
- [ ] Task 9: Accessibility testing and performance audit.
- [ ] Task 10: Final review and deployment readiness.

## Risks
- Misalignment of "high-fidelity" design (mitigation: use a minimal, content-centric design system).
- Content quality (mitigation: use real data from projects).

## Open Questions
- Preferred color palette? (Using standard professional greyscale + accent).
