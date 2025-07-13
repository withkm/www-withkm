"use client";

import SectionHeader from "./SectionHeader";
import { processesContent } from "@/data/content.data";
import { RocketLaunchIcon, ArrowClockwiseIcon } from "@phosphor-icons/react/ssr";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";


  // First, let's create a custom hook to detect mobile view
  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkMobile();
      
      // Add event listener
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    return isMobile;
  };


const ProcessesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });


  const isMobile = useIsMobile();


  // Create transform values based on scroll progress
  const x = useTransform(scrollYProgress, [0, 1], ["80%", "-200%"]);
  const mobileX = useTransform(scrollYProgress, [0, 1], ["200%", "-800%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 0]);
  const filter = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Card hover effect state
  const [hoverStates, setHoverStates] = useState<{[key: number]: {x: number, y: number, isActive: boolean}}>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverStates(prev => ({
      ...prev,
      [index]: { x, y, isActive: true }
    }));
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates(prev => ({
      ...prev,
      [index]: { ...prev[index], isActive: false }
    }));
  };

  // Track if section is in view
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden section-wrapper relative px-8 lg:px-[128px] z-[0] h-[500vh] lg:h-[200vh]">
      <motion.div 
        style={{ 
          y: isMounted ? y : 0, 
          opacity: isMounted ? opacity : 0, 
          filter: isMounted ? filter : 'blur(10px)',
          
        }}
        className={`${isInView ? 'fixed' : 'absolute top-0'}  top-[100px]  h-[600px] flex flex-col justify-center`}
      >
        <div className="w-full mx-auto px-4">
          <SectionHeader
            title="Our Processes"
            description={
              <>
                We work in steps that <br />
                lead to results.
              </>
            }
          />
        </div>

        <div className="relative h-[50vh] w-full">
          <motion.div 
            style={{opacity, filter, x: isMobile ? mobileX : x}}
            className={` absolute top-0 left-0 h-full w-full flex items-center gap-8 pl-4 pr-[100vw]`}
          >
            <motion.div
              key="start-icon"
              className="processes-item flex justify-center items-center border border-white/10 rounded-full w-[80px] h-[80px] relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: -1 * 0.1
                }
              }}
              viewport={{ once: true }}
            >
              <div className="p-8 text-4xl font-bold flex justify-center items-center">
                <RocketLaunchIcon />
              </div>
            </motion.div>

            {processesContent.map((process, index) => {
              const hoverState = hoverStates[index] || { x: 0, y: 0, isActive: false };
              
              return (
                <motion.div
                  key={index}
                  className="processes-item glass-card hoverable flex-shrink-0 group relative overflow-hidden"
                  style={{ width: "400px", height: "250px" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6,
                      delay: index * 0.1
                    }
                  }}
                  viewport={{ once: true }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(
                        600px circle at ${hoverState.x}px ${hoverState.y}px,
                        rgba(100, 150, 250, ${hoverState.isActive ? '0.9' : '0'}) 0%,
                        rgba(100, 150, 250, ${hoverState.isActive ? '0.1' : '0'}) 40%,
                        rgba(255, 255, 255, 0) 70%
                      )`,
                      borderRadius: "1rem",
                      opacity: hoverState.isActive ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  
                  <div className="p-0 lg:p-8 md:p-8 relative z-[0]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5">
                          <process.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white uppercase tracking-wide">
                          {process.iconText}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-3">
                        {process.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              key="end-icon"
              className="processes-item flex justify-center items-center border border-white/10 rounded-full w-[80px] h-[80px] relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: (processesContent.length + 1) * 0.1
                }
              }}
              viewport={{ once: true }}
            >
              <div className="p-8 font-bold text-4xl flex justify-center items-center">
                <ArrowClockwiseIcon />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessesSection;