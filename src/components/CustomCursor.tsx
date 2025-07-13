"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = isHovered ? 60 : 20;
  const hoverCheckRef = useRef<number>(0);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setShowCursor(!isMobileView);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Magnetic effect configuration
  const magneticDistance = 20;
  const magneticStiffness = 0.2;

  // Check if element is interactive
  const isInteractiveElement = (element: Element | null): boolean => {
    if (!element) return false;
    
    // Check if current element matches our selectors
    if (element.matches('a, button, .hoverable, [role="button"], [data-cursor-hover]')) {
      return true;
    }
    
    // Check if any parent matches our selectors
    return !!element.closest('a, button, .hoverable, [role="button"], [data-cursor-hover]');
  };

  // Handle mobile tap
  const handleMobileTap = useCallback((e: MouseEvent) => {
    if (!isMobile) return;
    
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const isInteractive = element ? isInteractiveElement(element) : false;
    
    cursorX.set(e.clientX - (isInteractive ? 30 : 10));
    cursorY.set(e.clientY - (isInteractive ? 30 : 10));
    
    setIsHovered(isInteractive);
    setShowCursor(true);
    
    // Hide cursor after animation
    setTimeout(() => {
      setShowCursor(false);
    }, 300);
  }, [isMobile, cursorX, cursorY]);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - cursorSize / 2);
      cursorY.set(e.clientY - cursorSize / 2);

      // Throttle hover state updates for better performance
      if (hoverCheckRef.current) {
        cancelAnimationFrame(hoverCheckRef.current);
      }

      let currentElement: Element | null = null;
      let currentIsHovering = false;

      hoverCheckRef.current = requestAnimationFrame(() => {
        currentElement = document.elementFromPoint(e.clientX, e.clientY);
        currentIsHovering = currentElement ? isInteractiveElement(currentElement) : false;
        
        if (currentIsHovering !== isHovered) {
          setIsHovered(currentIsHovering);
        }

        // Magnetic effect on hover
        if (cursorRef.current && currentIsHovering && currentElement) {
          const rect = currentElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = centerX - e.clientX;
          const distanceY = centerY - e.clientY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (distance < magneticDistance) {
            const power = (magneticDistance - distance) / magneticDistance;
            cursorX.set(e.clientX - cursorSize / 2 + distanceX * power * magneticStiffness);
            cursorY.set(e.clientY - cursorSize / 2 + distanceY * power * magneticStiffness);
          }
        }
      });
    };

    // Click animation
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleMobileTap, true); // Use capture phase for mobile

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleMobileTap, true);
      if (hoverCheckRef.current) {
        cancelAnimationFrame(hoverCheckRef.current);
      }
    };
  }, [cursorX, cursorY, cursorSize, isHovered, isMobile, handleMobileTap]);

  // Don't render anything on mobile if not showing cursor
  if (isMobile && !showCursor) {
    return null;
  }

  return (
    <AnimatePresence>
      {showCursor && (
        <>
          {/* Outer cursor with blur effect */}
          <motion.div
            ref={cursorRef}
            className="fixed rounded-full pointer-events-none z-[9999]"
            style={{
              translateX: cursorXSpring,
              translateY: cursorYSpring,
              width: cursorSize,
              height: cursorSize,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isClicking ? 0.7 : 1,
              backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'saturate(400%)',
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              scale: { type: 'spring', stiffness: 500, damping: 20 },
              opacity: { duration: 0.15 },
            }}
          />

          {/* Inner cursor with trail effect */}
          <motion.div
            ref={cursorInnerRef}
            className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-[10000]"
            style={{
              translateX: -4,
              translateY: -4,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              scale: isHovered ? 0.5 : isClicking ? 0.8 : 1,
              opacity: isHovered ? 0.8 : 1,
              backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              scale: { type: 'spring', stiffness: 500, damping: 20 },
              backgroundColor: { duration: 0.2 },
              opacity: { duration: 0.3 }
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}