import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
import ButtonLoader from "../ButtonLoader";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback";
import axiosInstance from "../../axios-instance";


function AddTransaction() {
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState("");
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [transactionType, setTransactionType] = useState(searchParams.get("transactionType"));
	const action = searchParams.get("action");
	const { setLoading, toggleFeedback } = useFeedback();
	const [transactionSubTypes, setTransactionSubTypes] = useState([]);
	const [transactionTypes, setTransactionTypes] = useState([]);
	const [selectedTransactionType, setSelectedTransactionType] = useState(null);
	const [selectedTransactionSubType, setSelectedTransactionSubType] = useState(null);
	const [subTypesOptions, setSubTypesOptions] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [formLoading, setFormLoading] = useState(false);
	// Form Fields
	const [title, setTitle] = useState("");
	const [debitAmount, setDebitAmount] = useState(0);
	const [creditAmount, setCreditAmount] = useState(0);
	const [contacts, setContacts] = useState("");
	const [description, setDescription] = useState("");
	const [receipt, setReceipt] = useState("");
	const [recievedBy, setRecievedBy] = useState("");
	const [file, setFile] = useState(null);

	const defaultTypes = [
		{ label: "BILL", value: "bill", type: "bill" },
		{ label: "ASSET", value: "asset", type: "asset" },
		{ label: "LIABILITY", value: "liability", type: "liability" },
		{ label: "EQUITY", value: "equity", type: "equity" },
		{ label: "TRANSFER", value: "transfer", type: "transfer" },
	]




	const fetchTransactionSubTypes = async () => {
		setLoading(true);
		if (transactionType) {
			const response = await axiosInstance.get(`/transaction-types/${transactionType}`)

			const { status, payload } = response.data;
			if (status === false) {
				setLoading(false);
				setTimeout(() => {

					toggleFeedback("error", { title: "Error", text: payload });
				}, 500);
				return;
			}
			const transSubTypes = payload.map((transactionType) => {
				return { label: transactionType.name?.toLocaleUpperCase(), value: transactionType.name, ...transactionType };
			})
			setTransactionSubTypes(transSubTypes);
			setSubTypesOptions(transSubTypes);
			setLoading(false);

		} else {
			const response = await axiosInstance.get(`/transaction-types`)

			const { status, payload } = response.data;

			if (status === false) {
				throw new Error(payload);
			}
			const types = new Set(payload.map((transactionType) => transactionType.type));

			const transactionTypes = [...types].map((type) => {
				return { label: type.toLocaleUpperCase(), value: type, type };
			})

			setTransactionTypes([...transactionTypes, ...defaultTypes]);

			const transSubTypes = payload.map((transactionType) => {
				return { label: transactionType.name.toLocaleUpperCase(), value: transactionType.name, ...transactionType };
			})
			setTransactionSubTypes(transSubTypes);
			setLoading(false);

		}
	};

	const fetchAccounts = async () => {
		const response = await axiosInstance.get(`/accounts`)

		const { status, payload } = response.data;
		if (status === false) {
			throw new Error(payload);
		}
		console.log(payload)
		const accounts = payload.map((account) => {
			return { label: account.accountName, value: account.accountName, ...account };
		})
		setAccounts(accounts);

	};


	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchTransactionSubTypes();
				await fetchAccounts();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}
		fetchData();
	}, []);


	const handleTypeChange = (type) => {
		setSelectedTransactionType(type);
		const subTypes = transactionSubTypes.filter((subType) => subType.type === type.value);
		setSubTypesOptions(subTypes);
		setSelectedTransactionSubType(null);


	};






	const postFormData = async () => {
		setFormLoading(true);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("debit_amount", debitAmount);
		formData.append("credit_amount", creditAmount);
		formData.append("contacts", contacts);
		formData.append("description", description);
		formData.append("receipt", receipt);
		formData.append("recievedBy", recievedBy);
		formData.append("file", file);
		formData.append("transactionCategory", transactionType ? transactionType : selectedTransactionType.type);
		formData.append("transactionTypeID", selectedTransactionSubType ? parseInt(selectedTransactionSubType.id) : null);
		formData.append("account", parseInt(selectedAccount.id));
		formData.append("amount", selectedAccount.amount)
		formData.append("balance", selectedAccount.amount - debitAmount + creditAmount)

		const response = await axiosInstance.post(`/transactions`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const { status, payload } = response.data;
		if (status === false) {
			setFormLoading(false);
			setTimeout(() => {
				toggleFeedback("error", { title: "Error", text: "Transaaction SuccessFully created" });
			}, 500);
			return;
		}
		setFormLoading(false);
		setTimeout(() => {
			toggleFeedback("success", { title: "Success", text: payload });
		}, 500);
	};


	const validateForm = () => {
		if (!title) {
			toggleFeedback("error", { title: "Error", text: "Title is required" });
			return false;
		}
		if (!debitAmount && !creditAmount) {
			toggleFeedback("error", { title: "Error", text: "Debit or Credit Amount is required" });
			return false;
		}
		if (!selectedAccount) {
			toggleFeedback("error", { title: "Error", text: "Account is required" });
			return false;
		}
		if (!contacts) {
			toggleFeedback("error", { title: "Error", text: "Contacts is required" });
			return false;
		}
		if (!description) {
			toggleFeedback("error", { title: "Error", text: "Description is required" });
			return false;
		}
		if (!recievedBy) {
			toggleFeedback("error", { title: "Error", text: "Recieved By is required" });
			return false;
		}
		if (!transactionType) {
			if (!selectedTransactionType) {
				toggleFeedback("error", { title: "Error", text: "Transaction Type is required" });
				return false;
			}
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		try {
			await postFormData();
		} catch (error) {
			toggleFeedback("error", { title: "Error", text: error.message });
		}
	};




	return (
		<>
			<div className="bg-white">
				<div className="flex bg-gray1 justify-between p-3 text-primary font-semibold mr-5">
					<div>
						<p>
							{
								transactionType ? <>{action?.toLocaleUpperCase()}{" "}	{transactionType?.toLocaleUpperCase()}</> : "Add Transaction"

							}
						</p>
					</div>
					<div>
						<p className="cursor-pointer">Back</p>
					</div>
				</div>

				<div className="flex justify-between mx-3">
					<div className="w-1/3 p-1">
						<InputField
							type="text"
							placeholder="Enter Title"
							label="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>


					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Account</label>
						<Select
							placeholder="Select Account"
							options={accounts}
							onChange={(e) => {
								setSelectedAccount(e)
								setAmount(e.amount)
							}}
							value={selectedAccount}
						/>
					</div>


					<div className="w-1/3 p-1">
						<InputField
							type="number"
							label="Current Account Balance (Amount)"
							value={selectedAccount?.amount}
							editable={false}
						/>
					</div>



				</div>
				<div className="flex justify-between mx-3">

					<div className="w-1/3 p-1">
						<InputField
							type="number"
							placeholder="Enter Debit Amount"
							label="Debit Amount"
							value={debitAmount}
							onChange={(e) => setDebitAmount(e.target.value)}
						/>
					</div>

					<div className="w-1/3 p-1">
						<InputField
							type="number"
							placeholder="Enter Credit Amount"
							label="Credit Amount"
							value={creditAmount}
							onChange={(e) => setCreditAmount(e.target.value)}
						/>
					</div>

					<div className="w-1/3 p-1">
						<InputField
							type="text"
							placeholder="Enter Recipient"
							label="Recieved By"
							value={recievedBy}
							onChange={(e) => setRecievedBy(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex justify-between mx-3">

					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Transaction Type</label>
						{
							transactionType ?
								<InputField
									type="text"
									value={transactionType.toLocaleUpperCase()}
									editable={false}

								/>
								:
								<Select
									placeholder="Select Category"
									options={transactionTypes}
									onChange={handleTypeChange}
									value={selectedTransactionType}
								/>
						}
					</div>


					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Sub Type</label>
						<Select
							placeholder="Select Sub Type"
							options={subTypesOptions}
							onChange={(e) => setSelectedTransactionSubType(e)}
							value={selectedTransactionSubType}
						/>
					</div>

					<div className="w-1/3 p-1">
						<InputField
							type="text"
							placeholder="Enter Contacts"
							label="Contacts"
							value={contacts}
							onChange={(e) => setContacts(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex justify-between mx-3">
					<div className="w-4/12 p-1">
						<InputField
							type="file"
							label="Attach receipt / file"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>


					<div className="w-4/12 p-1">
						<InputField
							type="text"
							placeholder="Enter Receipt"
							label="Receipt"
							value={receipt}
							onChange={(e) => setReceipt(e.target.value)}
						/>
					</div>


					<div className="w-8/12 p-1">
						<br />
						<label>Description</label>
						<br />
						<textarea
							className="bg-gray1 min-h-[100px] border border-gray2 w-full"
							placeholder="Enter Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
				</div>


				<div className="flex justify-between bg-gray1  p-3 ounded">
					<div></div>
					<div>
						{
							formLoading ? (
								<div className="w-40">
									<ButtonLoader />
								</div>
							) : (
								<div onClick={handleSubmit} className="w-40">
									<Button value={"Add"} />
								</div>
							)
						}
					</div>
				</div>
			</div>
		</>
	);
}
export default AddTransaction;
