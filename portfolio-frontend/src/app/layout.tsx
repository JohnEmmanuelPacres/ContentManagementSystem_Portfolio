import type { Metadata } from "next";
import Background3D from "@/components/Background3D";
import "./globals.css";

export const metadata: Metadata = {
  title: "JE Pacres | Portfolio",
  description: "Professional portfolio of JE Pacres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans bg-slate-950 text-slate-50"
    >
      <body className="min-h-full flex flex-col selection:bg-blue-500/30 relative">
        <Background3D />
        <main className="relative z-0 flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
