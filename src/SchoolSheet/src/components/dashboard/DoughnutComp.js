import React, {useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DoughnutComp() {
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Amy', 'June'],

    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],
     
      },
    ],
    }


    return (
    <div className='flex justify-center items-center'>

<Doughnut className='w-3/4' options={{
          responsive: true,
          maintainAspectRatio: true,
        }} data={data} />
  </div>
    )
}

export default DoughnutComp;