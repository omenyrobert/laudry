import React, { useState, lazy, Suspense } from "react";
import "../../assets/styles/main.css";
const TrialBalance = lazy(() =>
	import("../../components/finance/TrialBalance")
);

const BalanceSheet = lazy(() =>
	import("../../components/finance/BalanceSheet")
);

const IncomeStatement = lazy(() =>
	import("../../components/finance/IncomeStatement")
);

const CashFlow = lazy(() => import("../../components/finance/CashFlow"));

const GeneralLedger = lazy(() =>
	import("../../components/finance/GeneralLedger")
);

function Reports() {
	const [bal, setBal] = useState(true);
	const [income, setIncome] = useState(false);
	const [trial, setTrail] = useState(false);
	const [gen, setGen] = useState(false);
	const [cash, setCash] = useState(false);

	const showBal = () => {
		setBal(true);
		setIncome(false);
		setGen(false);
		setCash(false);
		setTrail(false);
	};

	const showTrial = () => {
		setBal(false);
		setIncome(false);
		setGen(false);
		setCash(false);
		setTrail(true);
	};

	const showIncome = () => {
		setBal(false);
		setIncome(true);
		setGen(false);
		setCash(false);
		setTrail(false);
	};

	const showGen = () => {
		setBal(false);
		setIncome(false);
		setGen(true);
		setCash(false);
		setTrail(false);
	};

	const showCash = () => {
		setBal(false);
		setIncome(false);
		setGen(false);
		setCash(true);
		setTrail(false);
	};

	return (
		<>
			<div className="bg-white flex text-primary font-semibold border rounded border-gray2 shadow">
				<div
					onClick={showBal}
					className={
						bal
							? "w-1/4 cursor-pointer p-3  bg-primary text-white"
							: "w-1/4 cursor-pointer p-3  text-primary"
					}
				>
					Balance Sheet
				</div>
				<div
					onClick={showTrial}
					className={
						trial
							? "w-1/4 cursor-pointer p-3  bg-primary text-white"
							: "w-1/4 cursor-pointer p-3  text-primary"
					}
				>
					Trial Balance
				</div>
				<div
					onClick={showIncome}
					className={
						income
							? "w-1/4 cursor-pointer p-3  bg-primary text-white"
							: "w-1/4 cursor-pointer p-3  text-primary"
					}
				>
					Income Statement(Profit & Loss)
				</div>
				<div
					onClick={showGen}
					className={
						gen
							? "w-1/4 cursor-pointer p-3  bg-primary text-white"
							: "w-1/4 cursor-pointer p-3  text-primary"
					}
				>
					General Ledger
				</div>
				<div
					onClick={showCash}
					className={
						cash
							? "w-1/4 cursor-pointer p-3  bg-primary text-white"
							: "w-1/4 cursor-pointer p-3  text-primary"
					}
				>
					Cash Flow
				</div>
				
			</div>

			{bal ? (
				<Suspense>
					<BalanceSheet />
				</Suspense>
			) : null}

			{trial ? (
				<Suspense>
					<TrialBalance />
				</Suspense>
			) : null}

			{income ? (
				<Suspense>
					<IncomeStatement />
				</Suspense>
			) : null}

			{gen ? (
				<Suspense>
					<GeneralLedger />
				</Suspense>
			) : null}
			{cash ? (
				<Suspense>
					<CashFlow />
				</Suspense>
			) : null}
		</>
	);
}

export default Reports;
