"use client";

import { useState, useEffect } from 'react';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "motion/react"
import HeroSection from "@/components/ui/HeroSection";
import { ServicesSection } from "@/components/ui/ServicesSection";
import ProcessesSection from "@/components/ui/ProcessesSection";
import TechSection from "@/components/ui/TechSection";
import OurStorySection from "@/components/ui/OurStory";
import ContactUsSection from "@/components/ui/ContactUsSection";
import Loading from './loading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Wait for all images to load
      const images = Array.from(document.images);
      const imagePromises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Resolve even if there's an error
        });
      });

      // Also wait for fonts to load
      const fontPromises = document.fonts ? 
        document.fonts.ready.then(() => {}) : 
        Promise.resolve();

      // Wait for all assets to load or timeout after 5 seconds
      Promise.all([
        ...imagePromises,
        fontPromises,
        // Add any other critical asset loading here
      ]).finally(() => {
        // Add a small delay for a smoother transition
        setTimeout(() => setIsLoading(false), 2500);
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.4, duration: 0.6 }
            }}
            className="home-page relative flex flex-col items-center justify-center"
          >
            <div className="main-background w-full h-full"></div>
            <div className="w-full mx-auto z-[1000]">
              <Navbar />
            </div>

            <div className="w-full px-[128px]">
              <HeroSection/>
              <ServicesSection />
              <ProcessesSection />
              <TechSection />
              <OurStorySection />
              <ContactUsSection />
            </div>

            <div className="w-full mx-auto">
              <Footer />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}