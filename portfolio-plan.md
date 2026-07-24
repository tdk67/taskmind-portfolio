# Implementation Plan: Taskmind-AI Portfolio/Blog

## Overview
Develop a portfolio and blog site for `taskmind-ai.com` to showcase projects, LinkedIn posts, and professional history. The site will feature a timeline of projects, search, and classification.

## Architecture Decisions
- **Stack:** Next.js with Tailwind CSS (production quality, SEO friendly, standard for modern portfolios).
- **Data Structure:** Local JSON or Markdown files for projects (easy to manage as a repo).
- **Hosting:** Docker Compose on Hostinger VPS (aligns with current infrastructure).
- **Deployment:** Nginx reverse proxy to route `colosseum.taskmind-ai.com` and `taskmind-ai.com`.

## Data Model
Each project entry:
- `id`: unique slug
- `title`: string
- `date`: ISO date (for timeline)
- `description`: markdown/string
- `githubUrl`: string (optional)
- `deployedUrl`: string (optional)
- `linkedinUrl`: string (optional)
- `tags`: array of strings

## Task List

### Phase 1: Foundation
- [ ] Task 1: Initialize Next.js project structure
- [ ] Task 2: Define data model and populate initial project JSON/Markdown

### Checkpoint: Foundation
- [ ] Project builds, initial data loaded

### Phase 2: Core Features
- [ ] Task 3: Build list/timeline component
- [ ] Task 4: Build project detail page/modal
- [ ] Task 5: Add filtering/search by tags

### Checkpoint: Core Features
- [ ] Timeline renders correctly, search/filter works

### Phase 3: Infrastructure/Deployment
- [ ] Task 6: Dockerize and set up Nginx config on VPS
- [ ] Task 7: Final review and launch

## Open Questions
- Do you have a preference for the design system (Tailwind UI, shadcn/ui)?
- Any specific SEO requirements for the blog posts?
