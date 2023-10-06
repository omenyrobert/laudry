import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function BarGraph() {
	// classes is an array of objects like: {id: 1, class: "JSS 1", numberOfStudents: 9}
	const data = {
		labels: ['Paint', 'Cement', 'Wire', 'Tiles', 'Nails', 'Glass'],
		datasets: [
			{
				id: 1,
				label: 'Most Bought Products',
				data: [12, 15, 3, 5, 2, 3],
				backgroundColor: '#149A1A',
			},

		],
		responsive: true,
	}

	return <div className="w-full"><Line data={data} /></div>;
}

export default BarGraph;
