import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import Button from "../Button";
import InputField from "../InputField";

function TrialBalance() {
	const dispatch = useDispatch();
	const [currentAssets, setCurrentAssets] = useState([]);
	const [nonCurrentAssets, setNonCurrentAssets] = useState([]);
	const [currentLiabilities, setCurrentLiabilities] = useState([]);
	const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState([]);
	const [directExpenses, setdirectExpenses] = useState([]);
	const [indirectExpenses, setindirectExpenses] = useState([]);
	const [directIncomes, setdirectIncomes] = useState([]);
	const [indirectIncomes, setindirectIncomes] = useState([]);

	const { accounts, loading } = useSelector((state) => state.schoolStore);

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);

	useEffect(() => {
		if (accounts) {
			const groupedAccounts = {
				currentLiabilities: accounts.filter(
					(account) =>
						account.accountType === "Liability" && account.subType === "CURRENT"
				),
				nonCurrentLiabilities: accounts.filter(
					(account) =>
						account.accountType === "Liability" &&
						account.subType === "NON_CURRENT"
				),
				currentAssets: accounts.filter(
					(account) =>
						account.accountType === "Asset" && account.subType === "CURRENT"
				),
				nonCurrentAssets: accounts.filter(
					(account) =>
						account.accountType === "Asset" && account.subType === "NON_CURRENT"
				),
				directExpenses: accounts.filter(
					(account) =>
						account.accountType === "Expense" && account.subType === "DIRRECT"
				),
				indirectExpenses: accounts.filter(
					(account) =>
						account.accountType === "Expense" && account.subType === "INDIRRECT"
				),
				directIncomes: accounts.filter(
					(account) =>
						account.accountType === "Income" && account.subType === "DIRRECT"
				),
				indirectIncomes: accounts.filter(
					(account) =>
						account.accountType === "Income" && account.subType === "INDIRRECT"
				),
			};

			setCurrentLiabilities(groupedAccounts.currentLiabilities);
			setNonCurrentLiabilities(groupedAccounts.nonCurrentLiabilities);
			setCurrentAssets(groupedAccounts.currentAssets);
			setNonCurrentAssets(groupedAccounts.nonCurrentAssets);
			setdirectExpenses(groupedAccounts.directExpenses);
			setindirectExpenses(groupedAccounts.indirectExpenses);
			setdirectIncomes(groupedAccounts.directIncomes);
			setindirectIncomes(groupedAccounts.indirectIncomes);
		}
	}, [accounts]);

	const handleGeneratePDF = () => {
		const documentWindow = window.open("", "PRINT", "height=600,width=1000");
		const content = document.getElementById("trial-balance-table").outerHTML;

		documentWindow.document.write(content);

		// Get All stylesheets
		const stylesheets = document.querySelectorAll("link");
		// Append them to the head of the new window
		stylesheets.forEach((stylesheet) => {
			documentWindow.document.write(stylesheet.outerHTML);
		});
		// Get all style tags
		const styleTags = document.querySelectorAll("style");
		// Append them to the head of the new window
		styleTags.forEach((styleTag) => {
			documentWindow.document.write(styleTag.outerHTML);
		});

		setTimeout(() => {
			documentWindow.print();
		}, 1000);
	};

	return (
		<>
			<div className="bg-white p-3  mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">Trial Balance </p>
					</div>
					<div className="flex">
						{/* <div className="mr-3">
							<InputField type="date" label="From" />
						</div>
						<div className="mr-3">
							<InputField type="date" label="to" />
						</div>
						<div>
							<InputField type="month" label="By Month" />
						</div> */}
						<div className="ml-5 mt-12" onClick={handleGeneratePDF}>
							<Button value={"Pdf"} />
						</div>
					</div>
				</div>

				<div className="h-[70vh] overflow-y-auto">
					<div id="trial-balance-table" className="">
						<div className="flex bg-primary text-white mt-5">
							<div className="border border-gray1 p-3  w-3/5">Accounts</div>
							<div className="border border-gray1 p-3 w-1/5">Debit</div>
							<div className="border border-gray1 p-3 w-1/5">Credit</div>
						</div>
						<div className="">
							<div className="border border-gray1 p-3 text-primary text-xl">
								Assets
							</div>

							{currentAssets.map((curr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{curr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(curr.amount).toLocaleString()}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
								</div>
							))}

							{nonCurrentAssets.map((nonCurr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{nonCurr.accountName}
									</div>

									<div className="border border-gray1 p-3 w-1/5">
										{Number(nonCurr.amount).toLocaleString()}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
								</div>
							))}

							<div className="border border-gray1 p-3 text-primary text-xl">
								Liabilities
							</div>

							{currentLiabilities.map((curr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{curr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(curr.amount).toLocaleString()}
									</div>
								</div>
							))}

							{nonCurrentLiabilities.map((nonCurr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{nonCurr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(nonCurr.amount).toLocaleString()}
									</div>
								</div>
							))}

							<div className="border border-gray1 p-3 text-primary text-xl">
								Incomes
							</div>

							{directIncomes.map((curr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{curr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(curr.amount).toLocaleString()}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
								</div>
							))}

							{indirectIncomes.map((nonCurr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{nonCurr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(nonCurr.amount).toLocaleString()}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
								</div>
							))}

							<div className="border border-gray1 p-3 text-primary text-xl">
								Expenses
							</div>

							{directExpenses.map((curr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{curr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(curr.amount).toLocaleString()}
									</div>
								</div>
							))}

							{indirectExpenses.map((nonCurr) => (
								<div className="flex text-gray5 font-light cursor-pointer hover:border-l-2 hover:border-l-primary hover:shadow-lg">
									<div className="border border-gray1 p-3  w-3/5">
										{nonCurr.accountName}
									</div>
									<div className="border border-gray1 p-3 w-1/5"></div>
									<div className="border border-gray1 p-3 w-1/5">
										{Number(nonCurr.amount).toLocaleString()}
									</div>
								</div>
							))}
							<div className="flex bg-primary text-white mt-5">
								<div className="border border-gray1 p-3  w-3/5">Total</div>
								<div className="border border-gray1 p-3 w-1/5">
									Debit:  {
										Number(
											currentAssets.reduce((acc, curr) => acc + curr.amount, 0) +
											nonCurrentAssets.reduce((acc, curr) => acc + curr.amount, 0) +
											directIncomes.reduce((acc, curr) => acc + curr.amount, 0) +
											indirectIncomes.reduce((acc, curr) => acc + curr.amount, 0)
										).toLocaleString()
									}
								</div>
								<div className="border border-gray1 p-3 w-1/5">
									Credit: {
										Number(
											currentLiabilities.reduce((acc, curr) => acc + curr.amount, 0) +
											nonCurrentLiabilities.reduce((acc, curr) => acc + curr.amount, 0) +
											directExpenses.reduce((acc, curr) => acc + curr.amount, 0) +
											indirectExpenses.reduce((acc, curr) => acc + curr.amount, 0)
										).toLocaleString()
									}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}

export default TrialBalance;
