import React, { useEffect, useState } from "react";
import Button from "../Button";
import Button2 from "../Button2";
import InputField from "../InputField";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsPrinterFill } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsSearch } from "react-icons/bs";
import SelectComp from "../SelectComp";
import "../../assets/styles/main.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function AddPayments() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
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
				axiosInstance
					.delete(`/transactions/${paymentItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchpayment();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetch payments
	const [paymentsData, setpaymentsData] = useState([]);
	const [paymentTotal, setpaymentTotal] = useState("");

	const fetchpayment = async () => {
		const res = await axiosInstance.get("/transactions/type/payment");

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

		setpaymentsData(coupledTransactions);
		setId(coupledTransactions[0].id);

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setpaymentTotal(total);
	};

	const [id, setId] = useState("");

	// fetch payment typess
	const [paymentTypesData, setpaymentTypesData] = useState([]);

	const fetchpaymentTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/payment");
		const { status, payload } = response.data;

		if (status === false) {
			toggleFeedback("error", payload);
			return;
		}

		const paymentTypes = payload.map((item) => {
			return {
				label: item.name,
				value: item.name,
				...item,
			};
		});
		setpaymentTypesData(paymentTypes);
	};

	// delete

	// fetching payment types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchpaymentTypes();
				await fetchpayment();
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
	const [searchedPayments, setSearchedPayments] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedPayments(paymentsData);
			return;
		}
		const filteredPayments = paymentsData.filter((income) => {
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
		setSearchedPayments(filteredPayments);
	}, [query, paymentsData]);

	const printTable = () => {
		const table = document.getElementById("payments-table");
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
			<div className="w-full h-[80vh]">
				<div className="p-2 bg-white flex">
					<div className="w-9/12">
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
										options={paymentTypesData}
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
							<div
								onClick={() => {
									setQuery({
										search: "",
										filter: "",
										startDate: NaN,
										endDate: NaN,
									});
								}}
								className="mt-5 ml-5"
							>
								<Button value={"Clear"} />
							</div>
						</div>
					</div>
					<div className="w-3/12">
						<div className="relative w-[200px] pl-5 mt-5 flex">
							<Link to="/addTransaction?transactionType=payment&action=create">
								<Button2 value={"Payment"} />
							</Link>
							<div onClick={printTable} className="ml-5">
								<Button value={"Print"} />
							</div>
						</div>
					</div>
				</div>

				<table id="payments-table" className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Payment</th>
						<th className="p-2 text-primary text-sm text-left">payment Type</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{searchedPayments.map((paymentItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={paymentItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(paymentItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{paymentItem.title}
									</td>
									<td className="text-xs p-3 text-gray5">
										{paymentItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(paymentItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{paymentItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5">
										{paymentItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{paymentItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deletepayment(paymentItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=payment&action=edit&transactionId=${paymentItem.transactionId}`
														);
													}}
												/>
											</div>
										) : null}
										<BsPrinterFill
											onClick={() => {
												navigate(
													`/printTransaction?transactionType=payment&action=edit&transactionId=${paymentItem.transactionId}`
												);
											}}
											className="text-primary ml-5" />
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
		</>
	);
}
export default AddPayments;
