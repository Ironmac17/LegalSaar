import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if admin-only route and user is not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}
