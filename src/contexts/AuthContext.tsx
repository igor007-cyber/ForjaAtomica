"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SessionUser } from "@/src/types";
import * as authService from "@/src/services/authService";

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => SessionUser;
  register: (name: string, email: string, password: string) => SessionUser;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hidratação única da sessão a partir do localStorage (SSR-safe).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(authService.getSession());
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const session = authService.login(email, password);
    setUser(session);
    return session;
  }, []);

  const register = useCallback(
    (name: string, email: string, password: string) => {
      const session = authService.register(name, email, password);
      setUser(session);
      return session;
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
