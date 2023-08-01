import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTransactions } from "../../store/schoolSheetSlices/schoolStore";
import InputField from "../InputField";
import Button from "../Button";


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
};

function GeneralLedger() {
	const dispatch = useDispatch();
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [filteredTransactions, setFilteredTransactions] = useState([]);

	const { transactions, loading } = useSelector((state) => state.schoolStore);

	// getTransactions
	useEffect(() => {
		dispatch(getTransactions());
	}, [dispatch]);

	useEffect(() => {
		const filtered = transactions.filter((transaction) => {
		  let include = true;
	
		  if (fromDate && transaction.date < fromDate) {
			include = false;
		  }
	
		  if (toDate && transaction.date > toDate) {
			include = false;
		  }
	
		  return include;
		});
	
		setFilteredTransactions(filtered);
	  }, [transactions, fromDate, toDate]);

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
			<div className="bg-white p-3 h-[82vh] mt-2 overflow-y-auto border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">General Journal</p>
					</div>
					<div className="flex">
						<div className="mr-3">
							<InputField
								type="date"
								label="From" 
								value={fromDate}
								onChange={(e) => setFromDate(e.target.value)}
							/>
						</div>
						<div className="mr-3">
							<InputField
								type="date"
								label="to"
								value={toDate}
								onChange={(e) => setToDate(e.target.value)}
							/>
						</div>
						{/* <div>
							<InputField type="month" label="By Month" />
						</div> */}
						<div className="ml-5 mt-12" onClick={handleGeneratePDF}>
							<Button value={"Pdf"} />
						</div>
					</div>
				</div>
				
				<div  id="ledger-table">
					<div className="flex border-b border-gray1 mt-3">
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
						filteredTransactions.map(transaction => (
							<div className="flex border-b border-gray1 text-gray5 text-sm cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg"
							key={transaction.transactionId}
							>
								<div className="w-1/4 p-2">{formatDate(transaction.date)}</div>
								<div className="w-1/4 p-2">{transaction.transactionType}</div>
								<div className="w-1/4 p-2">{transaction.transactionId}</div>
								<div className="w-1/4 p-2 truncate">{transaction.description}</div>
								<div className="w-1/4 p-2">{transaction.account.accountName}</div>
								<div className="w-1/4 p-2">{Number(transaction.credit).toLocaleString()}</div>
								<div className="w-1/4 p-2">{Number(transaction.debit).toLocaleString()}</div>
								<div className="w-1/4 p-2">{Number(transaction.amount).toLocaleString()}</div>
								<div className="w-1/4 p-2">{Number(transaction.balance).toLocaleString()}</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	);
}

export default GeneralLedger;
