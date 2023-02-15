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
import Guard from "./guard";
import Protected from "./protected";
import Teacher from "../pages/dashboard/teachers";
import NotFound from "../pages/dashboard/not-found";
import Results from "../pages/dashboard/results";
import Attendance from "../pages/dashboard/attendance";
import MidTerm from "../pages/dashboard/results/sheets/mid-term";
import EndOfTerm from "../pages/dashboard/results/sheets/end-of-term";
import StudentsHome from "../pages/dashboard/student-dash";

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
        <Route
          path="super-admin"
          element={
            <Guard routeName="superAdmin">
              <SuperAdmin />
            </Guard>
          }
        />
        <Route exact path="classes" element={<Classes />} />
        <Route
          path="classes/new"
          element={
            <Guard routeName="classes" action={["create"]}>
              <ClassDetail />
            </Guard>
          }
        />
        <Route
          path="classes/edit/:id"
          element={
            <Guard routeName="classes" action={["update"]}>
              <ClassDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="campus"
          element={
            <Guard routeName="campus">
              <Campus />
            </Guard>
          }
        />
        <Route
          path="campus/new"
          element={
            <Guard routeName="campus" action={["create"]}>
              <CampusDetail />
            </Guard>
          }
        />
        <Route
          path="campus/edit/:id"
          element={
            <Guard routeName="campus" action={["update"]}>
              <CampusDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="staffs"
          element={
            <Guard routeName="staffs">
              <Staff />
            </Guard>
          }
        />
        <Route
          path="staffs/new"
          element={
            <Guard routeName="staffs" action={["create"]}>
              <StaffDetail />
            </Guard>
          }
        />
        <Route
          path="staffs/edit/:id"
          element={
            <Guard routeName="staffs" action={["update"]}>
              <StaffDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="students"
          element={
            <Guard routeName="students">
              <Student />
            </Guard>
          }
        />
        <Route
          path="students/new"
          element={
            <Guard routeName="students" action={["create"]}>
              <StudentDetail />
            </Guard>
          }
        />
        <Route
          path="students/edit/:id"
          element={
            <Guard routeName="students" action={["update"]}>
              <StudentDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="vehicles"
          element={
            <Guard routeName="vehicles">
              <Vehicles />
            </Guard>
          }
        />
        <Route
          exact
          path="vendors"
          element={
            <Guard routeName="vendors">
              <Vendors />
            </Guard>
          }
        />
        <Route
          exact
          path="reports"
          element={
            <Guard routeName="reports">
              <Reports />
            </Guard>
          }
        />
        <Route
          exact
          path="results"
          element={
            <Guard routeName="results">
              <Results />
            </Guard>
          }
        />
        <Route
          exact
          path="results/mid"
          element={
            <Guard routeName="results">
              <MidTerm />
            </Guard>
          }
        />
        <Route
          exact
          path="results/mid/compute"
          element={
            <Guard routeName="results">
              <MidTerm isCompute />
            </Guard>
          }
        />
        <Route
          exact
          path="results/end"
          element={
            <Guard routeName="results">
              <EndOfTerm />
            </Guard>
          }
        />
        <Route
          exact
          path="results/end/compute"
          element={
            <Guard routeName="results">
              <EndOfTerm isCompute />
            </Guard>
          }
        />
        <Route
          exact
          path="attendance"
          element={
            <Guard routeName="attendance">
              <Attendance />
            </Guard>
          }
        />
        <Route
          exact
          path="departments"
          element={
            <Guard routeName="departments">
              <Departments />
            </Guard>
          }
        />
        <Route
          path="teachers"
          element={
            <Guard routeName="teacher">
              <Teacher />
            </Guard>
          }
        />
        <Route
          path="student-home"
          element={
            <Guard routeName="student-home">
              <StudentsHome />
            </Guard>
          }
        />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="not-found" element={<NotFound />} />
        <Route exact path="change-password" element={<ChangePassword />} />
        <Route index path="*" element={<Navigate to="/app/not-found" />} />
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
