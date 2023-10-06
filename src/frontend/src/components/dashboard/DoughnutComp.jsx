import React, {useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DoughnutComp() {
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

<Doughnut className='w-3/4' options={{
          responsive: true,
          maintainAspectRatio: true,
        }} data={data} />
  </div>
    )
}

export default DoughnutComp;