"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, User, X, MapPin, Briefcase, Award, ChevronDown, ChevronUp, Users } from "lucide-react";
import { TEAM_MEMBERS, MUNICIPALITIES } from "@/constants";
import { cn } from "@/utils/helpers";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
} from "@/utils/animations";
import type { TeamMember } from "@/types";

// Modal animation variants
const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { duration: 0.2 }
  },
};

// Team Member Modal Component
function TeamMemberModal({ 
  member, 
  onClose 
}: { 
  member: TeamMember; 
  onClose: () => void;
}) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div
      variants={modalOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Image Section */}
        <div className="relative h-72 bg-gradient-to-br from-primary-100 to-primary-200">
          {member.imageUrl && !member.imageUrl.includes("placeholder") ? (
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-32 h-32 text-primary-300" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* District Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-4 py-2 bg-accent-500 text-primary-900 text-sm font-bold rounded-full shadow-lg">
              {member.district}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-primary-800 mb-1">
            {member.name}
          </h3>
          <p className="text-deped-red font-semibold mb-4">
            {member.role}
          </p>

          {/* Details Grid */}
          <div className="space-y-3 mb-4">
            {member.specialization && (
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm">{member.specialization}</span>
              </div>
            )}
            
            {member.experience && (
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-accent-50 rounded-lg">
                  <Award className="w-4 h-4 text-accent-600" />
                </div>
                <span className="text-sm">{member.experience}</span>
              </div>
            )}

            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-green-50 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm">{member.district}, Bukidnon</span>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <div className="mb-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          )}

          {/* Default bio if none provided */}
          {!member.bio && (
            <div className="mb-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                A dedicated ALS educator committed to providing quality alternative education 
                to out-of-school youth and adults in {member.district}. Passionate about 
                empowering learners and helping them achieve their educational goals.
              </p>
            </div>
          )}

          {/* Email Button */}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center justify-center gap-2 w-full bg-primary-800 hover:bg-primary-700 
                       text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Team() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Number of members to show when collapsed
  const INITIAL_DISPLAY_COUNT = 8;

  // Filter team members by municipality
  const filteredMembers =
    activeTab === "All"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((member) => member.district === activeTab);

  // Members to display based on expanded state
  const displayedMembers = isExpanded 
    ? filteredMembers 
    : filteredMembers.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMoreMembers = filteredMembers.length > INITIAL_DISPLAY_COUNT;
  const hiddenCount = filteredMembers.length - INITIAL_DISPLAY_COUNT;

  // Reset expanded state when tab changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeTab]);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="section-padding bg-white"
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
            Our Team
          </span>
          <h2 className="heading-2 text-primary-800 mb-4">
            Meet Our Dedicated Educators
          </h2>
          <p className="text-gray-600 text-lg">
            Our team of passionate ALS teachers and coordinators work tirelessly
            to bring quality education to every learner in our cluster.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {MUNICIPALITIES.map((municipality) => (
            <button
              key={municipality}
              onClick={() => setActiveTab(municipality)}
              className={cn(
                "tab",
                activeTab === municipality && "tab-active"
              )}
            >
              {municipality}
            </button>
          ))}
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={staggerItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
                whileHover="hover"
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <motion.div
                  variants={cardHover}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-primary-200 transition-colors"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {member.imageUrl &&
                      !member.imageUrl.includes("placeholder") ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <User className="w-20 h-20 text-primary-400" />
                        </div>
                      )}
                    </div>
                    {/* District Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent-500 text-primary-900 text-xs font-semibold rounded-full shadow-md">
                        {member.district}
                      </span>
                    </div>
                    {/* Click hint overlay */}
                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-primary-800/80 px-4 py-2 rounded-full">
                        View Profile
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 text-center">
                    <h4 className="text-lg font-bold text-primary-800 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-deped-red font-medium text-sm mb-2">
                      {member.role}
                    </p>
                    {member.specialization && (
                      <p className="text-gray-500 text-sm">
                        {member.specialization}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See All / Collapse Button */}
        {hasMoreMembers && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-800 hover:bg-primary-700 
                       text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Users className="w-5 h-5" />
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  See All Teachers ({hiddenCount} more)
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center py-16"
          >
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No team members found for {activeTab}.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
