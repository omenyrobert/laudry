import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTransactions } from "../../store/schoolSheetSlices/schoolStore";
import Button from "../Button";
import InputField from "../InputField";
import { formatDate } from "./GeneralLedger";

function CashFlow() {
	const dispatch = useDispatch();
	const [firstTransactionAmount, setFirstTransactionAmount] = useState(null);
	const [lastTransactionAmount, setLastTransactionAmount] = useState(null);
	const [netIncreaseDecrease, setNetIncreaseDecrease] = useState(null);

	const { transactions, loading } = useSelector((state) => state.schoolStore);

	// getTransactions
	useEffect(() => {
		dispatch(getTransactions());
	}, [dispatch]);

	useEffect(() => {
		if (transactions.length > 0) {
		  setFirstTransactionAmount(transactions[0].amount);
		  setLastTransactionAmount(transactions[transactions.length - 1].amount);

		  let totalCredit = 0;
		  let totalDebit = 0;
	
		  transactions.forEach((transaction) => {
			totalCredit += transaction.credit;
			totalDebit += transaction.debit;
		  });
		  
		  const netIncreaseDecrease = totalCredit - totalDebit;
		  setNetIncreaseDecrease(netIncreaseDecrease);
		}
	}, [transactions]);

	const handleGeneratePDF = () => {
		const documentWindow = window.open("", "PRINT", "height=600,width=1000");
		const content = document.getElementById("ledger-table").outerHTML;
	
		documentWindow.document.write(
		  content
		);
		
		// Get All stylesheets
		const stylesheets = document.querySelectorAll("link");
		// Append them to the head of the new window
		stylesheets.forEach((stylesheet) => {
		  documentWindow.document.write(stylesheet.outerHTML)
		});
		// Get all style tags 
		const styleTags = document.querySelectorAll("style");
		// Append them to the head of the new window
		styleTags.forEach((styleTag) => {
		  documentWindow.document.write(styleTag.outerHTML)
		})
	
		setTimeout(() => {
		  documentWindow.print();
		}, 1000);
	};

	return (
		<>
			<div className="bg-white p-3 h-[82vh] overflow-y-auto  mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">Cash Flow</p>
					</div>
					<div className="flex">
						<div className="mr-3">
							<InputField type="date" label="From" />
						</div>
						<div className="mr-3">
							<InputField type="date" label="to" />
						</div>
						<div>
							<InputField type="month" label="By Month" />
						</div>
						<div className="ml-5 mt-12">
							<Button value={"Pdf"}  onClick={handleGeneratePDF}/>
						</div>
					</div>
				</div>

				<div  id="ledger-table">
					<div className="flex border-b border-gray1">
						<div className="w-1/4 p-2">Date</div>
						<div className="w-1/4 p-2">Transaction Type</div>
						<div className="w-1/4 p-2">Journal No</div>
						<div className="w-1/4 p-2">Description</div>
						<div className="w-1/4 p-2">Account</div>
						<div className="w-1/4 p-2">Credit</div>
						<div className="w-1/4 p-2">Debit</div>
						<div className="w-1/4 p-2">Amount</div>
						<div className="w-1/4 p-2">Balance</div>
					</div>
					{
						transactions.map(transaction => (
							<div className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg"
								key={transaction.transactionId}
							>
								<div className="w-1/4 p-2">{formatDate(transaction.date)}</div>
								<div className="w-1/4 p-2">{transaction.transactionType}</div>
								<div className="w-1/4 p-2">{transaction.transactionId}</div>
								<div className="w-1/4 p-2 truncate">{transaction.description}</div>
								<div className="w-1/4 p-2">{transaction.account.accountName}</div>
								<div className="w-1/4 p-2">{transaction.credit}</div>
								<div className="w-1/4 p-2">{transaction.debit}</div>
								<div className="w-1/4 p-2">{transaction.amount}</div>
								<div className="w-1/4 p-2">{transaction.balance}</div>
							</div>
						))
					}
					<div className="bg-primary3 text-primary flex mt-1">
						<div className="w-10/12 p-2">Net Increase/Decrease</div>
						<div className="w-2/12 p-2">{netIncreaseDecrease}</div>
					</div>
					<div className="bg-primary3 text-primary flex mt-1">
						<div className="w-10/12 p-2">Cash At the Beginning</div>
						<div className="w-2/12 p-2">{firstTransactionAmount}</div>
					</div>
					<div className="bg-primary3 text-primary flex mt-1">
						<div className="w-10/12 p-2">Cash At the End</div>
						<div className="w-2/12 p-2">{lastTransactionAmount}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CashFlow;
