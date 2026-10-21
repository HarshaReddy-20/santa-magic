"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const faqList: FaqItem[] = [
  {
    question: "How do personalized Santa letters work?",
    answer:
      "Parents provide a few details about their child—such as their name, age, hometown, hobbies, and notable achievements from the year. Santa then drafts a customized, heartfelt letter on official North Pole stationery, complete with an authentic postmark, festive stamps, and a hand-signed wax seal finish. (Note: Online personalization and ordering workflows are actively being finalized and will be fully live in our next update!)",
  },
  {
    question: "How do Santa videos work?",
    answer:
      "Our personalized Santa videos feature a high-definition cinematic greeting from Santa Claus himself, filmed straight from his cozy North Pole workshop beside the decorated tree and fireplace. Santa addresses your child by name, discusses their accomplishments, and shares words of encouragement. Video previews and customization will be unlocked in our upcoming release.",
  },
  {
    question: "What information do parents need to provide?",
    answer:
      "You will only need to share basic details to help Santa personalize the message: your child's first name, age, hometown, 1–2 favorite hobbies or activities (such as soccer, music, or art), a milestone or proud achievement from the past year, and any special words of encouragement you'd like Santa to include.",
  },
  {
    question: "How will the finished product be delivered?",
    answer:
      "Digital letters and high-definition video files will be delivered directly to your email with a secure link to watch, download, and share with family. Physical keepsake letters will be packaged in festive North Pole postal envelopes with authentic seals and delivered directly to your mailbox ahead of Christmas Day.",
  },
  {
    question: "Can I customize messages for multiple children?",
    answer:
      "Yes! Each child receives their own unique, individually tailored letter or video greeting with distinct personal achievements and memories, ensuring every child feels individually recognized and cherished.",
  },
  {
    question: "When will online personalization and ordering launch?",
    answer:
      "Our North Pole workshop and web development elves are currently completing the final touches on our interactive customization studio. All features, customization previews, and checkout systems will be unveiled in our next official update.",
  },
];

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-forest-900/50 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/80 border border-gold-400/30 mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-gold-400" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-300">
              Got Questions?
            </span>
          </div>
          <h2 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-parchment-50 mb-5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 font-normal leading-relaxed text-balance">
            Everything you need to know about our Santa letters, video greetings, and upcoming holiday features.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-forest-950 border-gold-400/60 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                    : "bg-forest-950/70 border-gold-500/20 hover:border-gold-500/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-festive text-lg sm:text-xl font-bold text-parchment-50 leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-gold-400/20 text-gold-300"
                        : "bg-forest-900 text-parchment-200"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-parchment-200 leading-relaxed border-t border-gold-500/15">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reassurance Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-forest-950/80 border border-gold-500/20">
          <p className="text-sm text-parchment-200">
            Have another question not answered here? Our North Pole team is always happy to help.{" "}
            <a
              href="mailto:support@santasmagic.com"
              className="font-semibold text-gold-300 underline underline-offset-4 hover:text-gold-100"
            >
              support@santasmagic.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
