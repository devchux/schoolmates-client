import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Campus from "../pages/dashboard/campus";
import CampusDetail from "../pages/dashboard/campus/detail";
import ChangePassword from "../pages/dashboard/change-password";
import Classes from "../pages/dashboard/classes";
import ClassDetail from "../pages/dashboard/classes/detail";
import Departments from "../pages/dashboard/departments";
import Profile from "../pages/dashboard/profile";
import Reports from "../pages/dashboard/reports";
import Staff from "../pages/dashboard/staffs";
import StaffDetail from "../pages/dashboard/staffs/detail";
import Student from "../pages/dashboard/students";
import StudentDetail from "../pages/dashboard/students/detail";
import SuperAdmin from "../pages/dashboard/super-admin";
import Vehicles from "../pages/dashboard/vehicles";
import Vendors from "../pages/dashboard/vendors";
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
        <Route exact path="classes" element={<Classes />} />
        <Route path="classes/new" element={<ClassDetail />} />
        <Route path="classes/edit/:id" element={<ClassDetail />} />
        <Route exact path="campus" element={<Campus />} />
        <Route path="campus/new" element={<CampusDetail />} />
        <Route path="campus/edit/:id" element={<CampusDetail />} />
        <Route exact path="staffs" element={<Staff />} />
        <Route path="staffs/new" element={<StaffDetail />} />
        <Route path="staffs/edit/:id" element={<StaffDetail />} />
        <Route exact path="students" element={<Student />} />
        <Route path="students/new" element={<StudentDetail />} />
        <Route path="students/edit/:id" element={<StudentDetail />} />
        <Route exact path="vehicles" element={<Vehicles />} />
        <Route exact path="change-password" element={<ChangePassword />} />
        <Route exact path="vendors" element={<Vendors />} />
        <Route exact path="reports" element={<Reports />} />
        <Route exact path="departments" element={<Departments />} />
        <Route exact path="profile" element={<Profile />} />
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
