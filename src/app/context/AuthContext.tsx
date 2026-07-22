// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  // Keep client state in sync with the server session (refresh/direct URL access).
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("http://localhost:3000/api/auth/session", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) {
          if (alive) setUser(null);
          return;
        }
        const session = await res.json();
        // `role` can be forced to "admin" to reuse existing /api/admin/* gates.
        // Use `displayRole` when present to show the real role in UI (teacher/staff/etc).
        const role = session?.displayRole ?? session?.role ?? null;
        if (alive) setUser(role);
      } catch {
        if (alive) setUser(null);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);