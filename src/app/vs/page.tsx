"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Box,
  alpha,
} from "@mui/material";
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
import { PlayerSummaries, MatchupStats } from "@/app/types/teamTypes";
import rawHistoricalData from "data/historicalData.json";
const historicalData: PlayerSummaries = rawHistoricalData;

const players = Object.keys(historicalData);

const selectSx = {
  color: "rgba(243, 244, 246, 0.6)",
  "& .MuiSvgIcon-root": { color: "rgba(243, 244, 246, 0.6)" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(243, 244, 246, 0.6)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(243, 244, 246, 0.6)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(243, 244, 246, 0.6)",
  },
  "& .MuiSelect-select:focus": {
    outline: "none",
    boxShadow: "none",
  },
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const intervals = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-60"];

const makeData = (
  stats: MatchupStats,
  player: string,
  color: string,
  invert = false
) => {
  const data = intervals.map((iv) => {
    const entry = stats.WinRates.find((r) => r.Interval === iv);
    const rawRate = entry ? parseFloat(entry.WinRate) : 0;
    const val = rawRate === 0 ? 100 : rawRate;
    return invert ? -val : val;
  });

  const backgroundColor = intervals.map((iv) => {
    const entry = stats.WinRates.find((r) => r.Interval === iv);
    const rawRate = entry ? parseFloat(entry.WinRate) : 0;
    const isPlaceholder = !entry || rawRate === 0;
    return alpha(color, isPlaceholder ? 0.1 : 0.3);
  });

  const borderColor = intervals.map((iv) => {
    const entry = stats.WinRates.find((r) => r.Interval === iv);
    const rawRate = entry ? parseFloat(entry.WinRate) : 0;
    const isPlaceholder = !entry || rawRate === 0;
    return isPlaceholder ? alpha(color, 0.1) : color;
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

const getColorForMatchup = (matchup: string): string => {
  if (matchup.startsWith("T")) return "#457b9d";
  if (matchup.startsWith("P")) return "#2a9d8f";
  if (matchup.startsWith("Z")) return "#e63946";
  return "#6c757d";
};

const VSChart: React.FC = () => {
  const [selectedPlayer1, setSelectedPlayer1] = useState("SoulKey");
  const [selectedPlayer2, setSelectedPlayer2] = useState("Light");

  const dataPlayer1 = useMemo(
    () => historicalData[selectedPlayer1] || [],
    [selectedPlayer1]
  );
  const dataPlayer2 = useMemo(
    () => historicalData[selectedPlayer2] || [],
    [selectedPlayer2]
  );

  const allMatchups1 = useMemo(
    () => dataPlayer1.stats.map((d) => d.Matchup),
    [dataPlayer1]
  );
  const allMatchups2 = useMemo(
    () => dataPlayer2.stats.map((d) => d.Matchup),
    [dataPlayer2]
  );

  const [selectedMatchup1, setSelectedMatchup1] = useState(
    () => allMatchups1[0] ?? ""
  );
  const [selectedMatchup2, setSelectedMatchup2] = useState(
    () => allMatchups2[0] ?? ""
  );

  useEffect(() => {
    setSelectedMatchup1(allMatchups1[0] ?? "");
  }, [allMatchups1]);
  useEffect(() => {
    setSelectedMatchup2(allMatchups2[0] ?? "");
  }, [allMatchups2]);

  const stats1 = dataPlayer1.stats.find((d) => d.Matchup === selectedMatchup1);
  const stats2 = dataPlayer2.stats.find((d) => d.Matchup === selectedMatchup2);

  const color1 = getColorForMatchup(selectedMatchup1);
  const color2 = getColorForMatchup(selectedMatchup2);

  const leftData = stats1
    ? makeData(stats1, selectedPlayer1, color1, true)
    : { labels: [], datasets: [] };
  const rightData = stats2
    ? makeData(stats2, selectedPlayer2, color2, false)
    : { labels: [], datasets: [] };

  const commonOpts = {
    responsive: true,
    maintainAspectRatio: false as const,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "rgba(243,244,246,0.6)", font: { size: 16 } },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: { color: "#e5e7eb" },
      },
    },
  };

  const leftOpts = {
    ...commonOpts,
    scales: {
      x: {
        min: -100,
        max: 0,
        ticks: {
          callback: (v: number | string) => Math.abs(Number(v)),
          color: "#e5e7eb",
        },
        grid: {
          color: (ctx: { tick: { value: number } }) =>
            ctx.tick.value === -50
              ? "rgba(197, 218, 37, 0.49)"
              : "rgba(255,255,255,0.1)",
          lineWidth: (ctx: { tick: { value: number } }) =>
            ctx.tick.value === -50 ? 2 : 1,
        },
      },
      y: { ...commonOpts.scales.y, position: "left" as const },
    },
    plugins: {
      ...commonOpts.plugins,
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const iv = ctx.label as string;
            const entry = stats1?.WinRates.find((r) => r.Interval === iv);
            const rate = entry ? parseFloat(entry.WinRate) : 0;
            return `Win Rate: ${rate}% | Games: ${entry?.TotalGames ?? 0}`;
          },
        },
      },
    },
  };

  const rightOpts = {
    ...commonOpts,
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: { color: "#e5e7eb" },
        grid: {
          color: (ctx: { tick: { value: number } }) =>
            ctx.tick.value === 50
              ? "rgba(197, 218, 37, 0.49)"
              : "rgba(255,255,255,0.1)",
          lineWidth: (ctx: { tick: { value: number } }) =>
            ctx.tick.value === 50 ? 2 : 1,
        },
      },
      y: { ...commonOpts.scales.y, position: "right" as const },
    },
    plugins: {
      ...commonOpts.plugins,
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const iv = ctx.label as string;
            const entry = stats2?.WinRates.find((r) => r.Interval === iv);
            const rate = entry ? parseFloat(entry.WinRate) : 0;
            return `Win Rate: ${rate}% | Games: ${entry?.TotalGames ?? 0}`;
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        p: 2,
        backgroundColor: "#1f2937",
        borderRadius: 2,
        height: { xs: "auto", sm: 600 },
      }}
    >
      {/* ───────────────────────── Player 1 panel ───────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: { xs: 300, sm: "100%" },
        }}
      >
        {/* header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            gap: 1,
            flex: "0 0 auto",
          }}
        >
          <Select
            value={selectedPlayer1}
            onChange={(e: SelectChangeEvent) =>
              setSelectedPlayer1(e.target.value)
            }
            sx={selectSx}
          >
            {players.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>

          {allMatchups1.map((m) => (
            <Button
              key={m}
              variant="outlined"
              onClick={() => setSelectedMatchup1(m)}
              sx={{
                textTransform: "none",
                color: color1,
                borderColor: selectedMatchup1 === m ? color1 : "transparent",
              }}
            >
              {m}
            </Button>
          ))}
        </Box>

        {/* chart */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <Bar data={leftData} options={leftOpts} />
        </Box>
      </Box>

      {/* ───────────────────────── Player 2 panel ───────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: { xs: 300, sm: "100%" },
        }}
      >
        {/* header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            gap: 1,
            flex: "0 0 auto",
          }}
        >
          <Select
            value={selectedPlayer2}
            onChange={(e: SelectChangeEvent) =>
              setSelectedPlayer2(e.target.value)
            }
            sx={selectSx}
          >
            {players.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>

          {allMatchups2.map((m) => (
            <Button
              key={m}
              variant="outlined"
              onClick={() => setSelectedMatchup2(m)}
              sx={{
                textTransform: "none",
                color: color2,
                borderColor: selectedMatchup2 === m ? color2 : "transparent",
              }}
            >
              {m}
            </Button>
          ))}
        </Box>

        {/* chart */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <Bar data={rightData} options={rightOpts} />
        </Box>
      </Box>
    </Box>
  );
};

export default VSChart;
