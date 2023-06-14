import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import { Link } from "react-router-dom";

function Ledger() {
	return (
		<>
			<div className="bg-white p-3 h-[82vh] mt-2 overflow-y-auto border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div className="flex">
						<Link to="/accounts">
							<p className="text-primary font-semibold p-2 border border-primary rounded-md h-10 cursor-pointer">
								Back
							</p>
						</Link>

						<p className="text-secondary text-xl font-bold ml-5">
							Ledger Account Name
						</p>
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

				<div className="flex border-b border-gray1 bg-primary3 text-primary font-medium mt-3">
					<div className="w-1/4 p-2">Date</div>
					<div className="w-1/4 p-2">Transaction Type</div>
					<div className="w-1/4 p-2">Transaction No</div>
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
			</div>
		</>
	);
}

export default Ledger;
