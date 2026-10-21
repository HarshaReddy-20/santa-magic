"use client";

import React from "react";
import {
  Stamp,
  Award,
  CheckCircle2,
  Sparkles,
  TreePine,
} from "lucide-react";
import {
  GeneratedSantaLetter,
  PersonalizationData,
} from "@/components/personalize/types";

interface SantaLetterSheetProps {
  letter: GeneratedSantaLetter;
  formData: PersonalizationData;
  dateStr?: string;
  isSample?: boolean;
}

export default function SantaLetterSheet({
  letter,
  formData,
  dateStr = "Christmas Season 2026",
  isSample = false,
}: SantaLetterSheetProps) {
  const childName = formData.childName?.trim() || "";
  const childAge = formData.childAge?.trim() || "";

  return (
    <article
      id="santa-letter-sheet"
      className="santa-letter-print-root relative mx-auto max-w-3xl rounded-3xl p-4 sm:p-10 bg-[#fdfaf2] text-[#2c1d11] shadow-[0_20px_70px_rgba(0,0,0,0.7)] border-4 border-[#cda02a] ring-2 ring-gold-300/40 print:border-2 print:border-[#881313] print:shadow-none print:rounded-none print:p-6 print:max-w-none print:w-full print:bg-white"
    >
      {/* Corner Filigree Ornaments (Hidden on print for cleaner ink) */}
      <div className="absolute top-3 left-3 text-gold-700 text-xl font-serif select-none opacity-80 print:hidden">❖</div>
      <div className="absolute top-3 right-3 text-gold-700 text-xl font-serif select-none opacity-80 print:hidden">❖</div>
      <div className="absolute bottom-3 left-3 text-gold-700 text-xl font-serif select-none opacity-80 print:hidden">❖</div>
      <div className="absolute bottom-3 right-3 text-gold-700 text-xl font-serif select-none opacity-80 print:hidden">❖</div>

      {/* Inner Decorative Border */}
      <div className="p-5 sm:p-10 border-2 border-dashed border-[#b88c22]/40 rounded-2xl relative print:border print:border-[#881313]/30 print:p-4 print:rounded-none">
        
        {/* Stationery Header / North Pole Letterhead */}
        <header className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#b88c22]/30 pb-6 mb-7 gap-4 text-center sm:text-left print:pb-4 print:mb-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#881313] text-[#fae092] flex items-center justify-center border-2 border-[#b88c22] shadow-inner shrink-0 print:border-black print:text-black">
              <Stamp className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#881313] uppercase print:text-[#600c0c]">
                North Pole Postal Service
              </h2>
              <p className="text-xs font-serif tracking-widest text-[#664b15] uppercase font-semibold">
                Department of Good Deeds • Arctic Circle 99705
              </p>
            </div>
          </div>

          {/* Official Air Mail Postmark */}
          <div className="border-2 border-dashed border-[#881313]/70 rounded-lg p-2.5 bg-[#f5ebd2] text-[#881313] text-center shrink-0 rotate-1 sm:rotate-2 shadow-sm print:rotate-0 print:bg-transparent print:border-solid">
            <div className="text-[10px] font-bold tracking-wider uppercase font-sans">
              Official Postmark
            </div>
            <div className="font-cinzel text-xs font-black tracking-widest text-[#881313]">
              AIR MAIL • APPROVED
            </div>
            <div className="text-[10px] text-[#664b15] font-serif">
              {dateStr} • Nice List
            </div>
          </div>
        </header>

        {/* Sample Watermark Banner inside card if sample mode */}
        {isSample && (
          <div className="mb-4 p-2.5 text-center rounded-lg bg-amber-500/15 border border-amber-600/40 text-amber-900 font-mono text-[11px] font-bold tracking-wider uppercase print:border print:text-black">
            ✦ Sample Test Letter — For PDF & Print Testing Only (Not Real Child Data) ✦
          </div>
        )}

        {/* Recipient Metadata Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif text-[#5a4220] mb-7 bg-[#f5edd9]/70 p-3.5 rounded-lg border border-[#e2c589] print:bg-transparent print:border-gray-300 print:mb-5">
          <div>
            <span className="font-bold uppercase text-[#881313]">Recipient:</span>{" "}
            <span className="font-semibold text-[#2c1d11]">
              {isSample
                ? childName
                  ? `${childName} (Sample Test)`
                  : "Sample Child (7 years old) [SAMPLE]"
                : childName
                ? `${childName}${childAge ? ` (${childAge})` : ""}`
                : "Honored Child"}
            </span>
          </div>
          <div className="sm:text-right">
            <span className="font-bold uppercase text-[#881313]">Theme:</span>{" "}
            <span className="capitalize font-medium text-[#2c1d11]">
              {formData.stationeryTheme || "North Pole Classic"}
            </span>
          </div>
          <div>
            <span className="font-bold uppercase text-[#881313]">Origin:</span>{" "}
            <span className="font-medium text-[#2c1d11]">
              {letter.location || "Santa's Workshop, North Pole"}
            </span>
          </div>
          <div className="sm:text-right flex items-center sm:justify-end gap-1.5 text-[#1c5b3c] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1c5b3c]" />
            <span>Nice List Verified</span>
          </div>
        </div>

        {/* Letter Body Content */}
        <div className="space-y-4 font-festive text-base sm:text-lg text-[#26170d] leading-relaxed print:text-sm print:leading-normal print:space-y-3">
          {/* Greeting */}
          <h3 className="font-bold text-xl sm:text-2xl text-[#881313] tracking-wide pt-1">
            {letter.greeting}
          </h3>

          {/* Paragraphs with preserved indentation and line breaks */}
          {letter.body.map((paragraph, idx) => (
            <p
              key={idx}
              className="indent-4 sm:indent-6 text-justify text-balance"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Closing and Signature Area */}
        <div className="mt-8 pt-6 border-t border-[#b88c22]/30 flex flex-col sm:flex-row items-center justify-between gap-6 print:mt-6 print:pt-4 print:page-break-inside-avoid">
          <div className="text-center sm:text-left">
            <p className="font-festive italic text-base text-[#5a4220] print:text-sm">
              {letter.closing}
            </p>
            <div className="font-script text-4xl sm:text-5xl text-[#881313] font-bold tracking-wide mt-2 select-none print:text-3xl">
              {letter.signature}
            </div>
            <p className="text-xs font-serif text-[#664b15] mt-1 print:text-[10px]">
              {letter.location}
            </p>
          </div>

          {/* Red Wax Seal Graphic */}
          <div className="relative group shrink-0 select-none">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9b1414] via-[#7d0f0f] to-[#550808] border-4 border-[#caa03b] flex flex-col items-center justify-center text-center text-[#fceec9] shadow-[0_6px_20px_rgba(125,15,15,0.45)] transform -rotate-3 print:border-2 print:border-[#881313] print:shadow-none print:w-20 print:h-20">
              <Award className="w-6 h-6 text-[#fae092] mb-0.5 print:w-5 print:h-5" />
              <span className="text-[9px] font-cinzel font-black tracking-wider leading-none uppercase text-[#fae092]">
                North Pole
              </span>
              <span className="text-[8px] tracking-widest text-[#fdf0be] uppercase font-semibold">
                Approved
              </span>
              <span className="text-[7px] text-[#fceec9]/80 font-sans mt-0.5">
                ★ 2026 ★
              </span>
            </div>
          </div>
        </div>

        {/* Small Tasteful Festive Footer Flourish */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-dashed border-[#b88c22]/20 text-[#881313]/60 text-xs font-serif print:hidden">
          <TreePine className="w-3.5 h-3.5 text-[#1c5b3c]" />
          <span>Crafted with love at Santa&apos;s Workshop, North Pole</span>
          <Sparkles className="w-3 h-3 text-[#cda02a]" />
        </div>

      </div>

      {/* Discreet Bottom Watermark (Excluded in print) */}
      <div className="text-center mt-3 print:hidden">
        <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-[#881313]/80">
          {isSample
            ? "✦ DEVELOPMENT SAMPLE PREVIEW • FOR PDF & PRINT TESTING (NOT AN AI-GENERATED LETTER) ✦"
            : "✦ Official Keepsake • Ready for High-Fidelity PDF & Print ✦"}
        </span>
      </div>
    </article>
  );
}
