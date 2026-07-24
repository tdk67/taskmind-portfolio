import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamas Deak — Portfolio",
  description: "Showcasing projects in AI, backend engineering, and creative tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}