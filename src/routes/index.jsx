import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import SuperAdmin from "../pages/dashboard/super-admin";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="app" element={<DashboardLayout />}>
        <Route path="super-admin" element={<SuperAdmin />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
