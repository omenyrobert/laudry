import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAccounts } from "../../store/schoolSheetSlices/schoolStore";
import InputField from "../InputField";
import Button from "../Button";

function BalanceSheet() {
	const dispatch = useDispatch();
	const [currentAssets, setCurrentAssets] = useState([]);
	const [nonCurrentAssets, setNonCurrentAssets] = useState([]);
	const [currentLiabilities, setCurrentLiabilities] = useState([]);
	const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState([]);
	const [currentExpenses, setCurrentExpenses] = useState([]);
	const [nonCurrentExpenses, setNonCurrentExpenses] = useState([]);
	const [currentIncomes, setCurrentIncomes] = useState([]);
	const [nonCurrentIncomes, setNonCurrentIncomes] = useState([]);
	const [currentEquity, setCurrentEquity] = useState([]);
	const [nonCurrentEquity, setNonCurrentEquity] = useState([]);
	const [currentSales, setCurrentSales] = useState([]);
	const [nonCurrentSales, setNonCurrentSales] = useState([]);
	const [currentStocks, setCurrentStocks] = useState([]);
	const [nonCurrentStocks, setNonCurrentStocks] = useState([]);
	const [currentPurchases, setCurrentPurchases] = useState([]);
	const [nonCurrentPurchases, setNonCurrentPurchases] = useState([]);
	const [currentAssetsSum, setCurrentAssetsSum] = useState(0);
	const [nonCurrentAssetsSum, setNonCurrentAssetsSum] = useState(0);
	const [currentLiabilitiesSum, setCurrentLiabilitiesSum] = useState(0);
	const [nonCurrentLiabilitiesSum, setNonCurrentLiabilitiesSum] = useState(0);
	const [currentEquitySum, setCurrentEquitySum] = useState(0);
	const [nonCurrentEquitySum, setNonCurrentEquitySum] = useState(0);
	const [currentExpensesSum, setCurrentExpensesSum] = useState(0);
	const [nonCurrentExpensesSum, setNonCurrentExpensesSum] = useState(0);
	const [currentIncomesSum, setCurrentIncomesSum] = useState(0);
	const [nonCurrentIncomesSum, setNonCurrentIncomesSum] = useState(0);
	const [currentSalesSum, setCurrentSalesSum] = useState(0);
	const [nonCurrentSalesSum, setNonCurrentSalesSum] = useState(0);
	const [currentStocksSum, setCurrentStocksSum] = useState(0);
	const [nonCurrentStocksSum, setNonCurrentStocksSum] = useState(0);
	const [currentPurchasesSum, setCurrentPurchasesSum] = useState(0);
	const [nonCurrentPurchasesSum, setNonCurrentPurchasesSum] = useState(0);

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
				currentEquity: accounts.filter(
					(account) => account.accountType === "Asset" && account.subType === "CURRENT"
				  ),
				nonCurrentEquity: accounts.filter(
					(account) => account.accountType === "Asset" && account.subType === "NON_CURRENT"
				),
				currentSales: accounts.filter(
					(account) => account.accountType === "Sales" && account.subType === "CURRENT"
				),
				nonCurrentSales: accounts.filter(
					(account) => account.accountType === "Sales" && account.subType === "NON_CURRENT"
				),
				currentStocks: accounts.filter(
					(account) => account.accountType === "Stocks" && account.subType === "CURRENT"
				),
				nonCurrentStocks: accounts.filter(
					(account) => account.accountType === "Stocks" && account.subType === "NON_CURRENT"
				),
				currentPurchases: accounts.filter(
					(account) => account.accountType === "Purchases" && account.subType === "CURRENT"
				),
				nonCurrentPurchases: accounts.filter(
					(account) => account.accountType === "Purchases" && account.subType === "NON_CURRENT"
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
			  setCurrentEquity(groupedAccounts.currentEquity);
			  setNonCurrentEquity(groupedAccounts.nonCurrentEquity);
			  setCurrentSales(groupedAccounts.currentSales);
			  setNonCurrentSales(groupedAccounts.nonCurrentSales);
			  setCurrentStocks(groupedAccounts.currentStocks);
			  setNonCurrentStocks(groupedAccounts.nonCurrentStocks);
			  setCurrentPurchases(groupedAccounts.currentPurchases);
			  setNonCurrentPurchases(groupedAccounts.nonCurrentPurchases);
		  
			  // Calculate the sums
			  const currentAssetsSum = groupedAccounts.currentAssets.reduce((total, asset) => total + asset.amount, 0);
			  const nonCurrentAssetsSum = groupedAccounts.nonCurrentAssets.reduce((total, asset) => total + asset.amount, 0);
			  const currentLiabilitiesSum = groupedAccounts.currentLiabilities.reduce((total, liability) => total + liability.amount, 0);
			  const nonCurrentLiabilitiesSum = groupedAccounts.nonCurrentLiabilities.reduce((total, liability) => total + liability.amount, 0);
			  const currentEquitySum = groupedAccounts.currentAssets.reduce((total, equity) => total + equity.amount, 0);
			  const nonCurrentEquitySum = groupedAccounts.nonCurrentAssets.reduce((total, equity) => total + equity.amount, 0);
			  const currentExpansesSum = groupedAccounts.currentExpenses.reduce((total, expenses) => total + expenses.amount, 0);
			  const nonCurrentExpensesSum = groupedAccounts.nonCurrentExpenses.reduce((total, expenses) => total + expenses.amount, 0);
			  const currentIncomesSum = groupedAccounts.currentIncomes.reduce((total, income) => total + income.amount, 0);
			  const nonCurrentIncomesSum = groupedAccounts.nonCurrentIncomes.reduce((total, income) => total + income.amount, 0);
			  const currentSalesSum = groupedAccounts.currentSales.reduce((total, sale) => total + sale.amount, 0);
			  const nonCurrentSalesSum = groupedAccounts.nonCurrentSales.reduce((total, sale) => total + sale.amount, 0);
			  const currentStocksSum = groupedAccounts.currentStocks.reduce((total, stock) => total + stock.amount, 0);
			  const nonCurrentStocksSum = groupedAccounts.nonCurrentStocks.reduce((total, stock) => total + stock.amount, 0);
			  const currentPurchasesSum = groupedAccounts.currentPurchases.reduce((total, purchase) => total + purchase.amount, 0);
			  const nonCurrentPurchasedSum = groupedAccounts.nonCurrentPurchases.reduce((total, purchase) => total + purchase.amount, 0);

		  
			  setCurrentAssetsSum(currentAssetsSum);
			  setNonCurrentAssetsSum(nonCurrentAssetsSum);
			  setCurrentLiabilitiesSum(currentLiabilitiesSum);
			  setNonCurrentLiabilitiesSum(nonCurrentLiabilitiesSum);
			  setCurrentEquitySum(currentEquitySum);
			  setNonCurrentEquitySum(nonCurrentEquitySum);
			  setCurrentExpensesSum(currentExpansesSum);
			  setNonCurrentExpensesSum(nonCurrentExpensesSum);
			  setCurrentIncomesSum(currentIncomesSum);
			  setNonCurrentIncomesSum(nonCurrentIncomesSum);
			  setCurrentSalesSum(currentSalesSum);
			  setNonCurrentSalesSum(nonCurrentSalesSum);
			  setCurrentStocksSum(currentStocksSum);
			  setNonCurrentStocksSum(nonCurrentStocksSum);
			  setCurrentPurchasesSum(currentPurchasesSum);
			  setNonCurrentPurchasesSum(nonCurrentPurchasedSum);
		}
	}, [accounts]);
	
	return (
		<>
			<div className="bg-white p-3 h-[85vh] overflow-y-auto mt-2 border border-gray2 shadow rounded">
				<div className="flex justify-between">
					<div>
						<p className="text-secondary text-xl font-bold">Balance Sheet </p>
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
							<Button value={"Pdf"} />
						</div>
					</div>
				</div>

				<p className="mt-5 text-primary font-medium text-xl">Assets</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Assets</div>
					<div className="w-2/12 border border-gray2 p-3">{currentAssetsSum + nonCurrentAssetsSum}</div>
				</div>

				<p className="mt-5  font-medium">Current Assets</p>
				{
					currentAssets.map(asset => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{asset.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{asset.amount}
							</div>
						</div>
					))
				}
	
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Assets</div>
					<div className="w-2/12 border border-primary3 p-3">{currentAssetsSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Assets</p>
				{
					nonCurrentAssets.map(asset => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{asset.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{asset.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Assets</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentAssetsSum}</div>
				</div>

				<br />
				<p className="mt-5 text-primary font-medium text-xl">Liabilities</p>
				<div className="mt-3 flex bg-primary3 text-primary border border-gray2">
					<div className="w-10/12 p-3">Total Liabilities</div>
					<div className="w-2/12 border border-gray2 p-3">{currentLiabilitiesSum + nonCurrentLiabilitiesSum}</div>
				</div>
				<p className="mt-5  font-medium">Current Liabilities</p>
				{
					currentLiabilities.map(liability => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{liability.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{liability.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Liabilities</div>
					<div className="w-2/12 border border-primary3 p-3">{currentLiabilitiesSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Liabilities</p>
				{
					nonCurrentLiabilities.map(liability => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{liability.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{liability.amount}
							</div>
						</div>
					))
				}
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Liabilities</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentLiabilitiesSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Equity</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Equity</div>
					<div className="w-2/12 border border-gray2 p-3">{currentEquitySum + nonCurrentEquitySum}</div>
				</div>

				<p className="mt-5  font-medium">Current Equity</p>
				{
					currentEquity.map(equity => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{equity.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{equity.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Equity</div>
					<div className="w-2/12 border border-primary3 p-3">{currentEquitySum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Equity</p>
				{
					nonCurrentEquity.map(equity => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{equity.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{equity.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Equity</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentEquitySum}</div>
				</div>
				<br />

				<p className="mt-5 text-primary font-medium text-xl">Expenses</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Expenses</div>
					<div className="w-2/12 border border-gray2 p-3">{currentExpensesSum + nonCurrentExpensesSum}</div>
				</div>

				<p className="mt-5  font-medium">Current Expenses</p>
				{
					currentExpenses.map(expense => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{expense.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{expense.amount}
							</div>
						</div>
					))
				}
	
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Expenses</div>
					<div className="w-2/12 border border-primary3 p-3">{currentExpensesSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Expenses</p>
				{
					nonCurrentExpenses.map(expense => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{expense.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{expense.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Expenses</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentExpensesSum}</div>
				</div>
				<br />


				<p className="mt-5 text-primary font-medium text-xl">Incomes</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Incomes</div>
					<div className="w-2/12 border border-gray2 p-3">{currentIncomesSum + nonCurrentIncomesSum}</div>
				</div>

				<p className="mt-5  font-medium">Current Incomes</p>
				{
					currentIncomes.map(income => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{income.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{income.amount}
							</div>
						</div>
					))
				}
	
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Incomes</div>
					<div className="w-2/12 border border-primary3 p-3">{currentIncomesSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Incomes</p>
				{
					nonCurrentIncomes.map(income => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{income.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{income.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Incomes</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentIncomesSum}</div>
				</div>
				<br />

				<p className="mt-5 text-primary font-medium text-xl">Sales</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Sales</div>
					<div className="w-2/12 border border-gray2 p-3">{currentSalesSum + nonCurrentSalesSum}</div>
				</div>

				<p className="mt-5  font-medium">Current Sales</p>
				{
					currentSales.map(sale => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{sale.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{sale.amount}
							</div>
						</div>
					))
				}
	
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Sales</div>
					<div className="w-2/12 border border-primary3 p-3">{currentSalesSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Sales</p>
				{
					nonCurrentSales.map(sale => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{sale.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{sale.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Sales</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentSalesSum}</div>
				</div>
				<br />

				<p className="mt-5 text-primary font-medium text-xl">Stocks</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Stocks</div>
					<div className="w-2/12 border border-gray2 p-3">{currentStocksSum + nonCurrentStocksSum}</div>
				</div>

				<p className="mt-5  font-medium">Current Stocks</p>
				{
					currentStocks.map(stock => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{stock.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{stock.amount}
							</div>
						</div>
					))
				}
	
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Stocks</div>
					<div className="w-2/12 border border-primary3 p-3">{currentStocksSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Stocks</p>
				{
					nonCurrentStocks.map(stock => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{stock.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{stock.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Stocks</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentStocksSum}</div>
				</div>
				<br />

				<p className="mt-5 text-primary font-medium text-xl">Purchases</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Purchases</div>
					<div className="w-2/12 border border-gray2 p-3">{currentPurchasesSum + nonCurrentPurchasesSum}</div>
				</div>

				<p className="mt-5  font-medium">Current Purchases</p>
				{
					currentPurchases.map(pur => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{pur.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{pur.amount}
							</div>
						</div>
					))
				}
	
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Purchases</div>
					<div className="w-2/12 border border-primary3 p-3">{currentPurchasesSum}</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Purchases</p>
				{
					nonCurrentPurchases.map(pur => (
						<div className="mt-2 flex  border border-gray1">
							<div className="w-10/12 p-3 text-gray5">{pur.accountName}</div>
							<div className="w-2/12 border border-gray1 p-3 text-gray5">
								{" "}
								{pur.amount}
							</div>
						</div>
					))
				}

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Non Current Purchases</div>
					<div className="w-2/12 border border-primary3 p-3">{nonCurrentPurchasesSum}</div>
				</div>

				<br />

			</div>
		</>
	);
}

export default BalanceSheet;
