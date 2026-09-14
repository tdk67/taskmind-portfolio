import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamas Deak — Agentic AI Engineering Portfolio",
  description: "Tamas Deak portfolio showcasing backend systems, AI/ML tooling, and enterprise architecture.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FBF8F2] text-slate-800 selection:bg-sky-200 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
