import React, { useState } from "react";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";

function ExternalInvoicesList() {


	const [invoices, setInvoices] = useState([
		{ id: 1, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },
		{ id: 2, date: "11-03-2023", supplier: "Faire Well Pharmacy", amount: 7000000, paid: 3000000, balance: 20000 },
		{ id: 3, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },
		{ id: 4, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 6000000, paid: 3000000, balance: 20000 },
		{ id: 5, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 2000000, paid: 3000000, balance: 20000 },
		{ id: 6, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 1000000, paid: 3000000, balance: 20000 },
		{ id: 7, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },
		{ id: 8, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },
		{ id: 9, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },
		{ id: 10, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },
		{ id: 11, date: "11-03-2023", supplier: "GetWell Pharmacy", amount: 5000000, paid: 3000000, balance: 20000 },

	
	
	]);

	const [editData, setEditData] = useState(false);
	
	const closeEditData = () => {
		setEditData(false);
		console.log('hello');
	};
	const openEditData = () => {
		setEditData(true);

	};

	return (
		<>
			<h5 className="text-lg font-medium">External Invoices</h5>
			<div className="w-full h-[80vh]">
				<hr className="text-primary" />
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<td className="p-2 text-primary text-sm text-left">Date</td>
						<td className="p-2 text-primary text-sm text-left">Supplier</td>
						<td className="p-2 text-primary text-sm text-left">Amount</td>
						<td className="p-2 text-primary text-sm text-left">Paid</td>
						<td className="p-2 text-primary text-sm text-left">Balance</td>
						<td className="p-2 text-primary text-sm text-left">Action</td>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded w-[500px] bg-white border border-gray1">
								<div className="flex justify-between bg-gray1 p-5">
									<div>
										<p className="text-gray5">Add deposit</p>
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
								<div className="p-5">
									<InputField
										type="number"
										placeholder="Enter Amount"
										label="Amount"
										
										
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
									<ButtonSecondary value={"Update"} />
								</div>
								
								
								
							</div>
						) : null}
						{/* edit popup end */}

						{invoices.map((invoice) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={invoice.id}
								>
									<td className="text-xs p-3 text-gray5">
										{invoice.date}
									</td>
									<td className="text-xs p-3 text-gray5">{invoice.supplier}</td>
									<td className="text-xs p-3 text-gray5">
										{invoice.amount}
									</td>
									<td className="text-xs p-3 text-gray5">
										{invoice.paid}
									</td>
									<td className="text-xs p-3 text-gray5">
										{invoice.balance}
									</td>
									<td className="text-sm text-primary p-3" onClick={openEditData}>
										clear
										
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
export default ExternalInvoicesList;
