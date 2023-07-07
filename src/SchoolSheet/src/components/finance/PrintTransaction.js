import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
import ButtonLoader from "../ButtonLoader";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback";
import axiosInstance, { UPLOADS_URL } from "../../axios-instance";
import { useNavigate } from "react-router-dom";
import { usePrint } from "../../hooks/print";
import { getSchools } from "../../store/schoolSheetSlices/schoolStore";
import { useDispatch, useSelector } from "react-redux";
import { BsTelephoneFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

function PrintTransaction() {
	const navigate = useNavigate();
	const { printContent } = usePrint();
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
		console.log(debitTransaction);
		if (debitTransaction.items) {
			setItems(debitTransaction.items);
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


	// items
	const [items, setItems] = useState([]);



	return (
		<>
			<div className="bg-white">
				<div className="flex bg-gray1 justify-between p-3 text-primary font-semibold mr-5">
					<div>
						<p
							onClick={() => {
								printContent("print-content");
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

					<div className="flex bg-primary rounded text-white py-5 px-6">
						<div className="flex w-10/12">
							<div className="">
								<img
									src={
										schools && schools.length > 0 && schools[0]?.logo
											? UPLOADS_URL + schools[0]?.logo
											: "avatar.jpeg"
									}
									className="w-28 h-28 object-cover rounded"
									alt="school_logo"
								/>
							</div>
							<div className="ml-5 text-white">
								<h1 className="text-2xl  font-semibold">{schools[0]?.name}</h1>
								<h1 className="">{schools[0]?.motto}</h1>
								<div className="flex mt-5 text-sm">
									<div className="font-thin flex">
										<div>
											<BsTelephoneFill className="text-sm mt-1 flex" />
										</div>{" "}
										<div className="ml-1">{schools[0]?.phoneNumbers}</div>{" "}
									</div>
									<div className="font-thin ml-5 flex">
										<div>
											<BsEnvelopeFill className="text-sm mt-1" />
										</div>
										<div className="ml-1">{schools[0]?.emails}</div>
									</div>
									<div className=" ml-5 font-thin flex">
										<div>
											<MdLocationPin className="text-sm mt-1" />
										</div>
										<div className="ml-1">{schools[0]?.location}</div>
									</div>
									<h1 className=" ml-5 font-thin">{schools[0]?.sites}</h1>
								</div>
							</div>
						</div>

						<div className="w-[300px]">
							<h1 className="font-bold text-2xl text-center ">
								{transactionType}
							</h1>
							<p className="text-center mt-2">
								{selectedTransactionSubType?.value}
							</p>
						</div>
					</div>
					<div className="flex justify-between mx-3 mt-5">
						<div className="w-1/3 p-1">
							<p className="text-primary font-semibold text-2xl">{title}</p>
						</div>

						<div className="w-1/3 p-1">
							<p className=" font-semibold">{amount}</p>
						</div>

						<div className="w-1/3 p-1 mt-2">
							<br />
							<label className="text-gray4">Account To Debit</label>
							<p>{accountToDebit?.value}</p>
						</div>
					</div>
					<div className="flex justify-between mx-3">
						<div className="w-1/3 p-1">
							<br />
							<label className="text-gray4">Account To Credit</label>
							<p>{accountToCredit?.value}</p>
						</div>

						<div className="w-1/3 p-1">
							<label className="text-gray4">Received By</label>
							<p>{recievedBy}</p>
						</div>

						<div className="w-1/3 p-1">
							<label className="text-gray4">Contacts</label>
							<p>{contacts}</p>
						</div>
					</div>

					<div className="p-5 border-2 border-gray1 rounded-md m-2">
						<div className="flex bg-gray1">
							<div className="p-2 w-1/4">Item</div>
							<div className="p-2 w-1/4">qty</div>
							<div className="p-2 w-1/4">Unit cost</div>
							<div className="p-2 w-1/4">Total</div>
						</div>
						{items.map((item, index) => {
							return (
								<div
									key={index}
									className=" flex border-b border-gray2 hover:bg-gray1"
								>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{item?.name}
									</div>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{Number(item?.quantity).toLocaleString()}
									</div>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{Number(item?.price).toLocaleString()}
									</div>
									<div className="w-1/4 p-2 text-sm text-gray5">
										{Number(item?.quantity * item?.price).toLocaleString()}
									</div>
								</div>
							);
						})}
					</div>

					<div className="flex justify-between mx-3">
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
