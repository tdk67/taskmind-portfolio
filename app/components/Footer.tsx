export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-amber-900/10 mt-24 bg-white/50 backdrop-blur-xs">
      {/* Accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-amber-900/10">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="transform -rotate-3 hover:rotate-0 transition-transform">
              <img
                src="/icon.svg"
                alt="Tamas Deak"
                className="w-10 h-10 rounded-xl shadow-xs border border-slate-900/10"
                width="40"
                height="40"
              />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Tamas Deak
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Senior Solution Consultant &amp; Agentic AI Engineer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <a
              href="https://tdeak67.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-700 transition-colors px-3 py-1.5 rounded-full bg-white border border-amber-900/10 shadow-2xs hover:shadow-xs"
            >
              Main Website ↗
            </a>
            <a
              href="https://github.com/tdk67"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-700 transition-colors px-3 py-1.5 rounded-full bg-white border border-amber-900/10 shadow-2xs hover:shadow-xs"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tdeak67"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-700 transition-colors px-3 py-1.5 rounded-full bg-white border border-amber-900/10 shadow-2xs hover:shadow-xs"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {year} Tamas Deak. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Next.js
            </a>
            <span>&amp;</span>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
