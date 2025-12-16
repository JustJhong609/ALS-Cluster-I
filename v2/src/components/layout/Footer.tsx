"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  SITE_CONFIG,
  FOOTER_COLUMNS,
  CONTACT_INFO,
  SOCIAL_LINKS,
} from "@/constants";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { scrollToSection } from "@/utils/helpers";

// Icon mapping for social links
const socialIconMap: Record<string, React.ReactNode> = {
  Facebook: <Facebook className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.replace("#", "");
      scrollToSection(sectionId);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* About ALS Column */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Image
                  src="/images/images/ALSLOGO.png"
                  alt="ALS Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-heading font-bold text-accent-400">
                About ALS
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The Alternative Learning System provides a practical option to
              formal education for out-of-school youth and adults, bringing
              quality education to underserved communities.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                           text-gray-400 hover:bg-accent-500 hover:text-primary-900 
                           transition-all duration-300"
                  aria-label={social.platform}
                >
                  {socialIconMap[social.icon]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Programs Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <motion.div key={column.title} variants={staggerItem}>
              <h3 className="text-xl font-heading font-bold text-accent-400 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 
                               flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500/50 
                                     group-hover:bg-accent-500 transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info Column */}
          <motion.div variants={staggerItem}>
            <h3 className="text-xl font-heading font-bold text-accent-400 mb-4">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <span className="text-gray-400">{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Credits Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mb-8"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-white font-semibold mb-4">
              Credits & Acknowledgments
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              This project was made possible through the collaboration,
              dedication, and support of individuals committed to advancing the
              goals of the Alternative Learning System (ALS) in Bukidnon.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              <strong className="text-gray-400">
                Alfredo G. De los Santos Jr., EPS II, Division of Bukidnon
              </strong>{" "}
              – For providing the comprehensive learning modules, downloadable
              materials, assets, layout framework, and valuable content that
              shaped the structure and direction of the platform.
            </p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Alternative Learning System - {SITE_CONFIG.name}.
              All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Website designed and developed by{" "}
              <a
                href="https://github.com/JustJhong609"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:text-accent-400 transition-colors inline-flex items-center gap-1"
              >
                Jhong
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
