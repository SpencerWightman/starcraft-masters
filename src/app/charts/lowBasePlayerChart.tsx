"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import data from "data/lowBaseResults.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TooltipItem,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LowBasePlayerChart: React.FC = () => {
  const chartData = {
    labels: data.players.map((item) => item.name),
    datasets: [
      {
        label: "Win Percent",
        data: data.players.map((item) => item.twoBaseWinPercent),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Loss Percent",
        data: data.players.map((item) => item.twoBaseLossPercent),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Difference Percent",
        data: data.players.map((item) => item.diffPercent),
        borderColor: "rgba(200, 200, 200, 1)",
        backgroundColor: "rgba(200, 200, 200, 1)",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
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
        text: "<= 2 Base Win/Loss Percentages (Players)",
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label;
            const value = context.raw as number;
            const index = context.dataIndex;
            const item = data.players[index];

            if (!item) {
              return `${label}: ${value}% (No data available)`;
            }

            if (label === "Win Percent") {
              return `${label}: ${value}% (${item.twoBaseWins}/${item.totalWinGames} wins)`;
            } else if (label === "Loss Percent") {
              return `${label}: ${value}% (${item.twoBaseLosses}/${item.totalLossGames} losses)`;
            } else {
              return `${label}: ${value}%`;
            }
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LowBasePlayerChart;
