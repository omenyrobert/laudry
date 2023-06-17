import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import ButtonSecondary from "../ButtonSecondary";

function PatientTypeComp() {
	const [types, setTypes] = useState([
		{ id: 1, chargetype: "Lab Fees" },
		{ id: 2, chargetype: "Consultation Fees" },
		{ id: 3, chargetype: "Nursing Fees" },
		{ id: 4, chargetype: "Lab Fees" },
		{ id: 5, chargetype: "Lab Fees" },
		{ id: 6, chargetype: "Lab Fees" },
		{ id: 2, chargetype: "Consultation Fees" },
		{ id: 2, chargetype: "Consultation Fees" },
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
			<h5 className="text-lg font-medium">Patient Types</h5>
			<div className="w-full h-[80vh]">
				<div className="flex justify-between">
					<div className="w-1/2">
						<InputField
							type="text"
							placeholder="Enter Patient Type"
							label="Patient Type"
							name="patient_type"
							
						/>
					</div>
					<div className="mt-8 mr-5">
						<br />
						<Button2 value={"Add Type"} />
					</div>
				</div>
				
				<table className="mt-10 w-[95%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Type</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>


{/* edit popup start */}
{ editData ? 
						<div className="absolute shadow-lg rounded flex w-[500px] p-5 bg-white">
							<div className="w-2/3 pr-5">
								<InputField
									type="text"
									placeholder="Enter Charge Type"
									label="Charge Type"
									name="Charge_type"
									value={chargetypeEdit}
									
								/>
							</div>
							<div className="flex justify-between w-1/3 mt-[55px]">
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
						: null }
						{/* edit popup end */}



						{types.map((chargetype) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={chargetype.id}
								>
									<td className="text-xs p-3 text-gray5">
										{chargetype.chargetype}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline className="text-red w-4 h-4" />
										<BsPencilSquare 	onClick={()=> openEditData(chargetype)} className="text-warning h-4 w-4 ml-5" />
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
export default PatientTypeComp;
