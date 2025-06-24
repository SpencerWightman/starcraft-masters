import React, { useMemo, useState } from "react";
import { Button, Box, useMediaQuery, alpha } from "@mui/material";
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
import { PlayerSummary, MatchupStats } from "@/app/types/teamTypes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const intervals = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-60"];

export const makeData = (
  stats: MatchupStats,
  playerName: string,
  color: string
) => {
  const data = intervals.map((iv) => {
    const entry = stats.WinRates.find((r) => r.Interval === iv);
    const rawRate = entry ? parseFloat(entry.WinRate) : 0;
    return rawRate === 0 ? 100 : rawRate;
  });
  const backgroundColor = intervals.map((iv) => {
    const entry = stats.WinRates.find((r) => r.Interval === iv);
    const rawRate = entry ? parseFloat(entry.WinRate) : 0;
    return alpha(color, rawRate === 0 ? 0.1 : 0.3);
  });
  const borderColor = intervals.map((iv) => {
    const entry = stats.WinRates.find((r) => r.Interval === iv);
    const rawRate = entry ? parseFloat(entry.WinRate) : 0;
    return rawRate === 0 ? alpha(color, 0.1) : color;
  });
  return {
    labels: intervals,
    datasets: [
      {
        label: `${stats.TotalGames} games`,
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
};

export const getColorForMatchup = (matchup: string): string => {
  if (matchup.startsWith("T")) return "#457b9d";
  if (matchup.startsWith("P")) return "#2a9d8f";
  if (matchup.startsWith("Z")) return "#e63946";
  return "#6c757d";
};

const PlayerVSChart: React.FC<{ player: PlayerSummary }> = ({ player }) => {
  const isXS = useMediaQuery("(max-width:600px)");
  const [selectedMatchup, setSelectedMatchup] = useState<string>(
    player.stats[0]?.Matchup || ""
  );
  const availableMatchups = useMemo(
    () => player.stats.map((d) => d.Matchup),
    [player.stats]
  );
  const stats = useMemo(
    () => player.stats.find((d) => d.Matchup === selectedMatchup),
    [player.stats, selectedMatchup]
  );
  const color = getColorForMatchup(selectedMatchup);
  const data = stats ? makeData(stats, player.player.name, color) : { labels: [], datasets: [] };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { position: "top" as const, labels: { font: { size: 16 }, color: "rgba(243,244,246,0.6)" } },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const iv = ctx.label as string;
            const entry = stats?.WinRates.find((r) => r.Interval === iv);
            const rate = entry ? parseFloat(entry.WinRate) : 0;
            const games = entry?.TotalGames ?? 0;
            return rate === 0 ? `Games: ${games}` : `Win Rate: ${rate}% | Games: ${games}`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { color: "#e5e7eb" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#e5e7eb" },
        grid: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: (ctx: any) => (ctx.tick.value === 50 ? "rgba(197, 218, 37, 0.49)" : "rgba(255,255,255,0.1)"),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          lineWidth: (ctx: any) => (ctx.tick.value === 50 ? 2 : 1),
        },
      },
    },
  };

  if (isXS) return <Box>Increase your screen size to view the chart</Box>;

  return (
    <Box
      sx={{
        minWidth: 450,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 300,
        backgroundColor: "#1f2937",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flex: "0 0 auto",
          flexWrap: "wrap",
        }}
      >
        {availableMatchups.map((m) => (
          <Button
            key={m}
            variant="outlined"
            onMouseEnter={() => setSelectedMatchup(m)}
            sx={{
              textTransform: "none",
              color,
              borderColor: selectedMatchup === m ? color : "transparent",
            }}
          >
            {m}
          </Button>
        ))}
      </Box>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Bar data={data} options={options} style={{ position: "absolute", inset: 0 }} />
      </Box>
    </Box>
  );
};

export default PlayerVSChart;
