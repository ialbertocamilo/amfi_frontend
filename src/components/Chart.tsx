// components/Chart.tsx
import { getProjects } from '@/api/projectApi';
import { ProjectStatus } from '@/mappers/project.mapper';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart: React.FC = () => {
  const [projectStats, setProjectStats] = useState({
    [ProjectStatus.Draft]: 0,
    [ProjectStatus.InProgress]: 0,
    [ProjectStatus.Paused]: 0,
    [ProjectStatus.Closed]: 0,
    [ProjectStatus.Finished]: 0,
  });

  useEffect(() => {
    const fetchProjectStats = async () => {
      const projects = await getProjects();
      if (projects) {
        const stats = projects.reduce((acc: any, project: any) => {
          acc[project.status] = (acc[project.status] || 0) + 1;
          return acc;
        }, {});
        setProjectStats(stats);
      }
    };
    fetchProjectStats();
  }, []);

  const data = {
    labels: ['En Progreso', 'Pausado', 'Cerrado', 'Terminado'],
    datasets: [
      {
        label: 'Proyectos por Estado',
        data: [
          projectStats[ProjectStatus.Draft] || 0,
          projectStats[ProjectStatus.InProgress] || 0,
          projectStats[ProjectStatus.Paused] || 0,
          projectStats[ProjectStatus.Closed] || 0,
          projectStats[ProjectStatus.Finished] || 0,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',  // Yellow for Draft
          'rgba(75, 192, 192, 0.5)',   // Green for InProgress
          'rgba(255, 159, 64, 0.5)',   // Orange for Paused
          'rgba(255, 99, 132, 0.5)',   // Red for Closed
          'rgba(54, 162, 235, 0.5)',   // Blue for Finished
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribución de Proyectos por Estado',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;