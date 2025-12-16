"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, GraduationCap, ExternalLink } from "lucide-react";
import { ALS_PASSERS_CARDS } from "@/constants";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
} from "@/utils/animations";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
};

// Color config
const colorConfig: Record<string, { bg: string; iconBg: string; iconText: string; button: string; border: string }> = {
  blue: {
    bg: "bg-white",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    border: "border-blue-200",
  },
  green: {
    bg: "bg-white",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
    border: "border-green-200",
  },
};

export function Passers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="passers"
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
            Success Stories
          </span>
          <h2 className="heading-2 text-primary-800 mb-4">ALS Passers by Year</h2>
          <p className="text-gray-600 text-lg">
            Congratulations to our ALS graduates! View the list of passers by year.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ALS_PASSERS_CARDS.map((card) => {
            const colors = colorConfig[card.color];
            
            return (
              <motion.div
                key={card.id}
                variants={staggerItem}
                initial="rest"
                whileHover="hover"
              >
                <motion.div
                  variants={cardHover}
                  className={`${colors.bg} p-8 rounded-2xl shadow-lg border-2 ${colors.border} h-full flex flex-col`}
                >
                  <div className="text-center flex-grow">
                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto mb-4 ${colors.iconBg} rounded-full flex items-center justify-center`}>
                      <span className={colors.iconText}>
                        {iconMap[card.icon]}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-primary-800 mb-2">
                      {card.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                      {card.subtitle}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Button */}
                  <motion.a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center justify-center gap-2 ${colors.button} text-white font-bold py-3 px-8 rounded-xl transition-colors mx-auto`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </motion.a>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
