import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import Button from "../Button";
import InputField from "../InputField";

function TrialBalance() {
	const dispatch = useDispatch();
	const [currentAssets, setCurrentAssets] = useState([]);
	const [nonCurrentAssets, setNonCurrentAssets] = useState([]);
	const [currentLiabilities, setCurrentLiabilities] = useState([]);
	const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState([]);
	const [currentExpenses, setCurrentExpenses] = useState([]);
	const [nonCurrentExpenses, setNonCurrentExpenses] = useState([]);
	const [currentIncomes, setCurrentIncomes] = useState([]);
	const [nonCurrentIncomes, setNonCurrentIncomes] = useState([]);

	const { accounts, loading } = useSelector((state) => state.schoolStore);

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);
	
		useEffect(() => {
			if (accounts) {
				const groupedAccounts = {
					currentLiabilities: accounts.filter(
					  (account) => account.accountType === "Liability" && account.subType === "CURRENT"
					),
					nonCurrentLiabilities: accounts.filter(
					  (account) => account.accountType === "Liability" && account.subType === "NON_CURRENT"
					),
					currentAssets: accounts.filter(
					  (account) => account.accountType === "Asset" && account.subType === "CURRENT"
					),
					nonCurrentAssets: accounts.filter(
					  (account) => account.accountType === "Asset" && account.subType === "NON_CURRENT"
					),
					currentExpenses: accounts.filter(
					  (account) => account.accountType === "Expense" && account.subType === "CURRENT"
					),
					nonCurrentExpenses: accounts.filter(
					  (account) => account.accountType === "Expense" && account.subType === "NON_CURRENT"
					),
					currentIncomes: accounts.filter(
					  (account) => account.accountType === "Income" && account.subType === "CURRENT"
					),
					nonCurrentIncomes: accounts.filter(
					  (account) => account.accountType === "Income" && account.subType === "NON_CURRENT"
					),
				  };
			  
				  setCurrentLiabilities(groupedAccounts.currentLiabilities);
				  setNonCurrentLiabilities(groupedAccounts.nonCurrentLiabilities);
				  setCurrentAssets(groupedAccounts.currentAssets);
				  setNonCurrentAssets(groupedAccounts.nonCurrentAssets);
				  setCurrentExpenses(groupedAccounts.currentExpenses);
				  setNonCurrentExpenses(groupedAccounts.nonCurrentExpenses);
				  setCurrentIncomes(groupedAccounts.currentIncomes);
				  setNonCurrentIncomes(groupedAccounts.nonCurrentIncomes);
			  
			}
		}, [accounts]);

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
			<div className="bg-white p-3 h-[85vh] overflow-y-auto mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">Trial Balance </p>
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
						<div className="ml-5 mt-12" onClick={handleGeneratePDF}>
							<Button value={"Pdf"} />
						</div>
					</div>
				</div>

				<div  id="ledger-table">
					<div className="flex bg-primary text-white mt-5">
						<div className="border border-gray1 p-3  w-3/5">Accounts</div>
						<div className="border border-gray1 p-3 w-1/5">Debit</div>
						<div className="border border-gray1 p-3 w-1/5">Credit</div>
					</div>

					<div className="border border-gray1 p-3 text-primary text-xl">
						Assets
					</div>
					
					{
						currentAssets.map(curr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{curr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5">{curr.amount}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
							</div>
						))
					}

					{
						nonCurrentAssets.map(nonCurr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{nonCurr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
								<div className="border border-gray1 p-3 w-1/5">{nonCurr.amount}</div>
							</div>
						))
					}
					
					<div className="border border-gray1 p-3 text-primary text-xl">
						Liabilities
					</div>

					{
						currentLiabilities.map(curr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{curr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5">{curr.amount}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
							</div>
						))
					}

					{
						nonCurrentLiabilities.map(nonCurr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{nonCurr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
								<div className="border border-gray1 p-3 w-1/5">{nonCurr.amount}</div>
							</div>
						))
					}

					<div className="border border-gray1 p-3 text-primary text-xl">
						Incomes
					</div>
					
					{
						currentIncomes.map(curr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{curr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5">{curr.amount}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
							</div>
						))
					}

					{
						nonCurrentIncomes.map(nonCurr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{nonCurr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
								<div className="border border-gray1 p-3 w-1/5">{nonCurr.amount}</div>
							</div>
						))
					}
					
					<div className="border border-gray1 p-3 text-primary text-xl">
						Expenses
					</div>

					{
						currentExpenses.map(curr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{curr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5">{curr.amount}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
							</div>
						))
					}

					{
						nonCurrentExpenses.map(nonCurr => (
							<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
								<div className="border border-gray1 p-3  w-3/5">{nonCurr.accountName}</div>
								<div className="border border-gray1 p-3 w-1/5"></div>
								<div className="border border-gray1 p-3 w-1/5">{nonCurr.amount}</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	);
}

export default TrialBalance;
