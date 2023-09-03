import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import Select from "react-select";
import ButtonSecondary from "../ButtonSecondary";

function EmployeeSubType() {
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Doctor", label: "Doctor" },
		{ value: "Finance", label: "Finance" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];

	const [charges, setCharges] = useState([
		{ id: 1, chargetype: "Lab Fees", name: "Malaria test", amount: 5000 },
		{
			id: 2,
			chargetype: "Consultation Fees",
			name: "Covid test",
			amount: 15000,
		},
		{ id: 3, chargetype: "Nursing Fees", name: "Malaria test", amount: 8000 },
		{ id: 4, chargetype: "Lab Fees", name: "Malaria test", amount: 5000 },
		{ id: 5, chargetype: "Lab Fees", name: "Malaria test", amount: 20000 },
		{ id: 6, chargetype: "Lab Fees", name: "Nursing", amount: 35000 },
		{
			id: 2,
			chargetype: "Consultation Fees",
			name: "Admission Per Night",
			amount: 55000,
		},
		{
			id: 2,
			chargetype: "Consultation Fees",
			name: "Malaria test",
			amount: 5000,
		},
	]);

	const [editData, setEditData] = useState(false);
	const [chargetypeEdit, setChargetypeEdit] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (chargetype) => {
		setEditData(true);
		setChargetypeEdit(chargetype?.chargetype);
	};

	return (
		<>
			<h5 className="text-lg font-medium">Employee Sub Types</h5>
			<div className="w-full h-[80vh]">
				<div className="flex justify-between">
					<div className="w-1/3">
						<br />
						<label className="text-gray4">Employee Type</label>

						<Select
							placeholder={"Select Employee Type"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={options}
						/>
					</div>
					<div className="w-1/3">
						<InputField
							type="text"
							placeholder="Enter Sub Type"
							label="Sub Type"
							name="sub_type"
							
						/>
					</div>

					<div className="mt-8 mr-5 w-[180px]">
						<br />
						<Button value={"Add"} />
					</div>
				</div>
				
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Type</th>
						<th className="p-2 text-primary text-sm text-left">Sub Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>


						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-lg rounded flex w-[900px] p-5 bg-white">
								<div className="w-2/5 px-2">
									<br />
									<label className="text-gray4">Employee Type</label>

									<Select
										placeholder={"Select Employee Type"}
										defaultValue={selectedOption}
										onChange={setSelectedOption}
										className="mt-1"
										options={options}
									/>
								</div>
								<div className="w-2/5 px-2">
									<InputField
										type="text"
										placeholder="Enter Charge Type"
										label="Charge Type"
										name="Charge_type"
										value={chargetypeEdit}
										
									/>
								</div>
								<div className="flex justify-between w-1/5 mt-[55px]">
									<div>
										<ButtonSecondary value={"Update"} />
									</div>
									<div>
										<p
											className="text-black text-lg cursor-pointer"
											onClick={closeEditData}
										>
											X
										</p>
									</div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}
						

						{charges.map((chargetype) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={chargetype.id}
								>
									<td className="text-xs p-3 text-gray5">
										{chargetype.chargetype}
									</td>
									<td className="text-xs p-3 text-gray5">{chargetype.name}</td>

									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline className="text-red w-4 h-4" />
										<BsPencilSquare
											onClick={() => openEditData(chargetype)}
											className="text-warning h-4 w-4 ml-5"
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
export default EmployeeSubType;
