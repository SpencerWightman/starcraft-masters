/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartDataset,
  TooltipItem,
} from "chart.js";
import { RecapType } from "@/app/types/teamTypes";
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Props = {
  files: string[];
  initialFile: string;
  initialData: RecapType;
};

export default function RecapClient({
  files,
  initialFile,
  initialData,
}: Props) {
  const isXS = useMediaQuery("(max-width:600px)");
  const [selectedFile, setSelectedFile] = useState(initialFile);
  const [matchData, setMatchData] = useState<RecapType>(initialData);

  const matchKeys = Object.keys(matchData);
  const [selectedMatchKey, setSelectedMatchKey] = useState(matchKeys[0] ?? "");

  useEffect(() => {
    if (selectedFile === initialFile) {
      setMatchData(initialData);
      setSelectedMatchKey(Object.keys(initialData)[0] || "");
    } else {
      import(`data/recap/${selectedFile}`).then((mod) => {
        const data = mod.default as RecapType;
        setMatchData(data);
        setSelectedMatchKey(Object.keys(data)[0] || "");
      });
    }
  }, [selectedFile, initialFile, initialData]);

  useEffect(() => {
    const keys = Object.keys(matchData);
    setSelectedMatchKey(keys[0] || "");
  }, [matchData]);

  if (isXS) {
    return (
      <PaperPlaceholder message="Increase your screen size to view the chart" />
    );
  }

  const shouldShow = (idx: number, len: number) => {
    if (idx === 0 || idx === len - 1) return true;
    if (len - 1 - idx < 10) return false;
    return idx % 30 === 0;
  };

  const getColorForMatchup = (m: string) =>
    m.startsWith("T")
      ? "#457b9d"
      : m.startsWith("P")
      ? "#2a9d8f"
      : m.startsWith("Z")
      ? "#e63946"
      : "#6c757d";

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: 2,
      }}
    >
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          bgcolor: "#1f2937",
          overflowY: "auto",
          color: "#10b981",
        }}
      >
        <List>
          {files.map((file) => (
            <ListItemButton
              key={file}
              selected={file === selectedFile}
              onClick={() => setSelectedFile(file)}
            >
              <ListItemText primary={file.replace(/\.json$/, "")} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Chart Zone ~~ */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          bgcolor: "#1f2937",
        }}
      >
        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
            mb: 2,
          }}
        >
          {matchKeys.map((key) => {
            const m = matchData[key];
            const active = key === selectedMatchKey;
            return (
              <Button
                key={key}
                variant="outlined"
                onClick={() => setSelectedMatchKey(key)}
                sx={{
                  textTransform: "none",
                  color: active
                    ? getColorForMatchup(m.race1)
                    : "rgba(243,244,246,0.6)",
                  borderColor: active
                    ? getColorForMatchup(m.race1)
                    : "rgba(243,244,246,0.2)",
                }}
              >
                {`${m.player1} vs ${m.player2}`}
              </Button>
            );
          })}
        </Box>

        {/* Selected chart */}
        {(() => {
          const match = matchData[selectedMatchKey];
          if (!match) return null;

          const times = Object.keys(match.gameData);

          const player1Data = times.map((t) => {
            const s = match.gameData[t].player1supply;
            return s ? Number(s.split("/")[0]) : null;
          });

          const player2Data = times.map((t) => {
            const s = match.gameData[t].player2supply;
            return s ? Number(s.split("/")[0]) : null;
          });

          const color1 = getColorForMatchup(match.race1);
          const color2 = getColorForMatchup(match.race2);

          const chartData = {
            labels: times,
            datasets: [
              {
                label: match.player1,
                data: player1Data,
                borderColor: color1,
                backgroundColor: `${color1}33`,
                borderWidth: 3,
                spanGaps: true,
                pointRadius: 0,
              },
              {
                label: match.player2,
                data: player2Data,
                borderColor: color2,
                backgroundColor: `${color2}33`,
                borderWidth: 3,
                spanGaps: true,
                pointRadius: 0,
              },
            ] as ChartDataset<"line">[],
          };

          const options = {
            responsive: true,
            plugins: {
              legend: { position: "top" as const },
              tooltip: {
                callbacks: {
                  label: (ctx: TooltipItem<"line">) => {
                    const label = ctx.dataset.label || "";
                    const value = ctx.raw as number;
                    return `${label}: ${value} supply`;
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  autoSkip: false,
                  callback: (_v: any, i: number, ticks: any[]) =>
                    shouldShow(i, ticks.length) ? times[i] : "",
                },
                grid: {
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  lineWidth: (ctx: any) =>
                    shouldShow(ctx.index, times.length) ? 1 : 0,
                },
              },
              y: {
                beginAtZero: true,
                  ticks: {
                  stepSize: 5,
                },
              },
            },
          };

          return <Line data={chartData} options={options} />;
        })()}
      </Box>
    </Box>
  );
}
