import React, { Suspense } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import PersonalizationForm from "@/components/personalize/PersonalizationForm";
import SnowEffect from "@/components/SnowEffect";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Personalize Your Santa Message | Santa's Magic",
  description:
    "Customize a heartfelt letter or magical video greeting from Santa Claus for your child. Enter their name, accomplishments, and Christmas wishes.",
};

export default function PersonalizePage() {
  return (
    <div className="min-h-screen bg-forest-950 text-parchment-50 flex flex-col selection:bg-crimson-800 selection:text-gold-100 relative">
      {/* Ambient Snowfall */}
      <SnowEffect />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-forest-950/95 backdrop-blur-md border-b border-gold-500/25 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson-600 to-crimson-800 border border-gold-400/50 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-gold-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-parchment-50 group-hover:text-gold-200 transition-colors">
                Santa&apos;s Magic
              </span>
              <span className="text-[9px] tracking-widest uppercase font-medium text-gold-400/90 -mt-1 font-sans">
                Personalization Studio
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900/80 border border-gold-500/30 text-xs sm:text-sm font-medium text-parchment-200 hover:text-gold-200 hover:border-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-grow relative">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gold-300">
              <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
              <p className="font-festive text-lg">Entering Santa&apos;s Workshop...</p>
            </div>
          }
        >
          <PersonalizationForm />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
