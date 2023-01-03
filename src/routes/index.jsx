import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

const AppRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route exact path="auth" element={<Login />} />
        <Route path="auth/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </AuthLayout>
  );
};

export default AppRoutes;
