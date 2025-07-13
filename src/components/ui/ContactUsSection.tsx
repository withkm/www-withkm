"use client";

import { motion, Variants } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { Snackbar } from './Snackbar'; // Adjust path as needed

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
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });
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

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    if (!form.current) return;

    const formData = new FormData(form.current);
    const data = {
      from_name: formData.get('from_name') as string,
      from_email: formData.get('from_email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setSnackbar({
          message: 'Message sent successfully!',
          type: 'success',
          isVisible: true
        });
        form.current?.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus("error");
      setSnackbar({
        message: error instanceof Error ? error.message : 'Failed to send message',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus("idle");
    setIsSubmitting(false);
    // Reset form if it exists
    if (form.current) {
      form.current.reset();
    }
  };

  return (
    <motion.section
      id="contact-us"
      className="section-wrapper px-8 lg:px-[128px] py-20 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={formVariants}
    >
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={() => setSnackbar(prev => ({ ...prev, isVisible: false }))}
      />

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
        {submitStatus === "success" && (
          <motion.div
            className="bg-green-500/10 border border-green-500/30 text-green-300 p-6 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="mb-4">We'll get back to you soon.</p>
            <button
              onClick={resetForm}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 text-red-300 p-6 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
            <p className="mb-4">Please try again later or contact us directly.</p>
            <button
              onClick={resetForm}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {submitStatus === "idle" && (
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key="contact-form" // Add key to force re-render
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={inputVariants}
                custom={0}
                initial="hidden"
                animate="visible"
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
                initial="hidden"
                animate="visible"
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
              initial="hidden"
              animate="visible"
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
              initial="hidden"
              animate="visible"
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
              initial="hidden"
              animate="visible"
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
          </motion.form>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ContactUsSection;