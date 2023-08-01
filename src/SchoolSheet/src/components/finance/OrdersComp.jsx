import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button2 from "../Button2";
import Select from "react-select";

function OrdersComp() {
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];

	const [income, setIncome] = useState([
		{
			id: 1,
			incomeType: "Lab Fees",
			items: 10,
			name: "Malaria test",
			amount: 5000,
		},
		{
			id: 2,
			incomeType: "Consultation Fees",
			items: 12,
			name: "Covid test",
			amount: 15000,
		},
		{
			id: 3,
			incomeType: "Nursing Fees",
			items: 20,
			name: "Malaria test",
			amount: 8000,
		},
		{
			id: 4,
			incomeType: "Lab Fees",
			items: 10,
			name: "Malaria test",
			amount: 5000,
		},
		{
			id: 5,
			incomeType: "Lab Fees",
			items: 7,
			name: "Malaria test",
			amount: 20000,
		},
		{
			id: 6,
			incomeType: "Lab Fees",
			items: 10,
			name: "Nursing",
			amount: 35000,
		},
		{
			id: 7,
			incomeType: "Consultation Fees",
			items: 12,
			name: "Admission Per Night",
			amount: 55000,
		},
		{
			id: 8,
			incomeType: "Consultation Fees",
			name: "Malaria test",
			items: 12,
			amount: 5000,
		},
	]);

	const [editData, setEditData] = useState(false);
	const [incomeTypeEdit, setIncomeTypeEdit] = useState("");
	const [amountEdit, setAmountEdit] = useState("");

	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (incomeType) => {
		setEditData(true);
		setIncomeTypeEdit(incomeType?.incomeType);
		setAmountEdit(incomeType.amount);
	};

	return (
		<>
			<h5 className="text-lg font-medium">Create Order</h5>
			
			<div className="w-full h-[80vh]">
				<div className="flex">
					<div className="w-1/3 px-2">
						<InputField type="date" label="date" />
					</div>
					<div className="w-1/3 px-2">
						<br />
						<label className="text-gray4">Select Supplier</label>

						<Select
							placeholder={"Select Supplier"}
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							className="mt-1"
							options={options}
						/>
					</div>
					<div className="w-1/3 px-2">
						<InputField
							type="text"
							placeholder="Enter Item"
							label="Item"
							name="Item"
							
						/>
					</div>
				</div>
				<div className="flex">
					<div className="w-1/3 px-2">
						<InputField
							type="text"
							placeholder="Enter quantity"
							label="Qty"
							
						/>
					</div>
					<div className="w-1/3 px-2">
						<InputField
							type="text"
							placeholder="Enter Unicost"
							label="Unitcost"
							
						/>
					</div>
					<div className="w-1/3 px-2">
						<InputField
							type="text"
							placeholder="Enter Item"
							label="Total"
							
						/>
					</div>
				</div>
				<Button2 value={"Add Order"} />

				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Supplier</th>
						<th className="p-2 text-primary text-sm text-left">Items</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded w-[800px] -mt-[30vh] border border-gray1 bg-white">
								<div className="flex justify-between w-full p-5 bg-gray1">
									<div>Edit Order</div>
									<div>
										<p
											className="text-black text-lg cursor-pointer"
											onClick={closeEditData}
										>
											X
										</p>
									</div>
								</div>
								<div className="p-5">
								<div className="flex">
									<div className="w-1/3 px-2">
										<InputField type="date" label="date" />
									</div>
									<div className="w-1/3 px-2">
										<br />
										<label className="text-gray4">Select Supplier</label>

										<Select
											placeholder={"Select Supplier"}
											defaultValue={selectedOption}
											onChange={setSelectedOption}
											className="mt-1"
											options={options}
										/>
									</div>
									<div className="w-1/3 px-2">
										<InputField
											type="text"
											placeholder="Enter Item"
											label="Item"
											name="Item"
											
										/>
									</div>
								</div>
								<div className="flex">
									<div className="w-1/3 px-2">
										<InputField
											type="text"
											placeholder="Enter quantity"
											label="Qty"
											
										/>
									</div>
									<div className="w-1/3 px-2">
										<InputField
											type="text"
											placeholder="Enter Unicost"
											label="Unitcost"
											
										/>
									</div>
									<div className="w-1/3 px-2">
										<InputField
											type="text"
											placeholder="Enter Item"
											label="Total"
											
										/>
									</div>
								</div>
								<Button2 value={"Update"} />
								</div>
								
							</div>
						) : null}
						{/* edit popup end */}

						{income.map((incomeType) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={incomeType.id}
								>
									<td className="text-xs p-3 text-gray5">
										{incomeType.incomeType}
									</td>
									<td className="text-xs p-3 text-gray5">{incomeType.name}</td>
									<td className="text-xs p-3 text-gray5">{incomeType.items}</td>
									<td className="text-xs p-3 text-gray5">
										{incomeType.amount}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline className="text-red w-4 h-4" />
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(incomeType)}
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
export default OrdersComp;
