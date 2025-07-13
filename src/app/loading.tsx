"use client";

import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../lottie/Animation-Loader.json";


export default function Loading({ isLoading }: { isLoading: boolean }) {


  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ 
            opacity: 0,
            y: 20,
            scale: 1,
            borderRadius: 0,
            height: "100vh",
            transformOrigin: "top"
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
            borderRadius: 0,
            height: "100vh"
          }}
          exit={{ 
            opacity: 0,
            y: -100,
            height: "0vh",
            scale: 0.95,
            borderRadius: "0 0 50% 50%",
            transformOrigin: "top"
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            height: { duration: 0.6 },
            borderRadius: { duration: 0.6 }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.2 }
            }}
            exit={{ 
              opacity: 0,
              y: -20,
              transition: { duration: 0.3 }
            }}
            className="relative z-10 text-center space-y-6 p-8 max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                transition: { delay: 0.3 }
              }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500 mt-4">
                withkm
              </h2>
              <p className="text-foreground/70 text-sm font-medium mt-2">
                Crafting digital experiences
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-foreground/60 font-mono tracking-wider"
            >
              Loading your experience...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}