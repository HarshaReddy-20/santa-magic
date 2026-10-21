"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  AlertCircle,
  Key,
  Stamp,
  CheckCircle2,
  Lock,
  Download,
  Printer,
  Loader2,
  FileCheck,
  FileText,
  Layers,
  FlaskConical,
} from "lucide-react";
import { usePersonalization } from "@/context/PersonalizationContext";
import SnowEffect from "@/components/SnowEffect";
import Footer from "@/components/Footer";
import SantaLetterSheet from "@/components/letter/SantaLetterSheet";
import { downloadSantaLetterPdf } from "@/lib/pdf-generator";
import {
  SAMPLE_STANDARD_LETTER,
  SAMPLE_MULTIPAGE_LETTER,
} from "@/lib/sample-letters";
import {
  GenerateLetterResponse,
  GeneratedSantaLetter,
} from "@/components/personalize/types";

export default function LetterPage() {
  const { formData, generatedLetter, setGeneratedLetter } = usePersonalization();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState<number>(0);

  // PDF generation and print state
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

  // Development-only sample preview state (strictly disabled in production)
  const isDevMode = process.env.NODE_ENV !== "production";
  const [devSampleType, setDevSampleType] = useState<"standard" | "multipage" | null>(null);

  const hasLetterProduct =
    formData.productId === "letter" || formData.productId === "bundle";
  const hasRequiredDetails =
    Boolean(formData.childName?.trim()) &&
    Boolean(formData.childAge?.trim()) &&
    Boolean(formData.favoriteHobby?.trim()) &&
    Boolean(formData.achievements?.trim()) &&
    Boolean(formData.giftWish?.trim());

  // Animated loading messages
  const loadingMessages = [
    `Opening the Great Book of Good Deeds for ${formData.childName || "your child"}...`,
    "Consulting the North Pole workshop elves...",
    `Reviewing ${formData.childName || "your child"}'s proud accomplishments...`,
    "Santa is dipping his golden quill in red ink...",
    "Applying the official North Pole postmark & wax seal...",
  ];

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isLoading, loadingMessages.length]);

  // Function to call AI generation API
  const handleGenerate = useCallback(async () => {
    if (!hasRequiredDetails || !hasLetterProduct) return;

    setIsLoading(true);
    setError(null);
    setErrorCode(null);
    setLoadingStepIndex(0);

    try {
      const response = await fetch("/api/generate-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: GenerateLetterResponse = await response.json();

      if (!response.ok || !data.success) {
        const errorMsg =
          !data.success
            ? data.error
            : "Failed to generate Santa's letter. Please try again.";
        const code = !data.success ? data.code : "PROVIDER_ERROR";
        setError(errorMsg || "Failed to generate Santa's letter. Please try again.");
        setErrorCode(code);
        return;
      }

      setGeneratedLetter(data.letter);
    } catch {
      setError(
        "Network error connecting to Santa's North Pole workshop. Please check your connection and try again."
      );
      setErrorCode("PROVIDER_ERROR");
    } finally {
      setIsLoading(false);
    }
  }, [formData, hasRequiredDetails, hasLetterProduct, setGeneratedLetter]);

  // Automatically start generation on first visit if details are present and no letter yet
  useEffect(() => {
    if (hasRequiredDetails && hasLetterProduct && !generatedLetter && !isLoading && !error) {
      handleGenerate();
    }
  }, [hasRequiredDetails, hasLetterProduct, generatedLetter, isLoading, error, handleGenerate]);

  // Handler for client-side PDF download
  const handleDownloadPdf = async (customLetter?: GeneratedSantaLetter, isSample = false) => {
    const letterToDownload =
      customLetter ||
      (devSampleType
        ? devSampleType === "multipage"
          ? SAMPLE_MULTIPAGE_LETTER
          : SAMPLE_STANDARD_LETTER
        : generatedLetter);

    if (!letterToDownload || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setPdfError(null);
    setPdfSuccessMessage(null);

    const childNameForPdf =
      isSample || devSampleType
        ? formData.childName?.trim()
          ? `${formData.childName}-sample`
          : "sample"
        : formData.childName;

    try {
      const result = await downloadSantaLetterPdf(letterToDownload, {
        childName: childNameForPdf,
        childAge: formData.childAge,
        dateStr: "Christmas Season 2026",
        stationeryTheme: formData.stationeryTheme,
      });

      if (result.success) {
        setPdfSuccessMessage(`Santa's letter successfully downloaded as "${result.fileName}"!`);
        setTimeout(() => setPdfSuccessMessage(null), 6000);
      } else {
        setPdfError(result.error || "Failed to download Santa's letter PDF. Please try again.");
      }
    } catch {
      setPdfError("An unexpected error occurred while generating your PDF download.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Handler for browser print option
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-parchment-50 flex flex-col selection:bg-crimson-800 selection:text-gold-100 relative print:bg-white print:text-black">
      {/* Ambient Snowfall (Hidden in print) */}
      <div className="print:hidden">
        <SnowEffect />
      </div>

      {/* Top Header (Hidden in print) */}
      <header className="sticky top-0 z-40 bg-forest-950/95 backdrop-blur-md border-b border-gold-500/25 py-4 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson-600 to-crimson-800 border border-gold-400/50 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-gold-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-parchment-50 group-hover:text-gold-200 transition-colors">
                Santa&apos;s Magic
              </span>
              <span className="text-[9px] tracking-widest uppercase font-medium text-gold-400/90 -mt-1 font-sans">
                Official Letter Studio
              </span>
            </div>
          </Link>

          <Link
            href="/personalize"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900/80 border border-gold-500/30 text-xs sm:text-sm font-medium text-parchment-200 hover:text-gold-200 hover:border-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Personalize</span>
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full relative print:p-0 print:m-0 print:max-w-none">
        
        {/* DEVELOPMENT-ONLY SAMPLE LETTER PREVIEW (Only active when sample is selected in dev mode) */}
        {isDevMode && devSampleType && (
          <div className="space-y-8 animate-in zoom-in-95 duration-400">
            {/* Top Dev Warning Announcement (Hidden in Print) */}
            <div className="p-5 rounded-2xl bg-amber-950/80 border-2 border-amber-500/60 text-center shadow-xl backdrop-blur-md print:hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase border border-amber-500/40 mb-2">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Development Test Preview</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-festive text-amber-100">
                Sample Letter for PDF & Print Testing ({devSampleType === "multipage" ? "Multi-Page Flow" : "Standard 1-Page"})
              </h2>
              <p className="text-xs sm:text-sm text-parchment-200 max-w-2xl mx-auto mt-1.5 leading-relaxed">
                This is a development-only sample fixture provided to test PDF generation and browser printing without requiring an OpenAI API key.
                <strong className="block text-amber-300 font-semibold mt-1">
                  ⚠️ This is NOT an AI-generated result or a real personalized letter.
                </strong>
              </p>

              {/* Dev Controls Bar */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-amber-500/25">
                <button
                  type="button"
                  onClick={() => setDevSampleType(devSampleType === "standard" ? "multipage" : "standard")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-500/40 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Switch to {devSampleType === "standard" ? "Multi-Page (2-Page Flow)" : "Standard (1-Page)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDevSampleType(null)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-850 text-parchment-300 border border-gold-500/30 text-xs font-medium transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Exit Sample Test Mode</span>
                </button>
              </div>
            </div>

            {/* Quick Actions Bar (Download PDF / Print Letter) */}
            <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                type="button"
                onClick={() =>
                  handleDownloadPdf(
                    devSampleType === "multipage"
                      ? SAMPLE_MULTIPAGE_LETTER
                      : SAMPLE_STANDARD_LETTER,
                    true
                  )
                }
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-bold text-sm sm:text-base border border-gold-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(230,184,63,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                title="Download sample letter as PDF"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-gold-300" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-gold-300" />
                    <span>Download Sample PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-850 text-gold-200 border border-gold-500/40 text-sm font-semibold transition-all hover:border-gold-300 shadow-md cursor-pointer"
                title="Print sample letter via browser print dialog"
              >
                <Printer className="w-4 h-4 text-gold-300" />
                <span>Print Sample Letter</span>
              </button>
            </div>

            {/* Notification Banners */}
            {pdfSuccessMessage && (
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-forest-900/90 border border-green-500/50 text-green-200 text-xs sm:text-sm text-center flex items-center justify-center gap-2 animate-in fade-in duration-300 print:hidden">
                <FileCheck className="w-4 h-4 text-green-300 shrink-0" />
                <span>{pdfSuccessMessage}</span>
              </div>
            )}

            {pdfError && (
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-crimson-950/90 border border-crimson-500/60 text-parchment-100 text-xs sm:text-sm text-center flex items-center justify-center gap-2 animate-in fade-in duration-300 print:hidden">
                <AlertCircle className="w-4 h-4 text-crimson-300 shrink-0" />
                <span>{pdfError}</span>
              </div>
            )}

            {/* Official Heirloom Stationery Card Component */}
            <SantaLetterSheet
              letter={
                devSampleType === "multipage"
                  ? SAMPLE_MULTIPAGE_LETTER
                  : SAMPLE_STANDARD_LETTER
              }
              formData={{
                ...formData,
                childName: formData.childName?.trim() || "Sample Child",
                childAge: formData.childAge?.trim() || "7 years old",
              }}
              dateStr="Christmas Season 2026"
              isSample={true}
            />

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
              <button
                type="button"
                onClick={() =>
                  handleDownloadPdf(
                    devSampleType === "multipage"
                      ? SAMPLE_MULTIPAGE_LETTER
                      : SAMPLE_STANDARD_LETTER,
                    true
                  )
                }
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-bold text-sm border border-gold-400/50 shadow-md hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105 disabled:opacity-60 cursor-pointer"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-gold-300" />
                    <span>Download Sample PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-850 hover:bg-forest-800 text-gold-200 border border-gold-500/40 text-sm font-semibold transition-colors hover:border-gold-300 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Sample Letter</span>
              </button>

              <button
                type="button"
                onClick={() => setDevSampleType(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-850 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Setup Guide</span>
              </button>
            </div>
          </div>
        )}

        {/* CASE 1: NO DETAILS ENTERED IN SESSION */}
        {(!devSampleType || !isDevMode) && (!hasRequiredDetails || !hasLetterProduct) && (
          <div className="text-center p-8 sm:p-12 rounded-3xl bg-forest-900/80 border border-gold-500/30 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-forest-950 border border-gold-400/40 flex items-center justify-center mb-6 text-gold-300">
              <Stamp className="w-8 h-8" />
            </div>

            <h1 className="font-festive text-2xl sm:text-4xl font-bold text-parchment-50 mb-4">
              {!hasLetterProduct
                ? "Product Does Not Include a Letter"
                : "Personalization Details Required"}
            </h1>

            <p className="text-sm sm:text-base text-parchment-200 max-w-lg mx-auto mb-6 leading-relaxed">
              {!hasLetterProduct
                ? "You selected a video-only experience. Santa's letters are included with the Personalized Santa Letter and the Letter + Video Bundle."
                : "To generate a genuine, heartfelt letter from Santa Claus, please enter your child's details in the personalization form. Santa weaves their actual name, age, hobbies, and accomplishments into the letter—we never substitute artificial placeholder names."}
            </p>

            <div className="p-4 rounded-xl bg-forest-950/80 border border-gold-500/20 max-w-md mx-auto mb-8 text-xs text-parchment-300 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>
                For child privacy, details are preserved within your private browser session and never stored permanently.
              </span>
            </div>

            <Link
              href="/personalize"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-base border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>Return to Personalization Form</span>
            </Link>

            {/* Dev Mode Testing Panel in Case 1 */}
            {isDevMode && (
              <div className="mt-10 pt-8 border-t border-gold-500/25 text-left">
                <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-4 h-4 text-amber-300" />
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Development Testing
                    </span>
                    <h3 className="font-cinzel text-xs sm:text-sm font-bold text-amber-200">
                      Test PDF & Print Feature
                    </h3>
                  </div>
                  <p className="text-xs text-parchment-200 mb-4 leading-relaxed">
                    Preview the North Pole stationery, download valid A4 PDFs, and inspect print layouts using sample letters:
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setDevSampleType("standard")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold-200 border border-gold-400/40 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-gold-300" />
                      <span>Test Standard Sample (1-Page)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDevSampleType("multipage")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-850 hover:bg-forest-800 text-gold-200 border border-gold-400/40 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-gold-300" />
                      <span>Test Multi-Page Flow (2-Page)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CASE 2: LOADING STATE */}
        {(!devSampleType || !isDevMode) && hasRequiredDetails && hasLetterProduct && isLoading && (
          <div className="text-center p-10 sm:p-16 rounded-3xl bg-forest-900/80 border border-gold-400/40 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-gold-400/20 border-t-gold-400 animate-spin" />
              <div className="w-16 h-16 rounded-full bg-crimson-800 border-2 border-gold-300 flex items-center justify-center shadow-[0_0_20px_rgba(230,184,63,0.5)]">
                <Sparkles className="w-8 h-8 text-gold-200 animate-pulse" />
              </div>
            </div>

            <h1 className="font-festive text-2xl sm:text-4xl font-bold text-parchment-50 mb-3 tracking-tight">
              Santa Is Preparing a Special Letter for {formData.childName}
            </h1>

            <p className="text-base text-gold-300 font-cinzel font-semibold mb-6 animate-pulse">
              {loadingMessages[loadingStepIndex]}
            </p>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-forest-950/70 border border-gold-500/20 text-xs text-parchment-300 leading-relaxed">
              Authentic North Pole crafting takes a few moments. Santa is weaving {formData.childName}&apos;s favorite hobby ({formData.favoriteHobby}) and proudest achievements into an inspiring message.
            </div>
          </div>
        )}

        {/* CASE 3: ERROR STATE (INCLUDING MISSING API KEY BANNER) */}
        {(!devSampleType || !isDevMode) && hasRequiredDetails && hasLetterProduct && !isLoading && error && (
          <div className="p-8 sm:p-10 rounded-3xl bg-forest-900/90 border-2 border-crimson-500/60 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
            
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-2xl bg-crimson-950 border border-crimson-400/50 flex items-center justify-center mb-6 text-crimson-300">
              {errorCode === "MISSING_API_KEY" ? <Key className="w-8 h-8 text-gold-300" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <h1 className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mb-3">
              {errorCode === "MISSING_API_KEY"
                ? "OpenAI API Key Setup Required"
                : "Unable to Generate Santa's Letter"}
            </h1>

            {/* Error Message */}
            <div className="p-4 rounded-xl bg-crimson-950/80 border border-crimson-500/40 text-sm text-parchment-100 mb-6 leading-relaxed">
              {error}
            </div>

            {/* Missing Key Setup Guide */}
            {errorCode === "MISSING_API_KEY" && (
              <div className="mb-8 p-5 rounded-2xl bg-forest-950/90 border border-gold-500/30 text-xs sm:text-sm text-parchment-200 leading-relaxed space-y-3">
                <strong className="text-gold-300 block font-semibold text-base">
                  How to configure OpenAI for letter generation:
                </strong>
                <ol className="list-decimal list-inside space-y-2 text-parchment-200">
                  <li>
                    Create a file named <code className="px-1.5 py-0.5 rounded bg-forest-850 text-gold-200 font-mono">.env.local</code> in your project root.
                  </li>
                  <li>
                    Add your OpenAI secret API key:
                    <pre className="mt-1 p-2.5 rounded bg-forest-950 border border-gold-500/20 font-mono text-gold-200 text-xs overflow-x-auto">
                      OPENAI_API_KEY=sk-your-actual-api-key-here
                    </pre>
                  </li>
                  <li>Restart your Next.js development server to apply the environment variable.</li>
                </ol>
                <p className="text-xs text-parchment-300 italic pt-1">
                  Note: Never commit your secret API key to version control or expose it in frontend code.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleGenerate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Generating Again</span>
              </button>

              <Link
                href="/personalize"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-850 hover:bg-forest-800 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Personalization Form</span>
              </Link>
            </div>

            {/* Dev Mode Testing Panel in Case 3 (Missing API Key) */}
            {isDevMode && (
              <div className="mt-8 pt-6 border-t border-gold-500/25 text-left">
                <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-4 h-4 text-amber-300" />
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Development Testing
                    </span>
                    <h3 className="font-cinzel text-xs sm:text-sm font-bold text-amber-200">
                      Test PDF & Print Without API Key
                    </h3>
                  </div>
                  <p className="text-xs text-parchment-200 mb-4 leading-relaxed">
                    Test North Pole stationery rendering, download valid A4 PDFs, and inspect print layouts using static sample letters while OpenAI is unconfigured:
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setDevSampleType("standard")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold-200 border border-gold-400/40 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-gold-300" />
                      <span>Test Standard Sample (1-Page)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDevSampleType("multipage")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-850 hover:bg-forest-800 text-gold-200 border border-gold-400/40 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-gold-300" />
                      <span>Test Multi-Page Flow (2-Page)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CASE 4: SUCCESSFUL GENERATED LETTER PREVIEW */}
        {(!devSampleType || !isDevMode) && hasRequiredDetails && hasLetterProduct && !isLoading && !error && generatedLetter && (
          <div className="space-y-8 animate-in zoom-in-95 duration-400">
            
            {/* Top Success Announcement (Hidden in Print) */}
            <div className="text-center print:hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-gold-400/40 mb-3 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-gold-300" />
                <span className="text-xs uppercase tracking-widest font-semibold text-gold-200">
                  Santa&apos;s Letter Is Ready!
                </span>
              </div>
              <h1 className="font-festive text-3xl sm:text-5xl font-bold text-parchment-50 tracking-tight">
                Personalized Letter for {formData.childName}
              </h1>
              <p className="text-sm sm:text-base text-parchment-200 max-w-xl mx-auto mt-2">
                Crafted straight from Santa&apos;s North Pole workshop, ready to preview, print, or download as an official heirloom PDF.
              </p>
            </div>

            {/* Quick Actions Bar (Hidden in Print) */}
            <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                type="button"
                onClick={() => handleDownloadPdf()}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-bold text-sm sm:text-base border border-gold-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(230,184,63,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                title="Download this letter as an official A4 PDF"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-gold-300" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-gold-300" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-850 text-gold-200 border border-gold-500/40 text-sm font-semibold transition-all hover:border-gold-300 shadow-md cursor-pointer"
                title="Print this letter using browser print"
              >
                <Printer className="w-4 h-4 text-gold-300" />
                <span>Print Letter</span>
              </button>
            </div>

            {/* PDF Notification Banners (Hidden in Print) */}
            {pdfSuccessMessage && (
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-forest-900/90 border border-green-500/50 text-green-200 text-xs sm:text-sm text-center flex items-center justify-center gap-2 animate-in fade-in duration-300 print:hidden">
                <FileCheck className="w-4 h-4 text-green-300 shrink-0" />
                <span>{pdfSuccessMessage}</span>
              </div>
            )}

            {pdfError && (
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-crimson-950/90 border border-crimson-500/60 text-parchment-100 text-xs sm:text-sm text-center flex items-center justify-center gap-2 animate-in fade-in duration-300 print:hidden">
                <AlertCircle className="w-4 h-4 text-crimson-300 shrink-0" />
                <span>{pdfError}</span>
              </div>
            )}

            {/* Official Heirloom Stationery Card Component */}
            <SantaLetterSheet
              letter={generatedLetter}
              formData={formData}
              dateStr="Christmas Season 2026"
            />

            {/* Bottom Secondary Actions (Hidden in Print) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
              <button
                type="button"
                onClick={() => handleDownloadPdf()}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-bold text-sm border border-gold-400/50 shadow-md hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105 disabled:opacity-60 cursor-pointer"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-gold-300" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-850 hover:bg-forest-800 text-gold-200 border border-gold-500/40 text-sm font-semibold transition-colors hover:border-gold-300 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Letter</span>
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-850 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Generate Again (Rewrite)</span>
              </button>

              <Link
                href="/personalize"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-850 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Personalization Review</span>
              </Link>
            </div>

          </div>
        )}

      </main>

      {/* Footer (Hidden in print) */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
