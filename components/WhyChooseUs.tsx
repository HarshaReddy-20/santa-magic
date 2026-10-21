"use client";

import React from "react";
import { Sparkles, Trophy, HeartHandshake, BookOpen, Clock } from "lucide-react";

const benefits = [
  {
    title: "Personalized for every child",
    subtitle: "100% Unique Experience",
    description:
      "Every single letter and video is individually customized with your child's name, age, hometown, and holiday wishes. No generic templates—only genuine North Pole wonder.",
    icon: HeartHandshake,
    accent: "from-crimson-600 to-crimson-800",
  },
  {
    title: "Celebrates hobbies and achievements",
    subtitle: "Meaningful Recognition",
    description:
      "Whether they scored a goal in soccer, learned to read, showed kindness to a sibling, or conquered a fear, Santa specifically highlights and applauds their proudest moments.",
    icon: Trophy,
    accent: "from-gold-600 to-gold-800",
  },
  {
    title: "A memorable Christmas keepsake",
    subtitle: "Heirloom Quality",
    description:
      "Crafted with archival heavy parchment paper, authentic North Pole postmarks, and rich red wax seals—or delivered as high-definition videos to cherish across generations.",
    icon: BookOpen,
    accent: "from-forest-700 to-forest-900",
  },
  {
    title: "Simple and convenient ordering",
    subtitle: "Effortless for Parents",
    description:
      "A fast, straightforward setup designed for busy holiday schedules. Answer a few warm questions about your child, and our North Pole elves handle the rest with care.",
    icon: Clock,
    accent: "from-crimson-700 to-crimson-900",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative py-24 sm:py-32 bg-forest-950 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-forest-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-gold-400/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-300">
              The Santa&apos;s Magic Difference
            </span>
          </div>
          <h2 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-parchment-50 mb-5 tracking-tight">
            Why Choose Santa&apos;s Magic?
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 font-normal leading-relaxed text-balance">
            We preserve the purity and excitement of Christmas with authentic storytelling, heirloom stationery, and genuine North Pole wonder.
          </p>
        </div>

        {/* 4 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="relative p-8 sm:p-9 rounded-3xl bg-forest-900/60 border border-gold-500/25 hover:border-gold-400/60 transition-all duration-300 hover:shadow-[0_0_35px_rgba(230,184,63,0.15)] group hover:-translate-y-1 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-950 border border-gold-400/40 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 group-hover:border-gold-300 transition-all">
                  <Icon className="w-8 h-8 text-gold-300 group-hover:text-gold-200" />
                </div>

                {/* Text Content */}
                <div className="flex-grow">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-gold-400/90 mb-1">
                    {benefit.subtitle}
                  </span>
                  <h3 className="font-festive text-2xl font-bold text-parchment-50 mb-3 group-hover:text-gold-200 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-parchment-200 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
