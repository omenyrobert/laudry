import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/styles/main.css";
import OrdersComp from "../../components/finance/OrdersComp"
import ExternalInvoicesList from "../../components/finance/ExternalInvoicesList"

function ExternalInvoice() {

	return (
		<div className="h-screen overflow-hidden bg-gray10">
			<div className="flex w-full">
				<div className="w-1/12">
					<Sidebar />
				</div>
				<div className="w-11/12 -ml-3">
					<Navbar />
				
					<div className="rounded-md shadow-md bg-white  p-5 h-screen overflow-y-auto mt-2 w-full">
						<p className="text-primary text-xl font-semibold">
							External Invoices
						</p>
						<div className="flex mt-5">
							<div className="w-1/2 border-r-2 border-gray1 mr-5">
								
								<OrdersComp/>
							</div>
							<div className="w-1/2">
							
								<ExternalInvoicesList/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExternalInvoice;
