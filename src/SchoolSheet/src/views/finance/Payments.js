import React from "react";
import PaymentTypes from "../../components/finance/PaymentTypes";
import AddPayments from "../../components/finance/AddPayments";


function Payments() {

	return (
		<>
			<div className="flex">
				<div className="w-2/12">
					<PaymentTypes />
				</div>
				<div className="w-10/12 ml-5">
					<AddPayments/>
				</div>
			</div>
		</>
	);
}
export default Payments;
