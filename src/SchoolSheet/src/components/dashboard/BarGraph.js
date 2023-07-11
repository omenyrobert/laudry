import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function BarGraph({ classes }) {
  // classes is an array of objects like: {id: 1, class: "JSS 1", numberOfStudents: 9}
  const [chartData, setChartData] = useState(null)
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

  useEffect(() => {
    const newChartData = {
      labels: classes.map((item) => item.class),
      datasets: [
        {
          label: 'Number of Students',
          data: classes.map((item) => item.numberOfStudents),
          backgroundColor: '#193296',
        }
      ],
      responsive: true,
    }
    setChartData(newChartData);
  }, [classes]);


  return (
    <div className='w-full'>

      {
        chartData && <Bar data={chartData} />
      }
    </div>
  )
}

export default BarGraph;