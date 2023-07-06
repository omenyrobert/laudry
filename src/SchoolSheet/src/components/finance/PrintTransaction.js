import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
import ButtonLoader from "../ButtonLoader";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback";
import axiosInstance, { UPLOADS_URL } from "../../axios-instance";
import { useNavigate } from "react-router-dom";
import { usePrint } from "../../hooks/print"
import { getSchools } from "../../store/schoolSheetSlices/schoolStore";
import { useDispatch, useSelector } from "react-redux";

function PrintTransaction() {
	const navigate = useNavigate();
	const { printContent } = usePrint()
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState("");
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [transactionType, setTransactionType] = useState(
		searchParams.get("transactionType")
	);
	const action = searchParams.get("action");
	const { setLoading, toggleFeedback } = useFeedback();
	const [transactionSubTypes, setTransactionSubTypes] = useState([]);
	const [transactionTypes, setTransactionTypes] = useState([]);
	const [selectedTransactionType, setSelectedTransactionType] = useState(null);
	const [selectedTransactionSubType, setSelectedTransactionSubType] =
		useState(null);
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
	const { schools } = useSelector((state) => state.schoolStore);
	const dispatch = useDispatch();
	const [school, setSchool] = useState(null);

	useEffect(() => {
		dispatch(getSchools());
	}, [dispatch]);

	useEffect(() => {
		if (schools[0]) {
			setSchool(schools[0]);
		}
	}, [schools]);

	const defaultTypes = [
		{ label: "BILL", value: "bill", type: "bill" },
		{ label: "LIABILITY", value: "liability", type: "liability" },
		{ label: "EQUITY", value: "equity", type: "equity" },
		{ label: "INVOICE", value: "invoice", type: "invoice" },
		{ label: "RECEIPT", value: "receipt", type: "receipt" },
	];

	const fetchTransactionSubTypes = async () => {
		setLoading(true);
		if (transactionType) {
			const response = await axiosInstance.get(
				`/transaction-types/${transactionType}`
			);

			const { status, payload } = response.data;
			if (status === false) {
				setLoading(false);
				setTimeout(() => {
					toggleFeedback("error", { title: "Error", text: payload });
				}, 500);
				return;
			}
			console.log(payload);
			const transSubTypes = payload.map((transactionType) => {
				return {
					label: transactionType.name?.toLocaleUpperCase(),
					value: transactionType.name,
					...transactionType,
				};
			});
			setTransactionSubTypes(transSubTypes);
			setSubTypesOptions(transSubTypes);
			setLoading(false);
		} else {
			const response = await axiosInstance.get(`/transaction-types`);

			const { status, payload } = response.data;

			if (status === false) {
				throw new Error(payload);
			}
			const types = new Set(
				payload.map((transactionType) => transactionType.type)
			);

			const transactionTypes = [...types].map((type) => {
				return { label: type.toLocaleUpperCase(), value: type, type };
			});

			setTransactionTypes([...transactionTypes, ...defaultTypes]);

			const transSubTypes = payload.map((transactionType) => {
				return {
					label: transactionType.name.toLocaleUpperCase(),
					value: transactionType.name,
					...transactionType,
				};
			});
			setTransactionSubTypes(transSubTypes);
			setLoading(false);
		}
	};

	const fetchAccounts = async () => {
		const response = await axiosInstance.get(`/accounts`);

		const { status, payload } = response.data;
		if (status === false) {
			throw new Error(payload);
		}
		console.log(payload);
		const accounts = payload.map((account) => {
			return {
				label: account.accountName,
				value: account.accountName,
				...account,
			};
		});
		setAccounts(accounts);
	};

	const [transactionData, setTransactionData] = useState({});

	const fetchTransaction = async () => {
		const transactionId = searchParams.get("transactionId");
		const response = await axiosInstance.get(`/transactions/${transactionId}`);
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
		setAccountToDebit({
			label: debitTransaction.account.accountName,
			value: debitTransaction.account.accountName,
			...debitTransaction.account,
		});
		setAccountToCredit({
			label: creditTransaction.account.accountName,
			value: creditTransaction.account.accountName,
			...creditTransaction.account,
		});
		if (debitTransaction.subType) {
			setSelectedTransactionSubType({
				label: debitTransaction.subType.name,
				value: debitTransaction.subType.name,
				...debitTransaction.subType,
			});
		}
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
				console.log(error);
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}
		fetchData();
	}, []);

	const handleTypeChange = (type) => {
		setSelectedTransactionType(type);
		const subTypes = transactionSubTypes.filter(
			(subType) => subType.type === type.value
		);
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
		formData.append(
			"transactionCategory",
			transactionType ? transactionType : selectedTransactionType.type
		);
		formData.append(
			"transactionTypeID",
			selectedTransactionSubType
				? parseInt(selectedTransactionSubType.id)
				: null
		);
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
					navigate(-1);
				}, 500);
			}, 500);
			return;
		}
		setFormLoading(false);
		setTimeout(() => {
			toggleFeedback("success", {
				title: "Success",
				text: "Transaaction SuccessFully created",
			});
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
			toggleFeedback("error", {
				title: "Error",
				text: "Description is required",
			});
			return false;
		}
		if (!recievedBy) {
			toggleFeedback("error", {
				title: "Error",
				text: "Recieved By is required",
			});
			return false;
		}
		if (!transactionType) {
			if (!selectedTransactionType) {
				toggleFeedback("error", {
					title: "Error",
					text: "Transaction Type is required",
				});
				return false;
			}
		}

		// Check debit account
		if (!accountToDebit) {
			toggleFeedback("error", {
				title: "Error",
				text: "Debit Account is required",
			});
			return false;
		}

		// Check credit account
		if (!accountToCredit) {
			toggleFeedback("error", {
				title: "Error",
				text: "Credit Account is required",
			});
			return false;
		}

		if (!amount) {
			toggleFeedback("error", { title: "Error", text: "Amount is required" });
			return false;
		}

		// check if credit account and debit account are the same
		if (accountToCredit.id === accountToDebit.id) {
			toggleFeedback("error", {
				title: "Error",
				text: "Credit Account and Debit Account cannot be the same",
			});
			return false;
		}

		return true;
	};



	// items
	const [items, setItems] = useState([]);

	const [item, setItem] = useState("");
	const [qty, setQty] = useState("");
	const [unitCost, setUnitCost] = useState("");

	const addItem = () => {
		if (item && qty && unitCost) {
			let itemObj = {
				item: item,
				qty: qty,
				unitCost: unitCost,
			};
			// const newArray = [];
			items.push(itemObj);
			// setItems(newArray);
			setItem("");
			setQty("");
			setUnitCost("");
		}
	};

	const deleteItem = () => { };



	return (
		<>
			<div className="bg-white">
				<div className="flex bg-gray1 justify-between p-3 text-primary font-semibold mr-5">
					<div>
						<p
							onClick={() => {
								printContent("print-content")
							}}
						>

							<Button value={"PRINT " + transactionType?.toLocaleUpperCase()} />

						</p>
					</div>
					<div>
						<p
							className="cursor-pointer"
							onClick={() => {
								navigate(-1);
							}}
						>
							Back
						</p>
					</div>
				</div>

				<div id="print-content">
					{/* Header */}
					<div className="flex justify-center">
						<div className="w-1/2">

							<div className="flex justify-center">
								<div className="w-1/2">
									<p className="text-center text-2xl font-bold">
										{school?.name}
									</p>
								</div>
							</div>
							<div className="flex justify-center">
								<div className="w-1/2">
									<p className="text-center font-normal">
										{school?.motto}
									</p>
								</div>
							</div>
							<div className="flex justify-center">
								<div className="w-1/2">
									<p className="text-center font-normal">
										{school?.location}
									</p>
								</div>
							</div>
							<div className="flex justify-center">
								<div className="w-1/2">
									<p className="text-center  font-normal">
										{school?.phoneNumbers}
									</p>
								</div>
							</div>
						</div>
					</div>


					<div className="flex justify-between mx-3">
						<div className="w-1/4 p-1">
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
								placeholder="Enter Amount"
								value={amount}
								onChange={(e) => setAmount(parseInt(e.target.value))}
							/>
						</div>

						<div className="w-1/4 p-1 mt-2">
							<br />
							<label className="text-gray4">Account To Debit</label>
							<Select
								placeholder="Select Account"
								options={accounts}
								onChange={(e) => {
									setAccountToDebit(e);
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
									setAccountToCredit(e);
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
							{transactionType ? (
								<InputField
									type="text"
									value={transactionType.toLocaleUpperCase()}
									editable={false}
								/>
							) : (
								<Select
									placeholder="Select Category"
									options={transactionTypes}
									onChange={handleTypeChange}
									value={selectedTransactionType}
								/>
							)}
						</div>

						<div className="w-1/3 p-1 mt-5">
							<br />
							<label className="text-gray4">Sub Type</label>
							<Select
								placeholder="Select Sub Type"
								options={subTypesOptions}
								onChange={(e) => setSelectedTransactionSubType(e)}
								value={selectedTransactionSubType}
							/>
						</div>

						<div className="w-4/12 p-1 mt-2">
							<InputField
								type="text"
								placeholder="Enter Receipt"
								label="Receipt/Invoice/file"
								value={receipt}
								onChange={(e) => setReceipt(e.target.value)}
							/>
						</div>
					</div>
					<div className="p-5 border-2 border-gray1 rounded-md m-2">
						<div className="flex">
							<div className="p-2 w-1/4">
								<InputField
									placeholder="Item"
									value={item}
									onChange={(e) => setItem(e.target.value)}
								/>
							</div>
							<div className="p-2 w-1/4">
								<InputField
									placeholder="Qty"
									value={qty}
									onChange={(e) => setQty(e.target.value)}
								/>
							</div>

							<div className="p-2 w-1/4">
								<InputField
									placeholder="Unit cost"
									value={unitCost}
									onChange={(e) => setUnitCost(e.target.value)}
								/>
							</div>

							<div className="p-2 w-1/4 mt-5">
								<div className="w-16" onClick={addItem}>
									<Button value={"Add"} />
								</div>
							</div>
						</div>
						{items.map((item, index) => {
							return (
								<div
									key={index}
									className=" flex border-b border-gray2 hover:bg-gray1"
								>
									<div className="w-1/4 p-2 text-sm text-gray5">{item?.item}</div>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{Number(item?.qty).toLocaleString()}
									</div>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{Number(item?.unitCost).toLocaleString()}
									</div>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{Number(item?.qty * item?.unitCost).toLocaleString()}
									</div>
									<div className="w-1/4 p-2">
										<p
											className="text-red text-xl cursor-pointer"
											onClick={deleteItem}
										>
											X
										</p>
									</div>
								</div>
							);
						})}
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
								className="bg-gray1 min-h-[100px] p-5 border border-gray2 w-full"
								placeholder="Enter Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default PrintTransaction;
