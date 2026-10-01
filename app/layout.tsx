import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Jamal | AI and full-stack engineer, Certified Ethical Hacker",
  description: "Abdullah Jamal builds RAG pipelines, voice agents and secure AI systems. Certified Ethical Hacker based in Karachi, Pakistan.",
  openGraph: {
    title: "Abdullah Jamal",
    description: "AI systems that don't trust their own output. RAG, voice agents, automation and security.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
