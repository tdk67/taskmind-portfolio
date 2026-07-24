# Tamas Deak — Portfolio

A professional portfolio site showcasing software projects across backend systems, AI/ML tooling, and creative web applications. Built with Next.js and Tailwind CSS.

## Features

- **Timeline view** — projects ordered by date with animated entry
- **Expandable cards** — "Read more" reveals full technical descriptions
- **Tag filtering** — click any tag to filter, supports multi-select
- **Text search** — searches titles, descriptions, and tags
- **Quick links** — GitHub, live demo, and LinkedIn links per project
- **Responsive** — works on mobile, tablet, and desktop

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)
- TypeScript

## Project Structure

```
├── app/
│   ├── layout.tsx            # Root layout + metadata
│   ├── page.tsx              # Main page
│   ├── globals.css           # Tailwind + custom styles
│   └── components/
│       ├── Header.tsx        # Sticky header + social links
│       ├── FilterBar.tsx     # Search + tag filter pills
│       ├── ProjectCard.tsx   # Expandable project card
│       └── Footer.tsx        # Footer
├── data/
│   └── projects.json         # Project entries (add new ones here)
├── types.ts                  # Shared TypeScript interfaces
├── postcss.config.mjs        # PostCSS config for Tailwind v4
├── next.config.ts            # Next.js config (standalone output)
├── Dockerfile                # Multi-stage Docker build
└── docker-compose.yml
```

## Adding a New Project

Edit `data/projects.json` and add an entry:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "date": "2026-07-25",
  "description": "One-line summary shown on the card.",
  "fullDescription": "Detailed technical description revealed when the user clicks 'Read more'.",
  "githubUrl": "https://github.com/tdk67/my-project",
  "deployedUrl": "https://my-project.example.com",
  "linkedinUrl": "https://linkedin.com/posts/...",
  "tags": ["python", "docker", "backend"]
}
```

All fields except `id`, `title`, `date`, `description`, `fullDescription`, and `tags` are optional — leave them out or set to `null` if not applicable. The app updates automatically on next build.

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
# Build and start
docker compose up --build -d

# Stop
docker compose down

# View logs
docker compose logs -f
```

The app runs on port 3000.

## Deployment

The Docker image is ready for deployment behind an Nginx reverse proxy. Configure Nginx to proxy requests to `localhost:3000`.

## License

Private — all rights reserved.