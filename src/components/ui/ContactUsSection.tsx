"use client";

import { motion, Variants } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
// import emailjs from "@emailjs/browser";

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const inputVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6
    }
  })
};

const ContactUsSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };



  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    if (!form.current) return;
    // emailjs
    // .sendForm(
    //   'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    //   'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
    //   form.current,
    //   'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    // )
    // .then((result) => {
    //   console.log('SUCCESS!', result.text);
    //   setSubmitStatus("success");
    //   form.current?.reset();
    // })
    // .catch((error) => {
    //   console.error('FAILED...', error.text);
    //   setSubmitStatus("error");
    // })
    // .finally(() => {
    //   setIsSubmitting(false);
    // });
   
  };

  return (
    <motion.section 
      id="contact-us" 
      className="section-wrapper py-20 z-[100] relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={formVariants}
    >
      <SectionHeader
        title="Contact Us"    
        description={
          <>
            Have an idea? We're ready <br /> to build.
          </>
        }
      />

      <motion.div 
        className="mx-auto mt-16"
        variants={formVariants}
      >
        {submitStatus === "success" ? (
          <motion.div 
            className="bg-green-500/10 border border-green-500/30 text-green-300 p-6 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p>We'll get back to you soon.</p>
          </motion.div>
        ) : submitStatus === "error" ? (
          <motion.div 
            className="bg-red-500/10 border border-red-500/30 text-red-300 p-6 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
            <p>Please try again later or contact us directly.</p>
          </motion.div>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={inputVariants}
                custom={0}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  id="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                custom={1}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="from_email"
                  id="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </motion.div>
            </div>

            <motion.div
              variants={inputVariants}
              custom={2}
            >
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="How can we help?"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={3}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tell us about your project..."
              ></textarea>
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={4}
              className="pt-2"
            >
           
               <motion.button 
                            className="hero-button group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseMove={handleMouseMove}
                            type="submit"
                            disabled={isSubmitting}
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
                            <span className="relative z-10 flex items-center gap-2">
                           
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            </span>
                          </motion.button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ContactUsSection;