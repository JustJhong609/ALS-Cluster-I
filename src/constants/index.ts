// Constants and Static Data for ALS Cluster I Website
import type {
  NavLink,
  TeamMember,
  Material,
  FAQItem,
  ContactSubject,
  FooterColumn,
  ContactInfo,
  SocialLink,
  Program,
  ALSPasser,
} from "@/types";

// ============================================
// SITE CONFIGURATION
// ============================================
export const SITE_CONFIG = {
  name: "Bukidnon ALS Cluster I",
  tagline: "Manolo Fortich, Libona, Baungon, Malitbog",
  description:
    "Bringing quality and flexible education to learners in Bukidnon through the Alternative Learning System.",
  heroTitle: "Alternative Learning System",
  heroSubtitle: "BUKIDNON CLUSTER I",
  heroDescription:
    "Bringing quality and flexible education to learners in Bukidnon.",
  videoUrl: "https://www.youtube.com/embed/2-ZgNsubzcs",
  videoTitle: "The Untold Story of ALS Teachers",
  videoDescription:
    "Behind every successful learner in the Alternative Learning System is a dedicated teacher. This video sheds light on their passion, challenges, and the impact they make in shaping lives beyond the traditional classroom.",
};

// ============================================
// NAVIGATION LINKS
// ============================================
export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "team", label: "Our Team", href: "#team" },
  { id: "materials", label: "Materials", href: "#materials" },
  { id: "passers", label: "Passers", href: "#passers" },
  { id: "forms", label: "Forms", href: "#forms" },
  { id: "contact", label: "Contact", href: "#contact" },
];

// ============================================
// MUNICIPALITIES / DISTRICTS
// ============================================
export const MUNICIPALITIES = [
  "All",
  "Division Office",
  "Manolo Fortich",
  "Libona",
  "Baungon",
  "Malitbog",
] as const;

// ============================================
// TEAM MEMBERS
// ============================================
export const TEAM_MEMBERS: TeamMember[] = [
  // Division Office
  {
    id: "1",
    name: "Alfredo G. De los Santos Jr.",
    role: "EPS II - ALS Bukidnon",
    district: "Division Office",
    imageUrl: "/images/images/SIRgigi2.jpg",
    email: "alfredo.delossantos@deped.gov.ph",
    experience: "20 years of ALS teaching experience",
    specialization: "Program Supervision & Coordination",
    bio: "Sir Alfredo leads the ALS program in Bukidnon Division with over two decades of experience in alternative education. He is passionate about ensuring every out-of-school youth and adult has access to quality education. Under his supervision, the ALS Cluster I has achieved remarkable success in learner completion rates.",
  },
  // Manolo Fortich
  {
    id: "2",
    name: "Kathlea Kristine C. De los Santos",
    role: "ALS Teacher - Manolo Fortich I",
    district: "Manolo Fortich",
    imageUrl: "/images/images/maamkai.jpg",
    specialization: "Elementary Level",
    bio: "Ma'am Kai specializes in elementary-level instruction, bringing creativity and patience to her teaching approach. She believes in the potential of every learner and works tirelessly to create an inclusive learning environment.",
  },
  {
    id: "3",
    name: "Julifer P. Labis",
    role: "ALS Teacher - Manolo Fortich II",
    district: "Manolo Fortich",
    imageUrl: "/images/images/maamjulifer.jpg",
    specialization: "Secondary Level",
    bio: "Ma'am Julifer is dedicated to secondary-level education, helping learners prepare for the A&E Test. Her innovative teaching methods and commitment to student success have helped many learners achieve their educational goals.",
  },
  {
    id: "4",
    name: "Reinell Peñaranda Madrona",
    role: "ALS Teacher - Manolo Fortich III",
    district: "Manolo Fortich",
    imageUrl: "/images/images/SIREINEL.jpg",
    specialization: "Outreach and Community Engagement",
    bio: "Sir Reinell focuses on community outreach, bringing ALS programs to remote barangays in Manolo Fortich. His dedication to reaching underserved communities has expanded educational opportunities for many out-of-school youth.",
  },
  {
    id: "5",
    name: "Nickolas Butaya",
    role: "ALS Teacher - Manolo Fortich I",
    district: "Manolo Fortich",
    imageUrl: "/images/images/sirnick.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "6",
    name: "Maylan Dave B. La Victoria",
    role: "ALS Teacher - Manolo Fortich IV",
    district: "Manolo Fortich",
    imageUrl: "/images/images/SIRDAVE.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "7",
    name: "Anthony Edmond G. Dumaog",
    role: "ALS Teacher - Manolo Fortich IV",
    district: "Manolo Fortich",
    imageUrl: "/images/images/SIRDUMAOG.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "8",
    name: "Janet Ipanag",
    role: "ALS Teacher - Manolo Fortich II",
    district: "Manolo Fortich",
    imageUrl: "/images/images/maamjanet.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "9",
    name: "Clauden Mark Llanes",
    role: "ALS Teacher - Manolo Fortich III",
    district: "Manolo Fortich",
    imageUrl: "/images/images/sirclaue.jpg",
    specialization: "Secondary Level",
  },
  // Libona
  {
    id: "10",
    name: "Marom C. Bulawit",
    role: "ALS Teacher - Libona II",
    district: "Libona",
    imageUrl: "/images/images/sirmarom.jpg",
    specialization: "Outreach and Community Engagement",
  },
  {
    id: "11",
    name: "Maria Jocel C. Budlong",
    role: "ALS Teacher - Libona II",
    district: "Libona",
    imageUrl: "/images/images/MAAMJOCEL.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "12",
    name: "Aresty Ugtalon",
    role: "ALS Teacher - Libona II",
    district: "Libona",
    imageUrl: "/images/images/maamaresty.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "13",
    name: "Cathlyn Mae Hatulan",
    role: "ALS Teacher - Libona I",
    district: "Libona",
    imageUrl: "/images/images/MaamCath.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "14",
    name: "Dylin Lucino",
    role: "ALS Teacher - Libona I",
    district: "Libona",
    imageUrl: "/images/images/maamdyline.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "15",
    name: "Marissa Dela Torre",
    role: "ALS Teacher - Libona I",
    district: "Libona",
    imageUrl: "/images/images/maammarisa.jpg",
    specialization: "Secondary Level",
  },
  // Baungon
  {
    id: "16",
    name: "Shahanie Magdale Galarpe",
    role: "ALS Teacher - Baungon I",
    district: "Baungon",
    imageUrl: "/images/images/maamShahanie.jpg",
    specialization: "Elementary Level",
  },
  {
    id: "17",
    name: "Mc Khevin Verga",
    role: "ALS Teacher - Baungon I",
    district: "Baungon",
    imageUrl: "/images/images/SIRKVEN.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "18",
    name: "Vannisa Arrabis",
    role: "ALS Teacher - Baungon II",
    district: "Baungon",
    imageUrl: "/images/images/maamvan.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "19",
    name: "Mary Jean Villastique - Quidoc",
    role: "ALS Teacher - Baungon II",
    district: "Baungon",
    imageUrl: "/images/images/maamjean.jpg",
    specialization: "Secondary Level",
  },
  // Malitbog
  {
    id: "20",
    name: "Rey Anthony Dalugdug",
    role: "ALS Teacher - Malitbog I",
    district: "Malitbog",
    imageUrl: "/images/images/sirtonmalitbog.jpg",
    specialization: "Social Sciences",
  },
  {
    id: "21",
    name: "Michael Jhun Q. Paculob",
    role: "ALS Teacher - Malitbog I",
    district: "Malitbog",
    imageUrl: "/images/images/SIRMIC.jpg",
    specialization: "Elementary Level",
  },
  {
    id: "22",
    name: "Renante Esta",
    role: "ALS Teacher - Malitbog II",
    district: "Malitbog",
    imageUrl: "/images/images/siren.jpg",
    specialization: "Secondary Level",
  },
  {
    id: "23",
    name: "Eldan John Sevilla",
    role: "ALS Teacher - Malitbog II",
    district: "Malitbog",
    imageUrl: "/images/images/sirsevilla.jpg",
    specialization: "Secondary Level",
  },
];

// ============================================
// LEARNING MATERIALS
// ============================================
export const MATERIALS: Material[] = [
  // Elementary Level
  {
    id: "elem-ls1",
    strandCode: "LS1",
    strandName: "Communication Skills",
    description:
      "Develops listening, speaking, reading, and writing skills to communicate effectively.",
    level: "Elementary",
    downloadLink:
      "https://drive.google.com/drive/folders/1he2mJa8qzkSg-hG12FRfiueXZ9sR2xBC?usp=drive_link",
    icon: "BookOpen",
    color: "blue",
  },
  {
    id: "elem-ls2",
    strandCode: "LS2",
    strandName: "Scientific Literacy",
    description:
      "Introduces basic science concepts and encourages curiosity and problem-solving.",
    level: "Elementary",
    downloadLink:
      "https://drive.google.com/file/d/1O-hRoWcQFmUne8RD09_x5xka_jt2JiOn/view?usp=drive_link",
    icon: "FlaskConical",
    color: "red",
  },
  {
    id: "elem-ls3",
    strandCode: "LS3",
    strandName: "Mathematical Skills",
    description:
      "Builds numeracy, logical reasoning, and everyday math application.",
    level: "Elementary",
    downloadLink:
      "https://drive.google.com/file/d/1VVaV4dep8NSNRiYOsHsfxNp-tulJ0mvM/view?usp=drive_link",
    icon: "Calculator",
    color: "green",
  },
  {
    id: "elem-ls4",
    strandCode: "LS4",
    strandName: "Life and Career Skills",
    description:
      "Focuses on self-management, social skills, and preparation for simple work tasks.",
    level: "Elementary",
    downloadLink:
      "https://drive.google.com/file/d/19wC5TXGw3Xt6UoSr0KdiwBOt5VFjPK4a/view?usp=drive_link",
    icon: "Briefcase",
    color: "yellow",
  },
  {
    id: "elem-ls5",
    strandCode: "LS5",
    strandName: "Understanding Self and Society",
    description:
      "Promotes awareness of self, family, community, and basic citizenship.",
    level: "Elementary",
    downloadLink:
      "https://drive.google.com/file/d/1tuDVzaZ9OrlxshFwqfQhUcJiKGcogI4a/view?usp=drive_link",
    icon: "Users",
    color: "purple",
  },
  {
    id: "elem-ls6",
    strandCode: "LS6",
    strandName: "Digital Citizenship",
    description:
      "Encourages safe, responsible, and effective use of digital tools.",
    level: "Elementary",
    downloadLink:
      "https://drive.google.com/file/d/1pHpf13Lqv6yE7NZy7r7JcFGnZqzDk0xH/view?usp=drive_link",
    icon: "Laptop",
    color: "indigo",
  },
  // Secondary Level
  {
    id: "sec-ls1",
    strandCode: "LS1",
    strandName: "Communication Skills",
    description:
      "Enhances comprehension, writing, and critical communication skills.",
    level: "Secondary",
    downloadLink:
      "https://drive.google.com/drive/folders/1CXB2Rk9daFjRXEtVYDuRy-H3R42DyEK8?usp=drive_link",
    icon: "BookOpen",
    color: "blue",
  },
  {
    id: "sec-ls2",
    strandCode: "LS2",
    strandName: "Scientific Literacy",
    description:
      "Explores deeper science concepts, evidence-based reasoning, and environmental awareness.",
    level: "Secondary",
    downloadLink:
      "https://drive.google.com/file/d/1b9VfOopEwLvtgXbDBtYeHQsoW0lQFwaN/view?usp=drive_link",
    icon: "FlaskConical",
    color: "red",
  },
  {
    id: "sec-ls3",
    strandCode: "LS3",
    strandName: "Mathematical Skills",
    description:
      "Strengthens higher-level numeracy and practical applications of mathematics.",
    level: "Secondary",
    downloadLink:
      "https://drive.google.com/file/d/1vfUyPA5WBSoVeGKW-beQ5KoI3_oQeD2c/view?usp=drive_link",
    icon: "Calculator",
    color: "green",
  },
  {
    id: "sec-ls4",
    strandCode: "LS4",
    strandName: "Life and Career Skills",
    description: "Prepares learners for work, entrepreneurship, and decision-making.",
    level: "Secondary",
    downloadLink:
      "https://drive.google.com/file/d/1WvKzegkEFJjOdw7VmdukG_VZFEbKPdt5/view?usp=drive_link",
    icon: "Briefcase",
    color: "yellow",
  },
  {
    id: "sec-ls5",
    strandCode: "LS5",
    strandName: "Understanding Self and Society",
    description: "Builds values, cultural awareness, and civic responsibility.",
    level: "Secondary",
    downloadLink:
      "https://drive.google.com/file/d/1zlldBSfa4SJ-4W9032pMRLbwqgkN3Pxm/view?usp=drive_link",
    icon: "Users",
    color: "purple",
  },
  {
    id: "sec-ls6",
    strandCode: "LS6",
    strandName: "Digital Citizenship",
    description:
      "Advances ICT skills, responsible use of technology, and digital literacy.",
    level: "Secondary",
    downloadLink:
      "https://drive.google.com/file/d/14a6NSoTtHoO8Sw-1Avt5x_7Ob8KgAsFs/view?usp=drive_link",
    icon: "Laptop",
    color: "indigo",
  },
];

// ============================================
// BLP MODULES DATA
// ============================================
export const BLP_MODULE = {
  title: "Basic Literacy Program (BLP) Modules",
  description: "The BLP is for learners who are non-literate or have very limited literacy and numeracy skills.",
  features: [
    "Focus: Reading, writing, and basic math",
    "Daily life skills",
    "Foundation for entering ALS Elementary Level",
  ],
  downloadLink: "https://docs.google.com/spreadsheets/d/1mtRLDltaFcioM5AKl7cgR6nrJi7WkJgl/edit?usp=sharing&ouid=105726352933157495386&rtpof=true&sd=true",
};

// ============================================
// A&E MODULES DATA
// ============================================
export const AE_MODULES = {
  title: "Accreditation and Equivalency (A&E) Modules",
  description: "The A&E is for learners who are able to read, write, and compute but have not completed basic education.",
  features: [
    "Focus: Functional literacy and lifelong learning skills",
    "Preparation for Elementary or Junior High School level accreditation",
    "Application of knowledge in real-life contexts",
  ],
  modules: [
    {
      id: "module-1",
      name: "Module 1",
      hasLanguageOptions: true,
      elementary: {
        filipino: "https://drive.google.com/drive/folders/1Zr04cDuiCHkUW2s3iMFNhS4Av3nky_MT?usp=drive_link",
        english: "https://drive.google.com/drive/folders/1ZiQnHAHomMel1EGrOHx2bGfDjn6pknnf?usp=drive_link",
      },
      jhs: {
        filipino: "https://drive.google.com/drive/folders/1UskTdBjYaonISubFDcT4IyBl-0PI-wsj?usp=drive_link",
        english: "https://drive.google.com/drive/folders/1HgpDIJzClQXDEZIVZQDER99ZSPs2fapQ?usp=drive_link",
      },
    },
    {
      id: "module-2",
      name: "Module 2",
      hasLanguageOptions: false,
      elementary: "https://drive.google.com/drive/folders/1YR02wE4OWbNbg7gypc4KCC3K-8REytJa?usp=drive_link",
      jhs: "https://drive.google.com/drive/folders/1MrvYY9EorjPXcN1ljAsi5R3_YQCaNVPy?usp=drive_link",
    },
    {
      id: "module-3",
      name: "Module 3",
      hasLanguageOptions: false,
      elementary: "https://drive.google.com/drive/folders/1-qNWYKf0DcrB48SjRIJPG373tNC9aY-d?usp=drive_link",
      jhs: "https://drive.google.com/drive/folders/1Qeq7g7anWgMIGAZySIHvNTi_wUhHNf9w?usp=drive_link",
    },
    {
      id: "module-4",
      name: "Module 4",
      hasLanguageOptions: false,
      elementary: "https://drive.google.com/",
      jhs: "https://drive.google.com/drive/folders/1gt0SBTKOiBqwKU41MZNOHvTdUbKbvLi9?usp=drive_link",
    },
    {
      id: "module-5",
      name: "Module 5",
      hasLanguageOptions: false,
      elementary: "https://drive.google.com/file/d/1bPZ_xaI0PCANo66hjN8NILjqyUFLKwTJ/view?usp=drive_link",
      jhs: "https://drive.google.com/file/d/140Hgpi396PNM-ogOEGjjf8qXTkQiXy2P/view?usp=drive_link",
    },
    {
      id: "module-6",
      name: "Module 6",
      hasLanguageOptions: false,
      elementary: "https://drive.google.com/drive/folders/1Udq-PwXc9zLJoSJR41GU4XFXMXhYRAOW?usp=drive_link",
      jhs: "https://drive.google.com/drive/folders/1H1xhb-xvZp348PwjGAdANcXVWdmZSuHc?usp=drive_link",
    },
  ],
};

// ============================================
// FAQ / ABOUT ACCORDION
// ============================================
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-is-als",
    question: "What is the Alternative Learning System (ALS)?",
    answer:
      "The Alternative Learning System (ALS) is a parallel learning system in the Philippines that provides a practical option to the existing formal instruction. When one does not have or cannot access formal education in schools, ALS serves as an alternative. It includes both non-formal and informal sources of knowledge and skills.",
  },
  {
    id: "why-als",
    question: "Why is there a need for ALS?",
    answer:
      "Many Filipinos do not have a chance to attend and finish formal basic education (Grades 1-6 and Years 1-4) due to various reasons. Some drop out of school while others live in communities without schools. Since every Filipino has a right to free basic education, the Government established ALS to provide all Filipinos with the chance to access and complete basic education in a way that fits their distinct situations and needs.",
  },
  {
    id: "als-basis",
    question: "What is the basis of ALS implementation?",
    answer:
      "The 1987 Philippine Constitution recognizes and promotes other forms of education beyond formal schooling. Article XIV, Section 2, Paragraph (1) mandates the State to establish a complete, adequate, and integrated system of education relevant to the needs of the people and society. Paragraph (4) also encourages non-formal, informal, and indigenous learning systems, including self-learning and out-of-school study programs. Furthermore, Republic Act 9155 (The Governance Act for Basic Education) stipulates the establishment of ALS to provide basic education to out-of-school children, youth, and adults.",
  },
  {
    id: "how-als-works",
    question: "How does ALS work?",
    answer:
      "ALS is implemented through two major programs: the Basic Literacy Program and the Continuing Education Program – Accreditation and Equivalency (A&E). Both programs are modular and flexible, meaning that learning can take place anytime and anywhere, depending on the convenience and availability of learners.",
  },
  {
    id: "als-vs-formal",
    question: "What is the difference between Formal Education and ALS?",
    answer:
      "The Formal Education system is classroom-based and managed by trained teachers in schools. In contrast, ALS is non-formal and community-based, conducted in learning centers, barangay halls, libraries, or even homes. It is facilitated by ALS learning facilitators such as mobile teachers, district ALS coordinators, or instructional managers, at flexible schedules agreed upon by learners and facilitators.",
  },
];

// ============================================
// ALS PASSERS DATA - Simple card-based view
// ============================================
export const ALS_PASSERS_CARDS = [
  {
    id: "enrollment-completers",
    title: "Calendar Year 2023-2024",
    subtitle: "Enrolment & Completers",
    description: "View detailed information about student enrollment and completion statistics for the academic year 2023-2024.",
    icon: "Calendar",
    color: "blue",
    link: "https://drive.google.com/drive/folders/1L636Ox_LmqKBHAo2qhKlwTVrSENUQD1G?usp=drive_link",
  },
  {
    id: "ae-passers",
    title: "2019-2024",
    subtitle: "A&E Completers & Passers",
    description: "Access comprehensive records of Accreditation & Equivalency completers and passers from 2019 to 2024.",
    icon: "GraduationCap",
    color: "green",
    link: "https://drive.google.com/drive/folders/1I3JGT53Bp4Ai-UIpHFI9sp3lNiIfZCxS?usp=sharing",
  },
];

// Legacy - for timeline component if needed later
export const ALS_PASSERS: ALSPasser[] = [
  {
    id: "2024",
    year: 2024,
    level: "Secondary",
    totalPassers: 150,
    district: "Manolo Fortich",
    highlights: "Record-breaking year with highest passing rate",
  },
  {
    id: "2023",
    year: 2023,
    level: "Secondary",
    totalPassers: 132,
    district: "Manolo Fortich",
  },
  {
    id: "2022",
    year: 2022,
    level: "Secondary",
    totalPassers: 98,
    district: "Manolo Fortich",
  },
  {
    id: "2021",
    year: 2021,
    level: "Secondary",
    totalPassers: 85,
    district: "Manolo Fortich",
  },
  {
    id: "2020",
    year: 2020,
    level: "Secondary",
    totalPassers: 72,
    district: "Manolo Fortich",
    highlights: "Pandemic year - Virtual A&E Test",
  },
  {
    id: "2019",
    year: 2019,
    level: "Secondary",
    totalPassers: 110,
    district: "Manolo Fortich",
  },
];

// ============================================
// CONTACT SUBJECTS
// ============================================
export const CONTACT_SUBJECTS: ContactSubject[] = [
  { value: "enrollment", label: "Enrollment Inquiry" },
  { value: "materials", label: "Learning Materials" },
  { value: "session", label: "Learning Session Schedule" },
  { value: "ae-test", label: "A&E Test Information" },
  { value: "other", label: "Other Concerns" },
];

// ============================================
// CONTACT INFORMATION
// ============================================
export const CONTACT_INFO: ContactInfo = {
  address: "Bukidnon Division Office, Malaybalay City, Bukidnon",
  phone: "(088) 813-5665",
  email: "als.bukidnon@deped.gov.ph",
  hours: "Mon-Fri: 8AM-5PM",
};

// ============================================
// SOCIAL LINKS
// ============================================
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Facebook",
    href: "https://facebook.com/alsbukidnon",
    icon: "Facebook",
  },
  {
    platform: "Twitter",
    href: "https://twitter.com/alsbukidnon",
    icon: "Twitter",
  },
  {
    platform: "Instagram",
    href: "https://instagram.com/alsbukidnon",
    icon: "Instagram",
  },
];

// ============================================
// PROGRAMS
// ============================================
export const PROGRAMS: Program[] = [
  {
    id: "blp",
    name: "Basic Literacy Program",
    description: "For learners who cannot read and write.",
  },
  {
    id: "elem-ae",
    name: "Elementary A&E",
    description: "Equivalent to Elementary education.",
  },
  {
    id: "sec-ae",
    name: "Secondary A&E",
    description: "Equivalent to Secondary education.",
  },
  {
    id: "family-lit",
    name: "Family Literacy",
    description: "Whole family learning approach.",
  },
  {
    id: "livelihood",
    name: "Livelihood Education",
    description: "Skills for income generation.",
  },
];

// ============================================
// FOOTER COLUMNS
// ============================================
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "About ALS", href: "#about" },
      { label: "Learning Materials", href: "#materials" },
      { label: "Forms", href: "#forms" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Basic Literacy Program", href: "#" },
      { label: "Elementary A&E", href: "#" },
      { label: "Secondary A&E", href: "#" },
      { label: "Family Literacy", href: "#" },
      { label: "Livelihood Education", href: "#" },
    ],
  },
];

// ============================================
// LEARNING LEVELS FOR TABS
// ============================================
export const LEARNING_LEVELS = ["Elementary", "Secondary"] as const;

// ============================================
// MATERIAL ICON COLORS MAP
// ============================================
export const MATERIAL_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-700" },
  red: { bg: "bg-red-100", text: "text-red-700" },
  green: { bg: "bg-green-100", text: "text-green-700" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-700" },
  purple: { bg: "bg-purple-100", text: "text-purple-700" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-700" },
};
