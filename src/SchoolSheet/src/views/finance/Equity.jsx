import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Button2 from "../../components/Button2";
import { BsSearch, BsPrinterFill } from "react-icons/bs";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

function Equity() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
	const [equityTotal, setequityTotal] = useState("");
	const [equitysData, setequitysData] = useState([]);

	const fetchequitys = async () => {
		const res = await axiosInstance.get("/transactions/type/equity");

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

		setequitysData(coupledTransactions);
		setId(coupledTransactions[0].id);
		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setequityTotal(total);
	};

	//deleting equity types
	const deleteequity = (equityItem) => {
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
					.delete(`/transactions/${equityItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchequitys();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetching equity types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchequitys();
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
	const [searchedequitys, setSearchedequitys] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedequitys(equitysData);
			return;
		}
		const filteredequitys = equitysData.filter((equity) => {
			const equityDate = new Date(equity.date);
			const isStartDateValid = isNaN(query.startDate)
				? true
				: equityDate.getTime() >= query.startDate;
			const isEndDateValid = isNaN(query.endDate)
				? true
				: equityDate.getTime() <= query.endDate;
			const isSearchValid = equity.title
				.toLowerCase()
				.includes(query.search.toLowerCase());

			return (
				isStartDateValid && isEndDateValid && isSearchValid
			);
		});
		setSearchedequitys(filteredequitys);
	}, [query, equitysData]);

	const printTable = () => {
		const table = document.getElementById("equity-table");
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
			<div className="w-2/12">
				<h5 className="text-lg font-medium text-secondary mt-5">Equities</h5>
			</div>
			<div className="flex mt-2 bg-white px-3 border border-gray2 rounded-md">
				<div className="w-4/12">
					<InputField
						type="search"
						placeholder="Search for equity"
						icon={<BsSearch className="w-3 -ml-7 mt-3" />}
						onChange={(e) => {
							setQuery({ ...query, search: e.target.value });
						}}
					/>
				</div>
				<div className="w-2/12 ml-5">
					<InputField
						type="date"
						onChange={(e) => {
							setQuery({ ...query, startDate: e.target.valueAsNumber });
						}}
					/>
				</div>
				<div className="w-2/12 ml-5">
					<InputField
						type="date"
						onChange={(e) => {
							setQuery({ ...query, endDate: e.target.valueAsNumber });
						}}
					/>
				</div>

				<div className="w-2/12 mt-5 ml-5 flex">
					<Link to="/addTransaction?transactionType=equity&action=create">
						<Button2 value={"Equity"} />
					</Link>
					<div onClick={printTable} className="ml-2">
						<Button value={"Print"} />
					</div>
				</div>
			</div>

			<div className="w-full h-[80vh]">
				<table id="equity-table" className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">equity</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Source</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Description</th>

						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{searchedequitys.map((equityItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={equityItem?.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(equityItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">{equityItem.title}</td>
									<td className="text-xs p-3 text-gray5">
										{equityItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(equityItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{equityItem.description}
									</td>
									<td className="text-xs p-3 text-gray5">
										{equityItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{equityItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteequity(equityItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=equity&action=edit&transactionId=${equityItem.transactionId}`
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
						<tr className="bg-white p-5 text-lg text-primary font-semibold">
							<td colSpan="6" className="p-1">
								Total
							</td>
							<td>{Number(equityTotal).toLocaleString()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
export default Equity;
