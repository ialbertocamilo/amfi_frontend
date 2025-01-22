import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Budget } from "@/api/interface/api.interface";
import { formatToCurrency, formatToMxn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BudgetBarChartProps {
  budget: Budget;
}

const BudgetBarChart: React.FC<BudgetBarChartProps> = ({ budget }) => {
  const addEmptyData = (
    array: string[] | number[],
    quantity: number,
  ): string[] | number[] => {
    const fillValue = typeof array[0] === "number" ? 0 : "";

    let emptyData = Array(quantity).fill(fillValue);

    return [...emptyData, ...array, ...emptyData];
  };

  const FILL_NUMBER = 5;

  const keys = [
    "crew",
    "preAndPro",
    "talent",
    "equipment",
    "location",
    "travel",
    "stillPhotography",
    "postProduction",
    "financing",
    "insurance",
    "overhead",
    "markUp",
  ];
  const labels = [
    "Personal",
    "Pre y pro",
    "Talento",
    "Equipo",
    "Locación",
    "Viajes",
    "Foto fija",
    "Post producción",
    "Financiamiento",
    "Seguros",
    "Overhead",
    "Mark Up",
  ];
  const colors = [
    "#6EA1B0",
    "#648775",
    "#F5DD81",
    "#C4827E",
    "#929292",
    "#867FC0",
    "#7EADBA",
    "#759886",
    "#F7E191",
    "#CA918C",
    "#A1A1A0",
    "#9790CA",
  ];

  const budgetData = keys.map((key) => budget[key]);
  const totalBudget = budgetData.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: addEmptyData(labels, FILL_NUMBER) as string[],

    datasets: [
      {
        label: "",
        data: addEmptyData(budgetData, FILL_NUMBER),
        backgroundColor: addEmptyData(colors, FILL_NUMBER) as string[],
        borderColor: "#ffffff",
        borderWidth: 1,
        maxBarThickness: 24,
        barPercentage: 0.9,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$ ${value}`, // Format y-axis labels as currency
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          callback: (value) => ``,
        },
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
      <div className="flex items-center space-x-4 flex-wrap justify-center">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              style={{ backgroundColor: colors[index] }}
              className={`w-2 h-2 block flex-shrink-0`}
            ></span>
            <span className="text-sm text-gray-500">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-lg font-normal text-gray-700 text-center pt-2">
        Presupuesto Total: {formatToMxn(totalBudget)}
      </p>
    </>
  );
};

export default BudgetBarChart;
