import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsPrinterFill } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import Button2 from "../Button2";
import ButtonSecondary from "../ButtonSecondary";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import "../../assets/styles/main.css";
import { BsSearch } from "react-icons/bs";
import Sample from "../../views/Sample";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { usePrint } from "../../hooks/print";

//let db = new Localbase("db");

function ExpensesComp() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
	const { printContent } = usePrint();

	// fetch expense typess
	const [expenseTypesData, setExpenseTypesData] = useState([]);

	const fetchExpenseTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/expense");
		const { payload } = response.data;

		const expenseTypes = payload.map((item) => {
			return {
				label: item.name,
				value: item.name,
				...item,
			};
		});
		setExpenseTypesData(expenseTypes);
	};

	// fetch expenses
	const [expensesData, setExpensesData] = useState([]);
	const [expenseTotal, setexpenseTotal] = useState("");
	const fetchExpense = async () => {
		const res = await axiosInstance.get("/transactions/type/expense");

		const { status, payload } = res.data;

		if (status === false) {
			setLoading(false);
			toggleFeedback("error", payload);
			return;
		}

		const coupledTransactions = [];

		for (let i = 0; i < payload.length; i++) {
			const transaction = payload[i];

			if (
				coupledTransactions.find(
					(t) => t.transactionId === transaction.transactionId
				)
			)
				continue;

			// find corresponding transaction with same id
			const correspondingTransaction = payload.find((t) => {
				return (
					t.transactionId === transaction.transactionId &&
					t.id !== transaction.id
				);
			});

			if (correspondingTransaction) {
				coupledTransactions.push({
					transactionId: transaction.transactionId,
					...transaction,
					transactionAmount:
						transaction.debit === 0 ? transaction.credit : transaction.debit,
				});
			}
		}

		setExpensesData(coupledTransactions);
		setId(coupledTransactions[0].id);
		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setexpenseTotal(total);
	};

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
				axiosInstance
					.delete(`/transactions/${expenseItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchExpense();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetching expense types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchExpenseTypes();
				await fetchExpense();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}

		fetchData();
	}, []);

	const [file, setFile] = useState(false);

	const closeFile = () => {
		setFile(false);
	};
	const showFile = () => {
		setFile(true);
	};

	const [id, setId] = useState("");

	// implement search
	const [query, setQuery] = useState({
		search: "",
		filter: "",
		startDate: NaN,
		endDate: NaN,
	});
	const [searchedExpenses, setSearchedExpenses] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedExpenses(expensesData);
			return;
		}
		const filteredIncomes = expensesData.filter((income) => {
			const incomeDate = new Date(income.date);
			const isStartDateValid = isNaN(query.startDate)
				? true
				: incomeDate.getTime() >= query.startDate;
			const isEndDateValid = isNaN(query.endDate)
				? true
				: incomeDate.getTime() <= query.endDate;
			const isSearchValid = income.title
				.toLowerCase()
				.includes(query.search.toLowerCase());
			const isFilterValid = query.filter
				? income.subType.name === query.filter
				: true;
			return (
				isStartDateValid && isEndDateValid && isSearchValid && isFilterValid
			);
		});
		setSearchedExpenses(filteredIncomes);
	}, [query, expensesData]);

	const printTable = () => {
		const table = document.getElementById("expense-table");
		const myWindow = window.open("", "", "width=900,height=700");
		myWindow.document.write(table.outerHTML);

		const stylesheets = Array.from(document.styleSheets);

		stylesheets.forEach((stylesheet) => {
			myWindow.document.head.appendChild(stylesheet.ownerNode.cloneNode(true));
		});

		const links = Array.from(document.getElementsByTagName("link"));

		links.forEach((link) => {
			myWindow.document.head.appendChild(link.cloneNode(true));
		});

		setTimeout(() => {
			myWindow.print();
		}, 1000);
	};

	return (
		<>
			<div className="flex bg-white">
				<div className="w-10/12 ">
					<div className="flex">
						<div className="w-6/12 px-2">
							<InputField
								placeholder="Search for Income"
								type="search"
								icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
								onChange={(e) => {
									setQuery({ ...query, search: e.target.value });
								}}
								value={query.search}
							/>
						</div>
						<div className="w-3/12 px-2">
							<div className="mt-5">
								<Select
									placeholder={"Filter By Type"}
									name="filter"
									onChange={(e) => {
										setQuery({ ...query, filter: e.value });
									}}
									options={expenseTypesData}
								/>
							</div>
						</div>{" "}
						<div className="w-2/12 px-2">
							<InputField
								type="date"
								onChange={(e) => {
									setQuery({ ...query, startDate: e.target.valueAsNumber });
								}}
							/>
						</div>
						<div className="w-2/12">
							<InputField
								type="date"
								onChange={(e) => {
									setQuery({ ...query, endDate: e.target.valueAsNumber });
								}}
							/>
						</div>
					</div>
				</div>

				<Link
					className="mt-5 ml-5"
					to="/addTransaction?transactionType=expense&action=create"
				>
					<Button2 value={"Expense"} />
				</Link>
				<div onClick={printTable} className="mt-5 ml-5">
					<Button value={"Print"} />
				</div>
			</div>
			<div className="w-full h-[80vh]">
				<table id="expense-table" className="mt-5 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Name</th>
						<th className="p-2 text-primary text-sm text-left">Expense Type</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{searchedExpenses.map((expenseItem) => {
							return (
								<tr
									id={expenseItem.id + "expense"}
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={expenseItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(expenseItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{expenseItem.title}
									</td>
									<td className="text-xs p-3 text-gray5">
										{expenseItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(expenseItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{expenseItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5">
										{expenseItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{expenseItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteExpense(expenseItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=expense&action=edit&transactionId=${expenseItem.transactionId}`
														);
													}}
												/>

											</div>
										) : null}

										<img
											onClick={showFile}
											src="https://templates.invoicehome.com/receipt-template-us-classic-white-750px.png"
											className="w-10 cursor-pointer h-5 ml-5"
										/>
										{file ? (
											<div className="top-0 left-0 bg-black/50 p-10 flex justify-center w-full h-full absolute">
												<div className="w-3/12" onClick={closeFile}></div>
												<div className="w-6/12 flex">
													<img
														src="https://templates.invoicehome.com/receipt-template-us-classic-white-750px.png"
														className="h-[80vh]"
													/>
													<p
														onClick={closeFile}
														className="text-white ml-10 text-3xl mt-[30vh]"
													>
														X
													</p>
												</div>
												<div className="w-3/12" onClick={closeFile}></div>
											</div>
										) : null}
										<BsPrinterFill
											onClick={() => {
												navigate(
													`/printTransaction?transactionType=expense&action=edit&transactionId=${expenseItem.transactionId}`
												);
											}}
											className="text-primary ml-5" />
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
