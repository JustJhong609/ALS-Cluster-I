"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Award,
  ClipboardCheck,
  FileSpreadsheet,
  BarChart3,
  BookOpen,
  Download,
} from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
} from "@/utils/animations";


// Forms data
const FORMS = [
  {
    id: "enrollment",
    title: "Enrollment Form",
    description: "Form for new learners to enroll in the ALS program.",
    icon: FileText,
    color: "blue",
    downloadLink:
      "https://drive.google.com/drive/folders/1Fmm2d1JR9VIpHvPfM-pXGl3_XTfiHYAu?usp=drive_link",
  },
  {
    id: "abl",
    title: "Assessment of Basic Literacy (ABL)",
    description:
      "Form used to evaluate learners' foundational literacy skills, including reading, writing, and numeracy.",
    icon: Award,
    color: "green",
    downloadLink:
      "https://drive.google.com/drive/folders/1RWqCIKK-iKnk83c5FCMZtzZ1RumkCwRz?usp=drive_link",
  },
  {
    id: "rpl",
    title: "Recognition of Prior Learning",
    description:
      "Form to assess and recognize skills and knowledge gained through prior learning and experiences.",
    icon: ClipboardCheck,
    color: "purple",
    downloadLink:
      "https://drive.google.com/drive/folders/1S4lPnMrdvh4pNBJITcP_kpks_JzyIZcf?usp=drive_link",
  },
  {
    id: "als-assessment",
    title: "ALS 1&2 Assessment Forms",
    description:
      "Forms used to evaluate learners' competencies for ALS Levels 1 and 2.",
    icon: FileSpreadsheet,
    color: "yellow",
    downloadLink:
      "https://drive.google.com/drive/folders/1yg8tCkeydqli7ExqkIqvijGJsKWV0fhP?usp=drive_link",
  },
  {
    id: "flt",
    title: "Functional Literacy Test Forms",
    description:
      "Form used to assess learners' functional literacy levels in reading, writing, and numeracy.",
    icon: BarChart3,
    color: "red",
    downloadLink:
      "https://drive.google.com/drive/folders/1-xumrC7EJcVwbAv8JE3HSJefZ5xQBypj?usp=drive_link",
  },
  {
    id: "als-cg",
    title: "ALS CG (Curriculum Guide)",
    description:
      "Guide outlining the competencies and learning standards for the ALS K to 12 Basic Education Curriculum.",
    icon: BookOpen,
    color: "indigo",
    downloadLink:
      "https://drive.google.com/drive/folders/1p1ZkAJSyz18qEQkLGCKBrjgDdmkXpEpu?usp=drive_link",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "hover:border-blue-400" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "hover:border-green-400" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "hover:border-purple-400" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", border: "hover:border-yellow-400" },
  red: { bg: "bg-red-100", text: "text-red-600", border: "hover:border-red-400" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "hover:border-indigo-400" },
};



export function Forms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="forms"
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
          <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            Downloads
          </span>
          <h2 className="heading-2 text-primary-800 mb-4">Forms & Documents</h2>
          <p className="text-gray-600 text-lg">
            Download official ALS forms and documents for enrollment,
            assessment, and curriculum guidance.
          </p>
        </motion.div>

        {/* Forms Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FORMS.map((form) => {
            const colors = colorMap[form.color];
            const Icon = form.icon;

            return (
              <motion.div
                key={form.id}
                variants={staggerItem}
                initial="rest"
                whileHover="hover"
              >
                <motion.div
                  variants={cardHover}
                  className={`bg-white border border-gray-200 rounded-2xl p-6 h-full flex flex-col transition-colors ${colors.border}`}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-primary-800">
                      {form.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {form.description}
                  </p>

                  {/* Download Link */}
                  <motion.a
                    href={form.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className={`inline-flex items-center gap-2 font-semibold ${colors.text} hover:underline`}
                  >
                    Download
                    <Download className="w-4 h-4" />
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
