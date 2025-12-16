// Framer Motion Animation Variants
import { Variants } from "framer-motion";

// ============================================
// FADE IN UP - Basic reveal animation
// ============================================
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// FADE IN DOWN - Dropdown animation
// ============================================
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ============================================
// FADE IN LEFT/RIGHT - Slide animations
// ============================================
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ============================================
// SCALE IN - Pop-in animation
// ============================================
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// STAGGER CONTAINER - For staggered children
// ============================================
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// ============================================
// STAGGER ITEM - Child for stagger container
// ============================================
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================
// HERO TEXT ANIMATION - Staggered text reveal
// ============================================
export const heroTextContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const heroTextItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// PARALLAX EFFECT
// ============================================
export const parallaxY = (yOffset: number = 50): Variants => ({
  hidden: { y: 0 },
  visible: {
    y: yOffset,
    transition: {
      duration: 0,
    },
  },
});

// ============================================
// NAVBAR ANIMATIONS
// ============================================
export const navbarSlide: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const mobileMenuSlide: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// ============================================
// ACCORDION ANIMATION
// ============================================
export const accordionContent: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  },
};

// ============================================
// CARD HOVER EFFECTS
// ============================================
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// ============================================
// BUTTON ANIMATIONS
// ============================================
export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
  },
};

export const buttonHover = {
  scale: 1.02,
  transition: {
    duration: 0.2,
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ============================================
// SCROLL-TRIGGERED ANIMATIONS (InView)
// ============================================
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const scrollRevealScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// UTILITY: Create custom delay variant
// ============================================
export const createDelayedVariant = (
  baseVariant: Variants,
  delay: number
): Variants => {
  return {
    ...baseVariant,
    visible: {
      ...baseVariant.visible,
      transition: {
        ...(baseVariant.visible as any)?.transition,
        delay,
      },
    },
  };
};

// ============================================
// VIEWPORT OPTIONS for whileInView
// ============================================
export const viewportOptions = {
  once: true,
  amount: 0.2,
};

export const viewportOptionsEager = {
  once: true,
  amount: 0.1,
};

export const viewportOptionsStrict = {
  once: true,
  amount: 0.4,
};
