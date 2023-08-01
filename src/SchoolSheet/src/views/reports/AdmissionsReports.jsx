import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/styles/main.css";
import ReportsNavigation from "../../components/reports/ReportsNavigation";

function AdmissionsReports() {

	return (
		<div className="h-screen overflow-hidden bg-gray10">
			<div className="flex w-full">
				<div className="w-1/12">
					<Sidebar />
				</div>
				<div className="w-11/12 -ml-3">
					<Navbar />
					<ReportsNavigation />
					<div className="rounded-md shadow-md bg-white  p-5 h-screen overflow-y-auto mt-2 w-full">
						<p className="text-primary text-xl font-semibold">
							Admissions Reports
						</p>
						
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdmissionsReports;
