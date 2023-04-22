import React from "react";
import "../../assets/styles/main.css";
import AssetsTypes from "../../components/finance/AssetsTypes";
import AssetsComp from "../../components/finance/AssetsComp"


function Assets() {

	return (

				<div className="w-full">
					
					<div className="h-screen overflow-y-auto mt-2 w-full">
						<p className="text-primary text-xl font-semibold">
							Assets
						</p>
						<div className="flex mt-5">
							<div className="w-3/12 border-r-2 border-gray1 mr-5">
								<AssetsTypes/>
							</div>
							<div className="w-9/12">
								<AssetsComp/>
							</div>
						</div>
					</div>
				</div>
			
	);
}

export default Assets;
