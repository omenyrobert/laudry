import React from "react";
import { Link, useLocation } from 'react-router-dom';

function ReportsNavigation() {
	const location = useLocation();
	return (
		<div className="flex my-2 bg-white p-2 shadow pl-5">
			<Link to="/patientsReports" 
			className={(location.pathname === '/patientsReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}
			
		>
				Patients Reports
			</Link>
			<Link to="/activityLogs" className={(location.pathname === '/activityLogs') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Activity Logs
			</Link>
			<Link to="/admissionsReports" className={(location.pathname === '/admissionsReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-50' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-50'}>
				Admissions Reports
			</Link>
			<Link to="/dentalReports" className={(location.pathname === '/dentalReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Dental Reports
			</Link>
			<Link to="/doctorsReports" className={(location.pathname === '/doctorsReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				DoctorsReports
			</Link>
			<Link to="/financialReports" className={(location.pathname === '/financialReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Financial Reports
			</Link>
            <Link to="/labReports" className={(location.pathname === '/labReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Lab Reports
			</Link>
            <Link to="/pharmacyReports" className={(location.pathname === '/pharmacyReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Pharmacy Reports
			</Link>
            <Link to="/scanReports" className={(location.pathname === '/scanReports') ? 'border-primary border-b-2 bg-gray1 rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44' : 'border-white border-b-2  rounded-md text-primary cursor-pointer px-3 py-1 text-lg w-44'}>
				Scan Reports
			</Link>
		</div>
	);
}

export default ReportsNavigation;
