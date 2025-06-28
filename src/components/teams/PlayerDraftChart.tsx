/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions,
} from "chart.js";
import { PlayerSummary, MatchupStats } from "@/app/types/teamTypes";
import { intervals, makeData, getColorForMatchup } from "./PlayerChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PlayerDraftChart: React.FC<{
  selectedPlayers: PlayerSummary[];
  widthProp: string;
}> = ({ selectedPlayers, widthProp }) => {
  const isXS = useMediaQuery("(max-width:600px)");

  const allMatchups = useMemo(
    () =>
      Array.from(
        new Set(selectedPlayers.flatMap((p) => p.stats.map((s) => s.Matchup)))
      ).filter((m) => m !== "N/A"),
    [selectedPlayers]
  );

  const [selectedMatchup, setSelectedMatchup] = useState(allMatchups[0] || "");
  useEffect(() => {
    setSelectedMatchup(allMatchups[0] || "");
  }, [allMatchups]);

  // aggregated MatchupStats
  const aggregatedStats = useMemo<MatchupStats>(() => {
    let totalGames = 0;
    const bucket: Record<
      string,
      { sumRate: number; count: number; games: number }
    > = {};

    selectedPlayers.forEach((player) => {
      const stat = player.stats.find((s) => s.Matchup === selectedMatchup);
      if (!stat) return;
      totalGames += stat.TotalGames;
      stat.WinRates.forEach((r) => {
        if (!bucket[r.Interval]) {
          bucket[r.Interval] = { sumRate: 0, count: 0, games: 0 };
        }
        bucket[r.Interval].sumRate += parseFloat(r.WinRate);
        bucket[r.Interval].count += 1;
        bucket[r.Interval].games += r.TotalGames;
      });
    });

    return {
      Matchup: selectedMatchup,
      TotalGames: totalGames,
      WinRates: intervals.map((iv: string | number) => {
        const entry = bucket[iv];
        const avgRate =
          entry && entry.count ? (entry.sumRate / entry.count).toFixed(2) : "0";
        return {
          Interval: iv,
          WinRate: avgRate,
          TotalGames: entry?.games ?? 0,
        };
      }),
    } as MatchupStats;
  }, [selectedPlayers, selectedMatchup]);

  const color = getColorForMatchup(selectedMatchup);
  const data = makeData(aggregatedStats, "Team", color);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 16 }, color: "rgba(243,244,246,0.6)" },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const iv = ctx.label as string;
            const entry = aggregatedStats.WinRates.find(
              (r) => r.Interval === iv
            );
            const rate = entry ? parseFloat(entry.WinRate) : 0;
            const games = entry?.TotalGames ?? 0;
            return rate === 0
              ? `Games: ${games}`
              : `Win Rate: ${rate}% | Games: ${games}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#e5e7eb" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#e5e7eb" },
        grid: {
          color: (ctx: any) =>
            ctx.tick.value === 50
              ? "rgba(197, 218, 37, 0.49)"
              : "rgba(255,255,255,0.1)",
          lineWidth: (ctx: any) => (ctx.tick.value === 50 ? 2 : 1),
        },
      },
    },
  };

  if (isXS) return <Box>Increase your screen size to view the chart</Box>;

  return (
    <Box
      sx={{
        width: widthProp,
        height: 400,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1f2937",
        borderRadius: "8px",
        overflow: "hidden",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
          mb: 1,
        }}
      >
        {allMatchups.map((m) => (
          <Button
            key={m}
            variant="outlined"
            onMouseEnter={() => setSelectedMatchup(m)}
            sx={{
              textTransform: "none",
              color: getColorForMatchup(m),
              borderColor:
                selectedMatchup === m ? getColorForMatchup(m) : "transparent",
            }}
          >
            {m}
          </Button>
        ))}
      </Box>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Bar
          data={data}
          options={options}
          style={{ position: "absolute", inset: 0 }}
        />
      </Box>
    </Box>
  );
};

export default PlayerDraftChart;
