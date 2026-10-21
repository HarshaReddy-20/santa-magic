"use client";

import React from "react";
import { UserCheck, Wand2, Gift, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Tell us about your child.",
    description:
      "Share their name, age, proud achievements this year, favorite hobbies, and Christmas wishes so Santa knows every special detail.",
    icon: UserCheck,
    tag: "Simple 3-minute details",
  },
  {
    number: "02",
    title: "Santa prepares a personal Christmas message.",
    description:
      "Santa pens a heartwarming letter on official North Pole stationery or records a fireside video greeting directly from his cozy workshop.",
    icon: Wand2,
    tag: "Handcrafted North Pole magic",
  },
  {
    number: "03",
    title: "Receive your magical Christmas surprise.",
    description:
      "Receive your physical keepsake letter in a festive envelope or download your high-definition video to create unforgettable Christmas wonder.",
    icon: Gift,
    tag: "Delivered for the holidays",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-forest-950 overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-crimson-800/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-gold-400/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-300">
              Easy 3-Step Process
            </span>
          </div>
          <h2 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-parchment-50 mb-5 tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 font-normal leading-relaxed text-balance">
            Bringing the authentic magic of Santa Claus into your home is simple and effortless.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-gold-500/20 via-gold-400/50 to-gold-500/20 -translate-y-12 pointer-events-none z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-forest-900/70 border border-gold-500/25 hover:border-gold-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,184,63,0.15)] group hover:-translate-y-1"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 px-3.5 py-1 rounded-full bg-crimson-800 text-gold-200 border border-gold-400/40 text-xs font-bold font-cinzel shadow-md">
                  STEP {step.number}
                </div>

                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-950 border border-gold-400/50 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(230,184,63,0.35)] transition-all">
                  <Icon className="w-9 h-9 text-gold-300 group-hover:text-gold-200" />
                </div>

                {/* Tag */}
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400/90 mb-2">
                  {step.tag}
                </span>

                {/* Step Title */}
                <h3 className="font-festive text-xl font-bold text-parchment-50 mb-3 group-hover:text-gold-200 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-parchment-200 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA prompt below steps */}
        <div className="mt-16 text-center">
          <Link
            href="/personalize"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-gold-300 hover:text-gold-100 transition-colors group"
          >
            <span>Ready to make your child&apos;s eyes light up?</span>
            <span className="underline underline-offset-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Start creating your message
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
