/* eslint-disable react-refresh/only-export-components */
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

  const loginPassword = async (phone, password) => {
    const res = await api.post("/auth/login-password", { phone, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, phone, password) => {
    const res = await api.post("/auth/register", { name, phone, password });
    return res.data;
  };

  const sendOtp = async (phone) => {
    const res = await api.post("/auth/send-otp", { phone });
    return res.data;
  };

  const verifyOtp = async (phone, otp) => {
    const res = await api.post("/auth/verify-otp", { phone, otp });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, setUser, language, setLanguage, loading,
      loginPassword, register, sendOtp, verifyOtp, logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
