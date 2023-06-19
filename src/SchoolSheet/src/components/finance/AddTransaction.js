import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
import ButtonLoader from "../ButtonLoader";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback";
import axiosInstance from "../../axios-instance";
import { useNavigate } from "react-router-dom";


function AddTransaction() {
	const navigate = useNavigate();
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
	const [formLoading, setFormLoading] = useState(false);
	const [accountToCredit, setAccountToCredit] = useState(null);
	const [accountToDebit, setAccountToDebit] = useState(null);
	// Form Fields
	const [title, setTitle] = useState("");
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


	const [transactionData, setTransactionData] = useState({});

	const fetchTransaction = async () => {
		const transactionId = searchParams.get("transactionId");
		const response = await axiosInstance.get(`/transactions/${transactionId}`)
		const { status, payload } = response.data;
		if (status === false) {
			setTimeout(() => {
				toggleFeedback("error", { title: "Error", text: payload });
			}, 500);
			return;
		}
		const debitTransaction = payload.debitTransaction;
		const creditTransaction = payload.creditTransaction;

		// Set Form Values
		setTitle(debitTransaction.title);
		setContacts(debitTransaction.contacts);
		setDescription(debitTransaction.description);
		setReceipt(debitTransaction.receipt);
		setRecievedBy(debitTransaction.receivedBy);
		setAmount(debitTransaction.debit);
		setAccountToDebit({ label: debitTransaction.account.accountName, value: debitTransaction.account.accountName, ...debitTransaction.account });
		setAccountToCredit({ label: creditTransaction.account.accountName, value: creditTransaction.account.accountName, ...creditTransaction.account });
		setSelectedTransactionSubType({ label: debitTransaction.subType.name, value: debitTransaction.subType.name, ...debitTransaction.subType });
	};


	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchTransactionSubTypes();
				await fetchAccounts();
				if (action === "edit") {
					await fetchTransaction();
				}
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
		formData.append("contacts", contacts);
		formData.append("description", description);
		formData.append("receipt", receipt);
		formData.append("receivedBy", recievedBy);
		formData.append("file", file);
		formData.append("transactionCategory", transactionType ? transactionType : selectedTransactionType.type);
		formData.append("transactionTypeID", selectedTransactionSubType ? parseInt(selectedTransactionSubType.id) : null);
		formData.append("accountToDebit", accountToDebit.id);
		formData.append("accountToCredit", accountToCredit.id);
		formData.append("amount", amount);


		const response = await axiosInstance.post(`/transactions`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const { status, payload } = response.data;
		if (status === false) {
			setFormLoading(false);
			setTimeout(() => {
				toggleFeedback("error", { title: "Error", text: payload });
				setTimeout(() => {
					navigate(-1)
				}, 500);
			}, 500);
			return;
		}
		setFormLoading(false);
		setTimeout(() => {
			toggleFeedback("success", { title: "Success", text: "Transaaction SuccessFully created" });
		}, 500);
	};


	const validateForm = () => {
		if (!title) {
			toggleFeedback("error", { title: "Error", text: "Title is required" });
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

		// Check debit account
		if (!accountToDebit) {
			toggleFeedback("error", { title: "Error", text: "Debit Account is required" });
			return false;
		}

		// Check credit account
		if (!accountToCredit) {
			toggleFeedback("error", { title: "Error", text: "Credit Account is required" });
			return false;
		}

		if (!amount) {
			toggleFeedback("error", { title: "Error", text: "Amount is required" });
			return false;
		}

		// check if credit account and debit account are the same
		if (accountToCredit.id === accountToDebit.id) {
			toggleFeedback("error", { title: "Error", text: "Credit Account and Debit Account cannot be the same" });
			return false;
		}


		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		try {
			if (action === "edit") {
				await postUpdateFormData();
			} else if (action === "create") {
				await postFormData();
			}
		} catch (error) {
			toggleFeedback("error", { title: "Error", text: error.message });
		}
	};


	const postUpdateFormData = async () => {
		setFormLoading(true);

		// Get transaction id from url
		const transactionId = searchParams.get("transactionId");




		const formData = new FormData();
		formData.append("title", title);
		formData.append("contacts", contacts);
		formData.append("description", description);
		formData.append("receipt", receipt);
		formData.append("receivedBy", recievedBy);
		formData.append("file", file);
		formData.append("transactionCategory", transactionType ? transactionType : selectedTransactionType.type);
		formData.append("transactionTypeID", selectedTransactionSubType ? parseInt(selectedTransactionSubType.id) : null);
		formData.append("accountToDebit", accountToDebit.id);
		formData.append("accountToCredit", accountToCredit.id);
		formData.append("amount", amount);
		formData.append("transactionId", transactionId);


		const response = await axiosInstance.put(`/transactions`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const { status, payload } = response.data;
		if (status === false) {
			setFormLoading(false);
			setTimeout(() => {
				toggleFeedback("error", { title: "Error", text: payload });
			}, 500);
			return;
		}
		setFormLoading(false);
		setTimeout(() => {
			toggleFeedback("success", { title: "Success", text: "Transaaction SuccessFully Updated" });
			setTimeout(() => {
				navigate(-1)
			}, 500);
		}, 500);
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
						<p className="cursor-pointer" onClick={() => {
							navigate(-1)
						}} >Back</p>
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
						<InputField
							type="number"
							label="Amount"
							value={amount}
							onChange={(e) => setAmount(parseInt(e.target.value))}
						/>
					</div>

					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Account To Debit</label>
						<Select
							placeholder="Select Account"
							options={accounts}
							onChange={(e) => {
								setAccountToDebit(e)
							}}
							value={accountToDebit}
						/>
					</div>

				</div>
				<div className="flex justify-between mx-3">

					<div className="w-1/3 p-1">
						<br />
						<label className="text-gray4">Account To Credit</label>
						<Select
							placeholder="Select Account"
							options={accounts}
							onChange={(e) => {
								setAccountToCredit(e)
							}}
							value={accountToCredit}
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



					<div className="w-4/12 p-1">
						<InputField
							type="text"
							placeholder="Enter Receipt"
							label="Receipt"
							value={receipt}
							onChange={(e) => setReceipt(e.target.value)}
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
									<Button value={"Submit"} />
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
