import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
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
      className={`${outfit.className} ${roboto_mono.className} h-full antialiased bg-slate-950 text-slate-200`}
    >
      <body className="min-h-full flex flex-col selection:bg-blue-500/30">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
