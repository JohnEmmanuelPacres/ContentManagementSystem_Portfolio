import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import Background3D from "@/components/Background3D";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto_mono",
  subsets: ["latin"],
});

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
      className={`${outfit.className} ${roboto_mono.className} h-full antialiased bg-slate-900 text-slate-200`}
    >
      <body className="min-h-full flex flex-col selection:bg-emerald-500/30 relative">
        <Background3D />
        <main className="relative z-0 flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
