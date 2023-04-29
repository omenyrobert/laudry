import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Button2 from "../Button2";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Localbase from "localbase";
import "../../assets/styles/main.css";

let db = new Localbase("db");

function IncomeComp() {
	// useEffect(()=>{
	// 	console.log('useEffect')
	// },[])

	// post Income Type
	const [add, setAdd] = useState(false);
	const openAdd = () => {
		setAdd(true);
	};

	const closeAdd = () => {
		setAdd(false);
	};

	const [incomeTypeId, setIncomeTypeId] = useState("");
	const [income, setIncome] = useState("");
	const [amount, setAmount] = useState("");
	const [from, setFrom] = useState("");
	const [date, setDate] = useState("");
	const [comment, setComment] = useState("");
	const postIncome = () => {
		let clId = uuid();
		let formData = {
			id: clId,
			incomeTypeId: incomeTypeId,
			income: income,
			amount: amount,
			from: from,
			date: date,
			comment: comment,
		};
		if (incomeTypeId || income || amount || from || date || comment) {
			db.collection("incomesTbl")
				.add(formData)
				.then((response) => {
					setIncomeTypeId("");
					setIncome("");
					setAmount("");
					setFrom("");
					setDate("");
					setComment("");
					closeAdd();
					fetchInomes();

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

	// fetch income typess
	const [incomeTypesData, setIncomeTypesData] = useState([]);
	const [incomeTotal, setIncomeTotal] = useState("");

	const fetchInomeTypes = () => {
		return db
			.collection("incomeTypesTbl")
			.get()
			.then((incomeTypes) => {
				//  incomeTypesData.push(incomeTypes);
				// setIncomeTypesData2(newData);
				console.log("incomeTypesData", incomeTypesData);
				incomeTypes.forEach((element) => {
					let Obj = {
						label: element.incomeType,
						value: element,
					};
					incomeTypesData.push(Obj);
				});
				// console.log("income types array", incomeTypesData);
			});
	};

	// fetch incomes
	const [incomesData, setIncomesData] = useState([]);
	const [filteredIncome, setFilteredIncome] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const searchItems = (searchValue) => {
		setSearchInput(searchValue);
		if (searchInput !== "") {
			const filteredData = incomesData.filter((item) => {
				return Object.values(item)
					.join("")
					.toLowerCase()
					.includes(searchInput.toLowerCase());
			});
			setFilteredIncome(filteredData);
		} else {
			setIncomesData(incomesData);
		}
	};
	const fetchInomes = () => {
		db.collection("incomesTbl")
			.get()
			.then((incomes) => {
				// const newData = incomes;
				// setIncomesData(newData);

				const newData = incomes.map((s) => {
					const incomeTypesObj = incomeTypesData.find((c) => {
						console.log("idd", c);
						return c.value.id === s.incomeTypeId;
					});

					return {
						id: s.id,
						income: s.income,
						date: s.date,
						amount: s.amount,
						from: s.from,
						to: s.to,
						comment: s.comment,
						incomeTypesObj,
					};
				});
				setIncomesData(newData);
				// console.log("new income", newData);
				let total = incomes.reduce(
					(acc, item) => acc + parseInt(item.amount),
					0
				);
				setIncomeTotal(total);
			});
	};

	// update
	const [editData, setEditData] = useState(false);
	const [incomeTypeIdEdit, setIncomeTypeIdEdit] = useState("");
	const [incomeIdEdit, setIncomeIdEdit] = useState("");
	const [incomeEdit, setIncomeEdit] = useState("");
	const [amountEdit, setAmountEdit] = useState("");
	const [fromEdit, setFromEdit] = useState("");
	const [dateEdit, setDateEdit] = useState("");
	const [commentEdit, setCommentEdit] = useState("");
	const closeEditData = () => {
		setEditData(false);
	};
	const openEditData = (incomeItem) => {
		setEditData(true);
		setIncomeTypeIdEdit(incomeItem?.incomeTypeId);
		setIncomeIdEdit(incomeItem.id);
		setIncomeEdit(incomeItem.income);
		setAmountEdit(incomeItem.amount);
		setFromEdit(incomeItem.from);
		setDateEdit(incomeItem.date);
		setCommentEdit(incomeItem.comment);
	};

	const updateIncome = () => {
		db.collection("incomesTbl")
			.doc({ id: incomeIdEdit })
			.update({
				incomeTypeId: incomeTypeIdEdit,
				income: incomeEdit,
				income: incomeEdit,
				from: fromEdit,
				date: dateEdit,
				comment: commentEdit,
			})
			.then((response) => {
				console.log(response);
				// fetch after
				fetchInomes();
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

	//deleting income types
	const deleteIncome = (incomeItem) => {
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
				db.collection("incomesTbl")
					.doc({ id: incomeItem.id })
					.delete()
					.then((response) => {
						// fetch after
						fetchInomes();

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

	// fetching income types
	useEffect(() => {
		fetchInomeTypes().then(() => {
			console.log("fetchInomes");
			fetchInomes();
		});
	}, []);

	return (
		<>
			<div className="flex bg-white">
				<div className="w-10/12 ">
					<div className="flex">
						<div className="w-6/12 px-2">
							<InputField
								placeholder="Search for Income"
								type="search"
								onChange={(e) => searchItems(e.target.value)}
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
				<div className="w-2/12 px-3 mt-5" onClick={openAdd}>
					<Button2 value={"Add Income"} />
				</div>
			</div>

			<div className="w-full h-[80vh] relative">
				{add ? (
					<div className="bg-white shadow-xl border border-gray2 rounded-md mr-2 absolute w-[1000px]">
						<div className="flex justify-between bg-gray1 text-primary p-3 font-semibold rounded">
							<div>Add Income</div>
							<div>
								<p className="cursor-pointer" onClick={closeAdd}>
									X
								</p>
							</div>
						</div>
						<div className="flex px-3 justify-between">
							<div className="w-1/3 p-1">
								<InputField
									type="date"
									label="Date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="text"
									placeholder="Enter Income"
									label="Income"
									value={income}
									onChange={(e) => setIncome(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="number"
									placeholder="Enter Amounnt"
									label="Amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
						</div>
						<div className="flex px-3 justify-between">
							<div className="w-1/3 p-1">
								<SelectComp
									options={incomeTypesData}
									placeholder="Select Income Type"
									label="Income Type"
									setSelectedOptionObj={(value) => {
										setIncomeTypeId(value.id);
									}}
								/>
							</div>
							<div className="w-1/3 p-1">
								<InputField
									type="text"
									placeholder="Enter Source"
									label="Income Source"
									value={from}
									onChange={(e) => setFrom(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
							<div className="w-1/3">
								<InputField
									type="text"
									placeholder="Enter description"
									label="Income description"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									icon={<FaPen className="w-3 -ml-7 mt-3" />}
								/>
							</div>
						</div>
						<div className="flex p-3 -mt-5">
							<div className="w-1/3 p-1">
								<SelectComp
									options={incomeTypesData}
									placeholder="Select Account"
									label="Account"
									setSelectedOptionObj={(value) => {
										setIncomeTypeId(value.id);
									}}
								/>
							</div>
							<div className="w-1/3 mt-14">
								
							</div>
						</div>
						<div className="flex justify-between bg-gray1  p-3 ounded">
							<div>
								<ButtonSecondary value={"Close"}/>
							</div>
							<div>
							<div onClick={postIncome}>
									<Button value={"Add Income"} />
								</div>
							</div>
						</div>
					</div>
				) : null}
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Income</th>
						<th className="p-2 text-primary text-sm text-left">Income Type</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Source</th>
						<th className="p-2 text-primary text-sm text-left">Description</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{/* edit popup start */}
						{editData ? (
							<div className="absolute shadow-2xl rounded w-[1000px] bg-white">
								<div className="flex justify-between text-primary bg-gray1 font-semibold p-2 rounded-md">
									<div>
										<p>Edit Income</p>
									</div>
									<div>
										<p className="cursor-pointer" onClick={closeEditData}>
											X
										</p>
									</div>
								</div>
								<div className="flex px-3 justify-between">
									<div className="w-1/3 p-1">
										<InputField
											type="date"
											label="Date"
											value={dateEdit}
											onChange={(e) => setDateEdit(e.target.value)}
										/>
									</div>
									<div className="w-1/3 p-1">
										<InputField
											type="text"
											placeholder="Enter Income"
											label="Income"
											value={incomeEdit}
											onChange={(e) => setIncomeEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/3 p-1">
										<InputField
											type="number"
											placeholder="Enter Amounnt"
											label="Amount"
											value={amountEdit}
											onChange={(e) => setAmountEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
								</div>
								<div className="flex px-3 justify-between">
									<div className="w-1/3 p-1">
										<SelectComp
											options={incomeTypesData}
											placeholder="Select Income Type"
											label="Income Type"
											setSelectedOptionObj={(value) => {
												setIncomeTypeId(value.id);
											}}
										/>
									</div>
									<div className="w-1/3 p-1">
										<InputField
											type="text"
											placeholder="Enter Source"
											label="Income Source"
											value={fromEdit}
											onChange={(e) => setFromEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
									<div className="w-1/3">
										<InputField
											type="text"
											placeholder="Enter description"
											label="Income description"
											value={commentEdit}
											onChange={(e) => setCommentEdit(e.target.value)}
											icon={<FaPen className="w-3 -ml-7 mt-3" />}
										/>
									</div>
								</div>
								<div className="flex p-3 -mt-5">
									<div className="w-1/3 p-1">
										<SelectComp
											options={incomeTypesData}
											placeholder="Select Account"
											label="Account"
											setSelectedOptionObj={(value) => {
												setIncomeTypeId(value.id);
											}}
										/>
									</div>
									<div className="w-1/3 mt-14">
										
									</div>
								</div>
								<div className="flex justify-between text-primary bg-gray1 font-semibold p-2 rounded-md">
									<div onClick={closeEditData}>
										<ButtonSecondary value={"Close"} />
									</div>
									<div>
									<div onClick={postIncome}>
											<Button value={"Update Income"} />
										</div>
									</div>
								</div>
							</div>
						) : null}
						{/* edit popup end */}

						{searchInput.length > 1
							? filteredIncome.map((incomeItem) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={incomeItem?.id}
										>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.date}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.income}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.incomeTypesObj.value.incomeType}
											</td>
											<td className="text-xs p-3 text-gray5">
												{Number(incomeItem.amount).toLocaleString()}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.from}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.comment}
											</td>
											<td className="text-xs p-3 text-gray5 flex">
												<MdDeleteOutline
													onClick={() => deleteIncome(incomeItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => openEditData(incomeItem)}
												/>
											</td>
										</tr>
									);
							  })
							: incomesData.map((incomeItem) => {
									return (
										<tr
											className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
											key={incomeItem?.id}
										>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.date}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.income}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.incomeTypesObj.value.incomeType}
											</td>
											<td className="text-xs p-3 text-gray5">
												{Number(incomeItem.amount).toLocaleString()}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.from}
											</td>
											<td className="text-xs p-3 text-gray5">
												{incomeItem.comment}
											</td>
											<td className="text-xs p-3 text-gray5 flex">
												<MdDeleteOutline
													onClick={() => deleteIncome(incomeItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => openEditData(incomeItem)}
												/>
											</td>
										</tr>
									);
							  })}

						<tr className="bg-white p-5 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(incomeTotal).toLocaleString()}</td>
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
export default IncomeComp;
