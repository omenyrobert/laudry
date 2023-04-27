import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Button2 from "../../components/Button2";
import InputField from "../../components/InputField";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SelectComp from "../../components/SelectComp";
import Localbase from "localbase";
import "../../assets/styles/main.css";
import { BsSearch } from "react-icons/bs";

let db = new Localbase("db");

function Bills() {
	//deleting bill types
	const deletebill = (billItem) => {
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
				db.collection("billsTbl")
					.doc({ id: billItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchbill();

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

	// update
	const [editData, setEditData] = useState(false);
	const [billTypeIdEdit, setbillTypeIdEdit] = useState("");
	const [billIdEdit, setbillIdEdit] = useState("");
	const [billEdit, setbillEdit] = useState("");
	const [amountEdit, setAmountEdit] = useState("");
	const [toEdit, setToEdit] = useState("");
	const [dateEdit, setDateEdit] = useState("");
	const [contactsEdit, setContactsEdit] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (billItem) => {
		setEditData(true);
		setbillTypeIdEdit(billItem?.billTypeId);
		setbillIdEdit(billItem.id);
		setbillEdit(billItem.bill);
		setAmountEdit(billItem.amount);
		setToEdit(billItem.to);
		setDateEdit(billItem.date);
		setContactsEdit(billItem.contacts);
	};

	const updatebill = () => {
		db.collection("billsTbl")
			.doc({ id: billIdEdit })
			.update({
				billTypeId: billTypeIdEdit,
				bill: billEdit,
				bill: billEdit,
				from: toEdit,
				date: dateEdit,
				contacts: contactsEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchbill();
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			});
	};

	// fetch bills
	const [billsData, setbillsData] = useState([]);
	const [billTotal, setbillTotal] = useState("");
	const fetchbill = () => {
		db.collection("billsTbl")
			.get()
			.then((bills) => {
				const newData = bills.map((s) => {
					const billTypesObj = billTypesData.find((c) => {
						console.log("idd", c.value.id, s.billTypeId);
						return c.value.id === s.billTypeId;
					});

					return {
						id: s.id,
						bill: s.bill,
						date: s.date,
						amount: s.amount,
						from: s.from,
						to: s.to,
						contacts: s.contacts,
						billTypesObj,
					};
				});
				setbillsData(newData);
				let total = bills.reduce((acc, item) => acc + parseInt(item.amount), 0);
				setbillTotal(total);
				// console.log("bills data", newData);
			});
	};

	// add bill
	const [add, setAdd] = useState(false);

	const showAdd = () => {
		setAdd(true);
	};

	const hideAdd = () => {
		setAdd(false);
	};

	const [billTypeId, setbillTypeId] = useState("");
	const [bill, setbill] = useState("");
	const [amount, setAmount] = useState("");
	const [to, setTo] = useState("");
	const [date, setDate] = useState("");
	const [contacts, setContacts] = useState("");
	const postbill = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			billTypeId: billTypeId,
			bill: bill,
			amount: amount,
			to: to,
			date: date,
			contacts: contacts,
		};
		if (billTypeId || bill || amount || to || date || contacts) {
			db.collection("billsTbl")
				.add(formData)
				.then((response) => {
					setbillTypeId("");
					setbill("");
					setAmount("");
					setTo("");
					setDate("");
					setContacts("");

					fetchbill();

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

	// fetch bill typess
	const [billTypesData, setbillTypesData] = useState([]);
	const fetchbillTypes = () => {
		return db
			.collection("billTypesTbl")
			.get()
			.then((billTypes) => {
				billTypes.forEach((element) => {
					let Obj = {
						label: element.billType,
						value: element,
					};
					billTypesData.push(Obj);
				});
				// console.log("bill types array", billTypesData);
				// const newData = billTypes;
				// setbillTypesData(newData);
			});
	};

	// delete

	// fetching bill types
	useEffect(() => {
		fetchbillTypes().then(() => {
			fetchbill();
		});
	}, []);

	return (
		<>
			<div className="w-full h-[80vh]">
				<div className="flex bg-white p-2">
					<div className="w-10/12">
						<div className="flex">
							<div className="w-6/12 px-2">
								<InputField
									placeholder="Search for Income"
									type="search"
									
									icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
								/>
							</div>
							<div className="w-3/12 px-2">
								<InputField placeholder="Filter By Type" />
							</div>{" "}
							<div className="w-2/12 px-2">
								<InputField type="date" />
							</div>
							<div className="w-2/12">
								<InputField type="date" />
							</div>
						</div>
					</div>
					<div className="w-2/12">
						<div className="relative w-[150px] ml-5 mt-5" onClick={showAdd}>
							<Button2 value={"Add Bill"} />
						</div>
					</div>
				</div>

				{/* add bill pop up */}

				{add ? (
					<div className="bg-white w-[60vw] shadow-lg rounded-md mr-2 absolute border border-gray3">
						<div className="p-3 bg-gray1 flex justify-between">
							<div>
								<h5 className="text-xl font-medium text-primary">Bill</h5>
							</div>
							<div>
								<p className="cursor-pointer" onClick={hideAdd}>
									X
								</p>
							</div>
						</div>

						<div className="flex justify-between p-3">
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
									placeholder="Enter bill"
									label="bill"
									value={bill}
									onChange={(e) => setbill(e.target.value)}
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
								<InputField
									type="text"
									placeholder="Enter Description"
									label="Description"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
						</div>
						<div className="flex justify-between px-3">
							<div className="w-1/4 p-1">
								<SelectComp
									options={billTypesData}
									placeholder="Select Account"
									label="Account"
									setSelectedOptionObj={(value) => {
										setbillTypeId(value.id);
									}}
								/>
							</div>
							<div className="w-1/4 p-1">
								<SelectComp
									options={billTypesData}
									placeholder="Select Receipt"
									label="Receipt"
									setSelectedOptionObj={(value) => {
										setbillTypeId(value.id);
									}}
								/>
							</div>
							<div className="w-1/4 p-1">
								<SelectComp
									options={billTypesData}
									placeholder="Select Invoice"
									label="Invoice"
									setSelectedOptionObj={(value) => {
										setbillTypeId(value.id);
									}}
								/>
							</div>
							<div className="w-1/4 p-1">
								<SelectComp
									options={billTypesData}
									placeholder="Select Supplier"
									label="Supplier"
									setSelectedOptionObj={(value) => {
										setbillTypeId(value.id);
									}}
								/>
							</div>
						</div>
						<div className="flex  p-3">
							<div className="w-1/4 p-1">
								<InputField
									type="text"
									placeholder="Enter Received By"
									label="Received By"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/4 p-1">
								<InputField
									type="text"
									placeholder="Enter contacts"
									label="Contacts"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/4"></div>
							<div className="w-1/4 mt-14" onClick={postbill}>
								<Button value={"Add bill"} />
							</div>
						</div>
					</div>
				) : null}

				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">bill</th>
						<th className="p-2 text-primary text-sm text-left">bill Type</th>
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
										<p>Edit bill</p>
									</div>
									<div>
										<p className="cursor-pointer" onClick={closeEditData}>
											X
										</p>
									</div>
								</div>
								<div className="flex justify-between p-3">
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
											placeholder="Enter bill"
											label="bill"
											value={bill}
											onChange={(e) => setbill(e.target.value)}
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
										<InputField
											type="text"
											placeholder="Enter Description"
											label="Description"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
								</div>
								<div className="flex justify-between px-3">
									<div className="w-1/4 p-1">
										<SelectComp
											options={billTypesData}
											placeholder="Select Account"
											label="Account"
											setSelectedOptionObj={(value) => {
												setbillTypeId(value.id);
											}}
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={billTypesData}
											placeholder="Select Receipt"
											label="Receipt"
											setSelectedOptionObj={(value) => {
												setbillTypeId(value.id);
											}}
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={billTypesData}
											placeholder="Select Invoice"
											label="Invoice"
											setSelectedOptionObj={(value) => {
												setbillTypeId(value.id);
											}}
										/>
									</div>
									<div className="w-1/4 p-1">
										<SelectComp
											options={billTypesData}
											placeholder="Select Supplier"
											label="Supplier"
											setSelectedOptionObj={(value) => {
												setbillTypeId(value.id);
											}}
										/>
									</div>
								</div>
								<div className="flex  p-3">
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter Received By"
											label="Received By"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4 p-1">
										<InputField
											type="text"
											placeholder="Enter contacts"
											label="Contacts"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/4"></div>
									<div className="w-1/4 mt-14" onClick={postbill}>
										<Button value={"Update bill"} />
									</div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{billsData.map((billItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={billItem.id}
								>
									<td className="text-xs p-3 text-gray5">{billItem.date}</td>
									<td className="text-xs p-3 text-gray5">{billItem.bill}</td>
									<td className="text-xs p-3 text-gray5">
										{billItem?.billTypesObj?.value?.billType}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(billItem.amount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">{billItem.to}</td>
									<td className="text-xs p-3 text-gray5">
										{billItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline
											onClick={() => deletebill(billItem)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => openEditData(billItem)}
										/>
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-4 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(billTotal).toLocaleString()}</td>
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
export default Bills;
