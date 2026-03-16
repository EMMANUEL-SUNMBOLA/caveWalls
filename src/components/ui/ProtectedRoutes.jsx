import React from "react";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
