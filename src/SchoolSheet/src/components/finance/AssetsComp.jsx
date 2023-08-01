import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare, BsSearch, BsPrinterFill } from "react-icons/bs";
import InputField from "../InputField";
import { FaPen } from "react-icons/fa";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import SelectComp from "../SelectComp";
import Swal from "sweetalert2";
import "../../assets/styles/main.css";
import Button2 from "../Button2";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function AssetsComp() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
	const [assetTotal, setAssetTotal] = useState("");
	const [assetsData, setAssetsData] = useState([]);

	// fetch asset typess
	const [assetTypesData, setassetTypesData] = useState([]);

	const fetchassetTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/asset");
		const { status, payload } = response.data;

		if (status === false) {
			toggleFeedback("error", payload);
			return;
		}

		const assetTypes = payload.map((item) => {
			return {
				label: item.name,
				value: item.name,
				...item,
			};
		});
		setassetTypesData(assetTypes);
	};

	const fetchAssets = async () => {
		const res = await axiosInstance.get("/transactions/type/asset");

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

		setAssetsData(coupledTransactions);
		setId(coupledTransactions[0].id);
		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setAssetTotal(total);
	};

	//deleting asset types
	const deleteasset = (assetItem) => {
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
					.delete(`/transactions/${assetItem.transactionId}`)
					.then((response) => {
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchAssets();
					})
					.catch((error) => {
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetching asset types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchAssets();
				await fetchassetTypes();
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
		filter: "",
		startDate: NaN,
		endDate: NaN,
	});
	const [searchedassets, setSearchedassets] = useState([]);

	useEffect(() => {
		if (
			query.search === "" &&
			query.filter === "" &&
			isNaN(query.startDate) &&
			isNaN(query.endDate)
		) {
			setSearchedassets(assetsData);
			return;
		}
		const filteredassets = assetsData.filter((asset) => {
			const assetDate = new Date(asset.date);
			const isStartDateValid = isNaN(query.startDate)
				? true
				: assetDate.getTime() >= query.startDate;
			const isEndDateValid = isNaN(query.endDate)
				? true
				: assetDate.getTime() <= query.endDate;
			const isSearchValid = asset.title
				.toLowerCase()
				.includes(query.search.toLowerCase());
			const isFilterValid = query.filter
				? asset.subType?.name === query.filter
				: true;
			return (
				isStartDateValid && isEndDateValid && isSearchValid && isFilterValid
			);
		});
		setSearchedassets(filteredassets);
	}, [query, assetsData]);

	const printTable = () => {
		const table = document.getElementById("asset-table");
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
			{/* <div className="w-1/12">
				<h5 className="text-lg font-medium text-secondary mt-5">Assets</h5>
			</div> */}
			<div className="flex  mt-2 bg-white px-3 border border-gray2 rounded-md">

				<div className="w-3/12">
					<InputField
						type="search"
						placeholder="Search for Asset"
						icon={<BsSearch className="w-3 -ml-7 mt-3" />}
						onChange={(e) => {
							setQuery({ ...query, search: e.target.value });
						}}
					/>
				</div>
				<div className="w-2/12 px-2">
					<div className="mt-5">
						<Select
							placeholder={"Filter By Type"}
							name="filter"
							onChange={(e) => {
								setQuery({ ...query, filter: e.value });
							}}
							options={assetTypesData}
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
				<div className="w-2/12 ml-5 mt-5 flex">
					<Link to="/addTransaction?transactionType=asset&action=create">
						<Button2 value={"Asset"} />
					</Link>
					<div onClick={printTable} className="ml-5">
						<Button value={"Print"} />
					</div>
				</div>
			</div>

			<div className="w-full h-[80vh]">
				<table id="asset-table" className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">asset</th>
						<th className="p-2 text-primary text-sm text-left">asset Type</th>
						<th className="p-2 text-primary text-sm text-left">cost</th>
						<th className="p-2 text-primary text-sm text-left">Description</th>
						<th className="p-2 text-primary text-sm text-left">Seller</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{searchedassets.map((assetItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={assetItem?.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(assetItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">{assetItem.title}</td>
									<td className="text-xs p-3 text-gray5">
										{assetItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(assetItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{assetItem.description}
									</td>
									<td className="text-xs p-3 text-gray5">
										{assetItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{assetItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteasset(assetItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=asset&action=edit&transactionId=${assetItem.transactionId}`
														);
													}}
												/>
											</div>
										) : null}

										<BsPrinterFill className="text-primary ml-5" />
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-5 text-lg text-primary font-semibold">
							<td colSpan="6 p-1">Total</td>
							<td>{Number(assetTotal).toLocaleString()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
export default AssetsComp;
