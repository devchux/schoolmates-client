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
import StudentsHome from "../pages/dashboard/students/home";
import DressCode from "../pages/dashboard/dress-code";
import Principal from "../pages/dashboard/principal";
import Accounts from "../pages/dashboard/accounts";
import Comment from "../pages/dashboard/comment";
import CommentDetail from "../pages/dashboard/comment/detail";
import Admin from "../pages/dashboard/admin";
import Income from "../pages/dashboard/income";
import Expenses from "../pages/dashboard/expenses";
import Account from "../pages/dashboard/accounts/home";
import DepartmentDetail from "../pages/dashboard/departments/detail";
import GradingDetail from "../pages/dashboard/grading/detail";
import VehicleDetail from "../pages/dashboard/vehicles/detail";
import Subjects from "../pages/dashboard/subjects";
import CalendarDetail from "../pages/dashboard/calendar/detail";
import TransferStudent from "../pages/dashboard/students/transfer";
import ResumptionDate from "../pages/dashboard/resumption-date";
import PromoteStudent from "../pages/dashboard/students/promote";
import TimetableDetail from "../pages/dashboard/timetable/detail";
import TransferFund from "../pages/dashboard/transfer-funds";
import ChartAccount from "../pages/dashboard/chart-account";
// import Deptors from "../pages/dashboard/debtors";
// import CreditorsList from "../pages/dashboard/creditor";
import ChartAccountDetail from "../pages/dashboard/chart-account/detail";
import FeeList from "../pages/dashboard/Fee";
import FeeDetail from "../pages/dashboard/Fee/detail";
import VendorDetail from "../pages/dashboard/vendors/detail";
import Payment from "../pages/dashboard/Payment";
import PaymentDetail from "../pages/dashboard/Payment/detail";
import BankDetail from "../pages/dashboard/bank/detail";
import DiscountDetail from "../pages/dashboard/setup_discount";
import Invoices from "../pages/dashboard/invoices";
import InvoiceDetail from "../pages/dashboard/invoices/detail";
// import VehicleMaintenance from "../pages/dashboard/maintenance";
import VehicleLogsDetail from "../pages/dashboard/vehicles/logs/detail";
import SubjectDetail from "../pages/dashboard/subjects/detail";
import StaffAttendanceDetail from "../pages/dashboard/staffs/attendance/detail";
import HealthReport from "../pages/dashboard/students/health-report";
import BusRouting from "../pages/dashboard/students/bus-routing";
import AssignClass from "../pages/dashboard/staffs/assign-class";
import ClassSubjects from "../pages/dashboard/classes/subjects";
import BankList from "../pages/dashboard/bank";
import ExpensesDetail from "../pages/dashboard/expenses/detail";
import VehicleMaintenanceDetail from "../pages/dashboard/vehicles/maintenance/detail";
import TransferFundDetail from "../pages/dashboard/transfer-funds/detail";
import VehicleMaintenance from "../pages/dashboard/vehicles/maintenance";

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
        <Route
          path="admin"
          element={
            <Guard routeName="admin">
              <Admin />
            </Guard>
          }
        />
        <Route
          path="subjects"
          element={
            <Guard routeName="subjects">
              <Subjects />
            </Guard>
          }
        />
        <Route
          path="subjects/new"
          element={
            <Guard routeName="subjects">
              <SubjectDetail />
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
          path="classes/subjects/:id"
          element={
            <Guard routeName="classes" action={["subjects"]}>
              <ClassSubjects />
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
          path="staffs/attendance/:id"
          element={
            <Guard routeName="staffs" action={["create-attendance"]}>
              <StaffAttendanceDetail />
            </Guard>
          }
        />
        <Route
          path="staffs/assign-class/:id"
          element={
            <Guard routeName="staffs" action={["assign-class"]}>
              <AssignClass />
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
          path="students/transfer/:id"
          element={
            <Guard routeName="students" action={["transfer"]}>
              <TransferStudent />
            </Guard>
          }
        />
        <Route
          path="students/promote/:id"
          element={
            <Guard routeName="students" action={["promote"]}>
              <PromoteStudent />
            </Guard>
          }
        />
        <Route
          path="students/health-report/:id"
          element={
            <Guard routeName="students" action={["health-report"]}>
              <HealthReport />
            </Guard>
          }
        />
        <Route
          path="students/bus-routing/:id"
          element={
            <Guard routeName="students" action={["bus-routing"]}>
              <BusRouting />
            </Guard>
          }
        />
        <Route
          exact
          path="resumption-date"
          element={
            <Guard routeName="resumption-date" action={["read"]}>
              <ResumptionDate />
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
          path="vehicles/new"
          element={
            <Guard routeName="vehicles">
              <VehicleDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="vehicles/logs/new"
          element={
            <Guard routeName="vehicle-logs">
              <VehicleLogsDetail />
            </Guard>
          }
        />
        <Route
          path="vehicles/maintenance/:id"
          element={
            <Guard routeName="vehicles">
              <VehicleMaintenanceDetail />
            </Guard>
          }
        />
        <Route
          path="vehicle-maintenance"
          element={
            <Guard routeName="vehicle-maintenance">
              <VehicleMaintenance />
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
          path="vendors/new"
          element={
            <Guard routeName="vendors">
              <VendorDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="payment"
          element={
            <Guard routeName="payment">
              <Payment />
            </Guard>
          }
        />
        <Route
          path="payment/:id"
          element={
            <Guard routeName="payment">
              <PaymentDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="invoice"
          element={
            <Guard routeName="invoice">
              <Invoices />
            </Guard>
          }
        />
        <Route
          path="students/invoice/:id"
          element={
            <Guard routeName="invoice">
              <InvoiceDetail />
            </Guard>
          }
        />
        <Route
          path="bank/new"
          element={
            <Guard routeName="bank">
              <BankDetail />
            </Guard>
          }
        />
        <Route
          path="bank"
          element={
            <Guard routeName="bank">
              <BankList />
            </Guard>
          }
        />
        <Route
          path="discount"
          element={
            <Guard routeName="discount">
              <DiscountDetail />
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
          path="dress-code"
          element={
            <Guard routeName="dress-code">
              <DressCode />
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
            <Guard routeName="results" action={["compute"]}>
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
            <Guard routeName="results" action={["compute"]}>
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
          exact
          path="departments/new"
          element={
            <Guard routeName="departments">
              <DepartmentDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="grading"
          element={
            <Guard routeName="grading">
              <GradingDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="calendar"
          element={
            <Guard routeName="calendar">
              <CalendarDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="timetable"
          element={
            <Guard routeName="timetable">
              <TimetableDetail />
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
          path="principal"
          element={
            <Guard routeName="principal">
              <Principal />
            </Guard>
          }
        />
        <Route
          exact
          path="comment"
          element={
            <Guard routeName="comment">
              <Comment />
            </Guard>
          }
        />
        <Route
          exact
          path="income"
          element={
            <Guard routeName="income">
              <Income />
            </Guard>
          }
        />
        <Route
          exact
          path="expense"
          element={
            <Guard routeName="expense">
              <Expenses />
            </Guard>
          }
        />
        <Route
          exact
          path="expense/new"
          element={
            <Guard routeName="expense">
              <ExpensesDetail />
            </Guard>
          }
        />
        <Route
          path="comment/new"
          element={
            <Guard routeName="comment">
              <CommentDetail />
            </Guard>
          }
        />
        <Route
          path="chart-account/new"
          element={
            <Guard routeName="chart-account">
              <ChartAccountDetail />
            </Guard>
          }
        />
        <Route
          path="fee-list"
          element={
            <Guard routeName="fee-list">
              <FeeList />
            </Guard>
          }
        />
        <Route
          path="fee-list/new"
          element={
            <Guard routeName="fee-list">
              <FeeDetail />
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
        <Route
          path="accounts"
          element={
            <Guard routeName="accounts">
              <Accounts />
            </Guard>
          }
        />
        <Route
          path="account-home"
          element={
            <Guard routeName="account">
              <Account />
            </Guard>
          }
        />
        <Route
          exact
          path="transfer"
          element={
            <Guard routeName="transfer">
              <TransferFund />
            </Guard>
          }
        />
        <Route
          exact
          path="transfer/new"
          element={
            <Guard routeName="transfer">
              <TransferFundDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="transfer/edit/:id"
          element={
            <Guard routeName="transfer">
              <TransferFundDetail />
            </Guard>
          }
        />
        <Route
          exact
          path="chart-account"
          element={
            <Guard routeName="chart-account">
              <ChartAccount />
            </Guard>
          }
        />
        {/* <Route
          exact
          path="debtors"
          element={
            <Guard routeName="debtors">
              <Deptors/>
            </Guard>
          }
        />
        <Route
          exact
          path="creditors"
          element={
            <Guard routeName="creditors">
              <CreditorsList/>
            </Guard>
          }
        />
         */}
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
