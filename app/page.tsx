import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import HowItWorks from "@/components/HowItWorks";
import SampleLetter from "@/components/SampleLetter";
import WhyChooseUs from "@/components/WhyChooseUs";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-forest-950 text-parchment-50 flex flex-col selection:bg-crimson-800 selection:text-gold-100">
      {/* Ambient Snowfall Effect */}
      <SnowEffect />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Our Experiences Section */}
        <Experiences />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Sample Santa Letter Section */}
        <SampleLetter />

        {/* Why Choose Santa's Magic? Section */}
        <WhyChooseUs />

        {/* Expandable FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
