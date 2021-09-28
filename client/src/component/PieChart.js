import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart(props) {
    const tasks = props.allTask.map(task => {
        return task.task
    })

    const durations = props.allTask.map(task => {
        return task.duration
    })

    const data = {
        labels: tasks,
        datasets: [
          {
            label: '# of time spent',
            data: durations,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',     
              'rgba(255, 176, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(196, 231, 255, 0.2)',
              'rgba(54, 235, 126, 0.2)',
              'rgba(92, 113, 128, 0.2)',
              'rgba(178, 147, 125, 0.2)',
              'rgba(0, 42, 100, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',      
              'rgba(255, 176, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(196, 231, 255, 1)',
              'rgba(54, 235, 126, 1)',
              'rgba(92, 113, 128, 1)',
              'rgba(178, 147, 125, 1)',
              'rgba(0, 42, 100, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };  
    
      return (
        <>
        <Pie data={data} />
        </>
      )
} 


export default PieChart;