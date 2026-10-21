"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  PersonalizationData,
  INITIAL_FORM_DATA,
  GeneratedSantaLetter,
} from "@/components/personalize/types";

interface PersonalizationContextType {
  formData: PersonalizationData;
  setFormData: React.Dispatch<React.SetStateAction<PersonalizationData>>;
  updateFormField: <K extends keyof PersonalizationData>(
    field: K,
    value: PersonalizationData[K]
  ) => void;
  generatedLetter: GeneratedSantaLetter | null;
  setGeneratedLetter: React.Dispatch<
    React.SetStateAction<GeneratedSantaLetter | null>
  >;
  resetForm: () => void;
}

const PersonalizationContext = createContext<
  PersonalizationContextType | undefined
>(undefined);

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  // Session-scoped state to preserve user details across page navigation and reloads within the tab
  const [formData, setFormData] = useState<PersonalizationData>(INITIAL_FORM_DATA);
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedSantaLetter | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Restore session data on mount (client-side only)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedData = sessionStorage.getItem("santas_magic_formData");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed && typeof parsed === "object" && parsed.productId) {
            setFormData((prev) => ({ ...prev, ...parsed }));
          }
        }
        const savedLetter = sessionStorage.getItem("santas_magic_generatedLetter");
        if (savedLetter) {
          const parsedLetter = JSON.parse(savedLetter);
          if (parsedLetter && typeof parsedLetter === "object" && parsedLetter.body) {
            setGeneratedLetter(parsedLetter);
          }
        }
      }
    } catch {
      // Ignore storage errors in restricted browser contexts
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to sessionStorage on changes once initialized
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("santas_magic_formData", JSON.stringify(formData));
        if (generatedLetter) {
          sessionStorage.setItem("santas_magic_generatedLetter", JSON.stringify(generatedLetter));
        } else {
          sessionStorage.removeItem("santas_magic_generatedLetter");
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [formData, generatedLetter, isInitialized]);

  const updateFormField = <K extends keyof PersonalizationData>(
    field: K,
    value: PersonalizationData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setGeneratedLetter(null);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("santas_magic_formData");
        sessionStorage.removeItem("santas_magic_generatedLetter");
      }
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <PersonalizationContext.Provider
      value={{
        formData,
        setFormData,
        updateFormField,
        generatedLetter,
        setGeneratedLetter,
        resetForm,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error(
      "usePersonalization must be used within a PersonalizationProvider"
    );
  }
  return context;
}
