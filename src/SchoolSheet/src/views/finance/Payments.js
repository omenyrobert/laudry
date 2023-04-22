import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import InputField from "../../components/InputField";
import { FaPen } from "react-icons/fa";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import PaymentTypes from "../../components/finance/PaymentTypes";
import SelectComp from "../../components/SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";

let db = new Localbase("db");

function Payments() {
	// post payment Type
	const [paymentTypeId, setpaymentTypeId] = useState("");
	const [payment, setpayment] = useState("");
	const [amount, setAmount] = useState("");
	const [to, setTo] = useState("");
	const [date, setDate] = useState("");
	const [contacts, setContacts] = useState("");
	const postpayment = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			paymentTypeId: paymentTypeId,
			payment: payment,
			amount: amount,
			to: to,
			date: date,
			contacts: contacts,
		};
		if (paymentTypeId || payment || amount || to || date || contacts) {
			db.collection("paymentsTbl")
				.add(formData)
				.then((response) => {
					setpaymentTypeId("");
					setpayment("");
					setAmount("");
					setTo("");
					setDate("");
					setContacts("");

					fetchpayment();

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

	// fetch payment typess
	const [paymentTypesData, setpaymentTypesData] = useState([]);
	const fetchpaymentTypes = () => {
		return db
			.collection("paymentTypesTbl")
			.get()
			.then((paymentTypes) => {
				paymentTypes.forEach((element) => {
					let Obj = {
						label: element.paymentType,
						value: element,
					};
					paymentTypesData.push(Obj);
				});
				// console.log("payment types array", paymentTypesData);
				// const newData = paymentTypes;
				// setpaymentTypesData(newData);
			});
	};

	// fetch payments
	const [paymentsData, setpaymentsData] = useState([]);
	const [paymentTotal, setpaymentTotal] = useState("");
	const fetchpayment = () => {
		db.collection("paymentsTbl")
			.get()
			.then((payments) => {
				const newData = payments.map((s) => {
					const paymentTypesObj = paymentTypesData.find((c) => {
						console.log("idd", c.value.id, s.paymentTypeId);
						return c.value.id === s.paymentTypeId;
					});

					return {
						id: s.id,
						payment: s.payment,
						date: s.date,
						amount: s.amount,
						from: s.from,
						to: s.to,
						contacts: s.contacts,
						paymentTypesObj,
					};
				});
				setpaymentsData(newData);
				let total = payments.reduce(
					(acc, item) => acc + parseInt(item.amount),
					0
				);
				setpaymentTotal(total);
				// console.log("payments data", newData);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [paymentTypeIdEdit, setpaymentTypeIdEdit] = useState("");
	const [paymentIdEdit, setpaymentIdEdit] = useState("");
	const [paymentEdit, setpaymentEdit] = useState("");
	const [amountEdit, setAmountEdit] = useState("");
	const [toEdit, setToEdit] = useState("");
	const [dateEdit, setDateEdit] = useState("");
	const [contactsEdit, setContactsEdit] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (paymentItem) => {
		setEditData(true);
		setpaymentTypeIdEdit(paymentItem?.paymentTypeId);
		setpaymentIdEdit(paymentItem.id);
		setpaymentEdit(paymentItem.payment);
		setAmountEdit(paymentItem.amount);
		setToEdit(paymentItem.to);
		setDateEdit(paymentItem.date);
		setContactsEdit(paymentItem.contacts);
	};

	const updatepayment = () => {
		db.collection("paymentsTbl")
			.doc({ id: paymentIdEdit })
			.update({
				paymentTypeId: paymentTypeIdEdit,
				payment: paymentEdit,
				payment: paymentEdit,
				from: toEdit,
				date: dateEdit,
				contacts: contactsEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchpayment();
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

	//deleting payment types
	const deletepayment = (paymentItem) => {
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
				db.collection("paymentsTbl")
					.doc({ id: paymentItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchpayment();

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

	// fetching payment types
	useEffect(() => {
		fetchpaymentTypes().then(() => {
			fetchpayment();
		});
	}, []);

	return (
		<>
			<div className="flex">
				<div className="w-3/12">
					<PaymentTypes />
				</div>
				<div className="w-9/12 ml-5">
					<div className="w-full h-[80vh]">
						<div className="bg-white p-3 shadow-lg rounded-md mr-2">
							<h5 className="text-xl font-medium text-secondary">Payments</h5>
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
										placeholder="Enter payment"
										label="payment"
										value={payment}
										onChange={(e) => setpayment(e.target.value)}
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
										options={paymentTypesData}
										placeholder="Select payment Type"
										label="payment Type"
										setSelectedOptionObj={(value) => {
											setpaymentTypeId(value.id);
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
										label="payment Contacts"
										value={contacts}
										onChange={(e) => setContacts(e.target.value)}
										icon={<FaPen className="w-3 -ml-7 mt-3" />}
									/>
								</div>
								<div className="mt-8 mr-5 w-[150px]">
									<br />
									<div onClick={postpayment}>
										<Button value={"Add payment"} />
									</div>
								</div>
								<div className="w-1/4"></div>
							</div>
						</div>
						<hr className="text-primary" />
						<table className="mt-10 w-[98%] table-auto">
							<thead style={{ backgroundColor: "#0d6dfd10" }}>
								<th className="p-2 text-primary text-sm text-left">Date</th>
								<th className="p-2 text-primary text-sm text-left">payment</th>
								<th className="p-2 text-primary text-sm text-left">
									payment Type
								</th>
								<th className="p-2 text-primary text-sm text-left">Amount</th>
								<th className="p-2 text-primary text-sm text-left">
									Received By
								</th>
								<th className="p-2 text-primary text-sm text-left">Contacts</th>
								<th className="p-2 text-primary text-sm text-left">Action</th>
							</thead>
							<tbody>
								{/* edit popup start */}
								{editData ? (
									<div className="absolute shadow-2xl rounded w-[1000px] bg-white">
										<div className="flex justify-between bg-primary text-white p-2 rounded-md">
											<div>
												<p>Edit payment</p>
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
													placeholder="Enter payment"
													label="payment"
													value={paymentEdit}
													onChange={(e) => setpaymentEdit(e.target.value)}
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
													options={paymentTypesData}
													placeholder="Select payment Type"
													label="payment Type"
													setSelectedOptionObj={(value) => {
														setpaymentTypeIdEdit(value.id);
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
													label="payment Contacts"
													value={contactsEdit}
													onChange={(e) => setContactsEdit(e.target.value)}
													icon={<FaPen className="w-3 -ml-7 mt-3" />}
												/>
											</div>
											<div className="w-1/4 ml-5">
												<div onClick={updatepayment} className="mt-14">
													<ButtonSecondary value={"Update"} />
												</div>
											</div>
											<div className="w-1/4"></div>
										</div>
									</div>
								) : null}
								{/* edit popup end */}

								{paymentsData.map((paymentItem) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={paymentItem.id}
										>
											<td className="text-xs p-3 text-gray5">
												{paymentItem.date}
											</td>
											<td className="text-xs p-3 text-gray5">
												{paymentItem.payment}
											</td>
											<td className="text-xs p-3 text-gray5">
												{paymentItem?.paymentTypesObj?.value?.paymentType}
											</td>
											<td className="text-xs p-3 text-gray5">
												{Number(paymentItem.amount).toLocaleString()}
											</td>
											<td className="text-xs p-3 text-gray5">
												{paymentItem.to}
											</td>
											<td className="text-xs p-3 text-gray5">
												{paymentItem.contacts}
											</td>
											<td className="text-xs p-3 text-gray5 flex">
												<MdDeleteOutline
													onClick={() => deletepayment(paymentItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => openEditData(paymentItem)}
												/>
											</td>
										</tr>
									);
								})}
								<tr className="bg-white p-4 text-lg font-semibold">
									<td colSpan="3">Total</td>
									<td>{Number(paymentTotal).toLocaleString()}</td>
									<td></td>
									<td>
										<td></td>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
export default Payments;
