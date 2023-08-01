import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Button2 from "../Button2";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import "../../assets/styles/main.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function IncomeComp() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();

	// fetch income typess
	const [incomeTypesData, setIncomeTypesData] = useState([]);
	const [incomeTotal, setIncomeTotal] = useState("");
	const [incomeType, setIncomeType] = useState(null);

	const fetchIncomeTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/income");
		const { status, payload } = response.data;

		if (status === false) {
			toggleFeedback("error", payload);
			return;
		}

		const incomeTypes = payload.map((item) => {
			return {
				label: item.name,
				value: item.name,
				...item,
			};
		});
		setIncomeTypesData(incomeTypes);
	};

	// fetch incomes
	const [incomesData, setIncomesData] = useState([]);

	const [id, setId] = useState("");
	const fetchIncomes = async () => {
		const res = await axiosInstance.get("/transactions/type/income");

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
		setId(coupledTransactions[0].id);
		setIncomesData(coupledTransactions);

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setIncomeTotal(total);
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
				axiosInstance
					.delete(`/transactions/${income.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchIncomes();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchIncomeTypes();
				await fetchIncomes();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}

		fetchData();
	}, []);

	// implement search
	const [query, setQuery] = useState({
		search: "",
		filter: "",
		startDate: NaN,
		endDate: NaN,
	});
	const [searchedIncomes, setSearchedIncomes] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedIncomes(incomesData);
			return;
		}
		const filteredIncomes = incomesData.filter((income) => {
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
		setSearchedIncomes(filteredIncomes);
	}, [query, incomesData]);

	const printTable = () => {
		const table = document.getElementById("income-table");
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
				<div className="w-[30%] px-2">
					<InputField
						placeholder="Search for Income"
						type="search"
						icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
						onChange={(e) => {
							setQuery({ ...query, search: e.target.value });
						}}
					/>
				</div>
				<div className="w-[22%] px-2 mt-5">
					<Select
						placeholder={"Filter By Type"}
						name="filter"
						onChange={(e) => {
							setQuery({ ...query, filter: e.value });
						}}
						options={incomeTypesData}
					/>
				</div>
				<div className="w-[12%] px-2">
					<InputField
						type="date"
						onChange={(e) => {
							setQuery({ ...query, startDate: e.target.valueAsNumber });
						}}
					/>
				</div>
				<div className="w-[12%]">
					<InputField
						type="date"
						onChange={(e) => {
							setQuery({ ...query, endDate: e.target.valueAsNumber });
						}}
					/>
				</div>
				<div
					onClick={() => {
						setQuery({ search: "", filter: "", startDate: NaN, endDate: NaN });
					}}
					className="mt-5 ml-5"
				>
					<Button value={"Clear"} />
				</div>
				<Link
					to="/addTransaction?transactionType=income&action=create"
					className="w-auto px-3 mt-5"
				>
					<Button2 value={"Income "} />
				</Link>
				<div
					onClick={() => {
						printTable();
					}}
					className="mt-5 mr-5"
				>
					<Button value={"Print"} />
				</div>
			</div>

			<div className="w-full h-[80vh] relative">
				<table id="income-table" className="mt-10 w-[98%] table-auto">
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
						{searchedIncomes.map((incomeItem) => {
							return (
								<tr
									className="shadow-sm hover:border-l-primary hover:border-l-2 border-b border-gray1 cursor-pointer hover:shadow-md"
									key={incomeItem?.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(incomeItem.date).toLocaleDateString()}
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
									<td className="text-xs p-3 text-gray5">
										{incomeItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteIncome(incomeItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=income&action=edit&transactionId=${incomeItem.transactionId}`
														);
													}}
												/>
											</div>
										) : null}
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
