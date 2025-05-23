"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { PlayerSummary } from "@/app/types/teamTypes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PlayerDraftChart: React.FC<{
  selectedPlayers: PlayerSummary[];
  widthProp: string;
}> = ({ selectedPlayers, widthProp }) => {
  const [selectedMatchup, setSelectedMatchup] = useState(
    selectedPlayers.length > 0 && selectedPlayers[0].duration.length > 0
      ? selectedPlayers[0].duration[0].Matchup
      : ""
  );

  useEffect(() => {
    if (selectedPlayers.length > 0 && selectedPlayers[0].duration.length > 0) {
      setSelectedMatchup(selectedPlayers[0].duration[0].Matchup);
    }
  }, [selectedPlayers]);

  const aggregateData = (matchup: string) => {
    const aggregatedWinRates: {
      [interval: string]: { totalWinRate: number; count: number };
    } = {};
    let totalGames = 0;

    selectedPlayers.forEach((player) => {
      const playerMatchup = player.duration.find((d) => d.Matchup === matchup);
      if (playerMatchup) {
        totalGames += playerMatchup.TotalGames;
        playerMatchup.WinRates.forEach((rate) => {
          if (!aggregatedWinRates[rate.Interval]) {
            aggregatedWinRates[rate.Interval] = { totalWinRate: 0, count: 0 };
          }
          aggregatedWinRates[rate.Interval].totalWinRate += parseFloat(
            rate.WinRate
          );
          aggregatedWinRates[rate.Interval].count += 1;
        });
      }
    });

    const sortedLabels = Object.keys(aggregatedWinRates).sort((a, b) => {
      const [aStart] = a.split("-").map(Number);
      const [bStart] = b.split("-").map(Number);
      return aStart - bStart;
    });

    const datasets = [
      {
        label: `Team Win Rate by Duration  - ${totalGames} Games`,
        data: sortedLabels.map(
          (interval) =>
            aggregatedWinRates[interval].totalWinRate /
            aggregatedWinRates[interval].count
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ];

    return { labels: sortedLabels, datasets };
  };

  const chartProps = aggregateData(selectedMatchup);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => `${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#e5e7eb",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#e5e7eb",
        },
      },
    },
  };

  const allMatchups = Array.from(
    new Set(
      selectedPlayers.flatMap((player) => player.duration.map((d) => d.Matchup))
    )
  ).filter((matchup) => matchup !== "N/A");

  return (
    <div
      style={{
        width: widthProp,
        height: "400px",
        padding: "5px",
        backgroundColor: "#1f2937",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        marginTop: "16px",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {allMatchups.map((matchup) => (
          <Button
            key={matchup}
            variant="outlined"
            onMouseEnter={() => setSelectedMatchup(matchup)}
            sx={{
              color: "#10b981",
              textTransform: "none",
              borderColor:
                selectedMatchup === matchup ? "#10b981" : "transparent",
              backgroundColor: "#374151",
              "&:hover": { borderColor: "#10b981" },
            }}
          >
            {matchup}
          </Button>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Bar
          data={chartProps}
          options={options}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default PlayerDraftChart;
