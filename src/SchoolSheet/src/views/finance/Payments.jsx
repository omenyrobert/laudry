import React from "react";
import PaymentTypes from "../../components/finance/PaymentTypes";
import AddPayments from "../../components/finance/AddPayments";

function Payments() {
	return (
		<>
			<div>
				<PaymentTypes />
				<AddPayments />
			</div>
		</>
	);
}
export default Payments;
