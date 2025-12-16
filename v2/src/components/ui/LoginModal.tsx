"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, MapPin, Eye, EyeOff, Loader2, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react";

// District credentials (same as v1)
const DISTRICT_OPTIONS = [
  { value: "", label: "Select your district" },
  { value: "baungondistrict@gmail.com", label: "Baungon District", password: "BaungonDistrict12345" },
  { value: "libonadistrict@gmail.com", label: "Libona District", password: "LibonaDistrict12345" },
  { value: "malitbogdistrict@gmail.com", label: "Malitbog District", password: "MalitbogDistrict12345" },
  { value: "manolodistrict@gmail.com", label: "Manolo Fortich District", password: "ManoloDistrict12345" },
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (downloadUrl: string) => void;
  pendingDownloadUrl: string | null;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess, pendingDownloadUrl }: LoginModalProps) {
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setDistrict("");
      setPassword("");
      setError(null);
      setSuccess(false);
      setShowPassword(false);
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

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find the selected district
    const selectedDistrict = DISTRICT_OPTIONS.find(d => d.value === district);
    
    if (!selectedDistrict || !selectedDistrict.password) {
      setError("Please select a district");
      setIsLoading(false);
      return;
    }

    // Validate password
    if (password === selectedDistrict.password) {
      setSuccess(true);
      
      // Save login state
      localStorage.setItem("als_auth", JSON.stringify({
        district: selectedDistrict.label,
        email: selectedDistrict.value,
        loginTime: Date.now(),
      }));

      // Wait a moment to show success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Trigger download
      if (pendingDownloadUrl) {
        onLoginSuccess(pendingDownloadUrl);
      }
      
      onClose();
    } else {
      setError("Invalid password. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => !isLoading && onClose()}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
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
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
                <p className="text-gray-600">Please sign in to download learning materials</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* District Select */}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <div className="relative">
                    <select
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                      disabled={isLoading || success}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {DISTRICT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading || success}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || success}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing In...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Success!
                    </>
                  ) : (
                    "Sign In"
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
                    className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
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
                    <span className="text-sm">Login successful! Starting download...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Don&apos;t have an account?</p>
                <p className="text-sm text-gray-800 font-medium mb-3">Contact your Cluster Supervisor:</p>
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="mailto:als.bukidnon@deped.gov.ph"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    als.bukidnon@deped.gov.ph
                  </a>
                  <a
                    href="tel:(088) 813-5665"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
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
