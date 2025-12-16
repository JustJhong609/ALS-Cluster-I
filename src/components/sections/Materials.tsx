"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  BookOpen,
  FlaskConical,
  Calculator,
  Briefcase,
  Users,
  Laptop,
  ExternalLink,
  GraduationCap,
  FileText,
  Lock,
} from "lucide-react";
import { MATERIALS, LEARNING_LEVELS, MATERIAL_COLORS, BLP_MODULE, AE_MODULES } from "@/constants";
import { cn } from "@/utils/helpers";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
} from "@/utils/animations";
import type { LearningLevel } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

// Icon mapping for learning strands
const strandIconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
};

// Protected Download Button Component
function ProtectedDownloadButton({ 
  href, 
  children, 
  className = "" 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  const { requireLogin, auth } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    requireLogin(href);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        className
      )}
    >
      {!auth.isLoggedIn && <Lock className="w-4 h-4" />}
      {children}
    </motion.button>
  );
}

export function Materials() {
  const [activeTab, setActiveTab] = useState<LearningLevel>("Elementary");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Filter materials by level
  const filteredMaterials = MATERIALS.filter(
    (material) => material.level === activeTab
  );

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Resources
          </span>
          <h2 className="heading-2 text-primary-800 mb-4">
            Downloadable Learning Materials
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            The Learning Activity Sheets (LAS), including Elementary and
            Secondary LAS, Basic Literacy Program (BLP) Modules, and
            Accreditation and Equivalency (A&E) Modules, are proprietary
            educational resources exclusively developed for the Department of
            Education Region X.
          </p>
        </motion.div>

        {/* ====== LEARNING ACTIVITY SHEETS (LAS) ====== */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          {/* Section Title with Accent Border */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-2xl font-bold text-primary-800">
              Learning Activity Sheets (LAS)
            </h3>
            <div className="flex-grow h-0.5 bg-accent-500" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {LEARNING_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setActiveTab(level)}
                className={cn(
                  "px-8 py-3 font-semibold rounded-xl transition-all duration-300",
                  activeTab === level
                    ? "bg-primary-800 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Materials Grid - Bento Style */}
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMaterials.map((material) => {
              const colorConfig = MATERIAL_COLORS[material.color];

              return (
                <motion.div
                  key={material.id}
                  variants={staggerItem}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div
                    variants={cardHover}
                    className="card h-full p-6 flex flex-col"
                  >
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={cn(
                          "p-3 rounded-xl flex-shrink-0",
                          colorConfig.bg
                        )}
                      >
                        <span className={colorConfig.text}>
                          {strandIconMap[material.icon]}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {material.strandCode}
                        </span>
                        <h4 className="text-lg font-bold text-primary-800">
                          {material.strandName}
                        </h4>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      {material.description}
                    </p>

                    {/* Download Button */}
                    <ProtectedDownloadButton
                      href={material.downloadLink}
                      className="w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                               font-bold py-3 px-4 rounded-xl transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                      Download
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </ProtectedDownloadButton>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ====== BASIC LITERACY PROGRAM (BLP) ====== */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-2xl font-bold text-primary-800">
              {BLP_MODULE.title}
            </h3>
            <div className="flex-grow h-0.5 bg-accent-500" />
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <FileText className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <p className="text-gray-700 mb-4">{BLP_MODULE.description}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {BLP_MODULE.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 flex justify-center">
              <ProtectedDownloadButton
                href={BLP_MODULE.downloadLink}
                className="bg-accent-500 hover:bg-accent-400 
                         text-primary-900 font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
              >
                <Download className="w-5 h-5" />
                Download All BLP Modules
              </ProtectedDownloadButton>
            </div>
          </div>
        </motion.div>

        {/* ====== ACCREDITATION & EQUIVALENCY (A&E) MODULES ====== */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-2xl font-bold text-primary-800">
              {AE_MODULES.title}
            </h3>
            <div className="flex-grow h-0.5 bg-accent-500" />
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-green-100">
                <GraduationCap className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="text-gray-700 mb-4">{AE_MODULES.description}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {AE_MODULES.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {AE_MODULES.modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="font-bold text-gray-800 text-lg mb-3">
                    {module.name}
                  </p>

                  {module.hasLanguageOptions ? (
                    // Module 1 with language options
                    <div className="grid grid-cols-2 gap-3">
                      {/* Elementary Column */}
                      <div className="space-y-2">
                        <p className="text-gray-700 font-semibold text-center text-sm">
                          Elementary
                        </p>
                        <ProtectedDownloadButton
                          href={(module.elementary as { filipino: string; english: string }).filipino}
                          className="block w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                                   font-bold py-2 px-3 rounded-lg text-center text-sm transition-colors"
                        >
                          Filipino
                        </ProtectedDownloadButton>
                        <ProtectedDownloadButton
                          href={(module.elementary as { filipino: string; english: string }).english}
                          className="block w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                                   font-bold py-2 px-3 rounded-lg text-center text-sm transition-colors"
                        >
                          English
                        </ProtectedDownloadButton>
                      </div>

                      {/* JHS Column */}
                      <div className="space-y-2">
                        <p className="text-gray-700 font-semibold text-center text-sm">
                          JHS
                        </p>
                        <ProtectedDownloadButton
                          href={(module.jhs as { filipino: string; english: string }).filipino}
                          className="block w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                                   font-bold py-2 px-3 rounded-lg text-center text-sm transition-colors"
                        >
                          Filipino
                        </ProtectedDownloadButton>
                        <ProtectedDownloadButton
                          href={(module.jhs as { filipino: string; english: string }).english}
                          className="block w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                                   font-bold py-2 px-3 rounded-lg text-center text-sm transition-colors"
                        >
                          English
                        </ProtectedDownloadButton>
                      </div>
                    </div>
                  ) : (
                    // Regular modules with Elementary and JHS buttons
                    <div className="space-y-2">
                      <ProtectedDownloadButton
                        href={module.elementary as string}
                        className="block w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                                 font-bold py-2 px-4 rounded-lg text-center transition-colors"
                      >
                        Elementary
                      </ProtectedDownloadButton>
                      <ProtectedDownloadButton
                        href={module.jhs as string}
                        className="block w-full bg-accent-500 hover:bg-accent-400 text-primary-900 
                                 font-bold py-2 px-4 rounded-lg text-center transition-colors"
                      >
                        JHS
                      </ProtectedDownloadButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-xs mt-8 max-w-2xl mx-auto"
        >
          Unauthorized distribution, reproduction, or modification of these
          materials is strictly prohibited without prior written authorization
          from the Department of Education Region X.
        </motion.p>
      </div>
    </section>
  );
}
