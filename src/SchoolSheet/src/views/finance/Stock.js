import React from "react";
import "../../assets/styles/main.css";
import StockTypes from "../../components/finance/StockTypes";
import StockComp from "../../components/finance/StockComp";

function Stock() {

	return (

				<div className="w-full">
					
					<div className="h-screen overflow-y-auto mt-2 w-full">
						<p className="text-primary text-xl font-semibold">
							Stock Management
						</p>
						<div className="flex mt-5">
							<div className="w-1/4 border-r-2 border-gray1 mr-5">
								
                                <StockTypes/>
							</div>
							<div className="w-3/4">
                            <StockComp/>
							</div>
						</div>
                        
					</div>
				</div>
			
	);
}

export default Stock;
