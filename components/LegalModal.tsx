"use client";

import React from "react";
import { X, Shield, FileText, Info, Mail } from "lucide-react";

export type ModalType = "about" | "contact" | "privacy" | "terms" | null;

interface LegalModalProps {
  modalType: ModalType;
  onClose: () => void;
}

export default function LegalModal({ modalType, onClose }: LegalModalProps) {
  if (!modalType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-forest-900 border-2 border-gold-400/50 shadow-2xl p-6 sm:p-8 text-parchment-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-forest-950/80 text-parchment-200 hover:text-gold-200 border border-gold-500/30 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {modalType === "about" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-forest-800 border border-gold-400/40 text-gold-300">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50">
                About Santa&apos;s Magic
              </h3>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-parchment-200 leading-relaxed font-normal">
              <p>
                <strong>Santa&apos;s Magic</strong> was founded to keep the purity, innocence, and wonder of Christmas alive in the hearts of children and families worldwide.
              </p>
              <p>
                In a fast-paced world, we believe in taking the time to celebrate each child&apos;s personal journey: their kind deeds, their creative triumphs, and their heartfelt holiday dreams.
              </p>
              <p>
                Through authentic North Pole correspondence, heirloom-grade wax-sealed stationery, and cinematic holiday video greetings, our mission is to create cherished memories that families look back on with smiles for decades to come.
              </p>
            </div>
          </div>
        )}

        {modalType === "contact" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-crimson-800 border border-gold-400/40 text-gold-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50">
                Contact North Pole Support
              </h3>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-parchment-200 leading-relaxed font-normal">
              <p>
                Have questions about custom orders, delivery dates, or holiday scheduling? Our North Pole elven customer care team is here to assist you!
              </p>
              <div className="p-4 rounded-xl bg-forest-950/80 border border-gold-500/30 space-y-2">
                <div className="text-sm">
                  <strong className="text-gold-300">Email:</strong>{" "}
                  <a href="mailto:hello@santasmagic.com" className="text-parchment-100 hover:underline">
                    hello@santasmagic.com
                  </a>
                </div>
                <div className="text-sm">
                  <strong className="text-gold-300">North Pole Headquarters:</strong> 1 Reindeer Way, North Pole Workshop 99705
                </div>
                <div className="text-sm">
                  <strong className="text-gold-300">Response Hours:</strong> Monday – Friday, 8:00 AM – 8:00 PM EST (7 days a week in December)
                </div>
              </div>
            </div>
          </div>
        )}

        {modalType === "privacy" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-forest-800 border border-gold-400/40 text-gold-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50">
                Privacy Policy
              </h3>
            </div>
            <div className="space-y-4 text-sm text-parchment-200 leading-relaxed font-normal">
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                At Santa&apos;s Magic, protecting the privacy and safety of children and families is our top priority.
              </p>
              <h4 className="font-bold text-gold-200 text-base">Information We Collect</h4>
              <p>
                When personalization is live, we collect only the necessary details you provide (child&apos;s first name, age, general achievements, and delivery address) exclusively for the creation and delivery of your personalized Santa products.
              </p>
              <h4 className="font-bold text-gold-200 text-base">How Information Is Used</h4>
              <p>
                We never sell, rent, or monetize your family&apos;s information to third parties. Data is used strictly to fulfill your requested holiday greetings.
              </p>
              <h4 className="font-bold text-gold-200 text-base">Children&apos;s Privacy (COPPA Compliance)</h4>
              <p>
                Our service is directed at parents and adult guardians. We do not knowingly collect personal information directly from children under 13 without verifiable parental consent.
              </p>
            </div>
          </div>
        )}

        {modalType === "terms" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-forest-800 border border-gold-400/40 text-gold-300">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50">
                Terms and Conditions
              </h3>
            </div>
            <div className="space-y-4 text-sm text-parchment-200 leading-relaxed font-normal">
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                Welcome to Santa&apos;s Magic. By browsing and using this website, you agree to comply with and be bound by the following terms.
              </p>
              <h4 className="font-bold text-gold-200 text-base">Personalized Novelty Service</h4>
              <p>
                Santa&apos;s Magic provides personalized entertainment and keepsake holiday products created for festive family enjoyment.
              </p>
              <h4 className="font-bold text-gold-200 text-base">Order Fulfillment & Delivery</h4>
              <p>
                Physical letters will be dispatched with guaranteed pre-Christmas postage when ordered before our stated holiday cutoff dates. Digital products are delivered via email download link.
              </p>
              <h4 className="font-bold text-gold-200 text-base">Intellectual Property</h4>
              <p>
                All original artwork, designs, North Pole stationary branding, and video formats are copyright © 2026 Santa&apos;s Magic.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-gold-500/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-parchment-100 font-medium text-sm border border-gold-500/30 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
