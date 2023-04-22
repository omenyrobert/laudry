import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Button2 from "../Button2";
import ButtonSecondary from "../ButtonSecondary";
import InputField from "../InputField";
import Button from "../Button";
import Suppliers from "./Suppliers"

function InvoiceComp() {
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];

	const [payments, setPayments] = useState([
		{ id: 1, date: "12-02-2023", amount: 20000, balance: 40000 },
		{ id: 2, date: "12-02-2023", amount: 10000, balance: 70000 },
		{ id: 3, date: "12-02-2023", amount: 5000, balance: 80000 },
		{ id: 4, date: "12-02-2023", amount: 20000, balance: 40000 },
		{ id: 5, date: "12-02-2023", amount: 20000, balance: 90000 },
		{ id: 6, date: "12-02-2023", amount: 20000, balance: 40000 },
		{ id: 7, date: "12-02-2023", amount: 20000, balance: 40000 },
		{ id: 8, date: "12-02-2023", amount: 20000, balance: 40000 },
		{ id: 9, date: "12-02-2023", amount: 20000, balance: 40000 },
	]);

	const [invoice, setInvoice] = useState([
		{ id: 1, invoiceType: "Lab Fees", name: "Malaria test", amount: 5000 },
		{
			id: 2,
			invoiceType: "Consultation Fees",
			name: "Covid test",
			amount: 15000,
		},
		{ id: 3, invoiceType: "Nursing Fees", name: "Malaria test", amount: 8000 },
		{ id: 4, invoiceType: "Lab Fees", name: "Malaria test", amount: 5000 },
		{ id: 5, invoiceType: "Lab Fees", name: "Malaria test", amount: 20000 },
		{ id: 6, invoiceType: "Lab Fees", name: "Nursing", amount: 35000 },
		{
			id: 2,
			invoiceType: "Consultation Fees",
			name: "Admission Per Night",
			amount: 55000,
		},
		{
			id: 2,
			invoiceType: "Consultation Fees",
			name: "Malaria test",
			amount: 5000,
		},
	]);

	return (
		<>
			<div className="w-full h-[80vh] ">
				<div className=" mx-2 bg-gray1 p-2 rounded-md shadow-md">
					<div className="p-2 bg-white">
						<p className="text-secondary font-medium text-lg">Suppliers</p>
						<div className="flex w-full">
							<div className="p-1 w-1/2">
								<InputField
									label="Supplier Name"
									type="text"
									placeholder="Supplier Name"
								/>
							</div>
							<div className="p-1 w-1/2">
								<InputField
									label="Contacts"
									type="text"
									placeholder="Contacts"
								/>
							</div>
						</div>

						<div className="flex w-full">
							<div className="p-1 w-1/2">
								<InputField label="Emails" type="text" placeholder="Emails" />
							</div>
							<div className="p-1 w-1/2">
								<InputField label="Address" type="text" placeholder="Address" />
							</div>
						</div>
						<div className="flex w-full">
							<div className="p-1 w-1/2">
								<InputField label="about" type="text" placeholder="about" />
							</div>
							<div className="p-1 w-1/2 mt-14">
								<Button value={"Add Supplier"} />
							</div>
						</div>

						<table className="mt-5 w-[98%] table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">Name</th>
								<th className="p-2 text-primary text-sm text-left">Contacts</th>
								<th className="p-2 text-primary text-sm text-left">Location</th>
							</thead>
							<tbody>
								{payments.map((pay) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={pay.id}
										>
											<td className="text-xs p-3 text-gray5">{pay.date}</td>
											<td className="text-xs p-3 text-gray5">{pay.amount}</td>
											<td className="text-xs p-3 text-gray5">{pay.balance}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				
					
				</div>
			</div>
		</>
	);
}
export default InvoiceComp;
