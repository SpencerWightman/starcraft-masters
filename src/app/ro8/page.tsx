"use client";

import React, { useState, useEffect } from "react";
import {
  alpha,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";

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
type HistoricalData = { [player: string]: MatchupDurationStats };
const historicalData: HistoricalData = rawData;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const slides: Array<[string, string]> = [
  ["Queen", "Best"],
  ["Jaedong", "Light"],
  ["Snow", "Rain"],
  ["SoulKey", "Rush"],
];

const Ro8: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const isXS = useMediaQuery("(max-width:600px)");

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [left, right] = slides[current];
  const leftStats = historicalData[left];
  const rightStats = historicalData[right];

  const makeData = (
    stats: MatchupDurationStats,
    player: string,
    color: string,
    invert = false
  ) => {
    const intervals = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-60"];

    const data = intervals.map((iv) => {
      const entry = stats.WinRates.find((r) => r.Interval === iv);
      const rawRate = entry ? parseFloat(entry.WinRate) : 0;
      const isPlaceholder = !entry || rawRate === 0;
      const val = isPlaceholder ? 100 : rawRate;
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
          label: `${player} ${stats.Matchup} (${stats.TotalGames} games)`,
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

  const commonOpts = {
    responsive: true,
    maintainAspectRatio: false as const,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "rgba(243,244,246,0.6)", font: { size: 20 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const iv = ctx.label as string;
            const stats = ctx.dataset.label!.startsWith(left)
              ? leftStats
              : rightStats;
            const entry = stats.WinRates.find((r) => r.Interval === iv);
            const rate = entry ? parseFloat(entry.WinRate) : 0;
            return `Win Rate: ${rate}% | Games: ${entry?.TotalGames ?? 0}`;
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

  const rightOpts = {
    ...commonOpts,
    scales: {
      ...commonOpts.scales,
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
  };

  const leftOpts = {
    ...commonOpts,
    scales: {
      ...commonOpts.scales,
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
  };

  return (
    <>
      {isXS ? (
        <PaperPlaceholder message="Increase your screen size to view the chart" />
      ) : (
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
              <Box sx={{ flex: "1 1 0", minWidth: 0, height: "100%" }}>
                <Bar data={leftData} options={leftOpts} />
              </Box>
              <Box sx={{ flex: "1 1 0", minWidth: 0, height: "100%" }}>
                <Bar data={rightData} options={rightOpts} />
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
              * ASL, SSL, and KSL data. Vertical axis is match duration.
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Ro8;
