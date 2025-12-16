"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { scrollRevealScale, fadeInLeft, fadeInRight } from "@/utils/animations";
import { scrollToSection } from "@/utils/helpers";

export function VideoIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Build the video URL with proper parameters
  const videoSrc = isMounted
    ? `${SITE_CONFIG.videoUrl}?rel=0&modestbranding=1&enablejsapi=1`
    : SITE_CONFIG.videoUrl;

  return (
    <section
      id="intro-video"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Video Container */}
          <motion.div
            variants={scrollRevealScale}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lift group">
              {/* Video iframe */}
              <iframe
                className="w-full h-full"
                src={videoSrc}
                title={SITE_CONFIG.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {/* Decorative play button overlay (shows before interaction) */}
              <div className="absolute inset-0 bg-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-800 ml-1" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-500/20 rounded-xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:pl-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4"
            >
              Featured Video
            </motion.span>

            <h2 className="heading-2 text-primary-800 mb-4">
              {SITE_CONFIG.videoTitle}
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {SITE_CONFIG.videoDescription}
            </p>

            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 
                       font-semibold transition-colors group"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
