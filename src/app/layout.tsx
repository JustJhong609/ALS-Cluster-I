import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "ALS Cluster I - Alternative Learning System | Bukidnon",
    template: "%s | ALS Cluster I Bukidnon",
  },
  description:
    "Bringing quality and flexible education to learners in Bukidnon through the Alternative Learning System. Serving Manolo Fortich, Libona, Baungon, and Malitbog.",
  keywords: [
    "ALS",
    "Alternative Learning System",
    "Bukidnon",
    "DepEd",
    "Education",
    "Manolo Fortich",
    "Libona",
    "Baungon",
    "Malitbog",
    "Out-of-school youth",
    "A&E Test",
    "Philippines Education",
  ],
  authors: [
    {
      name: "Jhong",
      url: "https://github.com/JustJhong609",
    },
  ],
  creator: "ALS Cluster I Bukidnon",
  publisher: "Department of Education - Bukidnon Division",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://als-cluster-i.vercel.app"),
  openGraph: {
    title: "ALS Cluster I - Alternative Learning System | Bukidnon",
    description:
      "Bringing quality and flexible education to learners in Bukidnon through the Alternative Learning System.",
    url: "https://als-cluster-i.vercel.app",
    siteName: "ALS Cluster I Bukidnon",
    images: [
      {
        url: "/images/images/ALSPIC.jpg",
        width: 1200,
        height: 630,
        alt: "ALS Cluster I Bukidnon",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALS Cluster I - Alternative Learning System | Bukidnon",
    description:
      "Bringing quality and flexible education to learners in Bukidnon.",
    images: ["/images/images/ALSPIC.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/images/ALSLOGO.png", type: "image/png" },
    ],
    apple: [{ url: "/images/images/ALSLOGO.png" }],
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e3a8a" },
    { media: "(prefers-color-scheme: dark)", color: "#1e2a5e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                     bg-primary-800 text-white px-4 py-2 rounded-lg z-[100] focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Auth Provider wraps all content */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
