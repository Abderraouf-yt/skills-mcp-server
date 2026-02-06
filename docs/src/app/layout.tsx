import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antigravity Skills | 634+ AI Development Skills",
  description: "Browse and search 634+ production-ready AI development skills for security, development, infrastructure, and more.",
  keywords: ["MCP", "AI skills", "development", "security", "infrastructure", "Gemini CLI", "Claude", "Cursor"],
  openGraph: {
    title: "Antigravity Skills",
    description: "634+ AI development skills for any MCP-compatible client",
    type: "website",
    url: "https://abderraouf-yt.github.io/skills-mcp-server",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
