import React from "react";

function BalanceSheet() {
	return (
		<>
			<div className="bg-white p-3 h-[85vh] overflow-y-auto mt-2 border border-gray2 shadow rounded">
				<p className="text-secondary text-xl font-bold">Balance Sheet </p>

				<p className="mt-5 text-primary font-medium text-xl">Assets</p>
				<div className="mt-3 flex bg-primary text-white border border-gray2">
					<div className="w-10/12 p-3">Total Assets</div>
					<div className="w-2/12 border border-gray2 p-3"> 12,000,000</div>
				</div>

				<p className="mt-5  font-medium">Current Assets</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Assets</div>
					<div className="w-2/12 border border-primary3 p-3"> 5,500,000</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Assets</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Assets</div>
					<div className="w-2/12 border border-primary3 p-3"> 5,500,000</div>
				</div>

				<br />
				<p className="mt-5 text-primary font-medium text-xl">Liabilities</p>
				<div className="mt-3 flex bg-primary3 text-primary border border-gray2">
					<div className="w-10/12 p-3">Total Liabilities</div>
					<div className="w-2/12 border border-gray2 p-3"> 32,000,000</div>
				</div>
				<p className="mt-5  font-medium">Current Liabilities</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>

				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Liabilities</div>
					<div className="w-2/12 border border-primary3 p-3"> 5,500,000</div>
				</div>

				<br />
				<p className="mt-5  font-medium">Non Current Liabilities</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Liabilities</div>
					<div className="w-2/12 border border-primary3 p-3"> 5,500,000</div>
				</div>

				<br />
                <p className="mt-5  font-medium">Equity</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				
				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Liabilities</div>
					<div className="w-2/12 border border-primary3 p-3"> 5,500,000</div>
				</div>
                <br/>
                <div className="flex bg-primary text-white border border-primary3">
					<div className="w-10/12 p-3">Total  Liabilities + Equity</div>
					<div className="w-2/12 border border-primary3 p-3"> 15,500,000</div>
				</div>
			</div>
		</>
	);
}

export default BalanceSheet;
