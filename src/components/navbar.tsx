"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { navLinks } from "@/data/links.data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);



  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <>
      <nav
        className={`nav-bar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          "bg-background/10 backdrop-blur-md py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity z-50"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/assets/branding/withkm-logo.svg"
              alt="withkm-logo"
              width={140}
              height={28}
              className="nav-logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 ">
            {navLinks.map((link) => (
              <li key={link.url} className="group relative">
                <Link
                  href={link.url}
                  className="nav-link relative px-3 py-2 overflow-hidden text-sm font-medium"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="nav-link-underline"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
              className="md:hidden z-50 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X weight="bold" className="w-6 h-6" />
              ) : (
                <List weight="bold" className="w-6 h-6" />
              )}
            </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="mobile-drawer fixed inset-0 bg-background/95 backdrop-blur-md md:hidden pt-20 px-6 z-40 pl-[50px]"
            >
              <ul className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.url}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={link.url}
                      className="text-2xl font-medium py-2 block hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}