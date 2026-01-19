"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Users, GraduationCap, Scale } from "lucide-react";
import { FAQ_ITEMS, SITE_CONFIG } from "@/constants";
import { cn } from "@/utils/helpers";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  accordionContent,
} from "@/utils/animations";

// Icon mapping for FAQ items
const faqIconMap: Record<string, React.ReactNode> = {
  "what-is-als": <BookOpen className="w-5 h-5" />,
  "why-als": <Users className="w-5 h-5" />,
  "als-basis": <Scale className="w-5 h-5" />,
  "how-als-works": <GraduationCap className="w-5 h-5" />,
  "als-vs-formal": <BookOpen className="w-5 h-5" />,
};

export function About() {
  const [openId, setOpenId] = useState<string | null>("what-is-als");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gray-50"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            About ALS
          </span>
          <h2 className="heading-2 text-primary-800 mb-4">
            What is the Alternative Learning System?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            ALS is a parallel learning system in the Philippines that provides a
            practical option to formal education for out-of-school youth and
            adults.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Cluster Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="heading-3 text-primary-800 mb-2">
                  {SITE_CONFIG.name.toUpperCase()}
                </h3>
                <p className="text-accent-600 font-medium">
                  {SITE_CONFIG.tagline}
                </p>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Alternative Learning System (ALS) in Bukidnon Cluster I
                  serves the municipalities of Manolo Fortich, Libona, Baungon,
                  and Malitbog. Our mission is to provide out-of-school youth
                  and adults with quality basic education through flexible
                  learning programs.
                </p>
                <p>
                  Our team of dedicated educators and community facilitators
                  work tirelessly to bring education closer to underserved
                  communities, helping learners achieve their dreams and improve
                  their quality of life.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <div className="text-3xl font-bold text-primary-800">4</div>
                  <div className="text-sm text-gray-600">Municipalities</div>
                </div>
                <div className="text-center p-4 bg-accent-50 rounded-xl">
                  <div className="text-3xl font-bold text-accent-600">1200+</div>
                  <div className="text-sm text-gray-600">Learners Served</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {FAQ_ITEMS.map((faq) => (
              <motion.div
                key={faq.id}
                variants={staggerItem}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className={cn(
                    "w-full px-6 py-4 flex items-center justify-between text-left transition-colors",
                    openId === faq.id
                      ? "bg-primary-800 text-white"
                      : "hover:bg-gray-50"
                  )}
                  aria-expanded={openId === faq.id}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "p-2 rounded-lg",
                        openId === faq.id
                          ? "bg-white/20 text-white"
                          : "bg-primary-100 text-primary-700"
                      )}
                    >
                      {faqIconMap[faq.id] || <BookOpen className="w-5 h-5" />}
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        openId === faq.id ? "text-white" : "text-gray-800"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5",
                        openId === faq.id ? "text-white" : "text-gray-500"
                      )}
                    />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {openId === faq.id && (
                    <motion.div
                      variants={accordionContent}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
