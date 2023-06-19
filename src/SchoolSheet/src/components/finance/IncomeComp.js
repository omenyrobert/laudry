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
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";


let db = new Localbase("db");


function IncomeComp() {
	const { setLoading, toggleFeedback } = useFeedback()
	const navigate = useNavigate()

	// post Income Type
	const [add, setAdd] = useState(false);

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
					fetchIncomes();

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


	const fetchIncomeTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/income")

		setIncomeTypesData(response.data.payload);

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


	const fetchIncomes = async () => {

		const res = await axiosInstance.get("/transactions/type/expense")

		const { status, payload } = res.data

		if (status === false) {
			setLoading(false)
			toggleFeedback("error", payload)
			return
		}

		const coupledTransactions = []

		for (let i = 0; i < payload.length; i++) {
			const transaction = payload[i]

			if (coupledTransactions.find(t => t.transactionId === transaction.transactionId)) continue;

			// find corresponding transaction with same id
			const correspondingTransaction = payload.find(t => {
				return t.transactionId === transaction.transactionId && t.id !== transaction.id
			})

			if (correspondingTransaction) {
				coupledTransactions.push({
					transactionId: transaction.transactionId,
					...transaction,
					transactionAmount: transaction.debit === 0 ? transaction.credit : transaction.debit,
				})
			}
		}

		setIncomesData(coupledTransactions)

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setIncomeTotal(total);


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




	const deleteIncome = (income) => {
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

				axiosInstance.delete(`/transactions/${income.transactionId}`)
					.then((response) => {
						console.log(response)
						const { status, payload } = response.data
						toggleFeedback(status ? "success" : "error", {
							title: payload
						})
						fetchIncomes()
					})
					.catch((error) => {
						console.log(error)
						toggleFeedback("error", error.message)
					}
					);
			}
		});
	};

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			try {
				await fetchIncomeTypes();
				await fetchIncomes();
				setLoading(false)
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}

		fetchData();

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
				<Link to="/addTransaction?transactionType=income&action=create" className="w-2/12 px-3 mt-5">
					<Button2 value={"Add Income "} />
				</Link>
			</div>
			{add ? (
				<div className="bg-white shadow-xl absolute z-50 border border-gray2 rounded-md mr-2  w-[1000px]">
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

							/>
						</div>
						<div className="w-1/3 p-1">
							<InputField
								type="number"
								placeholder="Enter Amounnt"
								label="Amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}

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

							/>
						</div>
						<div className="w-1/3">
							<InputField
								type="text"
								placeholder="Enter description"
								label="Income description"
								value={comment}
								onChange={(e) => setComment(e.target.value)}

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
						<div className="w-1/3 mt-14"></div>
					</div>
					<div className="flex justify-between bg-gray1  p-3 ounded">
						<div>
							<ButtonSecondary value={"Close"} />
						</div>
						<div>
							<div onClick={postIncome}>
								<Button value={"Add Income"} />
							</div>
						</div>
					</div>
				</div>
			) : null}

			<div className="w-full h-[80vh] relative">
				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Name</th>
						<th className="p-2 text-primary text-sm text-left">Income Type</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Source</th>
						<th className="p-2 text-primary text-sm text-left">Contact</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>


						{searchInput.length > 1
							? filteredIncome.map((incomeItem) => {
								return (
									<tr
										className="shadow-sm hover:border-l-primary hover:border-l-2 border-b border-gray1 cursor-pointer hover:shadow-md"
										key={incomeItem?.id}
									>
										<td className="text-xs p-3 text-gray5">
											{
												new Date(incomeItem.date).toLocaleDateString()
											}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem?.title}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem?.subType?.name}
										</td>
										<td className="text-xs p-3 text-gray5">
											{Number(incomeItem.transactionAmount).toLocaleString()}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem.receivedBy}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem.contacts}
										</td>
										<td className="text-xs p-3 text-gray5 flex">
											<MdDeleteOutline
												onClick={() => deleteIncome(incomeItem)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												className="text-warning h-4 w-4 ml-5"
												onClick={() => {
													navigate(`/addTransaction?transactionType=income&action=edit&transactionId=${incomeItem.transactionId}`)
												}}
											/>
										</td>
									</tr>
								);
							})
							: incomesData.map((incomeItem) => {
								return (
									<tr
										className="shadow-sm hover:border-l-primary hover:border-l-2 border-b border-gray1 cursor-pointer hover:shadow-md"
										key={incomeItem?.id}
									>
										<td className="text-xs p-3 text-gray5">
											{
												new Date(incomeItem.date).toLocaleDateString()
											}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem?.title}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem?.subType?.name}
										</td>
										<td className="text-xs p-3 text-gray5">
											{Number(incomeItem.transactionAmount).toLocaleString()}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem.receivedBy}
										</td>
										<td className="text-xs p-3 text-gray5">
											{incomeItem.contacts}
										</td>
										<td className="text-xs p-3 text-gray5 flex">
											<MdDeleteOutline
												onClick={() => deleteIncome(incomeItem)}
												className="text-red w-4 h-4"
											/>
											<BsPencilSquare
												className="text-warning h-4 w-4 ml-5"
												onClick={() => {
													navigate(`/addTransaction?transactionType=income&action=edit&transactionId=${incomeItem.transactionId}`)
												}}
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
