import React, { useState } from "react";
import "../../assets/styles/main.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";

function Reports() {
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
		{ value: "Lab Fees", label: "Lab Fees" },
		{ value: "Consultation", label: "Consulataion" },
	];
	const options2 = [
		{ value: "lunch", label: "lunch" },
		{ value: "Transport", label: "Water" },
		{ value: "Electric Bills", label: "Electric Bills" },
		{ value: "Transport", label: "Water" },
	];

	const [Incomes, setIncomes] = useState([
		{ id: 1, expensesType: "Lab Fees", name: "Malaria test", amount: 5000 },
		{
			id: 2,
			expensesType: "Consultation Fees",
			name: "Covid test",
			amount: 15000,
		},
		{ id: 3, expensesType: "Nursing Fees", name: "Malaria test", amount: 8000 },
		{ id: 4, expensesType: "Lab Fees", name: "Malaria test", amount: 5000 },
	]);

	return (
		<div className="w-full pr-2">
			<div className="h-[98vh] overflow-y-auto mt-2 w-full">
				<p className="text-primary text-xl font-semibold mb-2">Balance Sheet</p>
				<div className="flex p-2 bg-white shadow-lg rounded-md">
					<div className="w-3/5 flex pl-5">
						<div className="w-1/3">
							<br />
							<label className="text-gray4">Income Type</label>

							<Select
								placeholder={"Select Income Type"}
								defaultValue={selectedOption}
								onChange={setSelectedOption}
								className="mt-1"
								options={options}
							/>
						</div>
						<div className="w-1/3 ml-2">
							<br />
							<label className="text-gray4">Expense Type</label>

							<Select
								placeholder={"Select Expense Type"}
								defaultValue={selectedOption}
								onChange={setSelectedOption}
								className="mt-1"
								options={options2}
							/>
						</div>

						<div className="w-1/3 pl-2 pt-1">
							<p className="text-white bg-primary w-24 mt-12 text-center px-4 py-2 rounded-md font-semibold text-sm cursor-pointer">
								Filter
							</p>
						</div>
					</div>
					<div className=" w-[500px] -ml-20 pt-5">
						<InputField
							type="text"
							placeholder="Search For Patient ..."
							name="last_name"
							icon={<BsSearch className="w-3 -ml-7 mt-3" />}
						/>
					</div>
					<div className="pt-5 flex pl-5">
						<div className="w-1/3">
							<InputField type="date" placeholder="from" name="last_name" />
						</div>
						<div className="w-1/3 pl-2">
							<InputField type="date" placeholder="to" name="last_name" />
						</div>
						<div className="w-1/3 pl-2 pt-5">
							<Button value={"Filter"} />
						</div>
					</div>
				</div>
				<div className="flex mt-5">
					<div className="w-1/2 border-r-2 border-gray1 mr-5">
						<p className="text-lg text-primary">Incomes</p>
						<div className="h-[60vh] overflow-y-auto">
							<table className="mt-5 w-[98%] table-auto">
								<thead style={{ backgroundColor: "#0d6dfd10" }}>
									<th className="p-2 text-primary text-sm text-left">Type</th>
									<th className="p-2 text-primary text-sm text-left">
										Incomes
									</th>
									<th className="p-2 text-primary text-sm text-left">Amount</th>
								</thead>
								<tbody>
									{Incomes.map((expensesType) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expensesType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expensesType.expensesType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.amount}
												</td>
											</tr>
										);
									})}
									<tr className="bg-secondary11 p-2">
										<td colSpan="2">Sub Total</td>
										<td>120,000</td>
									</tr>

									{Incomes.map((expensesType) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expensesType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expensesType.expensesType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.amount}
												</td>
											</tr>
										);
									})}
									<tr className="bg-secondary11 p-2">
										<td colSpan="2">Sub Total</td>
										<td>120,000</td>
									</tr>

									{Incomes.map((expensesType) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expensesType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expensesType.expensesType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.amount}
												</td>
											</tr>
										);
									})}
									<tr className="bg-secondary11 p-2">
										<td colSpan="2">Sub Total</td>
										<td>120,000</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="flex justify-between mr-20">
							<div><p className="text-xl font-bold">Total</p></div>
							<div><p className="text-xl font-bold">5,890,000</p></div>
						</div>
					</div>
					<div className="w-1/2">
						<p className="text-lg text-primary">Expenses</p>
						<div className="h-[60vh] overflow-y-auto">
							<table className="mt-5 w-[98%] table-auto">
								<thead style={{ backgroundColor: "#0d6dfd10" }}>
									<th className="p-2 text-primary text-sm text-left">Type</th>
									<th className="p-2 text-primary text-sm text-left">
										Expenses
									</th>
									<th className="p-2 text-primary text-sm text-left">Amount</th>
								</thead>
								<tbody>
									{Incomes.map((expensesType) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expensesType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expensesType.expensesType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.amount}
												</td>
											</tr>
										);
									})}
									<tr className="bg-secondary11 p-2">
										<td colSpan="2">Sub Total</td>
										<td>120,000</td>
									</tr>

									{Incomes.map((expensesType) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expensesType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expensesType.expensesType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.amount}
												</td>
											</tr>
										);
									})}
									<tr className="bg-secondary11 p-2">
										<td colSpan="2">Sub Total</td>
										<td>120,000</td>
									</tr>

									{Incomes.map((expensesType) => {
										return (
											<tr
												className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
												key={expensesType.id}
											>
												<td className="text-xs p-3 text-gray5">
													{expensesType.expensesType}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.name}
												</td>
												<td className="text-xs p-3 text-gray5">
													{expensesType.amount}
												</td>
											</tr>
										);
									})}
									<tr className="bg-secondary11 p-2">
										<td colSpan="2">Sub Total</td>
										<td>120,000</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="flex justify-between mr-20">
							<div><p className="text-xl font-bold">Total</p></div>
							<div><p className="text-xl font-bold">5,890,000</p></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Reports;
