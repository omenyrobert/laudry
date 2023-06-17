import React from "react";
import Button from "../Button";
import InputField from "../InputField";

function TrialBalance() {
	return (
		<>
			<div className="bg-white p-3 h-[85vh] overflow-y-auto mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">Trial Balance </p>
					</div>
					<div className="flex">
						<div className="mr-3">
							<InputField type="date" label="From" />
						</div>
						<div className="mr-3">
							<InputField type="date" label="to" />
						</div>
						<div>
							<InputField type="month" label="By Month" />
						</div>
						<div className="ml-5 mt-12">
							<Button value={"Pdf"} />
						</div>
					</div>
				</div>

				<div className="flex bg-primary text-white mt-5">
					<div className="border border-gray1 p-3  w-3/5">Accounts</div>
					<div className="border border-gray1 p-3 w-1/5">Debit</div>
					<div className="border border-gray1 p-3 w-1/5">Credit</div>
				</div>

				<div className="border border-gray1 p-3 text-primary text-xl">
					Assets
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Canteen</div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Canteen</div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Canteen</div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
				</div>

				<div className="border border-gray1 p-3 text-primary text-xl">
					Liabilities
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Loan</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Loan</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Loan</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
				</div>

				<div className="border border-gray1 p-3 text-primary text-xl">
					Incomes
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Uniforms</div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Meals</div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Canteen</div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
				</div>

				<div className="border border-gray1 p-3 text-primary text-xl">
					Expenses
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Transport</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Lunch</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
				</div>
				<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-3/5">Water</div>
					<div className="border border-gray1 p-3 w-1/5"></div>
					<div className="border border-gray1 p-3 w-1/5">23,000,000</div>
				</div>
				<div className="flex bg-primary text-white mt-5">
					<div className="border border-gray1 p-3  w-3/5">Total</div>
					<div className="border border-gray1 p-3 w-1/5">67,788,000</div>
					<div className="border border-gray1 p-3 w-1/5">24,890,000</div>
				</div>
			</div>
		</>
	);
}

export default TrialBalance;
