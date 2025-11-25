import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function BarGraph({ mostOrderItems }) {
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const labels = mostOrderItems?.map((stock) => {
			return stock?.itemName;
		});

		const data = mostOrderItems?.map((stock) => {
			return stock?.totalQty;
		});

		setChartData({
			labels: labels,
			datasets: [
				{
					label: "Stock",
					data: data,
					backgroundColor: "#01B763",
				},
			],
		});
	}, [mostOrderItems]);




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

	return <div className="w-full">{
		chartData === null ? (
			<div className="flex justify-center items-center h-full">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
			</div>
		) : (
			<Bar
				data={chartData}
				options={{
					plugins: {
						legend: {
							display: false,
						},
					},
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				}}
			/>
		)
	}</div>;
}

export default BarGraph;
