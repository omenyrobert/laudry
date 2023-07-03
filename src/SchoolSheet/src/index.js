import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import ErrorPage from "../src/errorPage";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Email from "./views/auth/Email";
import Code from "./views/auth/Code";
import PasswordReset from "./views/auth/PasswordReset";
import Settings from "./views/settings/Settings";
import ClassesStreams from "./views/settings/ClassesStreams";
import SubjectsGrading from "./views/settings/SubjectsGrading";
import FeesStrructures from "./views/fees/FeesStrructures";
import Fees from "./views/fees/Fees";
import Students from "./views/students/Students";
import GroupsAndTypes from "./views/students/GroupsAndTypes";
import Incomes from "./views/finance/Incomes";
import Expenses from "./views/finance/Expenses";
import Reports from "./views/finance/Reports";
import Invoices from "./components/finance/Invoices";
import Staff from "./views/hrm/Staff";
import PayRoll from "./views/hrm/PayRoll";
import StaffAttendance from "./views/hrm/StaffAttendance";
import Stock from "./views/finance/Stock";
import Assets from "./views/finance/Assets";
import Payments from "./views/finance/Payments";
import StudentAttendance from "./views/classes/StudentAttendance";
import Assessment from "./views/classes/Assessment";
import ReportCards from "./views/classes/ReportCards";
import ReportCardTemplate from "./components/classes/ReportCardTemplate";
import Receipts from "./views/finance/Receipts";
import StaffEditForm from "./components/hrm/StaffEditForm";
import Exams from "./components/timeTable/Exams";
import Lessons from "./components/timeTable/Lessons";
import SchoolCalendar from "./components/timeTable/SchoolCalendar";
import ScholarShip from "./views/scholarship/ScholarShip";
import Bills from "./views/finance/Bills";
import Equity from "./views/finance/Equity";
import Accounts from "./views/finance/Accounts";
import Liabilities from "./views/finance/Liabilities";
import AddStudentForm from "./components/students/AddStudentForm";
import EditStudentsForm from "./components/students/EditStudentsForm";
import ShowStudentsForm from "./components/students/ShowStudentsForm";
import Sample from "./views/Sample";
import StudentAttendanceComp from "./components/classes/StudentAttendanceComp";
import Journal from "../src/components/finance/Journal";
import AddTransaction from "./components/finance/AddTransaction";
import Ledger from "./components/finance/Ledger";
import RoleGuard from "./components/RoleGuard";

const router = createBrowserRouter([
  {
    path: "/email",
    element: <Email />,
  },
  {
    path: "/passwordReset",
    element: <PasswordReset />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/code",
    element: <Code />,
  },
  // component to show the user is in the wrong route
  {
    path: "/error-page",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/sample",
        element: <Sample />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/classesStreams",
        element: <ClassesStreams />,
      },
      {
        path: "/subjectsGrading",
        element: <SubjectsGrading />,
      },
      {
        path: "/feesStrructures",
        element: (
          <RoleGuard allowedRoles={["admin", "fees"]}>
            <FeesStrructures />
          </RoleGuard>
        ),
      },
      {
        path: "/fees",
        element: (
          <RoleGuard allowedRoles={["admin", "fees"]}>
            <Fees />
          </RoleGuard>
        ),
      },
      {
        path: "/scholarShip",
        element: <ScholarShip />,
      },
      {
        path: "/students",
        element: (
          <RoleGuard allowedRoles={["student", "admin"]}>
            <Students />
          </RoleGuard>
        ),
      },
      {
        path: "/groupsAndTypes",
        element: (
          <RoleGuard allowedRoles={["student", "admin"]}>
            <GroupsAndTypes />
          </RoleGuard>
        ),
      },
      // students
	  {
        path: "/addStudentForm",
        element: (
          <RoleGuard allowedRoles={["student", "admin"]}>
             <AddStudentForm />
          </RoleGuard>
        ),
      },
	  {
		path: "/editStudentsForm",
        element: (
          <RoleGuard allowedRoles={["student", "admin"]}>
             <EditStudentsForm />
          </RoleGuard>
        ),
      },
	  {
        path: "/showStudentsForm",
        element: (
          <RoleGuard allowedRoles={["student", "admin"]}>
              <ShowStudentsForm />
          </RoleGuard>
        ),
      },
      // classes
	  {
        path: "/studentAttendance",
        element: (
          <RoleGuard allowedRoles={["student", "admin"]}>
            <StudentAttendanceComp />
          </RoleGuard>
        ),
      },
      {
        path: "/assessment",
        element: <Assessment />,
      },
      {
        path: "/reportCards",
        element: <ReportCards />,
      },
      // time table
      {
        path: "/calendar",
        element: <SchoolCalendar />,
      },
      {
        path: "/lessons",
        element: <Lessons />,
      },
      {
        path: "/exams",
        element: <Exams />,
      },
      // finance routes
      {
        path: "/incomes",
        element: <Incomes />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/stock",
        element: <Stock />,
      },
      {
        path: "/assets",
        element: <Assets />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/receipts",
        element: <Receipts />,
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/liabilities",
        element: <Liabilities />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "/equity",
        element: <Equity />,
      },
      {
        path: "/addTransaction",
        element: <AddTransaction />,
      },
      // hrm routes
      {
        path: "/staff",
        element: (
          <RoleGuard allowedRoles={["hrm", "admin"]}>
            <Staff />
          </RoleGuard>
        ),
      },
	  {
        path: "/staffEditForm",
        element: (
          <RoleGuard allowedRoles={["hrm", "admin"]}>
            <StaffEditForm />
          </RoleGuard>
        ),
      },
      {
        path: "/payRoll",
        element: (
          <RoleGuard allowedRoles={["hrm", "admin"]}>
            <PayRoll />
          </RoleGuard>
        ),
      },
      {
        path: "/staffAttendance",
        element: (
          <RoleGuard allowedRoles={["hrm",  "admin"]}>
            <StaffAttendance />
          </RoleGuard>
        ),
      },
      {
        path: "/reportCardTemplate",
        element: <ReportCardTemplate />,
      },
      {
        path: "/journal",
        element: <Journal />,
      },
      {
        path: "/ledger/:accountId",
        element: <Ledger />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
