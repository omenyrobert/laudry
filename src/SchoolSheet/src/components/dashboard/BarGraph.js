import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function BarGraph() {
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Amy', 'June'],
    datasets: [
      {
        id: 1,
        label: '# of Red Votes',
        data: [12, 15, 3, 5, 2, 3],
        backgroundColor: '#FE7D06',
      },
      {
        id: 2,
        label: '# of Blue Votes',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: '#FE7D06',
      },
      {
        id: 3,
        label: '# of Green Votes',
        data: [3, 10, 13, 15, 21, 10],
        backgroundColor: '#193296',
      }
    ],
    responsive: true,
    }


    return (
    <div className='w-full'>

        <Bar data={data} />
  </div>
    )
}

export default BarGraph;