"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Video,
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Edit3,
  RotateCcw,
  TreePine,
  Flame,
  Wrench,
  ShieldCheck,
  Heart,
  Lock,
} from "lucide-react";
import { usePersonalization } from "@/context/PersonalizationContext";
import StepIndicator from "./StepIndicator";
import {
  ProductItem,
  PRODUCTS,
  PersonalizationData,
  AGE_OPTIONS,
  SCENE_OPTIONS,
  TONE_OPTIONS,
  STATIONERY_OPTIONS,
  GREETING_STYLE_OPTIONS,
} from "./types";

interface FormErrors {
  [key: string]: string;
}

export default function PersonalizationForm() {
  const searchParams = useSearchParams();
  const { formData, setFormData, resetForm: contextResetForm } = usePersonalization();

  // Current Step (1 - 6), or 7 for Success Screen
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Validation Errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Check for preselected product from searchParams on mount
  useEffect(() => {
    const rawParam = searchParams.get("product") || searchParams.get("experience");
    if (rawParam) {
      const productParam = rawParam.toLowerCase();
      if (
        productParam === "letter" ||
        productParam === "santa-letter" ||
        productParam === "personalized-santa-letter"
      ) {
        setFormData((prev) => ({ ...prev, productId: "letter" }));
      } else if (
        productParam === "video" ||
        productParam === "santa-video" ||
        productParam === "personalized-santa-video"
      ) {
        setFormData((prev) => ({ ...prev, productId: "video" }));
      } else if (
        productParam === "bundle" ||
        productParam === "letter-video" ||
        productParam === "package"
      ) {
        setFormData((prev) => ({ ...prev, productId: "bundle" }));
      } else if (
        productParam === "greeting" ||
        productParam === "quick-greeting"
      ) {
        setFormData((prev) => ({ ...prev, productId: "greeting" }));
      }
    }
  }, [searchParams, setFormData]);

  // Determine capabilities of selected product
  const selectedProduct = PRODUCTS.find((p) => p.id === formData.productId) || PRODUCTS[0];
  const hasVideo = selectedProduct.includesVideo;
  const hasLetter = selectedProduct.includesLetter;

  // Safe scrolling helper to prevent unhandled exceptions in environments where window.scrollTo is unsupported
  const safeScrollToTop = () => {
    if (typeof window !== "undefined") {
      try {
        if (typeof window.scrollTo === "function") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch {
        try {
          window.scrollTo(0, 0);
        } catch {
          // Ignore scroll errors when unsupported
        }
      }
    }
  };

  // Field change handlers
  const updateField = <K extends keyof PersonalizationData>(field: K, value: PersonalizationData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field once user starts modifying
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Step Validation Functions
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.productId || !PRODUCTS.some((p) => p.id === formData.productId)) {
        newErrors.productId = "Please select a product experience to continue.";
      }
    } else if (step === 2) {
      if (!formData.childName.trim()) {
        newErrors.childName = "Please enter your child's first name.";
      }
      if (!formData.childAge.trim()) {
        newErrors.childAge = "Please select your child's age.";
      }
    } else if (step === 3) {
      if (!formData.favoriteHobby.trim()) {
        newErrors.favoriteHobby = "Please share a favorite hobby or activity.";
      }
      if (!formData.achievements.trim()) {
        newErrors.achievements = "Please enter at least one achievement or proud moment from this year.";
      }
    } else if (step === 4) {
      if (!formData.giftWish.trim()) {
        newErrors.giftWish = "Please share what gift your child wishes for.";
      }
    } else if (step === 5) {
      if (hasVideo) {
        if (!formData.santaScene) {
          newErrors.santaScene = "Please choose a Santa video scene.";
        }
        if (!formData.messageTone) {
          newErrors.messageTone = "Please choose a message tone.";
        }
      }
      if (hasLetter) {
        if (!formData.stationeryTheme) {
          newErrors.stationeryTheme = "Please choose a stationery theme.";
        }
        if (!formData.letterGreetingStyle) {
          newErrors.letterGreetingStyle = "Please choose a letter greeting style.";
        }
      }
    } else if (step === 6) {
      if (!formData.guardianConfirmed) {
        newErrors.guardianConfirmed =
          "You must confirm that you are the parent or legal guardian authorized to submit these details.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      safeScrollToTop();
    } else {
      safeScrollToTop();
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
    safeScrollToTop();
  };

  const jumpToStep = (stepNumber: number) => {
    setErrors({});
    setCurrentStep(stepNumber);
    safeScrollToTop();
  };

  // Reset form
  const handleResetForm = () => {
    contextResetForm();
    setErrors({});
    setCurrentStep(1);
    safeScrollToTop();
  };

  // Final confirmation
  const handleConfirmSubmit = () => {
    const isValid = validateStep(6);
    if (isValid) {
      setErrors({});
      setCurrentStep(7); // Show success screen
      safeScrollToTop();
    } else {
      safeScrollToTop();
    }
  };

  // Render Product Icon Helper
  const renderProductIcon = (name: ProductItem["iconName"], className = "w-6 h-6") => {
    switch (name) {
      case "mail":
        return <Mail className={className} />;
      case "video":
        return <Video className={className} />;
      case "gift":
        return <Gift className={className} />;
      case "sparkles":
        return <Sparkles className={className} />;
    }
  };

  // Render Scene Icon
  const renderSceneIcon = (iconName: string) => {
    switch (iconName) {
      case "tree":
        return <TreePine className="w-5 h-5 text-emerald-400" />;
      case "fireplace":
        return <Flame className="w-5 h-5 text-amber-400" />;
      case "workshop":
        return <Wrench className="w-5 h-5 text-gold-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Top Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-gold-400/40 mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-gold-300" />
          <span className="text-xs uppercase tracking-widest font-semibold text-gold-200">
            Santa&apos;s Workshop Studio
          </span>
        </div>
        <h1 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-parchment-50 tracking-tight">
          Personalize Your Santa Experience
        </h1>
        <p className="text-sm sm:text-base text-parchment-200 max-w-2xl mx-auto mt-3 font-normal text-balance">
          Provide your little one&apos;s details so Santa can craft an authentic, heartwarming message straight from the North Pole.
        </p>
      </div>

      {/* Progress Indicator (Steps 1 to 6) */}
      {currentStep <= 6 && (
        <StepIndicator
          currentStep={currentStep}
          totalSteps={6}
          onStepClick={(step) => jumpToStep(step)}
        />
      )}

      {/* STEP 1: CHOOSE A PRODUCT */}
      {currentStep === 1 && (
        <section aria-labelledby="step-1-title" className="animate-in fade-in duration-300">
          <div className="rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 1 of 6</span>
              <h2 id="step-1-title" className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mt-1">
                Choose a Product
              </h2>
              <p className="text-sm text-parchment-200 mt-1">
                Select the Santa experience you would like to customize.
              </p>
            </div>

            {errors.productId && (
              <div className="mb-6 p-3.5 rounded-xl bg-crimson-950/80 border border-crimson-500/60 text-crimson-200 text-sm flex items-center gap-2" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0 text-crimson-400" />
                <span>{errors.productId}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" role="radiogroup" aria-label="Select Santa Product">
              {PRODUCTS.map((prod) => {
                const isSelected = formData.productId === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => updateField("productId", prod.id)}
                    className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                      isSelected
                        ? "bg-gradient-to-br from-forest-850 to-forest-900 border-gold-400 shadow-[0_0_25px_rgba(230,184,63,0.3)] scale-[1.01]"
                        : "bg-forest-950/70 border-gold-500/20 hover:border-gold-500/50 hover:bg-forest-900/60"
                    }`}
                  >
                    {/* Badge */}
                    {prod.badge && (
                      <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-crimson-900/80 text-gold-200 border border-gold-500/30">
                        {prod.badge}
                      </span>
                    )}

                    <div>
                      {/* Product Icon & Check indicator */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "bg-crimson-700 border-gold-300 text-gold-100 shadow-md"
                              : "bg-forest-900 border-gold-500/30 text-gold-300"
                          }`}
                        >
                          {renderProductIcon(prod.iconName)}
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-gold-300 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-gold-400" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-festive text-xl font-bold text-parchment-50 mb-2">
                        {prod.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-parchment-200 leading-relaxed mb-4">
                        {prod.description}
                      </p>
                    </div>

                    {/* Price coming soon label */}
                    <div className="pt-3 border-t border-gold-500/15 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gold-300/90">{prod.priceText}</span>
                      <span className="text-[11px] text-parchment-300">
                        {prod.includesLetter && prod.includesVideo
                          ? "Letter + Video"
                          : prod.includesLetter
                          ? "Printed Keepsake"
                          : "Digital Video"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Error banner above Continue button if validation failed */}
            {errors.productId && (
              <div
                className="mt-6 p-4 rounded-xl bg-crimson-950/90 border border-crimson-500/80 text-crimson-200 text-sm flex items-center gap-2.5 shadow-lg animate-in fade-in"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-crimson-400" />
                <span className="font-medium">{errors.productId}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-parchment-300 flex items-center gap-1.5">
                <span>Selected Experience:</span>
                <span className="font-semibold text-gold-300">
                  {selectedProduct?.title || "Personalized Santa Letter"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm sm:text-base border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
              >
                <span>Continue to Child&apos;s Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* STEP 2: CHILD'S DETAILS */}
      {currentStep === 2 && (
        <section aria-labelledby="step-2-title" className="animate-in fade-in duration-300">
          <div className="rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 2 of 6</span>
              <h2 id="step-2-title" className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mt-1">
                Child&apos;s Details
              </h2>
              <p className="text-sm text-parchment-200 mt-1">
                Tell Santa who this special message is for.
              </p>
            </div>

            <div className="space-y-6">
              {/* Child's First Name */}
              <div>
                <label htmlFor="childName" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Child&apos;s First Name <span className="text-crimson-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="childName"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.childName}
                  aria-describedby={errors.childName ? "childName-error" : undefined}
                  value={formData.childName}
                  onChange={(e) => updateField("childName", e.target.value)}
                  placeholder="e.g. Oliver, Emma, Noah, Sophia"
                  className={`w-full px-4 py-3 rounded-xl bg-forest-950/90 border text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                    errors.childName ? "border-crimson-500" : "border-gold-500/30 focus:border-gold-400"
                  }`}
                />
                {errors.childName && (
                  <p id="childName-error" className="mt-1.5 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.childName}</span>
                  </p>
                )}
              </div>

              {/* Child's Age */}
              <div>
                <label htmlFor="childAge" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Child&apos;s Age <span className="text-crimson-400" aria-hidden="true">*</span>
                </label>
                <select
                  id="childAge"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.childAge}
                  aria-describedby={errors.childAge ? "childAge-error" : undefined}
                  value={formData.childAge}
                  onChange={(e) => updateField("childAge", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-forest-950/90 border text-parchment-50 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                    errors.childAge ? "border-crimson-500" : "border-gold-500/30 focus:border-gold-400"
                  }`}
                >
                  <option value="" disabled className="bg-forest-950 text-parchment-300">
                    -- Select Age --
                  </option>
                  {AGE_OPTIONS.map((age) => (
                    <option key={age} value={age} className="bg-forest-950 text-parchment-100">
                      {age}
                    </option>
                  ))}
                </select>
                {errors.childAge && (
                  <p id="childAge-error" className="mt-1.5 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.childAge}</span>
                  </p>
                )}
              </div>

              {/* Pronunciation Guide (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="pronunciationGuide" className="block text-sm font-semibold text-parchment-100">
                    Name Pronunciation Guide <span className="text-xs font-normal text-parchment-300">(Optional)</span>
                  </label>
                  <span className="text-[11px] text-gold-400">Helps Santa say their name perfectly</span>
                </div>
                <input
                  id="pronunciationGuide"
                  type="text"
                  value={formData.pronunciationGuide}
                  onChange={(e) => updateField("pronunciationGuide", e.target.value)}
                  placeholder="e.g. uh-LIV-er (Oliver), eye-la (Isla), or SEAN (Sean)"
                  className="w-full px-4 py-3 rounded-xl bg-forest-950/90 border border-gold-500/30 text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-850 hover:bg-forest-800 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm sm:text-base border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
              >
                <span>Continue to Hobbies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* STEP 3: HOBBIES AND ACHIEVEMENTS */}
      {currentStep === 3 && (
        <section aria-labelledby="step-3-title" className="animate-in fade-in duration-300">
          <div className="rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 3 of 6</span>
              <h2 id="step-3-title" className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mt-1">
                Hobbies and Achievements
              </h2>
              <p className="text-sm text-parchment-200 mt-1">
                Santa loves praising children for their hard work, passions, and good deeds.
              </p>
            </div>

            <div className="space-y-6">
              {/* Favourite hobby or activity */}
              <div>
                <label htmlFor="favoriteHobby" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Favourite Hobby or Activity <span className="text-crimson-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="favoriteHobby"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.favoriteHobby}
                  aria-describedby={errors.favoriteHobby ? "favoriteHobby-error" : undefined}
                  value={formData.favoriteHobby}
                  onChange={(e) => updateField("favoriteHobby", e.target.value)}
                  placeholder="e.g. Building LEGO space stations, drawing comic books, ballet, riding a bicycle"
                  className={`w-full px-4 py-3 rounded-xl bg-forest-950/90 border text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                    errors.favoriteHobby ? "border-crimson-500" : "border-gold-500/30 focus:border-gold-400"
                  }`}
                />
                {errors.favoriteHobby && (
                  <p id="favoriteHobby-error" className="mt-1.5 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.favoriteHobby}</span>
                  </p>
                )}
              </div>

              {/* Favourite sport, animal, or character (Optional) */}
              <div>
                <label htmlFor="favoriteInterest" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Favourite Sport, Animal, or Character <span className="text-xs font-normal text-parchment-300">(Optional)</span>
                </label>
                <input
                  id="favoriteInterest"
                  type="text"
                  value={formData.favoriteInterest}
                  onChange={(e) => updateField("favoriteInterest", e.target.value)}
                  placeholder="e.g. Playing soccer, golden retriever dogs, dinosaurs, astronauts"
                  className="w-full px-4 py-3 rounded-xl bg-forest-950/90 border border-gold-500/30 text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                />
              </div>

              {/* Achievements from the past year */}
              <div>
                <label htmlFor="achievements" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Achievements from the Past Year <span className="text-crimson-400" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="achievements"
                  rows={3}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.achievements}
                  aria-describedby={errors.achievements ? "achievements-error" : undefined}
                  value={formData.achievements}
                  onChange={(e) => updateField("achievements", e.target.value)}
                  placeholder="e.g. Learned to ride a two-wheel bicycle, did great in reading class at school, stayed brave at the doctor"
                  className={`w-full px-4 py-3 rounded-xl bg-forest-950/90 border text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                    errors.achievements ? "border-crimson-500" : "border-gold-500/30 focus:border-gold-400"
                  }`}
                />
                {errors.achievements && (
                  <p id="achievements-error" className="mt-1.5 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.achievements}</span>
                  </p>
                )}
              </div>

              {/* Something new the child learned (Optional) */}
              <div>
                <label htmlFor="learnedSkill" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Something New the Child Learned <span className="text-xs font-normal text-parchment-300">(Optional)</span>
                </label>
                <input
                  id="learnedSkill"
                  type="text"
                  value={formData.learnedSkill}
                  onChange={(e) => updateField("learnedSkill", e.target.value)}
                  placeholder="e.g. Tying shoelaces, swimming across the deep end, counting to 100, playing piano"
                  className="w-full px-4 py-3 rounded-xl bg-forest-950/90 border border-gold-500/30 text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                />
              </div>

              {/* A kind or helpful thing the child did (Optional) */}
              <div>
                <label htmlFor="kindAction" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  A Kind or Helpful Thing the Child Did <span className="text-xs font-normal text-parchment-300">(Optional)</span>
                </label>
                <input
                  id="kindAction"
                  type="text"
                  value={formData.kindAction}
                  onChange={(e) => updateField("kindAction", e.target.value)}
                  placeholder="e.g. Looked after little sister Clara, shared toys at the playground, helped feed the puppy"
                  className="w-full px-4 py-3 rounded-xl bg-forest-950/90 border border-gold-500/30 text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-850 hover:bg-forest-800 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm sm:text-base border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
              >
                <span>Continue to Wishes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* STEP 4: CHRISTMAS WISHES */}
      {currentStep === 4 && (
        <section aria-labelledby="step-4-title" className="animate-in fade-in duration-300">
          <div className="rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 4 of 6</span>
              <h2 id="step-4-title" className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mt-1">
                Christmas Wishes
              </h2>
              <p className="text-sm text-parchment-200 mt-1">
                Share what your child is hoping for this Christmas, along with any parental notes.
              </p>
            </div>

            <div className="space-y-6">
              {/* What gift does the child wish for? */}
              <div>
                <label htmlFor="giftWish" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  What Gift Does the Child Wish For? <span className="text-crimson-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="giftWish"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.giftWish}
                  aria-describedby={errors.giftWish ? "giftWish-error" : "giftWish-disclaimer"}
                  value={formData.giftWish}
                  onChange={(e) => updateField("giftWish", e.target.value)}
                  placeholder="e.g. A red scooter, chemistry set, art kit, space telescope"
                  className={`w-full px-4 py-3 rounded-xl bg-forest-950/90 border text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                    errors.giftWish ? "border-crimson-500" : "border-gold-500/30 focus:border-gold-400"
                  }`}
                />
                {errors.giftWish && (
                  <p id="giftWish-error" className="mt-1.5 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.giftWish}</span>
                  </p>
                )}
                {/* Gift Promise Disclaimer */}
                <div id="giftWish-disclaimer" className="mt-2.5 p-3 rounded-xl bg-forest-950/80 border border-gold-500/20 text-xs text-parchment-300 flex items-start gap-2">
                  <Heart className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Santa&apos;s Promise Note:</strong> Santa acknowledges every child&apos;s wish and praises their imagination, while keeping Christmas morning full of joyful surprise and gratitude. We do not make promises that a specific gift will be delivered.
                  </span>
                </div>
              </div>

              {/* Special message from the parent (Optional) */}
              <div>
                <label htmlFor="parentMessage" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Special Message from the Parent <span className="text-xs font-normal text-parchment-300">(Optional)</span>
                </label>
                <textarea
                  id="parentMessage"
                  rows={3}
                  value={formData.parentMessage}
                  onChange={(e) => updateField("parentMessage", e.target.value)}
                  placeholder="e.g. Remind them how proud we are of how brave they were when starting their new school this year."
                  className="w-full px-4 py-3 rounded-xl bg-forest-950/90 border border-gold-500/30 text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                />
              </div>

              {/* Anything Santa should avoid mentioning? (Optional) */}
              <div>
                <label htmlFor="avoidMentioning" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Anything Santa Should Avoid Mentioning? <span className="text-xs font-normal text-parchment-300">(Optional)</span>
                </label>
                <input
                  id="avoidMentioning"
                  type="text"
                  value={formData.avoidMentioning}
                  onChange={(e) => updateField("avoidMentioning", e.target.value)}
                  placeholder="e.g. Please do not mention getting a pet puppy or visiting Disneyland."
                  className="w-full px-4 py-3 rounded-xl bg-forest-950/90 border border-gold-500/30 text-parchment-50 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-850 hover:bg-forest-800 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm sm:text-base border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
              >
                <span>Continue to Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* STEP 5: PERSONALIZATION PREFERENCES */}
      {currentStep === 5 && (
        <section aria-labelledby="step-5-title" className="animate-in fade-in duration-300">
          <div className="rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 5 of 6</span>
              <h2 id="step-5-title" className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mt-1">
                Personalization Preferences
              </h2>
              <p className="text-sm text-parchment-200 mt-1">
                Tailor the backdrop and style for {selectedProduct.title}.
              </p>
            </div>

            <div className="space-y-8">
              
              {/* VIDEO-SPECIFIC OPTIONS (Only if product has video) */}
              {hasVideo && (
                <div className="p-6 rounded-2xl bg-forest-950/80 border border-gold-500/30 space-y-6">
                  <div className="flex items-center gap-2 text-gold-300 font-festive text-lg font-bold border-b border-gold-500/20 pb-3">
                    <Video className="w-5 h-5 text-gold-400" />
                    <span>Santa Video Options</span>
                  </div>

                  {/* Santa Scene */}
                  <div>
                    <label className="block text-sm font-semibold text-parchment-100 mb-3">
                      Choose Santa&apos;s Scene <span className="text-crimson-400" aria-hidden="true">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Santa Video Scene">
                      {SCENE_OPTIONS.map((scene) => {
                        const isSelected = formData.santaScene === scene.id;
                        return (
                          <button
                            key={scene.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => updateField("santaScene", scene.id)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? "bg-forest-850 border-gold-400 shadow-md ring-1 ring-gold-400"
                                : "bg-forest-900/60 border-gold-500/20 hover:border-gold-500/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {renderSceneIcon(scene.icon)}
                              <span className="font-festive font-bold text-sm text-parchment-50">
                                {scene.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-parchment-300 leading-tight">
                              {scene.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.santaScene && (
                      <p className="mt-2 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.santaScene}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Tone */}
                  <div>
                    <label className="block text-sm font-semibold text-parchment-100 mb-3">
                      Choose Message Tone <span className="text-crimson-400" aria-hidden="true">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Message Tone">
                      {TONE_OPTIONS.map((tone) => {
                        const isSelected = formData.messageTone === tone.id;
                        return (
                          <button
                            key={tone.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => updateField("messageTone", tone.id)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? "bg-forest-850 border-gold-400 shadow-md ring-1 ring-gold-400"
                                : "bg-forest-900/60 border-gold-500/20 hover:border-gold-500/50"
                            }`}
                          >
                            <div className="font-festive font-bold text-sm text-parchment-50 mb-1.5 flex items-center justify-between">
                              <span>{tone.title}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                            </div>
                            <p className="text-[11px] text-parchment-300 leading-tight">
                              {tone.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.messageTone && (
                      <p className="mt-2 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.messageTone}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* LETTER-SPECIFIC OPTIONS (Only if product has letter) */}
              {hasLetter && (
                <div className="p-6 rounded-2xl bg-forest-950/80 border border-gold-500/30 space-y-6">
                  <div className="flex items-center gap-2 text-gold-300 font-festive text-lg font-bold border-b border-gold-500/20 pb-3">
                    <Mail className="w-5 h-5 text-gold-400" />
                    <span>Santa Letter Stationery Options</span>
                  </div>

                  {/* Stationery Theme */}
                  <div>
                    <label className="block text-sm font-semibold text-parchment-100 mb-3">
                      Choose Stationery Theme <span className="text-crimson-400" aria-hidden="true">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Stationery Theme">
                      {STATIONERY_OPTIONS.map((stat) => {
                        const isSelected = formData.stationeryTheme === stat.id;
                        return (
                          <button
                            key={stat.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => updateField("stationeryTheme", stat.id)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? "bg-forest-850 border-gold-400 shadow-md ring-1 ring-gold-400"
                                : "bg-forest-900/60 border-gold-500/20 hover:border-gold-500/50"
                            }`}
                          >
                            <span className="font-festive font-bold text-sm text-parchment-50 mb-1.5 flex items-center justify-between">
                              <span>{stat.title}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                            </span>
                            <p className="text-[11px] text-parchment-300 leading-tight">
                              {stat.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.stationeryTheme && (
                      <p className="mt-2 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.stationeryTheme}</span>
                      </p>
                    )}
                  </div>

                  {/* Greeting Style */}
                  <div>
                    <label className="block text-sm font-semibold text-parchment-100 mb-3">
                      Choose Letter Opening Style <span className="text-crimson-400" aria-hidden="true">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Letter Opening Style">
                      {GREETING_STYLE_OPTIONS.map((greet) => {
                        const isSelected = formData.letterGreetingStyle === greet.id;
                        return (
                          <button
                            key={greet.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => updateField("letterGreetingStyle", greet.id)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? "bg-forest-850 border-gold-400 shadow-md ring-1 ring-gold-400"
                                : "bg-forest-900/60 border-gold-500/20 hover:border-gold-500/50"
                            }`}
                          >
                            <span className="font-festive font-bold text-sm text-parchment-50 mb-1.5 flex items-center justify-between">
                              <span>{greet.title}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                            </span>
                            <p className="text-[11px] text-parchment-300 leading-tight italic">
                              {greet.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.letterGreetingStyle && (
                      <p className="mt-2 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.letterGreetingStyle}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Language Selection */}
              <div>
                <label htmlFor="language" className="block text-sm font-semibold text-parchment-100 mb-1.5">
                  Language
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="language"
                    disabled
                    value={formData.language}
                    className="px-4 py-3 rounded-xl bg-forest-950/60 border border-gold-500/30 text-parchment-200 cursor-not-allowed max-w-xs"
                  >
                    <option value="en">English (North Pole English)</option>
                  </select>
                  <span className="text-xs text-gold-400/80">
                    Additional languages coming in future updates.
                  </span>
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-850 hover:bg-forest-800 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-gold-100 font-semibold text-sm sm:text-base border border-gold-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(230,184,63,0.4)] transition-all hover:scale-105"
              >
                <span>Review All Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* STEP 6: REVIEW */}
      {currentStep === 6 && (
        <section aria-labelledby="step-6-title" className="animate-in fade-in duration-300">
          <div className="rounded-3xl bg-forest-900/80 border border-gold-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 6 of 6</span>
              <h2 id="step-6-title" className="font-festive text-2xl sm:text-3xl font-bold text-parchment-50 mt-1">
                Review Your Details
              </h2>
              <p className="text-sm text-parchment-200 mt-1">
                Please double-check all information before confirming. You can edit any section below.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Section 1: Selected Product */}
              <div className="p-5 rounded-2xl bg-forest-950/80 border border-gold-500/30">
                <div className="flex items-center justify-between mb-3 border-b border-gold-500/15 pb-2.5">
                  <div className="flex items-center gap-2 text-gold-300 font-festive font-bold text-base">
                    {renderProductIcon(selectedProduct.iconName, "w-4 h-4")}
                    <span>Selected Experience</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStep(1)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-100 bg-forest-900 px-3 py-1.5 rounded-lg border border-gold-500/30 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-parchment-50 text-base">{selectedProduct.title}</div>
                  <div className="text-xs text-parchment-300 mt-0.5">{selectedProduct.description}</div>
                  <div className="text-xs text-gold-400 mt-2 font-semibold">{selectedProduct.priceText}</div>
                </div>
              </div>

              {/* Section 2: Child's Details */}
              <div className="p-5 rounded-2xl bg-forest-950/80 border border-gold-500/30">
                <div className="flex items-center justify-between mb-3 border-b border-gold-500/15 pb-2.5">
                  <div className="flex items-center gap-2 text-gold-300 font-festive font-bold text-base">
                    <Sparkles className="w-4 h-4" />
                    <span>Child&apos;s Details</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStep(2)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-100 bg-forest-900 px-3 py-1.5 rounded-lg border border-gold-500/30 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-gold-400 font-semibold">First Name:</dt>
                    <dd className="text-parchment-50 font-bold text-base">{formData.childName || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gold-400 font-semibold">Age:</dt>
                    <dd className="text-parchment-100">{formData.childAge || "—"}</dd>
                  </div>
                  {formData.pronunciationGuide && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-gold-400 font-semibold">Pronunciation Guide:</dt>
                      <dd className="text-parchment-200 text-xs italic">{formData.pronunciationGuide}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Section 3: Hobbies & Achievements */}
              <div className="p-5 rounded-2xl bg-forest-950/80 border border-gold-500/30">
                <div className="flex items-center justify-between mb-3 border-b border-gold-500/15 pb-2.5">
                  <div className="flex items-center gap-2 text-gold-300 font-festive font-bold text-base">
                    <Heart className="w-4 h-4" />
                    <span>Hobbies & Achievements</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStep(3)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-100 bg-forest-900 px-3 py-1.5 rounded-lg border border-gold-500/30 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-gold-400 font-semibold">Favorite Hobby / Activity:</dt>
                    <dd className="text-parchment-100">{formData.favoriteHobby || "—"}</dd>
                  </div>
                  {formData.favoriteInterest && (
                    <div>
                      <dt className="text-xs text-gold-400 font-semibold">Favorite Sport / Animal / Character:</dt>
                      <dd className="text-parchment-200">{formData.favoriteInterest}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-gold-400 font-semibold">Achievements from Past Year:</dt>
                    <dd className="text-parchment-100">{formData.achievements || "—"}</dd>
                  </div>
                  {formData.learnedSkill && (
                    <div>
                      <dt className="text-xs text-gold-400 font-semibold">Something New Learned:</dt>
                      <dd className="text-parchment-200">{formData.learnedSkill}</dd>
                    </div>
                  )}
                  {formData.kindAction && (
                    <div>
                      <dt className="text-xs text-gold-400 font-semibold">Kind or Helpful Deed:</dt>
                      <dd className="text-parchment-200">{formData.kindAction}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Section 4: Christmas Wishes */}
              <div className="p-5 rounded-2xl bg-forest-950/80 border border-gold-500/30">
                <div className="flex items-center justify-between mb-3 border-b border-gold-500/15 pb-2.5">
                  <div className="flex items-center gap-2 text-gold-300 font-festive font-bold text-base">
                    <Gift className="w-4 h-4" />
                    <span>Christmas Wishes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStep(4)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-100 bg-forest-900 px-3 py-1.5 rounded-lg border border-gold-500/30 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-gold-400 font-semibold">Gift Wish:</dt>
                    <dd className="text-parchment-100 font-medium">{formData.giftWish || "—"}</dd>
                  </div>
                  {formData.parentMessage && (
                    <div>
                      <dt className="text-xs text-gold-400 font-semibold">Special Parent Message:</dt>
                      <dd className="text-parchment-200 italic">{formData.parentMessage}</dd>
                    </div>
                  )}
                  {formData.avoidMentioning && (
                    <div>
                      <dt className="text-xs text-gold-400 font-semibold">Topics to Avoid:</dt>
                      <dd className="text-parchment-200">{formData.avoidMentioning}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Section 5: Personalization Preferences */}
              <div className="p-5 rounded-2xl bg-forest-950/80 border border-gold-500/30">
                <div className="flex items-center justify-between mb-3 border-b border-gold-500/15 pb-2.5">
                  <div className="flex items-center gap-2 text-gold-300 font-festive font-bold text-base">
                    <Wrench className="w-4 h-4" />
                    <span>Personalization Preferences</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStep(5)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-100 bg-forest-900 px-3 py-1.5 rounded-lg border border-gold-500/30 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {hasVideo && (
                    <>
                      <div>
                        <dt className="text-xs text-gold-400 font-semibold">Santa Video Scene:</dt>
                        <dd className="text-parchment-100 capitalize">
                          {SCENE_OPTIONS.find((s) => s.id === formData.santaScene)?.title}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gold-400 font-semibold">Message Tone:</dt>
                        <dd className="text-parchment-100 capitalize">
                          {TONE_OPTIONS.find((t) => t.id === formData.messageTone)?.title}
                        </dd>
                      </div>
                    </>
                  )}
                  {hasLetter && (
                    <>
                      <div>
                        <dt className="text-xs text-gold-400 font-semibold">Stationery Theme:</dt>
                        <dd className="text-parchment-100 capitalize">
                          {STATIONERY_OPTIONS.find((s) => s.id === formData.stationeryTheme)?.title}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gold-400 font-semibold">Greeting Style:</dt>
                        <dd className="text-parchment-100 capitalize">
                          {GREETING_STYLE_OPTIONS.find((g) => g.id === formData.letterGreetingStyle)?.title}
                        </dd>
                      </div>
                    </>
                  )}
                  <div>
                    <dt className="text-xs text-gold-400 font-semibold">Language:</dt>
                    <dd className="text-parchment-200">English</dd>
                  </div>
                </dl>
              </div>

              {/* Parent/Guardian Required Confirmation Checkbox */}
              <div className="p-5 rounded-2xl bg-forest-950 border border-gold-500/40">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    aria-required="true"
                    checked={formData.guardianConfirmed}
                    onChange={(e) => updateField("guardianConfirmed", e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gold-400 text-crimson-600 focus:ring-gold-400 bg-forest-900 cursor-pointer shrink-0"
                  />
                  <div className="text-xs sm:text-sm text-parchment-200 leading-relaxed">
                    <strong className="text-parchment-50 font-semibold block mb-0.5">
                      Parent / Guardian Authorization Confirmation <span className="text-crimson-400">*</span>
                    </strong>
                    I confirm that I am the parent or legal guardian of the child, authorized to submit this information for Santa&apos;s Magic, and I have read and agree to the privacy notice.
                  </div>
                </label>
                {errors.guardianConfirmed && (
                  <p className="mt-2 text-xs text-crimson-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.guardianConfirmed}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => jumpToStep(5)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-forest-850 hover:bg-forest-800 text-parchment-200 border border-gold-500/30 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Edit</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-gold-100 font-bold text-base border border-gold-400/50 shadow-[0_0_25px_rgba(170,27,27,0.5)] hover:shadow-[0_0_30px_rgba(230,184,63,0.5)] hover:border-gold-300 transition-all hover:scale-105"
              >
                <CheckCircle2 className="w-5 h-5 text-gold-300" />
                <span>Confirm Details</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* STEP 7: CONFIRMATION SUCCESS SCREEN */}
      {currentStep === 7 && (
        <section aria-labelledby="success-title" className="animate-in zoom-in-95 duration-400">
          <div className="rounded-3xl bg-forest-900/90 border-2 border-gold-400/60 p-8 sm:p-12 shadow-[0_0_50px_rgba(230,184,63,0.25)] text-center backdrop-blur-xl">
            
            {/* Celebration Icon */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-crimson-600 to-crimson-800 border-2 border-gold-300 flex items-center justify-center shadow-[0_0_30px_rgba(230,184,63,0.5)] mb-6 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-gold-200 stroke-[2.5]" />
            </div>

            {/* Headline */}
            <h2 id="success-title" className="font-festive text-3xl sm:text-5xl font-bold text-parchment-50 mb-3 tracking-tight">
              Your Santa details are ready!
            </h2>

            <p className="text-base sm:text-lg text-gold-300 font-cinzel font-semibold mb-6">
              North Pole Workshop Record: {formData.childName}&apos;s Holiday Profile
            </p>

            {/* Explanation box */}
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-forest-950/80 border border-gold-500/30 text-left text-sm text-parchment-200 leading-relaxed mb-8 space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-parchment-50 font-semibold block mb-0.5">
                    Details Successfully Collected
                  </strong>
                  All personalization preferences for {formData.childName} have been validated and compiled in your active session.
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-gold-500/15">
                <Sparkles className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-parchment-50 font-semibold block mb-0.5">
                    {hasLetter
                      ? "Ready for Santa's Letter Generation!"
                      : "Video Greeting Details Recorded"}
                  </strong>
                  {hasLetter ? (
                    <span>
                      Santa Claus is ready to write a custom, magical letter for {formData.childName} using your personalized details. Click below to generate their official North Pole letter!
                    </span>
                  ) : (
                    <span>
                      Your personalized video greeting details for {formData.childName} have been recorded for this session. Video generation will be unlocked in an upcoming update.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Snapshot Card */}
            <div className="max-w-md mx-auto mb-10 p-4 rounded-xl bg-forest-950/60 border border-gold-500/20 text-xs text-parchment-300 grid grid-cols-2 gap-2 text-left">
              <div>
                <span className="text-gold-400 block font-semibold">Child Name:</span>
                <span className="text-parchment-100 font-bold text-sm">{formData.childName}</span>
              </div>
              <div>
                <span className="text-gold-400 block font-semibold">Product:</span>
                <span className="text-parchment-100 font-medium">{selectedProduct.title}</span>
              </div>
              <div>
                <span className="text-gold-400 block font-semibold">Age Group:</span>
                <span className="text-parchment-200">{formData.childAge}</span>
              </div>
              <div>
                <span className="text-gold-400 block font-semibold">Wish Listed:</span>
                <span className="text-parchment-200 truncate block">{formData.giftWish}</span>
              </div>
            </div>

            {/* Action Buttons: Generate Letter, Start New Form & Return to Homepage */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {hasLetter && (
                <Link
                  href="/letter"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-gold-100 font-bold text-base border border-gold-400/50 shadow-[0_0_25px_rgba(170,27,27,0.5)] hover:shadow-[0_0_30px_rgba(230,184,63,0.5)] hover:border-gold-300 transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 text-gold-300" />
                  <span>Generate Santa&apos;s Letter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-850 hover:bg-forest-800 text-gold-200 border border-gold-500/35 text-sm font-semibold transition-colors hover:border-gold-300"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start a New Personalization</span>
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-850 text-parchment-200 border border-gold-500/30 text-sm font-semibold transition-colors"
              >
                <span>Return to Homepage</span>
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* Privacy and Security Footer Note */}
      <div className="mt-12 text-center text-xs text-parchment-300/80 flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-gold-400" />
        <span>
          Your family&apos;s privacy is sacred. Information is retained in your private browser memory for this session and never shared.
        </span>
      </div>

    </div>
  );
}
