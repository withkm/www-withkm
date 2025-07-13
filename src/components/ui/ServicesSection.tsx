"use client";

import { servicesContent } from "@/data/content.data";
import SectionHeader from "./SectionHeader";
import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const ServiceCard = ({ service, index }: { service: typeof servicesContent[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, isActive: false });
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition(prev => ({ ...prev, x, y, isActive: true }));
    };
  
    const handleMouseLeave = () => {
      setMousePosition(prev => ({ ...prev, isActive: false }));
    };
  
    return (
      <motion.div 
        ref={cardRef}
        key={index} 
        variants={item}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="z-[2] relative overflow-hidden hoverable backdrop-blur-md glass-card bg-white/10 rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1"
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(
              600px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255, 255, 255, 0.4) 0%,
              rgba(100, 150, 250, 0.1) 40%,
              rgba(255, 255, 255, 0) 70%
            )`,
            opacity: mousePosition.isActive ? 1 : 0,
            transition: 'opacity 0.3s ease, background 0.3s ease'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">{service.title}</h3>
            <service.icon className="w-8 h-8 text-gray-400 flex-shrink-0" />
          </div>
          <p className="text-gray-300 leading-relaxed">{service.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="py-20 px-6 min-h-screen" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Services"
          description={
            <>
              We tailor solutions that <br/> fits your needs.
            </>
          }
        />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {servicesContent.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};