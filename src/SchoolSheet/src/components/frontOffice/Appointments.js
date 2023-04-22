import React, { useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../InputField";
import AppointmentList from "./AppointmentList";
import { FaRegUserCircle } from "react-icons/fa";
import Button2 from "../Button2";
import Select from "react-select";

function Appointments() {
	const [selectedOption, setSelectedOption] = useState(null);
	const patientsList = [
		{ value: "Omeny Robert", label: "Omeny Robert" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];
	const doctors = [
		{ value: "Dr John Doe", label: "Dr John Doe" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];
	const charges = [
		{ value: "Consulataion", label: "Consulataion" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];

	return (
		<div className="w-full">
			<div className="w-full bg-white">
				<div className="flex bg-white p-2">
					<div className="w-2/12 m-1">
						<br />
						<label className="text-gray4">Patient</label>

						<Select
							placeholder={"Select Patient"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={patientsList}
						/>
					</div>
					<div className="w-2/12 m-1">
						<br />
						<label className="text-gray4">Doctor</label>

						<Select
							placeholder={"Select Doctor"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={doctors}
						/>
					</div>
					<div className="w-2/12 m-1">
						<br />
						<label className="text-gray4">Charges</label>

						<Select
							placeholder={"Select Charges"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={charges}
						/>
					</div>
					<div className="w-2/12 m-1">
						<InputField
							type="text"
							placeholder="Enter Reason"
							label="Reason"
							name="reason"
							icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="w-2/12 m-1">
						<InputField type="date" label="Date" name="date" />
					</div>
					<div className="w-2/12 m-1">
						<InputField type="time" label="Start Time" name="start_time" />
					</div>
				</div>
				<div className="flex -mt-10 mx-2">
				<div className="w-2/12 m-1">
						<InputField type="time" label="End Time" name="end_time" />
					</div>
					<div className="w-2/12 m-1 pt-2">
						<br/><br/>
					<Button2 value={"Add Appointment"} />
					</div>
					
					<br />
				</div>
			</div>

			<AppointmentList />
		</div>
	);
}

export default Appointments;
