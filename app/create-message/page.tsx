import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Clock, Gift, Mail, Video, CheckCircle2 } from "lucide-react";
import SnowEffect from "@/components/SnowEffect";

export const metadata = {
  title: "Personalization Coming Soon | Santa's Magic",
  description: "Our North Pole studio is preparing for the holiday season. Personalization will be available in a future update.",
};

export default function CreateMessagePlaceholderPage() {
  return (
    <div className="min-h-screen bg-forest-950 text-parchment-100 flex flex-col justify-between relative overflow-hidden">
      <SnowEffect />

      {/* Decorative ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson-800/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson-600 to-crimson-800 border border-gold-400/50 flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-gold-300" />
          </div>
          <span className="font-cinzel text-xl font-bold tracking-wide text-parchment-50 group-hover:text-gold-200 transition-colors">
            Santa&apos;s Magic
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-parchment-200 hover:text-gold-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-gold-400/40 shadow-[0_0_20px_rgba(230,184,63,0.2)] mb-6 animate-pulse-slow">
          <Clock className="w-4 h-4 text-gold-300" />
          <span className="text-xs uppercase tracking-widest font-semibold text-gold-200">
            North Pole Workshop Preparation
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-festive text-3xl sm:text-5xl md:text-6xl font-bold text-parchment-50 mb-6 leading-tight">
          Personalization Will Be Available in a Future Update
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-parchment-200 leading-relaxed max-w-2xl mb-10 text-balance font-normal">
          Our North Pole elves are currently putting the finishing touches on Santa&apos;s interactive letter customizer and video recording studio. We are getting everything ready to bring authentic holiday magic to your family.
        </p>

        {/* Feature Preview Card */}
        <div className="w-full rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md mb-10 text-left">
          <div className="flex items-center gap-2.5 mb-4 text-gold-300 font-festive text-lg font-bold">
            <Sparkles className="w-5 h-5 text-gold-400" />
            <span>What to expect in the upcoming release:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-parchment-200">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/70 border border-gold-500/20">
              <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-parchment-50 font-semibold mb-0.5">Letter Customizer</strong>
                <span>Easily input your child&apos;s name, achievements, and holiday wishes with instant stationery previews.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/70 border border-gold-500/20">
              <Video className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-parchment-50 font-semibold mb-0.5">Video Greetings</strong>
                <span>High-definition personalized video messages filmed directly from Santa&apos;s fireside.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/70 border border-gold-500/20">
              <Gift className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-parchment-50 font-semibold mb-0.5">Physical Keepsake Mail</strong>
                <span>Heirloom parchment envelopes with authentic North Pole stamps and real wax seals delivered to your door.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/70 border border-gold-500/20">
              <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-parchment-50 font-semibold mb-0.5">Secure Parent Portal</strong>
                <span>Direct access to download and review your greetings without any hassle.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gold-500/20 text-xs text-parchment-300 text-center">
            ✦ Task 1 Preview: Frontend presentation only. No forms, payment processing, or AI generation are active. ✦
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/personalize"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-gold-100 font-semibold text-base border border-gold-400/40 shadow-[0_0_25px_rgba(170,27,27,0.5)] hover:shadow-[0_0_30px_rgba(230,184,63,0.5)] hover:border-gold-300 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>Open Customer Personalization Form</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-forest-900 hover:bg-forest-850 text-parchment-200 hover:text-gold-100 font-medium text-base border border-gold-500/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-parchment-300">
        © 2026 Santa&apos;s Magic • Bringing North Pole wonder to families everywhere.
      </footer>
    </div>
  );
}
