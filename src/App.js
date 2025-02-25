import "./styles.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ResendOTP from "./components/auth/ResendOTP";
import AuthContext, { AuthProvider } from "./AuthContext";  // ✅ Correct import

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/resend-otp" element={<ResendOTP />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
