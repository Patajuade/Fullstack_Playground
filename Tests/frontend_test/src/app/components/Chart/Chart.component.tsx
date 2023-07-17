"use client";
import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({
  chartData,
}: {
  chartData: { label: string; data: number, title: string, datasetName: string }[];
}) => {
  const data = {
    labels: chartData.map((data) => data.label),
    datasets: [
      {
        label: chartData[0].datasetName,
        data: chartData.map((data) => data.data),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartData[0].title,
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
export default Chart;
