import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";

let db = new Localbase("db");

function ExpensesComp() {
	// post expense Type
	const [expenseTypeId, setExpenseTypeId] = useState("");
	const [expense, setExpense] = useState("");
	const [amount, setAmount] = useState("");
	const [to, setTo] = useState("");
	const [date, setDate] = useState("");
	const [contacts, setContacts] = useState("");
	const postExpense = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			expenseTypeId: expenseTypeId,
			expense: expense,
			amount: amount,
			to: to,
			date: date,
			contacts: contacts,
		};
		if (expenseTypeId || expense || amount || to || date || contacts) {
			db.collection("expensesTbl")
				.add(formData)
				.then((response) => {
					setExpenseTypeId("");
					setExpense("");
					setAmount("");
					setTo("");
					setDate("");
					setContacts("");

					fetchExpense();

					const MySwal = withReactContent(Swal);
					MySwal.fire({
						icon: "success",
						showConfirmButton: false,
						timer: 500,
					});
				})
				.catch(console.error());
		}
	};

	// fetch expense typess
	const [expenseTypesData, setExpenseTypesData] = useState([]);
	const fetchExpenseTypes = () => {
		
		return db.collection("expenseTypesTbl")
			.get()
			.then((expenseTypes) => {
				expenseTypes.forEach((element) => {
					let Obj = {
						label: element.expenseType,
						value: element,
					};
					expenseTypesData.push(Obj);
				});
				// console.log("expense types array", expenseTypesData);
				// const newData = expenseTypes;
				// setExpenseTypesData(newData);
			});
	};

	// fetch expenses
	const [expensesData, setExpensesData] = useState([]);
	const [expenseTotal, setexpenseTotal] = useState("");
	const fetchExpense = () => {
		db.collection("expensesTbl")
			.get()
			.then((expenses) => {

				const newData = expenses.map((s) => {
					const expenseTypesObj = expenseTypesData.find((c) => {
						console.log("idd", c.value.id, s.expenseTypeId);
						return c.value.id === s.expenseTypeId;
					});

					return {
						id: s.id,
						expense: s.expense,
						date: s.date,
						amount: s.amount,
						from: s.from,
						to: s.to,
						contacts: s.contacts,
						expenseTypesObj,
					};
				});
				setExpensesData(newData);
				let total = expenses.reduce((acc, item) => acc + parseInt(item.amount), 0);
				setexpenseTotal(total);
				// console.log("expenses data", newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [expenseTypeIdEdit, setExpenseTypeIdEdit] = useState("");
	const [expenseIdEdit, setExpenseIdEdit] = useState("");
	const [expenseEdit, setExpenseEdit] = useState("");
	const [amountEdit, setAmountEdit] = useState("");
	const [toEdit, setToEdit] = useState("");
	const [dateEdit, setDateEdit] = useState("");
	const [contactsEdit, setContactsEdit] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (expenseItem) => {
		setEditData(true);
		setExpenseTypeIdEdit(expenseItem?.expenseTypeId);
		setExpenseIdEdit(expenseItem.id);
		setExpenseEdit(expenseItem.expense);
		setAmountEdit(expenseItem.amount);
		setToEdit(expenseItem.to);
		setDateEdit(expenseItem.date);
		setContactsEdit(expenseItem.contacts);
	};

	const updateExpense = () => {
		db.collection("expensesTbl")
			.doc({ id: expenseIdEdit })
			.update({
				expenseTypeId: expenseTypeIdEdit,
				expense: expenseEdit,
				expense: expenseEdit,
				from: toEdit,
				date: dateEdit,
				contacts: contactsEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchExpense();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
	};

	// delete

	//deleting expense types
	const deleteExpense = (expenseItem) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				db.collection("expensesTbl")
					.doc({ id: expenseItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchExpense();

						Swal.fire({
							icon: "success",
							showConfirmButton: false,
							timer: 500,
						});
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});
	};

	// fetching expense types
	useEffect(() => {
		fetchExpenseTypes().then(() => {
			fetchExpense();
		});
	}, []);

	return (
		<>
			<h5 className="text-lg font-medium">Expenses</h5>
			<div className="w-full h-[80vh]">
				<div className="bg-white p-3 shadow-lg rounded-md mr-2">
					<div className="flex justify-between">
						<div className="w-1/4 p-1">
							<InputField
								type="date"
								label="Date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</div>
						<div className="w-1/4 p-1">
							<InputField
								type="text"
								placeholder="Enter expense"
								label="Expense"
								value={expense}
								onChange={(e) => setExpense(e.target.value)}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>
						</div>
						<div className="w-1/4 p-1">
							<InputField
								type="number"
								placeholder="Enter Amounnt"
								label="Amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>
						</div>
						<div className="w-1/4 p-1">
							<SelectComp
								options={expenseTypesData}
								placeholder="Select expense Type"
								label="Expense Type"
								setSelectedOptionObj={(value) => {
									setExpenseTypeId(value.id);
								}}
							/>
						</div>
					</div>
					<div className="flex justify-between">
						<div className="w-1/4 p-1">
							<InputField
								type="text"
								placeholder="Enter Received By "
								label="Received By"
								value={to}
								onChange={(e) => setTo(e.target.value)}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>
						</div>
						<div className="w-1/4">
							<InputField
								type="text"
								placeholder="Enter Contacts"
								label="Expense Contacts"
								value={contacts}
								onChange={(e) => setContacts(e.target.value)}
								icon={<FaPen className="w-3 -ml-7 mt-3" />}
							/>
						</div>
						<div className="mt-8 mr-5 w-[150px]">
							<br />
							<div onClick={postExpense}>
								<Button value={"Add Expense"} />
							</div>
						</div>
						<div className="w-1/4"></div>
					</div>
				</div>
				<hr className="text-primary" />
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">expense</th>
						<th className="p-2 text-primary text-sm text-left">expense Type</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded w-[1000px] bg-white">
								<div className="flex justify-between bg-primary text-white p-2 rounded-md">
									<div>
										<p>Edit expense</p>
									</div>
									<div>
										<p className="cursor-pointer" onClick={closeEditData}>
											X
										</p>
									</div>
								</div>
								<div className="flex px-5">
									<div className="w-1/4 p-1">
										<InputField
											type="date"
											label="Date"
											value={dateEdit}
											onChange={(e) => setDateEdit(e.target.value)}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter Expense"
											label="expense"
											value={expenseEdit}
											onChange={(e) => setExpenseEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="number"
											placeholder="Enter Amounnt"
											label="Amount"
											value={amountEdit}
											onChange={(e) => setAmountEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={expenseTypesData}
											placeholder="Select Expense Type"
											label="expense Type"
											setSelectedOptionObj={(value) => {
												setExpenseTypeIdEdit(value.id);
											}}
										/>
									</div>
								</div>
								<div className="flex px-5">
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter Received By"
											label="Received By"
											value={toEdit}
											onChange={(e) => setToEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter Contacts"
											label="expense Contacts"
											value={contactsEdit}
											onChange={(e) => setContactsEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 ml-5">
										<div onClick={updateExpense} className="mt-14">
											<ButtonSecondary value={"Update"} />
										</div>
									</div>
									<div className="w-1/4"></div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{expensesData.map((expenseItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={expenseItem.id}
								>
									<td className="text-xs p-3 text-gray5">{expenseItem.date}</td>
									<td className="text-xs p-3 text-gray5">
										{expenseItem.expense}
									</td>
									<td className="text-xs p-3 text-gray5">{expenseItem?.expenseTypesObj?.value?.expenseType}</td>
									<td className="text-xs p-3 text-gray5">
										{ Number(expenseItem.amount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">{expenseItem.to}</td>
									<td className="text-xs p-3 text-gray5">
										{expenseItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline
											onClick={() => deleteExpense(expenseItem)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(expenseItem)}
										/>
									</td>
								</tr>
							);
						})}
							<tr className="bg-white p-4 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(expenseTotal).toLocaleString()}</td>
							<td></td>
							<td>
								<td></td>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
export default ExpensesComp;
