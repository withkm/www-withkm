"use client";

import { motion, Variants } from 'framer-motion';
import {SparkleIcon} from "@phosphor-icons/react/ssr";
import { heroCardContent } from '@/data/content.data';
import { CardContainer, CardBody } from './3d-card';
import { useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';


const HeroSection = () => {


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Animation variants with proper typing
    const container: Variants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3, // Reduced stagger for better timing
          delayChildren: 0.5,  // Reduced initial delay
        }
      }
    };
  
    const item: Variants = {
      hidden: { y: 20, opacity: 0 },
      show: { 
        y: 0, 
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15
        }
      }
    };
  
    // Button specific variant with delay
    const buttonItem: Variants = {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 1.2 // This will make the button appear after the text
        }
      }
    };

    
    const SkewScrollContainer = ({ children }: { children: React.ReactNode }) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
      
      const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
      });
    
      // Adjust values for mobile
      const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 0]);
      const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 1]);
      const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [300, 0, 0, 300]);
      const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
      const filter = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], 
        ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"] 
      );
    
      return (
        <div 
          ref={containerRef}
          className="relative"
          style={{ 
            height: isMobile ? '100vh' : '80vh',
            marginBottom: isMobile ? '-25vh' : '-10vh',
          }}
        >
          <motion.div 
            className="sticky  -translate-y-1/4 w-full px-0 lg:px-6"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity"
            }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                transform: 'perspective(1000px)',
                skewX: skewX,
                scale: scale,
                y: y,
                opacity: opacity,
                filter: filter
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      );
    };


    

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };
  
    return (
      <section id="home" className="section-wrapper z-[1] px-8 lg:px-[128px]">
        <motion.div 
          className="hero-section mx-auto"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div className="hero-title leading-[4rem] md:leading-[5rem] lg:leading-[5rem] text-5xl lg:text-6xl">
            <motion.span variants={item} className="block">We Turn Ideas Into Powerful and</motion.span>
            <motion.span variants={item} className="block">Scalable Software That Works Just as</motion.span>
            <motion.span variants={item} className="block">
              You <span className="text-gradient">Imagined</span>.
            </motion.span>
          </motion.div>
  
          <motion.div
            variants={buttonItem}
            initial="hidden"
            animate="show"
            className="mt-8"
          >
            <motion.button 
              className="hero-button group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseMove={handleMouseMove}
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundSize: '200% 100%',
                  zIndex: -1,
                  background: `radial-gradient(
                    600px circle at ${mousePosition.x}px ${mousePosition.y}px,
                    rgba(255, 255, 255, 0.3) 0%,
                    rgba(100, 150, 250, 0.1) 20%,
                    rgba(255, 255, 255, 0) 30%
                  )`,

                }}
              />
              <a href="#contact-us" className="relative z-10 flex items-center gap-2">
                <SparkleIcon />
                Let's Collaborate
              </a>
            </motion.button>
          </motion.div>
        </motion.div>
        
         {/* Glass Cards Row */}
         <div className="px-2  lg:px-8 mt-16">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-8 sm:mt-12 lg:mt-16"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
            
              {heroCardContent.map((content, index) => (
                <motion.div 
                  key={index} 
                
                  variants={item}
                >
              
                  {/* Content */}
                  <CardContainer
                  className='w-full d-flex justify-center align-items-center '
                    > 
                    <CardBody className='glass-card min-h-[300px] hoverable group relative overflow-hidden rounded-2xl p-8  border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] shadow-2xl shadow-black/20 hover:shadow-primary/20 transition-all duration-500'>
                  
                        <h3 className="text-3xl font-semibold text-white  mb-4 flex items-left">
                          <span className="rounded-full bg-primary-400 group-hover:scale-150 transition-transform duration-300" />
                          {content.title}
                        </h3>
                        <p className="text-white/70 text-xl leading-relaxed">
                          {content.description}
                        </p>
                      
                    </CardBody>
                  </CardContainer>
                  
                  {/* Decorative elements */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </motion.div>
              ))}
            </motion.div>


            {/* video loop Container */}
              <SkewScrollContainer>
                <div 
                  className="mt-[300px] h-[70vh] rounded-3xl overflow-hidden border border-white/10 
                          bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl 
                          shadow-2xl shadow-black/20">
                  <div className="h-full w-full bg-gradient-to-br from-primary-900/30 to-primary-500/20 
                                flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                    <video src="./assets/videos/loop-withkm.mp4" autoPlay loop muted className="w-full h-full object-position-center object-cover"/>
                  </div> 
                </div>
              </SkewScrollContainer>
            
          </div>
      </section>
    );
  };
export default HeroSection;