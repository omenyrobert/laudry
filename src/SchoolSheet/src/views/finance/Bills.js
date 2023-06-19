import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Button2 from "../../components/Button2";
import InputField from "../../components/InputField";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../assets/styles/main.css";
import { BsSearch } from "react-icons/bs";
import ButtonSecondary from "../../components/ButtonSecondary";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback";
import { useNavigate, Link } from "react-router-dom";


function Bills() {
	const { setLoading, toggleFeedback } = useFeedback()
	const navigate = useNavigate()
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
				axiosInstance.delete(`/transactions/${billItem.transactionId}`)
					.then((response) => {
						console.log(response)
						const { status, payload } = response.data
						toggleFeedback(status ? "success" : "error", {
							title: payload
						})
						fetchbill()
					})
					.catch((error) => {
						console.log(error)
						toggleFeedback("error", error.message)
					}
					);
			}
		});
	};


	// fetch bills
	const [billsData, setbillsData] = useState([]);
	const [billTotal, setbillTotal] = useState("");


	const fetchbill = async () => {

		const res = await axiosInstance.get("/transactions/type/bill")

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

		setbillsData(coupledTransactions)

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
			setLoading(true)
			try {
				await fetchbill();
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
			<div className="w-full h-[80vh]">
				<div className="flex bg-white p-2">
					<div className="w-10/12">
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
					<div className="w-2/12">
						<div className="relative w-[150px] ml-5 mt-5">
							<Link to="/addTransaction?transactionType=bill&action=create">
								<Button2 value={"Add Bill"} />
							</Link>
						</div>
					</div>
				</div>



				<table className="mt-10 w-[98%] table-auto">
					<thead style={{ backgroundColor: "#0d6dfd10" }}>
						<th className="p-2 text-primary text-sm text-left">Date</th>
						<th className="p-2 text-primary text-sm text-left">bill</th>
						<th className="p-2 text-primary text-sm text-left">bill Type</th>
						<th className="p-2 text-primary text-sm text-left">Amount</th>
						<th className="p-2 text-primary text-sm text-left">Received By</th>
						<th className="p-2 text-primary text-sm text-left">Contacts</th>
						<th className="p-2 text-primary text-sm text-left">Action</th>
					</thead>
					<tbody>


						{billsData.map((billItem) => {
							return (
								<tr
									className="shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md"
									key={billItem.id}
								>
									<td className="text-xs p-3 text-gray5">
										{
											new Date(billItem.date).toLocaleDateString()
										}
									</td>
									<td className="text-xs p-3 text-gray5">{billItem.title}</td>
									<td className="text-xs p-3 text-gray5">
										{billItem?.subType?.name}
									</td>
									<td className="text-xs p-3 text-gray5">
										{Number(billItem.transactionAmount).toLocaleString()}
									</td>
									<td className="text-xs p-3 text-gray5">{billItem.receivedBy}</td>
									<td className="text-xs p-3 text-gray5">
										{billItem.contacts}
									</td>
									<td className="text-xs p-3 text-gray5 flex">
										<MdDeleteOutline
											onClick={() => deletebill(billItem)}
											className="text-red w-4 h-4"
										/>
										<BsPencilSquare
											className="text-warning h-4 w-4 ml-5"
											onClick={() => {
												navigate(`/addTransaction?transactionType=bill&action=edit&transactionId=${billItem.transactionId}`)
											}}
										/>
									</td>
								</tr>
							);
						})}
						<tr className="bg-white p-4 text-lg font-semibold">
							<td colSpan="3">Total</td>
							<td>{Number(billTotal).toLocaleString()}</td>
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
export default Bills;
