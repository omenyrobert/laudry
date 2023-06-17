import React from "react";
import Button from "../Button";
import InputField from "../InputField";

function CashFlow() {
	return (
		<>
			<div className="bg-white p-3 h-[82vh] mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">Cash Flow</p>
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

				<div className="flex border-b border-gray1">
					<div className="w-1/4 p-2">Date</div>
					<div className="w-1/4 p-2">Transaction Type</div>
					<div className="w-1/4 p-2">Journal No</div>
					<div className="w-1/4 p-2">Description</div>
					<div className="w-1/4 p-2">Account</div>
					<div className="w-1/4 p-2">Credit</div>
					<div className="w-1/4 p-2">Debit</div>
					<div className="w-1/4 p-2">Amount</div>
					<div className="w-1/4 p-2">Balance</div>
				</div>
				<div className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="w-1/4 p-2">11-07-2023</div>
					<div className="w-1/4 p-2">Withdraw</div>
					<div className="w-1/4 p-2">J01</div>
					<div className="w-1/4 p-2 truncate">
						For Jan Administraion expense
					</div>
					<div className="w-1/4 p-2">Administraion</div>
					<div className="w-1/4 p-2">30,000</div>
					<div className="w-1/4 p-2">30,000</div>
					<div className="w-1/4 p-2">150,000</div>
					<div className="w-1/4 p-2">180,000</div>
				</div>
				<div className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="w-1/4 p-2">11-07-2023</div>
					<div className="w-1/4 p-2">Withdraw</div>
					<div className="w-1/4 p-2">J01</div>
					<div className="w-1/4 p-2 truncate">
						For Jan Administraion expense
					</div>
					<div className="w-1/4 p-2">Administraion</div>
					<div className="w-1/4 p-2">30,000</div>
					<div className="w-1/4 p-2"></div>
					<div className="w-1/4 p-2">150,000</div>
					<div className="w-1/4 p-2">180,000</div>
				</div>
				<div className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="w-1/4 p-2">11-07-2023</div>
					<div className="w-1/4 p-2">Withdraw</div>
					<div className="w-1/4 p-2">J01</div>
					<div className="w-1/4 p-2 truncate">
						For Jan Administraion expense
					</div>
					<div className="w-1/4 p-2">Administraion</div>
					<div className="w-1/4 p-2"></div>
					<div className="w-1/4 p-2">50,000</div>
					<div className="w-1/4 p-2">150,000</div>
					<div className="w-1/4 p-2">180,000</div>
				</div>
				<div className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="w-1/4 p-2">11-07-2023</div>
					<div className="w-1/4 p-2">Withdraw</div>
					<div className="w-1/4 p-2">J01</div>
					<div className="w-1/4 p-2 truncate">
						For Jan Administraion expense
					</div>
					<div className="w-1/4 p-2">Administraion</div>
					<div className="w-1/4 p-2"></div>
					<div className="w-1/4 p-2">30,000</div>
					<div className="w-1/4 p-2">150,000</div>
					<div className="w-1/4 p-2">180,000</div>
				</div>
				<div className="bg-primary3 text-primary flex mt-1">
					<div className="w-10/12 p-2">Net Increase/Decrease</div>
					<div className="w-2/12 p-2">-200,000</div>
				</div>
				<div className="bg-primary3 text-primary flex mt-1">
					<div className="w-10/12 p-2">Cash At the Begining</div>
					<div className="w-2/12 p-2">1,200,000</div>
				</div>
				<div className="bg-primary3 text-primary flex mt-1">
					<div className="w-10/12 p-2">Cash At the End</div>
					<div className="w-2/12 p-2">1,000,000</div>
				</div>
			</div>
		</>
	);
}

export default CashFlow;
