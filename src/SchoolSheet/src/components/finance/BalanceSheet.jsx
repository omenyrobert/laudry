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
	const [currentEquity, setCurrentEquity] = useState([]);
	const [nonCurrentEquity, setNonCurrentEquity] = useState([]);
	const [currentAssetsSum, setCurrentAssetsSum] = useState(0);
	const [nonCurrentAssetsSum, setNonCurrentAssetsSum] = useState(0);
	const [currentLiabilitiesSum, setCurrentLiabilitiesSum] = useState(0);
	const [nonCurrentLiabilitiesSum, setNonCurrentLiabilitiesSum] = useState(0);
	const [currentEquitySum, setCurrentEquitySum] = useState(0);
	const [nonCurrentEquitySum, setNonCurrentEquitySum] = useState(0);


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
				currentEquity: accounts.filter(
					(account) => account.accountType === "Equity" && account.subType === "CURRENT"
				  ),
				nonCurrentEquity: accounts.filter(
					(account) => account.accountType === "Equity" && account.subType === "NON_CURRENT"
				),
			  };
		  
			  setCurrentLiabilities(groupedAccounts.currentLiabilities);
			  setNonCurrentLiabilities(groupedAccounts.nonCurrentLiabilities);
			  setCurrentAssets(groupedAccounts.currentAssets);
			  setNonCurrentAssets(groupedAccounts.nonCurrentAssets);
			  setCurrentEquity(groupedAccounts.currentEquity);
			  setNonCurrentEquity(groupedAccounts.nonCurrentEquity);
		  
			  // Calculate the sums
			  const currentAssetsSum = groupedAccounts.currentAssets.reduce((total, asset) => total + asset.amount, 0);
			  const nonCurrentAssetsSum = groupedAccounts.nonCurrentAssets.reduce((total, asset) => total + asset.amount, 0);
			  const currentLiabilitiesSum = groupedAccounts.currentLiabilities.reduce((total, liability) => total + liability.amount, 0);
			  const nonCurrentLiabilitiesSum = groupedAccounts.nonCurrentLiabilities.reduce((total, liability) => total + liability.amount, 0);
			  const currentEquitySum = groupedAccounts.currentAssets.reduce((total, equity) => total + equity.amount, 0);
			  const nonCurrentEquitySum = groupedAccounts.nonCurrentAssets.reduce((total, equity) => total + equity.amount, 0);


		  
			  setCurrentAssetsSum(currentAssetsSum);
			  setNonCurrentAssetsSum(nonCurrentAssetsSum);
			  setCurrentLiabilitiesSum(currentLiabilitiesSum);
			  setNonCurrentLiabilitiesSum(nonCurrentLiabilitiesSum);
			  setCurrentEquitySum(currentEquitySum);
			  setNonCurrentEquitySum(nonCurrentEquitySum);
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
						<p className="text-secondary text-xl font-bold">Balance Sheet </p>
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

				<div  id="ledger-table">
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
									{asset.amount?.toLocaleString()}
								</div>
							</div>
						))
					}
		
					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Current Assets</div>
						<div className="w-2/12 border border-primary3 p-3">{currentAssetsSum?.toLocaleString()}</div>
					</div>

					<br />
					<p className="mt-5  font-medium">Non Current Assets</p>
					{
						nonCurrentAssets.map(asset => (
							<div className="mt-2 flex  border border-gray1">
								<div className="w-10/12 p-3 text-gray5">{asset.accountName}</div>
								<div className="w-2/12 border border-gray1 p-3 text-gray5">
									{" "}
									{asset.amount?.toLocaleString()}
								</div>
							</div>
						))
					}

					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Non Current Assets</div>
						<div className="w-2/12 border border-primary3 p-3">{nonCurrentAssetsSum?.toLocaleString()}</div>
					</div>

					<br />
					<p className="mt-5 text-primary font-medium text-xl">Liabilities</p>
					<div className="mt-3 flex bg-primary3 text-primary border border-gray2">
						<div className="w-10/12 p-3">Total Liabilities</div>
						<div className="w-2/12 border border-gray2 p-3">{(currentLiabilitiesSum + nonCurrentLiabilitiesSum)?.toLocaleString()}</div>
					</div>
					<p className="mt-5  font-medium">Current Liabilities</p>
					{
						currentLiabilities.map(liability => (
							<div className="mt-2 flex  border border-gray1">
								<div className="w-10/12 p-3 text-gray5">{liability.accountName}</div>
								<div className="w-2/12 border border-gray1 p-3 text-gray5">
									{" "}
									{liability.amount?.toLocaleString()}
								</div>
							</div>
						))
					}

					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Current Liabilities</div>
						<div className="w-2/12 border border-primary3 p-3">{currentLiabilitiesSum?.toLocaleString()}</div>
					</div>

					<br />
					<p className="mt-5  font-medium">Non Current Liabilities</p>
					{
						nonCurrentLiabilities.map(liability => (
							<div className="mt-2 flex  border border-gray1">
								<div className="w-10/12 p-3 text-gray5">{liability.accountName}</div>
								<div className="w-2/12 border border-gray1 p-3 text-gray5">
									{" "}
									{liability.amount?.toLocaleString()}
								</div>
							</div>
						))
					}
					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Non Current Liabilities</div>
						<div className="w-2/12 border border-primary3 p-3">{nonCurrentLiabilitiesSum?.toLocaleString()}</div>
					</div>

					<br />
					<p className="mt-5  font-medium">Equity</p>
					<div className="mt-3 flex bg-primary text-white border border-gray2">
						<div className="w-10/12 p-3">Total Equity</div>
						<div className="w-2/12 border border-gray2 p-3">{(currentEquitySum + nonCurrentEquitySum)?.toLocaleString()}</div>
					</div>

					<p className="mt-5  font-medium">Current Equity</p>
					{
						currentEquity.map(equity => (
							<div className="mt-2 flex  border border-gray1">
								<div className="w-10/12 p-3 text-gray5">{equity.accountName}</div>
								<div className="w-2/12 border border-gray1 p-3 text-gray5">
									{" "}
									{equity.amount?.toLocaleString()}
								</div>
							</div>
						))
					}

					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Current Equity</div>
						<div className="w-2/12 border border-primary3 p-3">{currentEquitySum?.toLocaleString()}</div>
					</div>

					<br />
					<p className="mt-5  font-medium">Non Current Equity</p>
					{
						nonCurrentEquity.map(equity => (
							<div className="mt-2 flex  border border-gray1">
								<div className="w-10/12 p-3 text-gray5">{equity.accountName}</div>
								<div className="w-2/12 border border-gray1 p-3 text-gray5">
									{" "}
									{equity.amount?.toLocaleString()}
								</div>
							</div>
						))
					}

					<div className="flex bg-primary3 text-primary border border-primary3">
						<div className="w-10/12 p-3">Total Non Current Equity</div>
						<div className="w-2/12 border border-primary3 p-3">{nonCurrentEquitySum?.toLocaleString()}</div>
					</div>
					<br />

					<div className="mt-3 flex bg-primary text-white border border-gray2">
						<div className="w-10/12 p-3">Total </div>
						<div className="w-2/12 border border-gray2 p-3">{
							(currentLiabilitiesSum + nonCurrentLiabilitiesSum + currentEquitySum + nonCurrentEquitySum)?.toLocaleString()
						}</div>
					</div>
					<br />
					<br />
				</div>
			</div>
		</>
	);
}

export default BalanceSheet;
