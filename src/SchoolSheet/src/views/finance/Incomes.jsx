import React, { useState } from "react";
import "../../assets/styles/main.css";
import IncomeTypes from "../../components/finance/IncomesTypesComp";
import IncomesComp from "../../components/finance/IncomeComp";

function Incomes() {

	return (

				<div className="w-full">
					
					<div className="h-screen overflow-y-auto mt-2 w-full">
						<p className="text-secondary text-xl font-semibold">
							Incomes
						</p>
					
								<IncomeTypes/>
								<IncomesComp/>
							</div>
						</div>
				
			
	);
}

export default Incomes;
