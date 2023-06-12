import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import ButtonLoader from "../ButtonLoader";
import Select from "react-select";

function AddTransaction() {
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState("");

	const postExpense = () => {};

	const accounts = [
		{ label: "from db", value: "db" },
		{ label: "from db", value: "db" },
	];
	return (
		<>
			<div className="bg-white">
				<div className="flex bg-gray1 justify-between p-3 text-primary font-semibold mr-5">
					<div>
						<p>
							Add Expense / Bill/ Income / Payment / Asset / Liability / Equity
						</p>
					</div>
					<div>
						<p className="cursor-pointer">Back</p>
					</div>
				</div>
				<div className="flex justify-between mx-3">
					<div className="w-1/3 p-1">
						<InputField
							type="date"
							label="Date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div className="w-1/3 p-1">
						<InputField
							type="text"
							placeholder="Enter Title"
							label="Title"
							// value={expense}
							// onChange={(e) => setExpense(e.target.value)}
						/>
					</div>
					<div className="w-1/3 p-1">
						<InputField
							type="number"
							placeholder="Enter Amounnt"
							label="Amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Account to Debit</label>
						<Select placeholder="Select Category" options={accounts} />
					</div>
				</div>
				<div className="flex justify-between mx-3">
					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Account to Credit</label>
						<Select placeholder="Select Category" options={accounts} />
					</div>
					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Sub Type</label>
						<Select placeholder="Select Category" options={accounts} />
					</div>
					<div className="w-1/3 p-1">
						<InputField
							type="text"
							placeholder="Enter Received By "
							label="Received By"
							// value={to}
							// onChange={(e) => setTo(e.target.value)}
						/>
					</div>
					<div className="w-1/3 p-1">
						<InputField
							type="text"
							placeholder="Enter Contacts"
							label="Contacts"
							// value={to}
							// onChange={(e) => setTo(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex justify-between mx-3">
					<div className="w-4/12 p-1">
						<InputField
							type="file"
							label="Attach receipt / file"
							// value={contacts}
							// onChange={(e) => setContacts(e.target.value)}
						/>
					</div>
					<div className="w-4/12 p-1">
						<br />
						<label className="text-gray4">Select Receipt</label>
						<Select placeholder="Select Category" options={accounts} />
					</div>
					<div className="w-8/12 p-1">
						<br />
						<label>Description</label>
						<br />
						<textarea className="bg-gray1 min-h-[100px] border border-gray2 w-full"></textarea>
					</div>
				</div>
				<div className="flex justify-between bg-gray1  p-3 ounded">
					<div></div>
					<div>
						<div className="w-40">
							<ButtonLoader />
						</div>
						<div className="w-40" onClick={postExpense}>
							<Button value={"Add"} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default AddTransaction;
