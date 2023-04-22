import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/styles/main.css";
import InvoicesList from "../../components/finance/InvoicesList";
import Invoice from "../../components/finance/InvoiceComp";
import Suppliers from "../../components/finance/Suppliers";

function Invoices() {

    return (

				<div className="w-full mr-2">
					<div className="rounded-md shadow-md   p-5 h-screen overflow-y-auto mt-2 w-full">
						<p className="text-primary text-xl font-semibold">
							Invoices
						</p>
						<div className="flex mt-5">
							<div className="w-7/12 border-r-2 border-gray1 mr-5">
								<InvoicesList/>
							</div>
							<div className="w-5/12">
								<Suppliers/>
							</div>
						</div>
					</div>
				</div>
	);
}

export default Invoices;
