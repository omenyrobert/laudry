import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Button2 from "../../components/Button2";
import InputField from "../../components/InputField";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsPrinterFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../assets/styles/main.css";
import { BsSearch } from "react-icons/bs";
import ButtonSecondary from "../../components/ButtonSecondary";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";

function Bills() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
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
				axiosInstance
					.delete(`/transactions/${billItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchbill();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetch bills
	const [billsData, setbillsData] = useState([]);
	const [billTotal, setbillTotal] = useState("");

	const fetchbill = async () => {
		const res = await axiosInstance.get("/transactions/type/bill");

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

		setbillsData(coupledTransactions);
		setId(coupledTransactions[0].id);

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setbillTotal(total);
	};

	// delete

	// fetching bill types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchbill();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}

		fetchData();
	}, []);
	const [id, setId] = useState("");

	// implement search
	const [query, setQuery] = useState({
		search: "",
		startDate: NaN,
		endDate: NaN,
	});
	const [searchedBills, setSearchedBills] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedBills(billsData);
			return;
		}
		const filteredBills = billsData.filter((income) => {
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
			return (
				isStartDateValid && isEndDateValid && isSearchValid
			);
		});
		setSearchedBills(filteredBills);
	}, [query, billsData]);

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
			<div className="w-full h-[80vh]">
				<div className="flex bg-white p-2">
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
								/>
							</div>
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
									setQuery({ search: "", startDate: NaN, endDate: NaN });
								}}
								className="mt-5 ml-5"
							>
								<Button value={"Clear"} />
							</div>
						</div>
					</div>
					<div className="w-3/12">
						<div className="relative w-[150px] ml-5 mt-5 flex">
							<Link to="/addTransaction?transactionType=bill&action=create">
								<Button2 value={"Bill"} />
							</Link>
							<div onClick={printTable} className="ml-5">
								<Button value={"Print"} />
							</div>
						</div>
					</div>
				</div>

				<table id="income-table" className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">bill</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Description</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{searchedBills.map((billItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={billItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(billItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">{billItem.title}</td>
									<td className="text-xs p-3 text-gray5">
										{Number(billItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{billItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5">
										{billItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5">
										{billItem.description}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{billItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deletebill(billItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=bill&action=edit&transactionId=${billItem.transactionId}`
														);
													}}
												/>
											</div>
										) : null}

										<BsPrinterFill className="ml-5 text-primary" />
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-4 text-lg text-primary font-semibold">
							<td colSpan="6" className="p-1">Total</td>
							<td>{Number(billTotal).toLocaleString()}</td>


						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
export default Bills;
