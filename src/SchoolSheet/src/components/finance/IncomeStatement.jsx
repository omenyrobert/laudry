import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import Button from "../Button";
import InputField from "../InputField";

function IncomeStatement() {
	const dispatch = useDispatch();
	const [expenses, setExpenses] = useState([]);
	const [incomes, setIncomes] = useState([]);
	const [sumExp, setSumExp] = useState(0);
	const [sumInc, setSumInc] = useState(0);

	const { accounts, loading } = useSelector((state) => state.schoolStore);

	// getAccounts
	useEffect(() => {
		dispatch(getAccounts());
	}, [dispatch]);

	useEffect(() => {
		if (accounts) {
			const groupedAccounts = {
				expenses: accounts.filter(
					(account) => account.accountType === "Expense"
				),
				incomes: accounts.filter((account) => account.accountType === "Income"),
			};

			setExpenses(groupedAccounts.expenses);
			setIncomes(groupedAccounts.incomes);

			const expSum = groupedAccounts.expenses.reduce(
				(total, exp) => total + exp.amount,
				0
			);
			const incSum = groupedAccounts.incomes.reduce(
				(total, inc) => total + inc.amount,
				0
			);
			setSumInc(incSum);
			setSumExp(expSum);
		}
	}, [accounts]);

	const handleGeneratePDF = () => {
		const documentWindow = window.open("", "PRINT", "height=600,width=1000");
		const content = document.getElementById("ledger-table").outerHTML;

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
			<div className="bg-white p-3 h-[82vh] overflow-y-auto mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">
							Income Statement (Profit & Loss){" "}
						</p>
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

				<div id="ledger-table">
					<p className="mt-5 text-primary text-xl  font-medium">Incomes</p>

					{incomes.map((inc) => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{inc.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{Number(inc.amount).toLocaleString()}
							</div>
						</div>
					))}
					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Income</div>
						<div className="w-2/12 border border-primary3 p-3">{Number(sumInc).toLocaleString()}</div>
					</div>

					<br />
					<p className="mt-5 text-primary text-xl  font-medium">Expenses</p>
					{expenses.map((exp) => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{exp.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{Number(exp.amount).toLocaleString()}
							</div>
						</div>
					))}
					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Expenses</div>
						<div className="w-2/12 border border-primary3 p-3">
							{Number(sumExp).toLocaleString()}
						</div>
					</div>
					<div className="flex bg-primary text-white mt-5">
						<div className="border border-gray1 p-3  w-10/12">Net Profit</div>

						<div className="border border-gray1 p-3 w-2/12">
							{Number(sumInc - sumExp).toLocaleString()}
						</div>
					</div>
				</div>
				<br />
			</div>
		</>
	);
}

export default IncomeStatement;
