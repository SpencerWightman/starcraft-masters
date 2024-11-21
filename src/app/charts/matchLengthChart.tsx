"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import matchLengthResults from "../../../data/matchLengthResults.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
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

interface MatchLengthData {
  name: string;
  averageWinLength: number;
  averageLossLength: number;
  totalWins: number;
  totalLosses: number;
}

const MatchLengthChart: React.FC = () => {
  const [data, setData] = useState<MatchLengthData[]>([]);
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");

  useEffect(() => {
    const formattedData =
      chartType === "Players"
        ? matchLengthResults.players.map((item) => ({
            ...item,
            averageWinLength: parseFloat(item.averageWinLength),
            averageLossLength: parseFloat(item.averageLossLength),
          }))
        : matchLengthResults.matchups.map((item) => ({
            ...item,
            averageWinLength: parseFloat(item.averageWinLength),
            averageLossLength: parseFloat(item.averageLossLength),
          }));

    formattedData.sort((a, b) => b.averageWinLength - a.averageWinLength);
    setData(formattedData);
  }, [chartType]);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Average Win Length",
        data: data.map((item) => item.averageWinLength),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Average Loss Length",
        data: data.map((item) => item.averageLossLength),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
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
        text:
          chartType === "Players"
            ? "Average Win/Loss Match Length (Players)"
            : "Average Win/Loss Match Length (Matchups)",
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const index = context.dataIndex;
            const item = data[index];
            if (context.dataset.label === "Average Win Length") {
              return `Avg Win Length: ${item.averageWinLength} mins`;
            } else {
              return `Avg Loss Length: ${item.averageLossLength} mins`;
            }
          },
        },
      },
    },
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant={chartType === "Players" ? "contained" : "outlined"}
          onClick={() => setChartType("Players")}
          sx={{ mx: 1 }}
        >
          Players
        </Button>
        <Button
          variant={chartType === "Matchups" ? "contained" : "outlined"}
          onClick={() => setChartType("Matchups")}
          sx={{ mx: 1 }}
        >
          Matchups
        </Button>
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default MatchLengthChart;
