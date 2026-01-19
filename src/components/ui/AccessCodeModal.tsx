"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// Valid access codes (managed by Cluster Supervisor)
// Maximum 10 codes as per requirement
const VALID_ACCESS_CODES = [
  "847293", // Code 1
  "526184", // Code 2
  "391758", // Code 3
  "682045", // Code 4
  "945617", // Code 5
  // Add more codes here (max 10 total)
  // Cluster supervisor can provide these codes to authorized users
];

// Modal animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
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

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: () => void;
  resourceTitle: string;
}

export function AccessCodeModal({ 
  isOpen, 
  onClose, 
  onAccessGranted,
  resourceTitle 
}: AccessCodeModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCode("");
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate code format (6 digits)
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code");
      setIsLoading(false);
      return;
    }

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if code is valid
    if (VALID_ACCESS_CODES.includes(code)) {
      setSuccess(true);
      
      // Wait a moment to show success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Grant access
      onAccessGranted();
      onClose();
    } else {
      setError("Invalid access code. Please contact your Cluster Supervisor for a valid code.");
    }
    
    setIsLoading(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Only digits, max 6
    setCode(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto min-h-screen"
          onClick={() => !isLoading && onClose()}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Restricted Access</h2>
                <p className="text-gray-600 text-sm">
                  {resourceTitle}
                </p>
              </div>

              {/* Data Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm mb-1">
                      Data Privacy Act Compliance
                    </h3>
                    <p className="text-blue-800 text-xs leading-relaxed">
                      This content contains sensitive student information protected under the 
                      <strong> Data Privacy Act of 2012 (RA 10173)</strong>. Access requires 
                      special permission from the Cluster Supervisor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Access Code Input */}
                <div>
                  <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                    6-Digit Access Code
                  </label>
                  <input
                    type="text"
                    id="accessCode"
                    value={code}
                    onChange={handleCodeChange}
                    required
                    disabled={isLoading || success}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-center text-2xl font-mono tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Enter the code provided by your Cluster Supervisor
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || success || code.length !== 6}
                  className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Access Granted!
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Verify Access Code
                    </>
                  )}
                </button>
              </form>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">Access verified! Opening resource...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Need an access code?</p>
                <p className="text-sm text-gray-800 font-medium mb-3">
                  Contact the Cluster Supervisor:
                </p>
                <div className="flex flex-col items-center gap-2 text-sm">
                  <a
                    href="mailto:als.bukidnon@deped.gov.ph"
                    className="text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    als.bukidnon@deped.gov.ph
                  </a>
                  <a
                    href="tel:(088) 813-5665"
                    className="text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    (088) 813-5665
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
