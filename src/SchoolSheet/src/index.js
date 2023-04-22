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
import PasswordResset from "./views/auth/PasswordResset";
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
import Invoices from "./views/finance/Invoices";
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
import TimeTable from "./views/classes/TimeTable";
import Calendar from "./views/timeTable/Calendar";
import Schedules from "./views/timeTable/Schedules";
import TimeTableTemplate from "./views/timeTable/TimeTableTemplate";
import StaffEditForm from "./components/hrm/StaffEditForm";

const router = createBrowserRouter([
	{
		path: "/email",
		element: <Email />,
	},
	{
		path: "/passwordResset",
		element: <PasswordResset />,
	},
	{
		path: "/",
		element: <Login />,
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
				element: <FeesStrructures />,
			},
			{
				path: "/fees",
				element: <Fees />,
			},
			{
				path: "/students",
				element: <Students />,
			},
			{
				path: "/groupsAndTypes",
				element: <GroupsAndTypes />,
			},

			//classes
			{
				path: "/studentAttendance",
				element: <StudentAttendance />,
			},
			{
				path: "/assessment",
				element: <Assessment />,
			},
			{
				path: "/reportCards",
				element: <ReportCards />,
			},
			{
				path: "/timeTable",
				element: <TimeTable />,
			},

			// time table
			{
				path: "/calendar",
				element: <Calendar />,
			},
			{
				path: "/schedules",
				element: <Schedules />,
			},
			{
				path: "/timeTableTemplate",
				element: <TimeTableTemplate />,
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

			//  hrm routes

			{
				path: "/staff",
				element: <Staff />,
			},
			{
				path: "/staffEditForm",
				element: <StaffEditForm />,
			},
			{
				path: "/payRoll",
				element: <PayRoll />,
			},
			{
				path: "/staffAttendance",
				element: <StaffAttendance />,
			},
			{
				path: "/reportCardTemplate",
				element: <ReportCardTemplate />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
