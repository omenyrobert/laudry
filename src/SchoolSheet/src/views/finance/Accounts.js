import React from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function Accounts() {
	return (
		<>
			<div className="flex p-2 bg-white rounded-md border border-gray2">
				<div className="p-1 w-1/4">
					<InputField
						label="Account Name"
						type="text"
						placeholder="Enter account Name"
					/>
				</div>
				<div className="p-1 w-1/4">
					<InputField
						label="Account Type"
						type="text"
						placeholder="Enter account Name"
					/>
				</div>
				<div className="p-1 w-1/4">
					<InputField
						label="Current / Non Current"
						type="text"
						placeholder="Enter account Name"
					/>
				</div>
				<div className="p-1 w-1/4">
					<InputField
						label="Amount"
						type="text"
						placeholder="Enter Amount"
					/>
				</div>
				<div className="p-1 w-1/4 mt-14">
					<Button value={"Create Account"} />
				</div>
			</div>
			<div className="flex text-primary bg-primary3 mt-5 mr-2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Account Name</div>
				<div className="border border-gray1 p-3 w-1/4">Type</div>
				<div className="border border-gray1 p-3 w-1/4">NON CURRENT/CURRENT</div>
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
