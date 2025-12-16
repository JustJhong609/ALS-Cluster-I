// Types for ALS Cluster I Website
import { LucideIcon } from "lucide-react";

// Navigation Types
export interface NavLink {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
}

// Team Member Types
export type Municipality =
  | "Manolo Fortich"
  | "Libona"
  | "Baungon"
  | "Malitbog"
  | "Division Office";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  district: Municipality;
  imageUrl: string;
  email?: string;
  experience?: string;
  specialization?: string;
  bio?: string;
}

// Learning Materials Types
export type LearningLevel = "Elementary" | "Secondary";

export type LearningStrand =
  | "LS1"
  | "LS2"
  | "LS3"
  | "LS4"
  | "LS5"
  | "LS6";

export interface Material {
  id: string;
  strandCode: LearningStrand;
  strandName: string;
  description: string;
  level: LearningLevel;
  downloadLink: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
}

// FAQ / Accordion Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ALS Passers Types
export interface ALSPasser {
  id: string;
  year: number;
  level: LearningLevel;
  totalPassers: number;
  district: Municipality;
  highlights?: string;
}

// Contact Form Types
export interface ContactSubject {
  value: string;
  label: string;
}

// Footer Links Types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Contact Info Types
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

// Social Media Types
export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

// Program Types
export interface Program {
  id: string;
  name: string;
  description: string;
  href?: string;
}
