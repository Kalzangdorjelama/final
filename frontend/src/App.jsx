import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Login from "./pages/Login";
import CheckAuth from "./auth/CheckAuth";

export default function App() {
  // load initial values from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
    }
  }, [isAuthenticated, role]);

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/"
        element={
          <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />
        }
      />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} role={role}>
            <Home setIsAuthenticated={setIsAuthenticated} setRole={setRole} />
          </CheckAuth>
        }
      />
      <Route
        path="/stock/:symbol"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} role={role}>
            <Prediction />
          </CheckAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
