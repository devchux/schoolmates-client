import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Classes from "../pages/dashboard/classes";
import SuperAdmin from "../pages/dashboard/super-admin";
import Protected from "./protected";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="app"
        element={
          <Protected>
            <DashboardLayout />
          </Protected>
        }
      >
        <Route path="super-admin" element={<SuperAdmin />} />
        <Route path="classes" element={<Classes />} />
        <Route index path="*" element={<Navigate to="/app/super-admin" />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/app" />} />
    </Routes>
  );
};

export default CustomRoutes;
