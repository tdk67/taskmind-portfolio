export function Footer() {
  return (
    <footer className="border-t border-slate-100 mt-24">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Tamas Deak</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Next.js
          </a>{" "}
          &amp;{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}