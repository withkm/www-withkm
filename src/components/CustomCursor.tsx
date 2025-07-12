"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring,  } from 'framer-motion';

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = isHovered ? 60 : 20;
  
  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Magnetic effect configuration
  const magneticDistance = 20;
  const magneticStiffness = 0.2;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - cursorSize / 2);
      cursorY.set(e.clientY - cursorSize / 2);

      // Magnetic effect on hover
      if (cursorRef.current && isHovered) {
        const rect = document.elementFromPoint(e.clientX, e.clientX)?.getBoundingClientRect();
        if (rect) {
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
      }
    };

    // Click animation
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hover effect for interactive elements
    const handleLinkHover = () => setIsHovered(true);
    const handleLinkLeave = () => setIsHovered(false);

    const clickableElements = document.querySelectorAll(
      'a, button, [role="button"], [data-cursor-hover]'
    );

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [cursorX, cursorY, cursorSize, isHovered]);

  // Trail effect
  useEffect(() => {
    if (!cursorInnerRef.current) return;
    
    const cursor = cursorInnerRef.current;
    let animationFrame: number;
    
    const updatePosition = () => {
      const { x, y } = cursor.getBoundingClientRect();
      const targetX = cursorX.get();
      const targetY = cursorY.get();
      
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only animate if the cursor has moved significantly
      if (distance > 0.5) {
        cursor.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
      
      animationFrame = requestAnimationFrame(updatePosition);
    };
    
    animationFrame = requestAnimationFrame(updatePosition);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Outer cursor with blur effect */}
      <motion.div
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none z-[9999] cursor-glass"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isClicking ? 0.7 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 20 },
          opacity: { duration: 0.15 }
        }}
      />

      {/* Inner cursor with trail effect */}
      <motion.div
        ref={cursorInnerRef}
        className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-[10000]"
        style={{
          translateX: -4, // Half of width to center
          translateY: -4, // Half of height to center
          scale: isHovered ? 0.5 : 1,
          opacity: isHovered ? 0.8 : 1,
        }}
        animate={{
          scale: isHovered ? 0.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 20 },
          backgroundColor: { duration: 0.2 }
        }}
      />
    </>
  );
}