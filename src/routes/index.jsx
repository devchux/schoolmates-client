import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import Login from "../pages/auth/login";

const AppRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="auth" element={<Login />} />
      </Routes>
    </AuthLayout>
  );
};

export default AppRoutes;
