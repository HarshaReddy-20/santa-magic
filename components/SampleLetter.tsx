"use client";

import React from "react";
import { Sparkles, Stamp, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SampleLetter() {
  return (
    <section id="sample-letter" className="relative py-24 sm:py-32 bg-forest-900/40 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-900/60 border border-gold-400/40 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-200">
              Stationery Showcase
            </span>
          </div>
          <h2 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-parchment-50 mb-4 tracking-tight">
            Sample Santa Letter
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 font-normal leading-relaxed text-balance">
            Preview the heirloom stationery quality and authentic North Pole warmth that awaits your child.
          </p>
        </div>

        {/* Clear Sample Disclaimer Banner */}
        <div className="mb-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-950/90 border border-gold-400/60 shadow-lg text-xs sm:text-sm text-gold-200">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <strong className="font-semibold text-gold-300 uppercase tracking-wider">Sample Preview Only:</strong>
            <span>Features a fictional child (Oliver, age 7) to showcase real styling and personalization.</span>
          </div>
        </div>

        {/* Parchment Stationery Letter Container */}
        <div className="relative mx-auto max-w-3xl rounded-2xl p-4 sm:p-8 bg-[#fdfaf2] text-[#2c1d11] shadow-[0_15px_60px_rgba(0,0,0,0.65)] border-4 border-[#cda02a] ring-1 ring-gold-200/50">
          
          {/* Decorative Corner Ornaments (CSS Filigree) */}
          <div className="absolute top-2 left-2 text-gold-700 text-lg sm:text-xl select-none font-serif opacity-75">❖</div>
          <div className="absolute top-2 right-2 text-gold-700 text-lg sm:text-xl select-none font-serif opacity-75">❖</div>
          <div className="absolute bottom-2 left-2 text-gold-700 text-lg sm:text-xl select-none font-serif opacity-75">❖</div>
          <div className="absolute bottom-2 right-2 text-gold-700 text-lg sm:text-xl select-none font-serif opacity-75">❖</div>

          {/* Inner Border */}
          <div className="p-6 sm:p-10 border-2 border-dashed border-[#b88c22]/40 rounded-xl relative">
            
            {/* Stationery Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#b88c22]/30 pb-6 mb-8 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#881313] text-[#fae092] flex items-center justify-center border-2 border-[#b88c22] shadow-inner shrink-0">
                  <Stamp className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#881313] uppercase">
                    North Pole Postal Service
                  </h3>
                  <p className="text-xs font-serif tracking-widest text-[#664b15] uppercase font-semibold">
                    Department of Good Deeds & Holiday Magic • Arctic Circle
                  </p>
                </div>
              </div>

              {/* North Pole Postal Stamp Graphic */}
              <div className="border-2 border-dashed border-[#881313]/70 rounded-lg p-2.5 bg-[#f5ebd2] text-[#881313] text-center shrink-0 rotate-1 sm:rotate-2 shadow-sm">
                <div className="text-[10px] font-bold tracking-wider uppercase">Official Postmark</div>
                <div className="font-cinzel text-xs font-black tracking-widest">NORTH POLE AIR MAIL</div>
                <div className="text-[10px] text-[#664b15]">Dec 2026 • Verified Nice List</div>
              </div>
            </div>

            {/* Letter Meta Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif text-[#5a4220] mb-8 bg-[#f5edd9]/60 p-3.5 rounded-lg border border-[#e2c589]">
              <div>
                <span className="font-bold uppercase text-[#881313]">Recipient:</span> Oliver Mitchell (Age 7)
              </div>
              <div className="sm:text-right">
                <span className="font-bold uppercase text-[#881313]">Hometown:</span> Boston, Massachusetts
              </div>
              <div>
                <span className="font-bold uppercase text-[#881313]">From:</span> Santa Claus, Workshop Hearth #1
              </div>
              <div className="sm:text-right flex items-center sm:justify-end gap-1 text-[#1c5b3c] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Officially Confirmed on Nice List</span>
              </div>
            </div>

            {/* Letter Body Text */}
            <div className="font-festive space-y-4 text-base sm:text-lg text-[#26170d] leading-relaxed">
              <p className="font-bold text-xl sm:text-2xl text-[#881313]">
                Dear Oliver,
              </p>
              
              <p>
                Ho, ho, ho! Warm greetings from the North Pole! Mrs. Claus and I were sitting beside our cozy workshop fireplace this evening, looking through the Great Book of Good Deeds, and your name was shining right at the very top.
              </p>
              
              <p>
                The elves in the toy workshop told me all about how hard you practiced on your soccer team this autumn, always encouraging your teammates and never giving up. I also saw the grand Lego space shuttle you spent so many patient hours building—what incredible imagination and focus!
              </p>
              
              <p>
                Most of all, Oliver, what touched my heart the deepest was hearing how gently you look after your little sister, Clara, and how faithfully you take care of Barnaby the puppy every morning. True kindness is the brightest Christmas magic there is, and you have it in abundance.
              </p>
              
              <p>
                Keep that wonderful heart full of wonder, remember to leave some crisp carrots for Rudolph on Christmas Eve, and know that you are very proudly on my Nice List!
              </p>
            </div>

            {/* Letter Footer & Santa Signature */}
            <div className="mt-10 pt-6 border-t border-[#b88c22]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="font-festive italic text-base text-[#5a4220]">
                  With warmest Christmas love,
                </p>
                <div className="font-script text-4xl sm:text-5xl text-[#881313] font-bold tracking-wide mt-2">
                  Santa Claus
                </div>
              </div>

              {/* Official Red Wax Seal Graphic */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9b1414] via-[#7d0f0f] to-[#550808] border-4 border-[#caa03b] flex flex-col items-center justify-center text-center text-[#fceec9] shadow-[0_6px_20px_rgba(125,15,15,0.45)] transform -rotate-3">
                  <Award className="w-7 h-7 text-[#fae092] mb-0.5" />
                  <span className="text-[9px] font-cinzel font-black tracking-wider leading-none uppercase">
                    North Pole
                  </span>
                  <span className="text-[8px] tracking-widest text-[#fae092] uppercase font-semibold">
                    Approved
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Watermark Label on Letter */}
          <div className="text-center mt-4">
            <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-[#881313]/80">
              ✦ Sample Santa&apos;s Magic Keepsake Stationery • 100% Unique to Every Child ✦
            </span>
          </div>

        </div>

        {/* Bottom CTA to personalize */}
        <div className="mt-12 text-center">
          <Link
            href="/personalize?product=letter"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm border border-gold-400/40 shadow-lg hover:shadow-[0_0_25px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>Customize a Letter for Your Child</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
