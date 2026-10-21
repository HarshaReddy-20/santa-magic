"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import LegalModal, { ModalType } from "./LegalModal";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="relative bg-forest-950 border-t border-gold-500/25 pt-16 pb-12 overflow-hidden text-parchment-200">
        {/* Subtle decorative holiday lights glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-crimson-900/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Col 1 & 2: Logo and Brand Description */}
            <div className="lg:col-span-2">
              <Link href="/#hero" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson-600 to-crimson-800 border border-gold-400/50 flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-gold-300" />
                </div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-parchment-50 group-hover:text-gold-200 transition-colors">
                  Santa&apos;s Magic
                </span>
              </Link>
              <p className="text-sm text-parchment-300 leading-relaxed max-w-sm mb-6">
                Personalized letters and magical videos from Santa Claus, created especially for your little ones to spark wonder and build lifelong Christmas memories.
              </p>
              <div className="text-xs text-gold-400/80 font-medium">
                ❄️ Official North Pole Workshop Correspondence
              </div>
            </div>

            {/* Col 3: Experiences */}
            <div>
              <h4 className="font-festive text-base font-bold text-parchment-50 uppercase tracking-wider mb-4">
                Experiences
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="/#experiences" className="hover:text-gold-300 transition-colors">
                    Personalized Santa Letter
                  </a>
                </li>
                <li>
                  <a href="/#experiences" className="hover:text-gold-300 transition-colors">
                    Personalized Santa Video
                  </a>
                </li>
                <li>
                  <a href="/#experiences" className="hover:text-gold-300 transition-colors">
                    Letter + Video Bundle
                  </a>
                </li>
                <li>
                  <a href="/#sample-letter" className="hover:text-gold-300 transition-colors">
                    Sample Stationery Preview
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Navigation */}
            <div>
              <h4 className="font-festive text-base font-bold text-parchment-50 uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="/#hero" className="hover:text-gold-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#how-it-works" className="hover:text-gold-300 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/#why-choose-us" className="hover:text-gold-300 transition-colors">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="/#faq" className="hover:text-gold-300 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Company & Legal */}
            <div>
              <h4 className="font-festive text-base font-bold text-parchment-50 uppercase tracking-wider mb-4">
                Information
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("about")}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("contact")}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    Contact Support
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("privacy")}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("terms")}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    Terms and Conditions
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Festive Message */}
          <div className="pt-8 mt-8 border-t border-gold-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-parchment-300 text-center sm:text-left">
            <div>
              © 2026 Santa&apos;s Magic. All rights reserved. North Pole Keepsakes.
            </div>
            <div className="flex items-center gap-1.5 text-gold-300/80">
              <span>Made with North Pole love & festive magic</span>
              <Heart className="w-3.5 h-3.5 text-crimson-500 fill-crimson-500" />
            </div>
          </div>
        </div>
      </footer>

      {/* Render Legal / Info Modal */}
      <LegalModal modalType={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
