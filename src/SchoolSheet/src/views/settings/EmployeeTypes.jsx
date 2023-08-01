import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/styles/main.css";
import Navigation from "../../components/settings/Navigation";
import EmployeeSubType from "../../components/settings/EmployeeSubType";
import EmployeeType from "../../components/settings/EmployeeType";

function EmployeeTypes() {
	return (
		<div className="h-screen overflow-hidden bg-gray10">
			<div className="flex w-full">
				<div className="w-1/12">
					<Sidebar />
				</div>
				<div className="w-11/12 -ml-3">
					<Navbar />
          <Navigation/>
					<div className="rounded-md shadow-md bg-white  p-5 h-screen overflow-y-auto mt-2 w-full">
				<p className="text-primary text-xl font-semibold">Employee Types</p>
				<div className="flex mt-5">
							<div className="w-1/3 border-r-2 border-gray1 mr-5">
								<EmployeeType/>
							</div>
							<div className="w-2/3">
								<EmployeeSubType/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeTypes;
