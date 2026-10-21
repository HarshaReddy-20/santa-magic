"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Gift, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Our Experiences", href: "/#experiences" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Sample Letter", href: "/#sample-letter" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-forest-950/95 backdrop-blur-md py-3 shadow-[0_4px_25px_rgba(0,0,0,0.5)] border-b border-gold-500/25"
          : "bg-gradient-to-b from-forest-950/90 via-forest-950/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#hero"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-600 via-crimson-700 to-crimson-900 border border-gold-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(205,40,40,0.4)] group-hover:shadow-[0_0_20px_rgba(230,184,63,0.5)] transition-all">
              <Sparkles className="w-5 h-5 text-gold-300 transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-parchment-50 group-hover:text-gold-200 transition-colors flex items-center gap-1.5">
                Santa&apos;s Magic
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-gold-400/90 -mt-1 font-sans">
                North Pole Keepsakes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-parchment-100 hover:text-gold-300 transition-colors rounded-md hover:bg-forest-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Prominent CTA button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/personalize"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-gold-100 font-medium text-sm border border-gold-400/40 shadow-[0_0_20px_rgba(170,27,27,0.45)] hover:shadow-[0_0_25px_rgba(230,184,63,0.5)] hover:border-gold-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Gift className="w-4 h-4 text-gold-300 transition-transform group-hover:rotate-12" />
              <span>Create Your Santa Message</span>
              <div className="absolute inset-0 rounded-full bg-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-forest-900/80 border border-gold-500/30 text-parchment-100 hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gold-500/30 bg-forest-950/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-parchment-100 hover:text-gold-300 hover:bg-forest-900/80 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gold-500/60" />
              </a>
            ))}
            <div className="pt-3">
              <Link
                href="/personalize"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-medium text-base border border-gold-400/50 shadow-[0_0_20px_rgba(170,27,27,0.5)]"
              >
                <Gift className="w-4 h-4 text-gold-300" />
                <span>Create Your Santa Message</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
