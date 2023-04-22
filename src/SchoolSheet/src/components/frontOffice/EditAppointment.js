import React, { useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../InputField";
import Button from "../Button";
import InputSelect from "../InputSelect";
import {
	FaRegUserCircle,
	FaPhone,
	FaBusinessTime,
	FaRegTrashAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import Select from "react-select";

function EditAppointment(props) {
	const { editData, closeEditData } = props;
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
		<div className="flex justify-center">
			<div className="h-[80vh] overflow-y-auto border border-gray1 -mt-[30vh] shadow-2xl w-[50vw] absolute z-50 bg-white rounded">
				<div className="flex justify-between p-5 bg-gray1">
					<div>
						<p className="text-primary font-semibold">Edit Appointment</p>
					</div>
					<div>
						<p onClick={closeEditData} className="cursor-pointer">
							X
						</p>
					</div>
				</div>
				<div className="flex p-3">
					<div className="w-1/2 p-2">
						<label className="text-gray4">Patient</label>
						<br />
						<br />
						<Select
							placeholder={"Select Patient"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={patientsList}
						/>

						<br />
						<br />
						<label className="text-gray4">Doctor</label>

						<Select
							placeholder={"Select Doctor"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={doctors}
						/>

						<br />
						<br />
						<label className="text-gray4">Charges</label>

						<Select
							placeholder={"Select Charges"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={charges}
						/>

						<br />
					</div>
					<div className="w-1/2 p-2">
						<InputField type="date" label="Date" name="date" />
						<InputField type="time" label="Start Time" name="start_time" />

						<InputField type="time" label="End Time" name="end_time" />

						<br />
						<Button value={"Add User"} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditAppointment;
