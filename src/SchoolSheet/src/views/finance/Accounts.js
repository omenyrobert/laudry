import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import axiosInstance from "../../axios-instance";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import Button2 from "../../components/Button2";
import ButtonSecondary from "../../components/ButtonSecondary";
import ButtonLoader from "../../components/ButtonLoader";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useFeedback } from "../../hooks/feedback"

const accountTypes = [
	{ label: "Asset", value: "Asset" },
	{ label: "Liability", value: "Liability" },
	{ label: "Equity", value: "Equity" },
	{ label: "Income", value: "Income" },
	{ label: "Expense", value: "Expense" },
	{ label: "Sales", value: "Sales" },
	{ label: "Stock", value: "Stock" },
	{ label: "Purchases", value: "Purchases" },
];

const subTypes = [
	{ label: "CURRENT", value: "CURRENT" },
	{ label: "NON CURRENT", value: "NON_CURRENT" },
	{ label: "DIRRECT", value: "DIRRECT" },
	{ label: "INDIRRECT", value: "INDIRRECT" },
	{ label: "Loans", value: "Loans" },
	{ label: "Bank Overdraft", value: "Bank_Overdraft" },
];

const types = [
	{ label: "Customer", value: "Customer" },
	{ label: "Supplier", value: "Supplier" },
];

function Accounts() {
	const dispatch = useDispatch();
	const [accountName, setAccountName] = useState("");
	const [accountType, setAccountType] = useState(null);
	const [subType, setSubType] = useState(null);
	const [amount, setAmount] = useState(null);
	const [supplier, setSupplier] = useState(null);
	const [contacts, setContacts] = useState("");
	const [address, setAddress] = useState("");
	const [about, setAbout] = useState("");
	// edit accounts
	const [editAccountName, setEditAccountName] = useState("");
	const [editAccountType, setEditAccountType] = useState(null);
	const [editSubType, setEditSubType] = useState(null);
	const [editAmount, setEditAmount] = useState(null);
	const [editSupplier, setEditSupplier] = useState(null);
	const [editContacts, setEditContacts] = useState("");
	const [editAddress, setEditAddress] = useState("");
	const [editAbout, setEditAbout] = useState("");
	const [accountId, setAccountId] = useState("");
	const [showUpdate, setShowUpdate] = useState(false);
	const { accounts, loading } = useSelector((state) => state.schoolStore);
	const { toggleFeedback } = useFeedback()

	const handleAccountNameChange = (e) => {
		setAccountName(e.target.value);
	};

	// createAccount
	const [posting, setPosting] = useState(false);
	const createAccount = async () => {
		// validation
		if (!accountName || !accountType || !subType || !supplier || !amount) {
			toggleFeedback("error", {
				title: "Error",
				text: "All fields are required"
			})
			return;
		}



		try {
			setPosting(true);
			let formData = {
				accountName,
				accountType: accountType?.value,
				subType: subType?.value,
				supplierName: supplier?.value,
				contacts: contacts,
				address: address,
				about: about,
				amount: parseFloat(amount),
			};

			const response = await axiosInstance.post("/accounts", formData);
			const { data } = response;
			const { status } = data;

			if (status) {
				dispatch(getAccounts());
				setAccountName("");
				setSubType(null);
				setAccountType(null);
				setSupplier(null);
				setContacts("");
				setAddress("");
				setAbout("");
				setAmount(null);
				setPosting(false);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeModal();
			}
		} catch (error) {
			console.log(error);
			setPosting(false);
		}
	};

	// update supplier
	const updateAccount = async () => {
		// validate
		if (!editAccountName) {
			toggleFeedback("error", {
				title: "Error",
				text: "Account Name is required"
			})
			return;
		}
		if (!editAccountType) {
			toggleFeedback("error", {
				title: "Error",
				text: "Account Type is required"
			})
			return;
		}
		if (!editSubType) {
			toggleFeedback("error", {
				title: "Error",
				text: "Sub Type is required"
			})
			return;
		}
		if (!editSupplier) {
			toggleFeedback("error", {
				title: "Error",
				text: "Supplier is required"
			})
			return;
		}

		if (!editAmount) {
			toggleFeedback("error", {
				title: "Error",
				text: "Amount is required"
			})
			return;
		}




		try {
			console.log("Posting update")
			setPosting(true);
			let formData = {
				id: accountId,
				accountName: editAccountName,
				accountType: editAccountType?.value,
				subType: editSubType?.value,
				supplierName: editSupplier?.value,
				contacts: editContacts,
				address: editAddress,
				about: editAbout,
				amount: parseFloat(editAmount),
			};
			console.log(formData)

			const account = await axiosInstance.put(`/accounts`, formData);
			const { data } = account;
			const { status, payload } = data;
			console.log(account)
			if (status) {
				console.log("Stutus is true")
				dispatch(getAccounts());
				setEditAccountName("");
				setEditAccountType(null);
				setEditSubType(null);
				setEditSupplier("");
				setEditContacts("");
				setEditAddress("");
				setEditAbout("");
				setEditAmount("");
				setPosting(false);
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeShowUpdate();
			} else {
				toggleFeedback("error", {
					title: "Error",
					text: payload
				})
				setPosting(false);
			}

		} catch (error) {
			console.log(error);
			setPosting(false);
		}
		// fetch after
		// fetchAccounts();
	};

	// delete supplier

	const deleteAccount = (acc) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const response = await axiosInstance.delete(`/accounts/${acc.id}`);
					const { data } = response;
					const { status } = data;
					if (status) {
						dispatch(getAccounts());
						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
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

	const closeShowUpdate = () => {
		setShowUpdate(false);
	};

	const openShowUpdate = (acc) => {
		setShowUpdate(true);
		setEditAccountName(acc.accountName);
		setEditAccountType(acc.accountTyp);
		setEditSubType(acc.subType);
		setEditAmount(acc.amount);
		setEditContacts(acc.contacts);
		setEditAddress(acc.address);
		setEditAbout(acc.about);
		setEditSupplier(acc.supplierName);
		setAccountId(acc.id);
	};


	// implement search
	const [query, setQuery] = useState({
		search: "",
		type: "",
	});
	const [searchedaccounts, setSearchedaccounts] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.type === ""
		) {
			setSearchedaccounts(accounts);
			return;
		}
		const filteredaccounts = accounts.filter((acc) => {

			const isSearchValid = acc.accountName
				.toLowerCase()
				.includes(query.search.toLowerCase());

			const isTypeValid = acc.accountType
				.toLowerCase()
				.includes(query.type.toLowerCase());

			return (
				isSearchValid && isTypeValid
			);
		});
		setSearchedaccounts(filteredaccounts);
	}, [query, accounts]);


	return (
		<>
			<div className="flex justify-between relative p-5 bg-white rounded-md border border-gray2">
				{/* add modal */}

				{modal ? (
					<div className="absolute bg-white z-50 shadow-2xl min-w-[50vw] rounded-md h-auto">
						<div className="flex justify-between p-3 bg-gray1 text-primary font-medium">
							<div>Add Account</div>
							<div className="">
								<p className="cursor-pointer" onClick={closeModal}>
									X
								</p>
							</div>
						</div>

						<div className="p-3 flex">
							<div className="p-1 w-1/3">
								<InputField
									label="Account Name"
									type="text"
									placeholder="Account Name"
									value={accountName}
									onChange={handleAccountNameChange}
								/>
							</div>
							<div className="p-1 w-1/3">
								<br />
								<label className="text-gray4">Account Type</label>

								<Select
									placeholder="Select Account Type"
									defaultValue={accountType}
									onChange={setAccountType}
									options={accountTypes}
								/>
							</div>
							<div className="p-1 w-1/3">
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
							<div className="p-1 w-1/3">
								<br />
								<label className="text-gray4">Customer/Supplier</label>

								<Select
									placeholder="Select Category"
									defaultValue={supplier}
									options={types}
								/>
							</div>
							<div className="p-1 w-1/3">
								<InputField
									label="Contacts"
									type="text"
									placeholder="Contacts"
									value={contacts}
									onChange={(e) => setContacts(e.target.value)}
								/>
							</div>
							<div className="p-1 w-1/3">
								<InputField
									label="Location"
									type="text"
									placeholder="Location"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
						</div>
						<div className="mx-3 flex">
							<div className="w-1/3 -mt-7">
								<InputField
									label="Opening Balance"
									placeholder="Opening Balance"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<div className="ml-5 w-2/3">
								<label className="text-gray4">About</label>
								<br />
								<textarea
									className="bg-gray1 w-full border border-gray2 min-h-[100px]"
									value={about}
									onChange={(e) => setAbout(e.target.value)}
								></textarea>
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

				{showUpdate ? (
					<div className="border border-gray2 min-w-[50vw] absolute bg-white  shadow-xl">
						<div className="text-primary rounded p-2 bg-gray1 font-semibold flex justify-between">
							<div>Update Account</div>

							<div>
								<p className="cursor-pointer" onClick={closeShowUpdate}>
									X
								</p>
							</div>
						</div>
						<div className="flex w-full px-3">
							<div className="p-1 w-1/3">
								<InputField
									label="Account Name"
									type="text"
									placeholder="Account Name"
									value={editAccountName}
									onChange={(e) => setEditAccountName(e.target.value)}
								/>
							</div>
							<div className="p-1 w-1/3">
								<br />
								<label className="text-gray4">Account Type</label>

								<Select
									placeholder="Select Account Type"
									defaultValue={editAccountType}
									onChange={setEditAccountType}
									options={accountTypes}
								/>
							</div>
							<div className="p-1 w-1/3">
								<br />
								<label className="text-gray4">Sub Type</label>
								<Select
									placeholder="Select Sub Type"
									defaultValue={editSubType}
									onChange={setEditSubType}
									options={subTypes}
								/>
							</div>
						</div>
						<p className="p-2 bg-gray1 text-primary">
							For a Supplier Or a Customer
						</p>
						<div className="p-3 flex">
							<div className="p-1 w-1/3">
								<br />
								<label className="text-gray4">Customer/Supplier</label>

								<Select
									placeholder="Select Category"
									defaultValue={editSupplier}
									onChange={setEditSupplier}
									options={types}
								/>
							</div>
							<div className="p-1 w-1/3">
								<InputField
									label="Contacts"
									type="text"
									placeholder="Contacts"
									value={editContacts}
									onChange={(e) => setEditContacts(e.target.value)}
								/>
							</div>
							<div className="p-1 w-1/3">
								<InputField
									label="Location"
									type="text"
									placeholder="Location"
									value={editAddress}
									onChange={(e) => setEditAddress(e.target.value)}
								/>
							</div>
						</div>
						<div className="mx-3 flex">
							<div className="w-1/3 -mt-7">
								<InputField
									label="Opening Balance"
									placeholder="Opening Balance"
									value={editAmount}
									onChange={(e) => setEditAmount(e.target.value)}
								/>
							</div>
							<div className="ml-5 w-2/3">
								<label className="text-gray4">About</label>
								<br />
								<textarea
									className="bg-gray1 w-full border border-gray2 min-h-[100px]"
									value={editAbout}
									onChange={(e) => setEditAbout(e.target.value)}
								></textarea>
							</div>
						</div>

						<div className="flex w-full justify-between p-3 bg-gray1">
							<div onClick={closeShowUpdate}>
								<ButtonSecondary value={"Close"} />
							</div>
							<div className="">
								{posting ? (
									<div className="w-40">
										<ButtonLoader />
									</div>
								) : (
									<div onClick={updateAccount}>
										<Button value={"Update Account"} />
									</div>
								)}
							</div>
						</div>
					</div>
				) : null}

				<div className="p-1">
					<p className="font-medium mt-5 text-secondary text-xl">
						Charts Of Accounts
					</p>
				</div>
				<div className="w-1/3">
					<InputField
						type="search"
						placeholder="Search for Account"
						icon={<BsSearch className="w-3 -ml-7 mt-3" />}
						value={query.search}
						onChange={(e) => setQuery({ ...query, search: e.target.value })}
					/>
				</div>
				<div className="mt-5">
					<Select
						placeholder="Select Account Type"
						defaultValue={accountType}
						onChange={(e) => {
							setQuery({ ...query, type: e.value })
							setAccountType(e)
						}}
						options={accountTypes}
					/>
				</div>
				<div onClick={openModal} className="mt-5">
					<Button2 value={"Account"} />
				</div>
			</div>

			<div className="flex text-primary bg-primary3 mt-5 mr-2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
				<div className="border border-gray1 p-3  w-1/4">Account Name</div>
				<div className="border border-gray1 p-3 w-1/4">Type</div>
				<div className="border border-gray1 p-3 w-1/4">Sub Type</div>
				<div className="border border-gray1 p-3 w-1/4">Category</div>
				<div className="border border-gray1 p-3 w-1/4">Amount</div>
				<div className="border border-gray1 p-3 w-1/4">Action</div>
			</div>
			<div className="h-[70vh] overflow-y-auto">
				{accounts &&
					accounts.length > 0 &&
					searchedaccounts.map((account) => (
						<div className="flex text-gray5 font-light text-sm border-b border-gray2 cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
							<div className="border border-gray1 p-3  w-1/4">
								{account.accountName}
							</div>
							<div className="border border-gray1 p-3 w-1/4">
								{account.accountType}
							</div>
							<div className="border border-gray1 p-3 w-1/4">
								{account.subType}
							</div>
							<div className="border border-gray1 p-3 w-1/4">
								{account.subType}
							</div>
							<div className="border border-gray1 p-3 w-1/4">
								{Number(account.amount).toLocaleString()}
							</div>
							<div className="border border-gray1 p-3 w-1/4">
								<div className="flex justify-between w-32">
									<div className="mt-3">
										<MdDeleteOutline
											onClick={() => deleteAccount(account)}
											className="text-red "
										/>
									</div>
									<div className="mt-3">
										<BsPencilSquare
											onClick={() => openShowUpdate(account)}
											className="text-warning "
										/>
									</div>
									<Link to={`/ledger/${account.id}`}>
										<p className="text-primary p-2 bg-primary3 rounded-md">
											Ledger
										</p>
									</Link>
								</div>
							</div>
						</div>
					))}
				{loading.accounts && <Loader />}
			</div>
		</>
	);
}
export default Accounts;
