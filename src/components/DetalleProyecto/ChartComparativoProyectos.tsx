// components/Chart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComparativoProyectos: React.FC = () => {
  const data = {
    labels: ['10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k'],
    datasets: [
      {
        label: 'Ventas',
        data: [20, 30, 40, 50, 60, 50, 40, 30, 60, 50, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Ganancias',
        data: [30, 40, 50, 60, 70, 60, 50, 40, 70, 60, 50],
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', position: 'relative' }}>
            <h1 style={{ position: 'absolute', top: '10px', left: '20px', margin: 0, fontWeight: 'bold', fontSize: '24px' }}>Resumen</h1>
      <div style={{ paddingTop: '40px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComparativoProyectos;