"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import lowBaseWinLossResults from "../../../data/lowBaseResults.json";
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

interface LowBaseWinLossPlayerData {
  name: string;
  winsPercentage: string;
  lossPercentage: string;
  twoBaseWins: number;
  totalWinGames: number;
  twoBaseLosses: number;
  totalLossGames: number;
}

interface LowBaseWinLossRaceData {
  race: string;
  winsPercentage: string;
  lossPercentage: string;
  winsVsTerranPercentage: string;
  winsVsZergPercentage: string;
  winsVsProtossPercentage: string;
  lossVsTerranPercentage: string;
  lossVsZergPercentage: string;
  lossVsProtossPercentage: string;
  totalLossesVsProtoss: number;
  totalLossesVsZerg: number;
  totalLossesVsTerran: number;
  totalWinsVsZerg: number;
  totalWinsVsTerran: number;
  totalWinsVsProtoss: number;
  twoBaseWins: number;
  totalWinGames: number;
  twoBaseLosses: number;
  totalLossGames: number;
  twoBaseWinsVsProtoss: number;
  twoBaseWinsVsTerran: number;
  twoBaseWinsVsZerg: number;
  twoBaseLossesVsProtoss: number;
  twoBaseLossesVsTerran: number;
  twoBaseLossesVsZerg: number;
}

interface ChartData {
  name: string;
  winsPercentage: number;
  lossPercentage: number;
  difference: number;
  twoBaseWins: number;
  twoBaseLosses: number;
  totalLossGames: number;
  totalWinGames: number;
  race?: string;
  vsZergDifference?: number;
  vsProtossDifference?: number;
  vsTerranDifference?: number;
  protossVsZergDifference?: number;
  protossVsTerranDifference?: number;
  zergVsTerranDifference?: number;
  zergVsProtossDifference?: number;
  terranVsProtossDifference?: number;
  terranVsZergDifference?: number;
  winsVsTerranPercentage?: string;
  winsVsZergPercentage?: string;
  winsVsProtossPercentage?: string;
  lossVsTerranPercentage?: string;
  lossVsZergPercentage?: string;
  lossVsProtossPercentage?: string;
  totalLossesVsProtoss?: number;
  totalLossesVsZerg?: number;
  totalLossesVsTerran?: number;
  totalWinsVsZerg?: number;
  totalWinsVsTerran?: number;
  totalWinsVsProtoss?: number;
  twoBaseWinsVsProtoss?: number;
  twoBaseWinsVsTerran?: number;
  twoBaseWinsVsZerg?: number;
  twoBaseLossesVsProtoss?: number;
  twoBaseLossesVsTerran?: number;
  twoBaseLossesVsZerg?: number;
}

const LowBaseWinLossChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");

  useEffect(() => {
    const formattedData =
      chartType === "Players"
        ? lowBaseWinLossResults.players.map(
            (item: LowBaseWinLossPlayerData) => {
              const difference = Math.abs(
                parseFloat(item.winsPercentage) -
                  parseFloat(item.lossPercentage)
              );

              return {
                name: item.name,
                winsPercentage: parseFloat(item.winsPercentage),
                lossPercentage: parseFloat(item.lossPercentage),
                difference: parseFloat(difference.toFixed(2)),
                twoBaseWins: item.twoBaseWins,
                twoBaseLosses: item.twoBaseLosses,
                totalWinGames: item.totalWinGames,
                totalLossGames: item.totalLossGames,
              };
            }
          )
        : lowBaseWinLossResults.races.map((item: LowBaseWinLossRaceData) => {
            const difference = Math.abs(
              parseFloat(item.winsPercentage) - parseFloat(item.lossPercentage)
            );

            const vsZergDifference = Math.abs(
              parseFloat(item.winsVsZergPercentage) -
                parseFloat(item.lossVsZergPercentage)
            );
            const vsTerranDifference = Math.abs(
              parseFloat(item.winsVsTerranPercentage) -
                parseFloat(item.lossVsTerranPercentage)
            );
            const vsProtossDifference = Math.abs(
              parseFloat(item.winsVsProtossPercentage) -
                parseFloat(item.lossVsProtossPercentage)
            );

            return {
              name: item.race,
              winsPercentage: parseFloat(item.winsPercentage),
              lossPercentage: parseFloat(item.lossPercentage),
              difference: parseFloat(difference.toFixed(2)),

              // Add differences for each matchup
              vsZergDifference: parseFloat(vsZergDifference.toFixed(2)),
              vsProtossDifference: parseFloat(vsProtossDifference.toFixed(2)),
              vsTerranDifference: parseFloat(vsTerranDifference.toFixed(2)),

              winsVsTerranPercentage: item.winsVsTerranPercentage,
              winsVsZergPercentage: item.winsVsZergPercentage,
              winsVsProtossPercentage: item.winsVsProtossPercentage,
              lossVsTerranPercentage: item.lossVsTerranPercentage,
              lossVsZergPercentage: item.lossVsZergPercentage,
              lossVsProtossPercentage: item.lossVsProtossPercentage,
              totalLossesVsProtoss: item.totalLossesVsProtoss,
              totalLossesVsZerg: item.totalLossesVsZerg,
              totalLossesVsTerran: item.totalLossesVsTerran,
              totalWinsVsZerg: item.totalWinsVsZerg,
              totalWinsVsTerran: item.totalWinsVsTerran,
              totalWinsVsProtoss: item.totalWinsVsProtoss,
              twoBaseWins: item.twoBaseWins,
              totalWinGames: item.totalWinGames,
              twoBaseLosses: item.twoBaseLosses,
              totalLossGames: item.totalLossGames,
              twoBaseWinsVsProtoss: item.twoBaseWinsVsProtoss,
              twoBaseWinsVsTerran: item.twoBaseWinsVsTerran,
              twoBaseWinsVsZerg: item.twoBaseWinsVsZerg,
              twoBaseLossesVsProtoss: item.twoBaseLossesVsProtoss,
              twoBaseLossesVsTerran: item.twoBaseLossesVsTerran,
              twoBaseLossesVsZerg: item.twoBaseLossesVsZerg,
            };
          });

    formattedData.sort((a, b) => b.winsPercentage - a.winsPercentage);
    setData(formattedData);
  }, [chartType]);

  const races = ["Zerg", "Terran", "Protoss"];
  const labels =
    chartType === "Players"
      ? data.map((item) => item.name)
      : races.flatMap((raceA) => races.map((raceB) => `${raceA} vs. ${raceB}`));

  const chartData = {
    labels,
    datasets:
      chartType === "Players"
        ? [
            {
              label: "Win Percent",
              data: data.map((item) => item.winsPercentage || 0), // Ensure numbers
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
            {
              label: "Loss Percent",
              data: data.map((item) => item.lossPercentage || 0), // Ensure numbers
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
            {
              label: "Difference Percent",
              data: data.map((item) => item.difference || 0), // Ensure numbers
              borderColor: "rgba(200, 200, 200, 1)",
              backgroundColor: "rgba(200, 200, 200, 1)",
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.3,
            },
          ]
        : [
            {
              label: "Win Percent",
              data: labels.map((label) => {
                const [raceA, raceB] = label.split(" vs. ");
                const raceData = data.find((item) => item.name === raceA);

                return raceB === "Protoss"
                  ? parseFloat(raceData?.winsVsProtossPercentage || "0")
                  : raceB === "Terran"
                  ? parseFloat(raceData?.winsVsTerranPercentage || "0")
                  : parseFloat(raceData?.winsVsZergPercentage || "0");
              }),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
            {
              label: "Loss Percent",
              data: labels.map((label) => {
                const [raceA, raceB] = label.split(" vs. ");
                const raceData = data.find((item) => item.name === raceA);
                return raceB === "Protoss"
                  ? parseFloat(raceData?.lossVsProtossPercentage || "0")
                  : raceB === "Terran"
                  ? parseFloat(raceData?.lossVsTerranPercentage || "0")
                  : parseFloat(raceData?.lossVsZergPercentage || "0");
              }),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
            {
              label: "Difference Percent",
              data: labels.map((label) => {
                const [raceA, raceB] = label.split(" vs. ");
                const raceData = data.find((item) => item.name === raceA);

                if (!raceData) return 0;

                if (raceB === "Zerg") {
                  return raceData.vsZergDifference || 0;
                } else if (raceB === "Protoss") {
                  return raceData.vsProtossDifference || 0;
                } else if (raceB === "Terran") {
                  return raceData.vsTerranDifference || 0;
                }
                return 0;
              }),
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
            ? "<= 2 Base Win/Loss Percentages (Players)"
            : "<= 2 Base Win/Loss Percentages (Matchups)",
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
            const [raceA, raceB] = context.label?.split(" vs. ") || [];

            const item =
              chartType === "Players"
                ? data[index]
                : data.find((dataItem) => dataItem.name === raceA);

            if (!item) {
              return `${label}: ${value}% (No data available)`;
            }

            if (chartType === "Players") {
              if (label === "Win Percent") {
                return `${label}: ${value}% (${item.twoBaseWins}/${item.totalWinGames} wins)`;
              } else if (label === "Loss Percent") {
                return `${label}: ${value}% (${item.twoBaseLosses}/${item.totalLossGames} losses)`;
              } else {
                return `${label}: ${value}%`;
              }
            } else {
              if (label === "Win Percent") {
                if (raceB === "Terran")
                  return `${label}: ${item.winsVsTerranPercentage}% (${item.twoBaseWinsVsTerran}/${item.totalWinsVsTerran}) wins`;
                else if (raceB === "Zerg")
                  return `${label}: ${item.winsVsZergPercentage}% (${item.twoBaseWinsVsZerg}/${item.totalWinsVsZerg}) wins`;
                else if (raceB === "Protoss")
                  return `${label}: ${item.winsVsProtossPercentage}% (${item.twoBaseWinsVsProtoss}/${item.totalWinsVsProtoss}) wins`;
              } else if (label === "Loss Percent") {
                if (raceB === "Terran")
                  return `${label}: ${item.lossVsTerranPercentage}% (${item.twoBaseLossesVsTerran}/${item.totalLossesVsTerran}) losses`;
                else if (raceB === "Zerg")
                  return `${label}: ${item.lossVsZergPercentage}% (${item.twoBaseLossesVsZerg}/${item.totalLossesVsZerg}) losses`;
                else if (raceB === "Protoss")
                  return `${label}: ${item.lossVsProtossPercentage}% (${item.twoBaseLossesVsProtoss}/${item.totalLossesVsProtoss}) losses`;
              } else {
                return `${label}: ${value}%`;
              }
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
          Races
        </Button>
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default LowBaseWinLossChart;
