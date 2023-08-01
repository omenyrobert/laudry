import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPrinterFill, BsPencilSquare } from "react-icons/bs";
import Button2 from "../../components/Button2";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import SelectComp from "../../components/SelectComp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsSearch } from "react-icons/bs";
import ButtonSecondary from "../../components/ButtonSecondary";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate } from "react-router-dom";

function Receipts() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();

	// fetch receipt typess
	const [receiptTypesData, setreceiptTypesData] = useState([]);

	const fetchreceiptTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/receipt");

		setreceiptTypesData(response.data.payload);
	};

	// fetch receipts
	const [receiptsData, setreceiptsData] = useState([]);
	const [receiptTotal, setreceiptTotal] = useState("");
	const fetchreceipt = async () => {
		const res = await axiosInstance.get("/transactions/type/receipt");

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

		setreceiptsData(coupledTransactions);
		setId(coupledTransactions[0].id);
		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setreceiptTotal(total);
	};

	//deleting receipt types
	const deletereceipt = (receiptItem) => {
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
					.delete(`/transactions/${receiptItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchreceipt();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetching receipt types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchreceiptTypes();
				await fetchreceipt();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toggleFeedback("error", { title: "Error", text: error.message });
			}
		}

		fetchData();
	}, []);

	const [id, setId] = useState("");

	return (
		<>
			{/* 			<Sample /> */}

			<div className="flex bg-white">
				<div className="w-9/12 ">
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
				<div className="w-3/12 px-3 mt-6 ml-5 flex">
					<Link to="/addTransaction?transactionType=receipt&action=create">
						<Button2 value={"Receipt"} />
					</Link>
					<div className="ml-5">
						<Button value={"Print"} />
					</div>
				</div>
			</div>
			<div className="w-full h-[80vh]">
				<table className="mt-5 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Name</th>
						<th className="p-2 text-primary text-sm text-left">Items</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{receiptsData.map((receiptItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={receiptItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(receiptItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{receiptItem.title}
									</td>
									<td className="text-xs p-3 text-gray5">
										{receiptItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(receiptItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{receiptItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5">
										{receiptItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{receiptItem.id === id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deletereceipt(receiptItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=receipt&action=edit&transactionId=${receiptItem.transactionId}`
														);
													}}
												/>
											</div>
										) : null}

										<BsPrinterFill
											onClick={() => {
												navigate(
													`/printTransaction?transactionType=receipt&action=edit&transactionId=${receiptItem.transactionId}`
												);
											}}
											className="ml-5 text-primary" />
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-4 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(receiptTotal).toLocaleString()}</td>
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
export default Receipts;
