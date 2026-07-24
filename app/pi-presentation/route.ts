import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export async function GET() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public", "pi-presentation.html"),
    "utf-8"
  );
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}