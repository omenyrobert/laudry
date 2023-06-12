import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from "../../axios-instance";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import Button2 from "../../components/Button2";
import ButtonSecondary from "../../components/ButtonSecondary";
import ButtonLoader from "../../components/ButtonLoader";
import Loader from "../../components/Loader";

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
	const [posting, setPosting] = useState(false);
	const createAccount = async () => {
		try {
			setPosting(true);
			let formData = {
				accountName,
				accountType: accountType.value,
				subType: subType.value,
			};

			const response = await axiosInstance.post("/accounts", formData);
			const { data } = response;
			const { status } = data;

			if (status) {
				dispatch(getAccounts());
				setAccountName("");
				setPosting(false);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
			}
		} catch (error) {
			console.log(error);
			setPosting(false);
		}
	};

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);

	const [modal, setModal] = useState(false);

	const openModal = () => {
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};

	return (
		<>
			<div className="flex justify-between relative p-5 bg-white rounded-md border border-gray2">
				{/* add modal */}

				{modal ? (
					<div className="absolute bg-white z-50 shadow-2xl rounded-md h-auto">
						<div className="flex justify-between p-3 bg-gray1 text-primary font-medium">
							<div>Add Account</div>
							<div className="">
								<p className="cursor-pointer" onClick={closeModal}>
									X
								</p>
							</div>
						</div>

						<div className="p-3 flex">
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
						</div>
						<p className="p-2 bg-gray1 text-primary">
							For a Supplier Or a Customer
						</p>
						<div className="p-3 flex">
							<div className="p-1 w-60">
								<label className="text-gray4">Customer/Supplier</label>

								<Select
									placeholder="Select Category"
									defaultValue={accountType}
									onChange={setAccountType}
									options={accountTypes}
								/>
							</div>
							<div className="p-1 w-60">
								<InputField
									label="Contacts"
									type="text"
									placeholder="Contacts"
									value={accountName}
									onChange={handleAccountNameChange}
								/>
							</div>
							<div className="p-1 w-60">
								<InputField
									label="Location"
									type="text"
									placeholder="Location"
									value={accountName}
									onChange={handleAccountNameChange}
								/>
							</div>
						</div>
						<div className="mx-3 flex">
							<div className="w-60 -mt-7">
								<InputField
									label="Opening Balance"
									placeholder="Opening Balance"
								/>
							</div>
							<div className="ml-5">
								<label className="text-gray4">About</label>
								<br />
								<textarea className="bg-gray1 w-96 border border-gray2 min-h-[100px]"></textarea>
							</div>
						</div>
						<div className="flex justify-between p-3 bg-gray1">
							<div onClick={closeModal}>
								<ButtonSecondary value={"Close"} />
							</div>
							<div className="">
								{posting ? (
									<div className="w-40">
										<ButtonLoader />
									</div>
								) : (
									<div className="p-1 w-40" onClick={createAccount}>
										<Button value={"Create Account"} />
									</div>
								)}
							</div>
						</div>
					</div>
				) : null}

				{/* add modal */}

				<div className="p-1">
					<p className="font-bold text-secondary text-xl">Charts Of Accounts</p>
				</div>
				<div onClick={openModal}>
					<Button2 value={"Account"} />
				</div>
			</div>
			<div className="flex text-primary bg-primary3 mt-5 mr-2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Account Name</div>
				<div className="border border-gray1 p-3 w-1/4">Type</div>
				<div className="border border-gray1 p-3 w-1/4">Sub Type</div>
				<div className="border border-gray1 p-3 w-1/4">Amount</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			{accounts.map((account) => (
				<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
					<div className="border border-gray1 p-3  w-1/4">
						{account.accountName}
					</div>
					<div className="border border-gray1 p-3 w-1/4">
						{account.accountType}
					</div>
					<div className="border border-gray1 p-3 w-1/4">{account.subType}</div>
					<div className="border border-gray1 p-3 w-1/4">{account.amount}</div>
					<div className="border border-gray1 p-3 w-1/4">Action</div>
				</div>
			))}
			<Loader />
		</>
	);
}
export default Accounts;
