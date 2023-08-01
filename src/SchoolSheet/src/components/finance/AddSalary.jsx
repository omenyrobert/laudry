import React, { useState } from "react";

import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import Select from "react-select";


function AddSalary(props) {
	const {add, closeAdd} = props;

	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];


	return (
		<div className="absolute border border-gray1 rounded bg-white w-1/2" >
            <div className="flex justify-between bg-gray1 p-5">
                <div>
                    <p>Add Salary</p>
                </div>
                <div>
                    <p className="cursor-pointer" onClick={closeAdd}>X</p>
                </div>

            </div>

            <div className="p-3">
			<div className="flex ">
				<div className="w-1/3 px-2">
					<br />
					<label className="text-gray4">Select Employee</label>

					<Select
						placeholder={"Select Employee"}
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						className="mt-1"
						options={options}
					/>
				</div>
				<div className="w-1/3 px-2">
					<InputField type="date" label="Date" />
				</div>
				<div className="w-1/3 px-2">
					<InputField
						type="number"
						placeholder="Enter Gross"
						label="Gross"
						
					/>
				</div>
			</div>
			<div className="flex">
				<div className="w-1/3 px-2">
					<InputField
						type="number"
						placeholder="Enter Net"
						label="Net Salary"
						name="amount"
						
					/>
				</div>
				<div className="w-1/3 px-2">
					<InputField
						type="number"
						placeholder="Enter PAYE"
						label="PAYE"
						
					/>
				</div>
				<div className="w-1/3 px-2">
					<InputField
						type="number"
						placeholder="Enter NSSF"
						label="NSSF"
						
					/>
				</div>
			</div>
			<div className="mr-5 -mt-5 w-[150px]">
				<br />
				<Button value={"Add Income"} />
			</div>
            </div>

			
		</div>
	);
}
export default AddSalary;
