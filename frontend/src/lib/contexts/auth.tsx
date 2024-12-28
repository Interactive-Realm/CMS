// import supabase from "@/config/supabase";

import { type ReactNode, createContext, useContext, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: true, // TODO: Change this
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthContextProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
