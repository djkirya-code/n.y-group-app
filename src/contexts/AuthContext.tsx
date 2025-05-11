
"use client";
import type { User } from "firebase/auth";
import React, { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { onAuthUserChanged } from "@/services/authService";
import { Skeleton } from "@/components/ui/skeleton";

const ADMIN_EMAIL = "work.kirill.it@gmail.com";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthUserChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user?.email === ADMIN_EMAIL;

  // Display a full-page loading skeleton while auth state is being determined
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }
  

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

