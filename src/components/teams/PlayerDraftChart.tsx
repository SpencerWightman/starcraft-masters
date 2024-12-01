"use client";

import React from "react";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";

import data from "data/lowBaseResults.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  title: string;
  tooltipData: (index: number, datasetLabel: string, value: number) => string;
}

const LowBaseChart: React.FC<ChartProps> = ({
  labels,
  datasets,
  title,
  tooltipData,
}) => {
  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label;
            const value = context.raw as number;
            const index = context.dataIndex;
            return tooltipData(index, label || "", value);
          },
        },
      },
    },
  };

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ color: "#10b981", marginBottom: "1rem", textAlign: "center" }}
      >
        {title}
      </Typography>
      <Line data={chartData} options={options} />
    </div>
  );
};

const LowBaseCharts: React.FC = () => {
  const labels = data.players.map((item) => item.name);
  const datasets = [
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
  ];

  const tooltipData = (index: number, datasetLabel: string, value: number) => {
    const item = data.players[index];
    if (!item) {
      return `${datasetLabel}: ${value}% (No data available)`;
    }

    if (datasetLabel === "Win Percent") {
      return `${datasetLabel}: ${value}% (${item.twoBaseWins}/${item.totalWinGames} wins)`;
    } else if (datasetLabel === "Loss Percent") {
      return `${datasetLabel}: ${value}% (${item.twoBaseLosses}/${item.totalLossGames} losses)`;
    } else {
      return `${datasetLabel}: ${value}%`;
    }
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1100px",
        margin: "0 ",
        padding: "0px",
        backgroundColor: "#1f2937",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <LowBaseChart
        labels={labels}
        datasets={datasets}
        title=""
        tooltipData={tooltipData}
      />
    </div>
  );
};

export default LowBaseCharts;
