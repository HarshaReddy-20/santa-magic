"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, Compass } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-forest-950"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-crimson-700/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-gold-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-700/30 rounded-full blur-[100px]" />
        {/* Subtle decorative holiday pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#fae092_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* North Pole Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/90 border border-gold-400/40 shadow-[0_0_15px_rgba(230,184,63,0.2)] mb-6 animate-pulse-slow">
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-gold-200">
                Official North Pole Magic • Christmas 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-festive text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-parchment-50 leading-[1.15] mb-6">
              Make This Christmas{" "}
              <span className="gold-gradient-text drop-shadow-[0_2px_10px_rgba(230,184,63,0.3)]">
                Magical
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-parchment-200 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
              Personalized letters and magical videos from Santa, created especially for your little ones.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <Link
                href="/personalize"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-gold-100 font-semibold text-base sm:text-lg border border-gold-400/40 shadow-[0_0_30px_rgba(170,27,27,0.55)] hover:shadow-[0_0_35px_rgba(230,184,63,0.6)] hover:border-gold-300 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <span>Create Your Santa Message</span>
                <ArrowRight className="w-5 h-5 text-gold-300" />
              </Link>

              <a
                href="#experiences"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-forest-900/80 hover:bg-forest-850 text-parchment-100 hover:text-gold-200 font-medium text-base sm:text-lg border border-gold-500/30 hover:border-gold-400/60 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <Compass className="w-5 h-5 text-gold-400" />
                <span>Explore Experiences</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gold-500/20 w-full">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-crimson-900/60 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-gold-300 fill-gold-300" />
                </div>
                <div className="text-xs text-parchment-200">
                  <span className="block font-semibold text-gold-200">100% Tailored</span>
                  <span>To child&apos;s achievements</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-crimson-900/60 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gold-300" />
                </div>
                <div className="text-xs text-parchment-200">
                  <span className="block font-semibold text-gold-200">North Pole Seal</span>
                  <span>Authentic postmark</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-crimson-900/60 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-gold-300 fill-gold-300/40" />
                </div>
                <div className="text-xs text-parchment-200">
                  <span className="block font-semibold text-gold-200">Treasured Keepsake</span>
                  <span>Holiday memories for life</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Outer Golden Glow Ring */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-gold-400/40 via-gold-600/20 to-crimson-600/30 shadow-[0_0_50px_rgba(230,184,63,0.3)] backdrop-blur-sm">
                
                {/* Main Card Container */}
                <div className="relative overflow-hidden rounded-[22px] bg-forest-900 border border-gold-500/30 aspect-[4/5] sm:aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=1200&auto=format&fit=crop"
                    alt="Santa Claus with glowing Christmas lights and decorated holiday hearth"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient vignettes for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md border border-gold-500/40 text-[11px] font-semibold text-gold-200 shadow-md">
                      🎅 North Pole Workshop
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-crimson-700/90 text-gold-100 text-[11px] font-semibold shadow-md">
                      <span className="w-2 h-2 rounded-full bg-gold-300 animate-ping" />
                      Season 2026
                    </span>
                  </div>

                  {/* Bottom Content Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-forest-950/90 backdrop-blur-md border border-gold-500/30 shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gold-300">
                        A personal greeting awaits
                      </span>
                      <div className="flex text-gold-400">
                        {"★★★★★"}
                      </div>
                    </div>
                    <p className="text-sm text-parchment-100 font-festive italic leading-snug">
                      &ldquo;Ho, ho, ho! I have looked in my Great Book and found a child whose kindness warms the North Pole...&rdquo;
                    </p>
                  </div>
                </div>

              </div>

              {/* Floating North Pole Postmark Stamp */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 p-3.5 rounded-2xl bg-forest-900/95 border border-gold-400/50 shadow-2xl backdrop-blur-md">
                <div className="w-12 h-12 rounded-xl bg-crimson-700 flex items-center justify-center border border-gold-400/40 shrink-0">
                  <span className="text-xl">📜</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-gold-200">Official Letter & Video</div>
                  <div className="text-[11px] text-parchment-200">Personalized keepsake package</div>
                </div>
              </div>

              {/* Floating Seal Stamp */}
              <div className="hidden sm:flex absolute -top-5 -right-5 items-center gap-2 px-3 py-2 rounded-xl bg-forest-900/95 border border-gold-400/40 shadow-xl backdrop-blur-md">
                <span className="text-base">✨</span>
                <span className="text-xs font-semibold text-parchment-100">Pure Holiday Wonder</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
