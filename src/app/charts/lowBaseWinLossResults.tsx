"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import lowBaseWinLossResults from "../../../data/lowBaseWinLossResults.json";
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

interface LowBaseWinLossData {
  name: string;
  winsPercentage: string;
  lossPercentage: string;
  twoBaseWins: number;
  totalWinGames: number;
  twoBaseLosses: number;
  totalLossGames: number;
}

interface ChartData {
  name: string;
  winPercentage: number;
  lossPercentage: number;
  difference: number;
  twoBaseWins: number;
  twoBaseLosses: number;
  totalLossGames: number;
  totalWinGames: number;
}

const LowBaseWinLossChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");

  useEffect(() => {
    const formattedData =
      chartType === "Players"
        ? lowBaseWinLossResults.players.map((item: LowBaseWinLossData) => {
            const winPercentage =
              (item.twoBaseWins / item.totalWinGames) * 100 || 0;
            const lossPercentage =
              (item.twoBaseLosses / item.totalLossGames) * 100 || 0;
            const difference = Math.abs(winPercentage - lossPercentage);

            return {
              name: item.name,
              winPercentage: parseFloat(winPercentage.toFixed(2)),
              lossPercentage: parseFloat(lossPercentage.toFixed(2)),
              difference: parseFloat(difference.toFixed(2)),
              twoBaseWins: item.twoBaseWins,
              twoBaseLosses: item.twoBaseLosses,
              totalWinGames: item.totalWinGames,
              totalLossGames: item.totalLossGames,
            };
          })
        : lowBaseWinLossResults.matchups.map((item: LowBaseWinLossData) => {
            const winPercentage =
              (item.twoBaseWins / item.totalWinGames) * 100 || 0;
            const lossPercentage =
              (item.twoBaseLosses / item.totalLossGames) * 100 || 0;
            const difference = Math.abs(winPercentage - lossPercentage);

            return {
              name: item.name,
              winPercentage: parseFloat(winPercentage.toFixed(2)),
              lossPercentage: parseFloat(lossPercentage.toFixed(2)),
              difference: parseFloat(difference.toFixed(2)),
              twoBaseWins: item.twoBaseWins,
              twoBaseLosses: item.twoBaseLosses,
              totalWinGames: item.totalWinGames,
              totalLossGames: item.totalLossGames,
            };
          });

    formattedData.sort((a, b) => b.winPercentage - a.winPercentage);
    setData(formattedData);
  }, [chartType]);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Win Percent",
        data: data.map((item) => item.winPercentage),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Loss Percent",
        data: data.map((item) => item.lossPercentage),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Difference Percent",
        data: data.map((item) => item.difference),
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
        text:
          chartType === "Players"
            ? "Low Base Win/Loss Percentages (Players)"
            : "Low Base Win/Loss Percentages (Matchups)",
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
            const item = data[index];

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

export default LowBaseWinLossChart;
