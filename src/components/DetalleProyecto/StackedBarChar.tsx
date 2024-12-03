import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StackedBarCharProps {
  data: {
    name: string;
    score: {
      creativeProposal: number;
      experience: number;
      budget: number;
    };
  }[];
}

const StackedBarChar: React.FC<StackedBarCharProps> = ({ data }) => {
  const companyNameList = data.map((item) => item.name);
  const chartData = {
    creativeProposal: { label: "Creatividad", backgroundColor: "#829bd1" },
    budget: { label: "Presupuesto", backgroundColor: "#e7a777" },
    experience: { label: "Experiencia", backgroundColor: "#c0c0c0" },
  };

  const datasets = Object.keys(chartData).map((key) => {
    return {
      label: chartData[key].label,
      data: data.map((item) => item.score[key]),
      backgroundColor: chartData[key].backgroundColor,
    };
  });

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2 className="text-center">Gráfico de Barras Apiladas</h2>
      <Bar
        data={{
          labels: companyNameList,
          datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default StackedBarChar;
