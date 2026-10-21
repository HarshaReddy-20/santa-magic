import type { Metadata } from "next";
import localFont from "next/font/local";
import { PersonalizationProvider } from "@/context/PersonalizationContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Santa's Magic | Personalized Letters & Videos from Santa Claus",
  description:
    "Make this Christmas magical with personalized letters and enchanting video messages from Santa Claus, created specially for your little ones.",
  keywords: ["Santa letter", "Personalized Santa video", "Christmas gifts for kids", "North Pole letter"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-forest-950 text-parchment-50 selection:bg-crimson-700 selection:text-gold-100 min-h-screen flex flex-col`}
      >
        <PersonalizationProvider>{children}</PersonalizationProvider>
      </body>
    </html>
  );
}
