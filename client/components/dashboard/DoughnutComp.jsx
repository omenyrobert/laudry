import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DoughnutComp({ unSettled }) {
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    const labels = unSettled.map((account) => {
      return account.customer.name;
    });

    const data = unSettled.map((account) => {
      return account.balance;
    });

    const backgroundColor = unSettled.map((account) => {
      // generate random color
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return '#' + randomColor;
    });

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Unsettled Accounts',
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    });
  }, [unSettled]);

  const data = {
    labels: ['John Robert', 'James Mugume', 'Akao Teddy', 'Muhammed Kasujja'],

    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],

      },
    ],
  }


  return (
    <div className='flex justify-center items-center'>

      {
        chartData === null ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Doughnut className='w-3/4' options={{
            responsive: true,
            maintainAspectRatio: true,
          }} data={chartData} />
        )
      }
    </div>
  )
}

export default DoughnutComp;