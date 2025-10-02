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

type Race = "Protoss" | "Zerg" | "Terran";

type PlayerInfo = {
  id: number;
  name: string;
  race: Race;
  handle: string;
};

type Achievements = {
  champion: number;
  runnerUp: number;
  ro4: number;
};

type DurationWinRate = {
  Interval: string;
  WinRate: string; // e.g. "66.67"
  TotalGames: number;
};

type MatchupDurationStats = {
  Matchup: string; // e.g. "PvZ"
  TotalGames: number;
  WinRates: DurationWinRate[];
};

type PlayerRecord = {
  player: PlayerInfo;
  achievements: Achievements;
  tier: number;
  stats: MatchupDurationStats[];
};

type HistoricalData = Record<string, PlayerRecord>;

import rawData from "data/20ro8.json";
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";
const historicalData = rawData as HistoricalData;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const slides: Array<[string, string]> = [
  ["BarrackS", "Snow"],
  ["Soma", "Bisu"],
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

  const leftProfile = historicalData[left];
  const rightProfile = historicalData[right];

  const raceLetter = (r: Race) =>
    r === "Protoss" ? "P" : r === "Zerg" ? "Z" : "T";
  const muFor = (a: Race, b: Race) => `${raceLetter(a)}v${raceLetter(b)}`;

  const leftMU = muFor(leftProfile.player.race, rightProfile.player.race);
  const rightMU = muFor(rightProfile.player.race, leftProfile.player.race);

  const emptyStats = (Matchup: string): MatchupDurationStats => ({
    Matchup,
    TotalGames: 0,
    WinRates: [],
  });

  const leftStats =
    leftProfile.stats.find((s) => s.Matchup === leftMU) ?? emptyStats(leftMU);
  const rightStats =
    rightProfile.stats.find((s) => s.Matchup === rightMU) ??
    emptyStats(rightMU);

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
    // Zerg
    Queen: "#e63946",
    Jaedong: "#e63946",
    SoulKey: "#e63946",
    Soma: "#e63946",
    Larva: "#e63946",
    EffOrt: "#e63946",
    // Protoss
    Best: "#2a9d8f",
    Rain: "#2a9d8f",
    Snow: "#2a9d8f",
    Mini: "#2a9d8f",
    Bisu: "#2a9d8f",
    // Terran
    Rush: "#457b9d",
    Light: "#457b9d",
    BarrackS: "#457b9d",
  };

  const leftData = makeData(leftStats, left, colorMap[left] ?? "#888", true);
  const rightData = makeData(
    rightStats,
    right,
    colorMap[right] ?? "#888",
    false
  );

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
        <PaperPlaceholder message="Turn your phone horiztonal or increase screen size to view the chart" />
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
