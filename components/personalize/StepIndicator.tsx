"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const STEP_LABELS = [
  "Product",
  "Child's Info",
  "Hobbies",
  "Wishes",
  "Preferences",
  "Review",
];

export default function StepIndicator({
  currentStep,
  totalSteps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-2 sm:px-4">
      {/* Mobile progress indicator */}
      <div className="md:hidden flex flex-col gap-2 bg-forest-900/90 border border-gold-500/30 p-3.5 rounded-2xl shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gold-300 font-cinzel">
            Step {currentStep} of {totalSteps}: {STEP_LABELS[currentStep - 1]}
          </span>
          <span className="text-parchment-300 text-[11px]">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-forest-950 overflow-hidden border border-gold-500/20">
          <div
            className="h-full bg-gradient-to-r from-crimson-600 via-gold-500 to-gold-400 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Tablet & Desktop Step Indicator */}
      <nav aria-label="Personalization Steps" className="hidden md:block">
        <ol className="flex items-center justify-between relative">
          {/* Background Connector line */}
          <div className="absolute top-1/2 left-[5%] right-[5%] -translate-y-1/2 h-[2px] bg-forest-800 -z-0" />
          
          {/* Active Connector line */}
          <div
            className="absolute top-1/2 left-[5%] -translate-y-1/2 h-[2px] bg-gradient-to-r from-crimson-600 to-gold-400 transition-all duration-500 -z-0"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 90}%`,
            }}
          />

          {STEP_LABELS.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const isClickable = stepNum < currentStep; // Allow jumping back to previous steps

            return (
              <li key={label} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(stepNum)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                    isCompleted
                      ? "bg-forest-800 border-2 border-gold-400 text-gold-300 hover:bg-forest-700 cursor-pointer shadow-[0_0_12px_rgba(230,184,63,0.3)]"
                      : isCurrent
                      ? "bg-gradient-to-br from-crimson-600 to-crimson-800 border-2 border-gold-300 text-gold-100 shadow-[0_0_20px_rgba(170,27,27,0.6)] scale-110 cursor-default"
                      : "bg-forest-950 border-2 border-forest-800 text-parchment-300/50 cursor-not-allowed"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                  title={isClickable ? `Jump back to ${label}` : label}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-gold-300 stroke-[3]" />
                  ) : (
                    <span>{stepNum}</span>
                  )}
                </button>
                <span
                  className={`mt-2 text-xs font-medium tracking-wide transition-colors ${
                    isCurrent
                      ? "text-gold-200 font-bold"
                      : isCompleted
                      ? "text-parchment-200"
                      : "text-parchment-300/40"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
