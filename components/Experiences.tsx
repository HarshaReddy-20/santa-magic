"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Video, Gift, Check, ArrowRight, Sparkles } from "lucide-react";

interface ExperienceItem {
  id: string;
  badge: string;
  isPopular?: boolean;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  ctaUrl: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "letter",
    badge: "Keepsake Tradition",
    icon: Mail,
    title: "Personalized Santa Letter",
    description:
      "A heartfelt letter from Santa, customized with your child's name, hobbies, and achievements.",
    image:
      "https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Official Santa letter on parchment paper with red wax seal and festive greenery",
    features: [
      "Customized with child's name, age, and hometown",
      "Celebrates personal hobbies & proud accomplishments",
      "Official North Pole postmark & embossed wax seal",
      "Printed on archival-quality textured keepsake stationery",
    ],
    ctaUrl: "/personalize?product=letter",
  },
  {
    id: "video",
    badge: "Cinematic Greeting",
    icon: Video,
    title: "Personalized Santa Video",
    description:
      "A magical video where Santa delivers a personalized Christmas message.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Santa Claus greeting from his warm workshop hearth next to the Christmas tree",
    features: [
      "High-definition video greeting filmed in Santa's workshop",
      "Santa addresses your child personally by their name",
      "Inspiring fireside encouragement and Christmas cheer",
      "Easily downloadable to share with loved ones and keep forever",
    ],
    ctaUrl: "/personalize?product=video",
  },
  {
    id: "bundle",
    badge: "Most Magical Experience",
    isPopular: true,
    icon: Gift,
    title: "Letter + Video Bundle",
    description:
      "A special combination of a personalized Santa letter and video.",
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Festive Christmas bundle package adorned with glowing lights and ribbon",
    features: [
      "Includes both the physical keepsake letter & video greeting",
      "Seamlessly coordinated storytelling across letter and video",
      "Official North Pole seal, postmark, and digital download",
      "The complete magical holiday surprise for Christmas morning",
    ],
    ctaUrl: "/personalize?product=bundle",
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="relative py-24 sm:py-32 bg-forest-900/60 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/80 border border-gold-400/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-300">
              Our Experiences
            </span>
          </div>
          <h2 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-parchment-50 mb-5 tracking-tight">
            Choose Your Magical Experience
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 font-normal leading-relaxed text-balance">
            Select the perfect Christmas wonder for your family. Each experience is crafted with heartfelt care and authentic North Pole detail.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className={`relative group rounded-3xl flex flex-col transition-all duration-300 ${
                  exp.isPopular
                    ? "bg-gradient-to-b from-forest-850 to-forest-900 border-2 border-gold-400 shadow-[0_0_40px_rgba(230,184,63,0.25)] lg:-translate-y-2"
                    : "bg-forest-950/80 border border-gold-500/25 hover:border-gold-400/60 shadow-xl hover:shadow-[0_0_30px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Popular / Feature Ribbon */}
                {exp.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-700 text-gold-100 text-xs font-bold tracking-wide uppercase shadow-lg border border-gold-300/40">
                      <Sparkles className="w-3.5 h-3.5 text-gold-200" />
                      {exp.badge}
                    </span>
                  </div>
                )}

                {/* Card Image Container */}
                <div className="relative h-60 w-full overflow-hidden rounded-t-[22px] bg-forest-900">
                  <Image
                    src={exp.image}
                    alt={exp.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                  
                  {/* Category icon tag */}
                  {!exp.isPopular && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-gold-500/30 text-xs font-semibold text-gold-300">
                        <Icon className="w-3.5 h-3.5" />
                        {exp.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-festive text-2xl font-bold text-parchment-50 mb-3 group-hover:text-gold-200 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-parchment-200 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8 pt-4 border-t border-gold-500/15">
                      {exp.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-parchment-100">
                          <div className="mt-0.5 rounded-full p-0.5 bg-forest-800 border border-gold-400/40 text-gold-300 shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personalize Button */}
                  <div className="pt-2">
                    <Link
                      href={exp.ctaUrl}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        exp.isPopular
                          ? "bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-gold-100 hover:shadow-[0_0_25px_rgba(230,184,63,0.5)] border border-gold-400/50 hover:scale-[1.02]"
                          : "bg-forest-850 hover:bg-forest-800 text-gold-200 hover:text-gold-100 border border-gold-500/35 hover:border-gold-400"
                      }`}
                    >
                      <span>Personalize Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
