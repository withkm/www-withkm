"use client";

import { motion, Variants } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.8
  },
  show: {
    opacity: 0.7,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    opacity: 1,
    scale: 1.1,
    y: -5,
    transition: {
      duration: 0.3
    }
  }
};

const headerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const TechSection = () => {
  const techIcons = Array.from({ length: 21 }, (_, i) => {
    const number = i + 1;
    return number < 10 ? `0${number}` : number.toString();
  });

  return (
    <motion.section 
      className="section-wrapper z-[2] relative h-[120vh]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.div variants={headerVariants}>
        <SectionHeader
          title="Technologies we use"
          description={
            <>
              We build with the tools <br />
              that power today's best <br />
              digital products.
            </>
          }
        />
      </motion.div>

      <motion.div 
  className="grid grid-cols-7 gap-4 mt-[100px] mx-auto lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3"
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-100px" }}
>
  {techIcons.map((iconNumber) => (
    <motion.div
      key={iconNumber}
      className="hoverable flex items-center justify-center"
      variants={item}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={`/assets/tech-icons/tech-${iconNumber}.svg`}
        alt={`Technology ${iconNumber}`}
        width={88}
        height={88}
        className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
      />
    </motion.div>
  ))}
</motion.div>
    </motion.section>
  );
};

export default TechSection;