"use client";

import { TextBlock } from "@/interfaces/core.interfaces";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const SectionHeader = ({ title, description }: TextBlock) => {
  return (
    <motion.div 
      className="my-5 mb-15"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.p 
        className="section-title text-xl lg:text-2xl"
        variants={itemVariants}
      >
        {title}
      </motion.p>
      <motion.p 
        className="section-subtitle text-3xl lg:text-5xl"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default SectionHeader;