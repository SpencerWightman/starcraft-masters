"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import matchLengthResults from "data/matchLengthResults.json";
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
  medianWinLength: number;
  medianLossLength: number;
  strMedianWinLength: string;
  strMedianLossLength: string;
  totalWins: number;
  totalLosses: number;
}

const MatchLengthChart: React.FC = () => {
  const [data, setData] = useState<MatchLengthData[]>([]);
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");

  // calculate differences in sec for line
  useEffect(() => {
    const formattedData =
      chartType === "Players"
        ? matchLengthResults.players.map((item) => ({
            ...item,
            medianWinLength: parseFloat(item.medianWinLength),
            medianLossLength: parseFloat(item.medianLossLength),
          }))
        : matchLengthResults.matchups.map((item) => ({
            ...item,
            medianWinLength: parseFloat(item.medianWinLength),
            medianLossLength: parseFloat(item.medianLossLength),
          }));

    formattedData.sort((a, b) => b.medianWinLength - a.medianWinLength);
    setData(formattedData);
  }, [chartType]);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Median Win Length",
        data: data.map((item) => item.medianWinLength),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Median Loss Length",
        data: data.map((item) => item.medianLossLength),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      // add difference
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
            ? "Median Win/Loss Match Length (Players)"
            : "Median Win/Loss Match Length (Matchups)",
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            // add differences line
            // add total wins/losses
            const index = context.dataIndex;
            const item = data[index];
            if (context.dataset.label === "Median Win Length") {
              return `Median Win: ${item.strMedianWinLength}`;
            } else {
              return `Median Loss: ${item.strMedianLossLength}`;
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
