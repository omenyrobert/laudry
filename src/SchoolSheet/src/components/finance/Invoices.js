import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsFillPrinterFill, BsEye, BsPencilSquare } from "react-icons/bs";
import Button2 from "../Button2";
import InputField from "../InputField";
import Button from "../Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonSecondary from "../ButtonSecondary";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { usePrint } from "../../hooks/print";
import { useNavigate } from "react-router-dom";
import { BsSearch, BsPrinterFill } from "react-icons/bs";



function Invoices() {
	const { setLoading, toggleFeedback } = useFeedback();
	const navigate = useNavigate();
	const { printContent } = usePrint();

	// fetch invoice typess
	const [invoiceTypesData, setinvoiceTypesData] = useState([]);

	const fetchinvoiceTypes = async () => {
		const response = await axiosInstance.get("/transaction-types/invoice");

		setinvoiceTypesData(response.data.payload);
	};

	// fetch invoices
	const [invoicesData, setinvoicesData] = useState([]);
	const [invoiceTotal, setinvoiceTotal] = useState("");
	const fetchinvoice = async () => {
		const res = await axiosInstance.get("/transactions/type/invoice");

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

		setinvoicesData(coupledTransactions);
		setId(coupledTransactions[0].id);

		let total = coupledTransactions.reduce(
			(acc, item) => acc + parseInt(item.transactionAmount),
			0
		);

		setinvoiceTotal(total);
	};

	//deleting invoice types
	const deleteinvoice = (invoiceItem) => {
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
					.delete(`/transactions/${invoiceItem.transactionId}`)
					.then((response) => {
						console.log(response);
						const { status, payload } = response.data;
						toggleFeedback(status ? "success" : "error", {
							title: payload,
						});
						fetchinvoice();
					})
					.catch((error) => {
						console.log(error);
						toggleFeedback("error", error.message);
					});
			}
		});
	};

	// fetching invoice types
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await fetchinvoiceTypes();
				await fetchinvoice();
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
				<div className="flex w-9/12">
					<div className="w-6/12 px-2">
						<InputField
							placeholder="Search for Income"
							type="search"
							icon={<BsSearch className="w-3 -ml-7 mt-3" type="submit" />}
						/>
					</div>
					<div className="w-3/12 px-2">
						<InputField type="date" />
					</div>
					<div className="w-3/12">
						<InputField type="date" />
					</div>
				</div>

				<div className="w-3/12 px-3 mt-5 flex">

					<Link className="ml-5" to="/addTransaction?transactionType=invoice&action=create">
						<Button2 value={"invoice"} />
					</Link>
					<div onClick={() => {
						printContent("invoice-table")
					}} className="ml-5">
						<Button value={"Print"} />
					</div>
				</div>
			</div>
			<div className="w-full h-[80vh]">
				<table id="invoice-table" className="mt-5 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">Invoice</th>
						<th className="p-2 text-primary text-sm text-left">Status</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Balance</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>
						{invoicesData.map((invoiceItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={invoiceItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{new Date(invoiceItem.date).toLocaleDateString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{invoiceItem.title}
									</td>
									<td className="text-xs p-3 text-gray5">
										{invoiceItem?.status}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(invoiceItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(invoiceItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">
										{invoiceItem.receivedBy}
									</td>
									<td className="text-xs p-3 text-gray5">
										{invoiceItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										{invoiceItem.id ? (
											<div className="flex">
												<MdDeleteOutline
													onClick={() => deleteinvoice(invoiceItem)}
													className="text-red w-4 h-4"
												/>
												<BsPencilSquare
													className="text-warning h-4 w-4 ml-5"
													onClick={() => {
														navigate(
															`/addTransaction?transactionType=invoice&action=edit&transactionId=${invoiceItem.transactionId}`
														);
													}}
												/>
											</div>
										) : null}
										<BsPrinterFill
											onClick={() => {
												navigate(
													`/printTransaction?transactionType=invoice&action=edit&transactionId=${invoiceItem.transactionId}`
												);
											}} className="text-primary ml-5" />
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-4 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(invoiceTotal).toLocaleString()}</td>
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
export default Invoices;
