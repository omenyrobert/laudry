import React, { useState } from "react";
import "../../assets/styles/main.css";
import IncomeTypes from "../../components/finance/IncomesTypesComp";
import IncomesComp from "../../components/finance/IncomeComp";

function Incomes() {

	return (

				<div className="w-full">
					
					<div className="h-screen overflow-y-auto mt-2 w-full">
						<p className="text-primary text-xl font-semibold">
							Incomes
						</p>
						<div className="flex mt-5">
							<div className="w-2/12 border-r-2 border-gray1 mr-5">
								<IncomeTypes/>
							</div>
							<div className="w-10/12">
								<IncomesComp/>
							</div>
						</div>
					</div>
				</div>
			
	);
}

export default Incomes;
