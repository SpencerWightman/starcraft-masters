import React, { useState } from "react";
import { Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PlayerSummary } from "@/app/types/teamTypes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PlayerChart: React.FC<{ player: PlayerSummary }> = ({ player }) => {
  const [selectedMatchup, setSelectedMatchup] = useState(
    player.duration.length > 0 ? player.duration[0].Matchup : ""
  );

  const getChartProps = () => {
    const matchup = player.duration.find((d) => d.Matchup === selectedMatchup);

    if (!matchup) return { labels: [], datasets: [] };

    const labels = matchup.WinRates.map((rate) => rate.Interval);
    const datasets = [
      {
        label: `${player.player.name} - Win Rate by Duration - ${matchup.TotalGames} Games`,
        data: matchup.WinRates.map((rate) => parseFloat(rate.WinRate)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ];

    return { labels, datasets };
  };

  const chartProps = getChartProps();

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => `${context.raw}%`,
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

  return (
    <div
      style={{
        width: "500px",
        height: "400px",
        padding: "20px",
        backgroundColor: "#1f2937",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
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
        {player.duration.map((d) => (
          <Button
            key={d.Matchup}
            variant="outlined"
            onMouseEnter={() => setSelectedMatchup(d.Matchup)}
            sx={{
              color: "#10b981",
              textTransform: "none",
              borderColor:
                selectedMatchup === d.Matchup ? "#10b981" : "transparent",
              backgroundColor: "#374151",
              "&:hover": { borderColor: "#10b981" },
            }}
          >
            {d.Matchup}
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

export default PlayerChart;
