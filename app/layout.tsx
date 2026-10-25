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
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
