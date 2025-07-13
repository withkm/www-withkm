"use client";

import { motion, Variants } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const OurStorySection = () => {
  return (
    <motion.section 
      id="our-story" 
      className="section-wrapper h-[100vh]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.div variants={item}>
        <SectionHeader
          title="Our Story"
          description={
            <>
              Born from passion, built to <br/>bring ideas to life.
            </>
          }
        />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        variants={container}
      >
        <motion.div variants={item} className="overflow-hidden rounded-2xl">
          <Image 
            src='/assets/images/team.png' 
            alt="withkm-team" 
            height={368} 
            width={485}
            className="w-full h-auto rounded-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <p className="text-white/80 leading-relaxed">
            Withkm began with a modest yet powerful idea: creating a community dedicated to turning imagination into reality. We observed too many tremendous ideas being nothing more than ideas because people generally lacked someone who would listen deeply, understand truly, and help them make their vision happen. People were not looking for people to write code; they were looking for people who would put in as much as they did.
          </p>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <p className="text-white/80 leading-relaxed">
            That insight became the heart of withkm. We started not with a plan, but with the belief that software should feel personal and be built around what makes each idea unique. No jargon. No unnecessary complexity. Just a commitment to bring vision to creation.
          </p>
          <p className="text-white/80 leading-relaxed">
            Today, we are a small team with a clear focus. We help founders, creatives, and growing teams bring their ideas to life. We listen carefully, build with purpose, and stay true to the reason we started in the first place.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default OurStorySection;