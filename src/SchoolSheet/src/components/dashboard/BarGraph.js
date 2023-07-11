import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function BarGraph({ classes }) {
	// classes is an array of objects like: {id: 1, class: "JSS 1", numberOfStudents: 9}
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const newChartData = {
			labels: classes.map((item) => item.class),
			// options: {
			// 	scales: {
			// 		xAxes: [
			// 			{
      //         barPercentage: 0.9
			// 			},
			// 		],
			// 	},
			// },
			datasets: [
				{
					label: "Number of Students",
					data: classes.map((item) => item.numberOfStudents),
					backgroundColor: "#FE7D06",
				},
			],
			responsive: true,
		};
		setChartData(newChartData);
	}, [classes]);

	return <div className="w-full">{chartData && <Bar data={chartData} />}</div>;
}

export default BarGraph;
