"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { LoginModal } from "@/components/ui/LoginModal";

interface AuthState {
  isLoggedIn: boolean;
  district: string | null;
  email: string | null;
  loginTime: number | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (district: string, email: string) => void;
  logout: () => void;
  requireLogin: (downloadUrl: string) => void;
  isModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    district: null,
    email: null,
    loginTime: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("als_auth");
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        const elapsed = Date.now() - parsed.loginTime;
        
        // Check if session is still valid (within inactivity timeout)
        if (elapsed < INACTIVITY_TIMEOUT) {
          setAuth({
            isLoggedIn: true,
            district: parsed.district,
            email: parsed.email,
            loginTime: parsed.loginTime,
          });
        } else {
          // Session expired
          localStorage.removeItem("als_auth");
        }
      } catch (error) {
        localStorage.removeItem("als_auth");
      }
    }
  }, []);

  // Auto-logout on inactivity
  useEffect(() => {
    if (!auth.isLoggedIn) return;

    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
    events.forEach(event => {
      window.addEventListener(event, resetTimer, true);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer, true);
      });
    };
  }, [auth.isLoggedIn]);

  const login = useCallback((district: string, email: string) => {
    const newAuth = {
      isLoggedIn: true,
      district,
      email,
      loginTime: Date.now(),
    };
    setAuth(newAuth);
    localStorage.setItem("als_auth", JSON.stringify(newAuth));
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
      district: null,
      email: null,
      loginTime: null,
    });
    localStorage.removeItem("als_auth");
  }, []);

  const requireLogin = useCallback((downloadUrl: string) => {
    if (auth.isLoggedIn) {
      // Already logged in, proceed with download
      window.open(downloadUrl, "_blank");
    } else {
      // Show login modal
      setPendingDownloadUrl(downloadUrl);
      setIsModalOpen(true);
    }
  }, [auth.isLoggedIn]);

  const handleLoginSuccess = useCallback((downloadUrl: string) => {
    // Update auth state
    const savedAuth = localStorage.getItem("als_auth");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      setAuth({
        isLoggedIn: true,
        district: parsed.district,
        email: parsed.email,
        loginTime: parsed.loginTime,
      });
    }
    
    // Open download
    window.open(downloadUrl, "_blank");
    
    // Reset pending URL
    setPendingDownloadUrl(null);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setPendingDownloadUrl(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, requireLogin, isModalOpen }}>
      {children}
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLoginSuccess={handleLoginSuccess}
        pendingDownloadUrl={pendingDownloadUrl}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
