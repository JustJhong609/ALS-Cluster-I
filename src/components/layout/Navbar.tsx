"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";
import { cn, scrollToSection } from "@/utils/helpers";
import { navbarSlide, mobileMenuSlide, fadeInDown } from "@/utils/animations";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/ui/LoginModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const { auth, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle navbar visibility on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    // Add background when scrolled
    setIsScrolled(currentScrollY > 50);
    
    // Auto-hide logic: hide when scrolling down, show when scrolling up
    if (currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
      setIsOpen(false); // Close mobile menu when hiding
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  });

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(sectionId);
    setActiveSection(sectionId);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      variants={navbarSlide}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-primary-900/95 backdrop-blur-lg shadow-lg"
          : "bg-primary-900/80 backdrop-blur-sm"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 md:gap-3 group"
          >
            {/* Logos */}
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                <Image
                  src="/images/images/ALSLOGO.png"
                  alt="ALS Logo"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="hidden xs:block relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                <Image
                  src="/images/images/BUKIDNONOLOGO.png"
                  alt="Bukidnon Logo"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>

            {/* Site Name */}
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white text-sm md:text-lg leading-tight group-hover:text-accent-400 transition-colors">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
              <span className="text-accent-400 text-[10px] md:text-xs hidden sm:block">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "nav-link px-3 py-2 text-sm lg:text-base font-medium",
                  activeSection === link.id && "active text-white"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Button */}
            <div className="ml-4 pl-4 border-l border-white/20">
              {auth.isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden lg:block">
                    <p className="text-accent-400 text-xs">Welcome,</p>
                    <p className="text-white text-sm font-medium">{auth.district || "User"}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline">Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-white/10">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.id}
                    variants={fadeInDown}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={cn(
                        "block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200",
                        activeSection === link.id &&
                          "text-white bg-white/10 border-l-4 border-accent-500"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Section */}
                <motion.div
                  variants={fadeInDown}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                  className="pt-4 mt-4 border-t border-white/10"
                >
                  {auth.isLoggedIn ? (
                    <div className="space-y-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-900" />
                        </div>
                        <div>
                          <p className="text-accent-400 text-xs">Welcome,</p>
                          <p className="text-white font-medium">{auth.district || "User"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 mx-4"
                      style={{ width: "calc(100% - 32px)" }}
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal for manual login */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        pendingDownloadUrl={null}
      />
    </motion.header>
  );
}
