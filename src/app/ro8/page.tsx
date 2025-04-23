/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
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

import rawData from "data/19ro8.json";

type DurationWinRate = {
  Interval: string;
  WinRate: string;
  TotalGames: number;
};
type MatchupDurationStats = {
  Matchup: string;
  TotalGames: number;
  WinRates: DurationWinRate[];
};
type HistoricalData = { [key: string]: MatchupDurationStats[] };
const historicalData: HistoricalData = rawData;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const slides = [
  { left: "Queen", right: "Best", matchLeft: "ZvP", matchRight: "PvZ" },
  { left: "Jaedong", right: "Light", matchLeft: "ZvT", matchRight: "TvZ" },
  { left: "Snow", right: "Rain", matchLeft: "PvP", matchRight: "PvP" },
  { left: "SoulKey", right: "Rush", matchLeft: "ZvT", matchRight: "TvZ" },
];

const Ro8: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { left, right, matchLeft, matchRight } = slides[current];
  const leftStats = historicalData[left]?.find((s) => s.Matchup === matchLeft);
  const rightStats = historicalData[right]?.find(
    (s) => s.Matchup === matchRight
  );

  const hexToRgb = (hex: string) => {
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    return `${parseInt(parsed[1], 16)},${parseInt(parsed[2], 16)},${parseInt(
      parsed[3],
      16
    )}`;
  };

  const makeData = (
    stats: MatchupDurationStats | undefined,
    player: string,
    color: string,
    invert = false
  ) => {
    const allIntervals = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-60"];
    const rgb = hexToRgb(color);

    const data: number[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];

    allIntervals.forEach((iv) => {
      const entry = stats?.WinRates.find((r) => r.Interval === iv);
      // treat missing or zero as placeholder
      const rawRate = entry ? parseFloat(entry.WinRate) : 0;
      const isPlaceholder = !entry || rawRate === 0;
      const val = isPlaceholder ? 100 : rawRate;

      // push invert if left side
      data.push(invert ? -val : val);

      const opacity = isPlaceholder ? 0.1 : 0.3;
      backgroundColor.push(`rgba(${rgb},${opacity})`);
      borderColor.push(isPlaceholder ? `rgba(${rgb},${opacity})` : color);
    });

    return {
      labels: allIntervals,
      datasets: [
        {
          label: `${player} ${stats?.Matchup} (${
            stats?.TotalGames ?? 0
          } games)`,
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  const colorMap: Record<string, string> = {
    Queen: "#e63946",
    Jaedong: "#e63946",
    SoulKey: "#e63946",
    Best: "#2a9d8f",
    Rain: "#2a9d8f",
    Snow: "#2a9d8f",
    Rush: "#457b9d",
    Light: "#457b9d",
  };

  const leftData = makeData(leftStats, left, colorMap[left], true);
  const rightData = makeData(rightStats, right, colorMap[right], false);

  // tooltip + legend
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false as const,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(243, 244, 246, 0.6)",
          font: {
            size: 20,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const interval = ctx.label as string;
            const stats = ctx.dataset.label?.startsWith(left)
              ? leftStats
              : rightStats;
            const entry = stats?.WinRates.find((r) => r.Interval === interval);
            const actualRate = entry ? parseFloat(entry.WinRate) : 0;
            const games = entry?.TotalGames ?? 0;
            return `Win Rate: ${actualRate}% | Games: ${games}`;
          },
        },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: { color: "#e5e7eb" },
      },
    },
  };

  const leftOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      x: {
        min: -100,
        max: 0,
        ticks: {
          callback: (v: string | number) => Math.abs(Number(v)),
          color: "#e5e7eb",
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: { ...(commonOptions.scales.y as any), position: "left" as const },
    },
  };

  const rightOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      x: {
        min: 0,
        max: 100,
        ticks: { color: "#e5e7eb" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: { ...(commonOptions.scales.y as any), position: "right" as const },
    },
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: 600,
        }}
      >
        <IconButton
          onClick={prev}
          sx={{ position: "absolute", left: 0, color: "#e5e7eb" }}
        >
          <ArrowBackIos />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            px: 4,
            height: "100%",
            gap: 2,
          }}
        >
          {/* Left Chart */}
          <Box sx={{ flex: 1, height: "100%" }}>
            <Bar data={leftData} options={leftOptions} />
          </Box>

          {/* Right Chart */}
          <Box sx={{ flex: 1, height: "100%" }}>
            <Bar data={rightData} options={rightOptions} />
          </Box>
        </Box>

        <IconButton
          onClick={next}
          sx={{ position: "absolute", right: 0, color: "#e5e7eb" }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="caption" color="rgba(243, 244, 246, 0.6)">
          * ASL, SSL, and KSL data
        </Typography>
      </Box>
    </>
  );
};

export default Ro8;
