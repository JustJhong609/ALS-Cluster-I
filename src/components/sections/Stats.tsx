"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, GraduationCap, BookOpen } from "lucide-react";
import { staggerContainer, staggerItem } from "@/utils/animations";

const STATS = [
  {
    icon: MapPin,
    value: 4,
    suffix: "",
    label: "Municipalities Covered",
    sub: "Manolo Fortich, Libona, Baungon & Malitbog",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    value: 22,
    suffix: "+",
    label: "Dedicated Educators",
    sub: "Teachers & program coordinators",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: BookOpen,
    value: 2,
    suffix: "",
    label: "ALS Programs",
    sub: "Elementary & Secondary level",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: GraduationCap,
    value: 100,
    suffix: "%",
    label: "Commitment to Learners",
    sub: "Free, flexible, quality education",
    color: "text-accent-600",
    bg: "bg-accent-50",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="bg-white border-y border-gray-100 py-12">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:shadow-md transition-shadow duration-300"
              >
                <div className={`p-4 rounded-2xl ${stat.bg} mb-4`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className={`text-4xl font-bold font-heading ${stat.color} mb-1`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-primary-800 font-semibold text-sm mb-1">
                  {stat.label}
                </p>
                <p className="text-gray-500 text-xs leading-snug">{stat.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
