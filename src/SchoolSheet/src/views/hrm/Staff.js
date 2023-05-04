import React from "react";
import StaffTypes from "../../components/hrm/StaffTypes";
import StaffComp from "../../components/hrm/StaffComp";

const Staff = () => {
	return (
		<div className="w-full">
			<h1 className="text-primary font-bold text-xl">Staff Member</h1>

			<StaffTypes />
			<StaffComp />
		</div>
	);
};

export default Staff;
