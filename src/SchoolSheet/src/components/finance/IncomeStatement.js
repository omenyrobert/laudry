import React from "react";

function IncomeStatement() {
	return (
		<>
			<div className="bg-white p-3 h-[82vh] mt-2 border border-gray2 shadow rounded">
                <p className="text-secondary text-xl font-bold">Income Statement </p>

				<p className="mt-5 text-primary text-xl  font-medium">Incomes</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Land in Gulu</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Cash</div>
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
				<p className="mt-5 text-primary text-xl  font-medium">Expenses</p>
				<div className="mt-2 flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Rent</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>
				<div className="flex  border border-gray1">
					<div className="w-10/12 p-3 text-gray5">Water Bills</div>
					<div className="w-2/12 border border-gray1 p-3 text-gray5">
						{" "}
						12,000,000
					</div>
				</div>

				<div className="flex bg-primary3 text-primary border border-primary3">
					<div className="w-10/12 p-3">Total Current Assets</div>
					<div className="w-2/12 border border-primary3 p-3"> 5,500,000</div>
				</div>
				<div className="flex bg-primary text-white mt-5">
					<div className="border border-gray1 p-3  w-10/12">Net Profit</div>
					
					<div className="border border-gray1 p-3 w-2/12">24,890,000</div>
				</div>
            </div>
		</>
	);
}

export default IncomeStatement