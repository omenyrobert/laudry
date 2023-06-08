import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from "../../axios-instance";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";

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

function Accounts() {
	const dispatch = useDispatch();
	const [accountName, setAccountName] = useState("");
	const [accountType, setAccountType] = useState("");
	const [subType, setSubType] = useState("");
	const { accounts } = useSelector((state) => state.schoolStore);

	const handleAccountNameChange = (e) => {
		setAccountName(e.target.value);
	  };

	// createAccount
	const createAccount = async () => {
		try {
			let formData = {
				accountName,
				accountType: accountType.value,
				subType: subType.value
			};
	
			const response = await axiosInstance.post("/accounts", formData);
			const { data } = response;
			const { status } = data;
	
			if (status) {
				dispatch(getAccounts());
				setAccountName("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch(error) {
			console.log(error);
		}
	};

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);

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
							value={accountName}
							onChange={handleAccountNameChange} 
						/>
					</div>
					<div className="p-1 w-60">
						<br />
						<label className="text-gray4">Account Type</label>

						<Select
							placeholder="Select Account Type"
							defaultValue={accountType}
							onChange={setAccountType}
							options={accountTypes}
						/>
					</div>
					<div className="p-1 w-60">
						<br />
						<label className="text-gray4">Sub Type</label>
						<Select
							placeholder="Select Sub Type"
							defaultValue={subType}
							onChange={setSubType}
							options={subTypes}
						/>
					</div>

					<div className="p-1 w-auto mt-14" onClick={createAccount}>
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
			{
				accounts.map(account => (
					<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
						<div className="border border-gray1 p-3  w-1/4">{account.accountName}</div>
						<div className="border border-gray1 p-3 w-1/4">{account.accountType}</div>
						<div className="border border-gray1 p-3 w-1/4">{account.subType}</div>
						<div className="border border-gray1 p-3 w-1/4">{account.amount}</div>
						<div className="border border-gray1 p-3 w-1/4">Action</div>
					</div>
				))
			}
		</>
	);
}
export default Accounts;
