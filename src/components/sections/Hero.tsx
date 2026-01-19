"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, FileText, Mail, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { heroTextContainer, heroTextItem, fadeInUp, staggerContainer } from "@/utils/animations";
import { scrollToSection } from "@/utils/helpers";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollDown = () => {
    scrollToSection("intro-video");
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="hero-bg absolute inset-0" />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-primary-900/60" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 container-custom text-center text-white px-4 pt-20"
      >
        {/* Animated Title */}
        <motion.div
          variants={heroTextContainer}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <motion.h1
            variants={heroTextItem}
            className="heading-1 text-white mb-4"
          >
            {SITE_CONFIG.heroTitle}
          </motion.h1>
          <motion.h2
            variants={heroTextItem}
            className="text-2xl md:text-4xl font-heading font-semibold text-accent-400 mb-6"
          >
            {SITE_CONFIG.heroSubtitle}
          </motion.h2>
        </motion.div>

        {/* Description with staggered words */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {SITE_CONFIG.heroDescription}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            variants={fadeInUp}
            href="#materials"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("materials");
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline flex items-center gap-2 group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download Materials
          </motion.a>

          <motion.a
            variants={fadeInUp}
            href="#forms"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("forms");
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Forms
          </motion.a>

          <motion.a
            variants={fadeInUp}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </motion.a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={handleScrollDown}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white 
                   transition-colors cursor-pointer flex flex-col items-center gap-2"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
