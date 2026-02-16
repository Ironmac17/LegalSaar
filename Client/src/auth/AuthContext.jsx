import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);

  // Restore user from token on app load
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Try to fetch user profile to validate token
          const res = await api.get("/auth/me");
          setUser(res.data.user);
        } catch (err) {
          console.error("Failed to restore user:", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, language, setLanguage, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
