import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Button2 from "../../components/Button2";
import { BsSearch, BsPrinterFill } from "react-icons/bs";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

function Liabilities() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
	const [liabilityTotal, setliabilityTotal] = useState("");
	const [liabilitysData, setliabilitysData] = useState([]);

	const fetchliabilitys = async () => {
		const res = await axiosInstance.get("/transactions/type/liability");

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

		setliabilitysData(coupledTransactions);
		setId(coupledTransactions[0].id);

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setliabilityTotal(total);
	};

	//deleting liability types
	const deleteliability = (liabilityItem) => {
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
					.delete(`/transactions/${liabilityItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchliabilitys();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetching liability types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchliabilitys();
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
	const [searchedliabilitys, setSearchedliabilitys] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedliabilitys(liabilitysData);
			return;
		}
		const filteredliabilitys = liabilitysData.filter((income) => {
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
		setSearchedliabilitys(filteredliabilitys);
	}, [query, liabilitysData]);

	const printTable = () => {
		const table = document.getElementById("liability-table");
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
				<h5 className="text-lg font-medium text-secondary mt-5">
					Liabilities
				</h5>
			</div>
			<div className="flex mt-2 bg-white px-3 border border-gray2 rounded-md">
				<div className="w-4/12">
					<InputField
						type="search"
						placeholder="Search for Journal"
						icon={<BsSearch className="w-3 -ml-7 mt-3" />}
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

				<div className="w-2/12 mt-5 ml-5 flex">
					<Link to="/addTransaction?transactionType=liability&action=create">
						<Button2 value={"liability"} />
					</Link>
					<div onClick={printTable} className="ml-5">
						<Button value={"Print"} />
					</div>
				</div>
			</div>

			<div className="w-full h-[80vh]">
				<table id="liability-table" className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Liability</th>
						<th className="p-2 text-primary text-sm text-left">Sub Type</th>
						<th className="p-2 text-primary text-sm text-left">cost</th>
						<th className="p-2 text-primary text-sm text-left">Description</th>
						<th className="p-2 text-primary text-sm text-left">Seller</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{searchedliabilitys.map((liabilityItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={liabilityItem?.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(liabilityItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{liabilityItem.title}
									</td>
									<td className="text-xs p-3 text-gray5">
										{liabilityItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(liabilityItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{liabilityItem.description}
									</td>
									<td className="text-xs p-3 text-gray5">
										{liabilityItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{liabilityItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteliability(liabilityItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=liability&action=edit&transactionId=${liabilityItem.transactionId}`
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
						<tr className="bg-white text-lg text-primary font-semibold">
							<td colSpan="6" className="p-1">Total</td>
							<td>{Number(liabilityTotal).toLocaleString()}</td>

						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
export default Liabilities;
