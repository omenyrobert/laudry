import React, { useState } from "react";

import "../../assets/styles/main.css";
import ExpensesComp from "../../components/finance/ExpensesComp";
import ExpensesTypesComp from "../../components/finance/ExpensesTypesComp";

function Expenses() {
	return (
		<div className="w-full">
			<div className="p-5 h-screen overflow-y-auto mt-2 w-full">
				<p className="text-primary text-xl font-semibold">Expenses</p>
				<div className="flex mt-5">
					<div className="w-2/12 border-r-2 border-gray1 mr-5">
						<ExpensesTypesComp />
					</div>
					<div className="w-10/12">
						<ExpensesComp />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Expenses;
