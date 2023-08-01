import React from "react";
import "../../assets/styles/main.css";
import AssetsTypes from "../../components/finance/AssetsTypes";
import AssetsComp from "../../components/finance/AssetsComp";

function Assets() {
	return (
		<div className="w-full">
			<AssetsTypes />
			<AssetsComp />
		</div>
	);
}

export default Assets;
