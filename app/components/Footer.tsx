export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-rule mt-24 bg-paper-2">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-rule">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-md border border-rule-2 bg-paper-hi flex items-center justify-center text-ink font-display text-sm font-semibold">
              TD
            </div>
            <div>
              <h3 className="font-display font-semibold text-ink tracking-tight">
                Tamas Deak
              </h3>
              <p className="text-xs text-muted font-medium">
                Senior Solution Consultant &amp; Agentic AI Engineer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-ink-2">
            <a
              href="https://tdeak67.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors px-3 py-1.5 rounded-md border border-rule bg-paper-hi"
            >
              Main Website ↗
            </a>
            <a
              href="https://github.com/tdk67"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors px-3 py-1.5 rounded-md border border-rule bg-paper-hi"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tdeak67"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors px-3 py-1.5 rounded-md border border-rule bg-paper-hi"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>&copy; {year} Tamas Deak. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-2 hover:text-accent transition-colors"
            >
              Next.js
            </a>
            <span>&amp;</span>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-2 hover:text-accent transition-colors"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}