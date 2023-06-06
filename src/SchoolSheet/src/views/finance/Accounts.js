import React from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "react-select";

function Accounts() {
	const accountTypes = [
		{ label: "Asset", value: "Asset" },
		{ label: "Liability", value: "Liability" },
		{ label: "Equity", value: "Equity" },
		{ label: "Income", value: "Income" },
		{ label: "Expense", value: "Expense" },
	];
	const subTypes = [
		{ label: "CURRENT", value: "CURRENT" },
		{ label: "NON_CURRENT", value: "NON_CURRENT" },
	];

	return (
		<>
			<div className="flex justify-between p-2 bg-white rounded-md border border-gray2">
				<div className="p-1">
					<p className="font-bold text-secondary text-xl mt-10">
						Charts Of Accounts
					</p>
				</div>
				<div className="p-1 flex">
					<div className="p-1 w-60">
						<InputField
							label="Account Name"
							type="text"
							placeholder="Account Name"
						/>
					</div>
					<div className="p-1 w-60">
						<br />
						<label className="text-gray4">Account Type</label>

						<Select
							placeholder="Select Account Type"
							// defaultValue={selectedExam}
							// onChange={setSelectedExam}
							options={accountTypes}
						/>
					</div>
					<div className="p-1 w-60">
						<br />
						<label className="text-gray4">Sub Type</label>
						<Select
							placeholder="Select Sub Type"
							// defaultValue={selectedExam}
							// onChange={setSelectedExam}
							options={subTypes}
						/>
					</div>

					<div className="p-1 w-auto mt-14">
						<Button value={"Create Account"} />
					</div>
				</div>
			</div>
			<div className="flex text-primary bg-primary3 mt-5 mr-2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Account Name</div>
				<div className="border border-gray1 p-3 w-1/4">Type</div>
				<div className="border border-gray1 p-3 w-1/4">Sub Type</div>
				<div className="border border-gray1 p-3 w-1/4">Amount</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Meals</div>
				<div className="border border-gray1 p-3 w-1/4">Liability</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT</div>
				<div className="border border-gray1 p-3 w-1/4">27,097,906</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Meals</div>
				<div className="border border-gray1 p-3 w-1/4">Liability</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT</div>
				<div className="border border-gray1 p-3 w-1/4">27,097,906</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Meals</div>
				<div className="border border-gray1 p-3 w-1/4">Liability</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT</div>
				<div className="border border-gray1 p-3 w-1/4">27,097,906</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
		</>
	);
}
export default Accounts;
