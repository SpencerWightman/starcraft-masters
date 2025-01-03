"use client";

import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Paper,
  Typography,
  Fade,
  Box,
  useMediaQuery,
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

type HistoricalData = {
  [key: string]: MatchupDurationStats[];
};

import rawHistoricalData from "data/historicalData.json";
const historicalData: HistoricalData = rawHistoricalData;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const VSChart: React.FC = () => {
  const isXS = useMediaQuery("(max-width:900px)");

  // First chart state
  const [selectedPlayer1, setSelectedPlayer1] = useState(
    Object.keys(historicalData)[0]
  );
  const [selectedMatchup1, setSelectedMatchup1] = useState("");

  // Second chart state
  const [selectedPlayer2, setSelectedPlayer2] = useState(
    Object.keys(historicalData)[0]
  );
  const [selectedMatchup2, setSelectedMatchup2] = useState("");

  useEffect(() => {
    const initialPlayer1 = historicalData[selectedPlayer1];
    if (initialPlayer1 && initialPlayer1.length > 0) {
      setSelectedMatchup1(initialPlayer1[0].Matchup);
    }

    const initialPlayer2 = historicalData[selectedPlayer2];
    if (initialPlayer2 && initialPlayer2.length > 0) {
      setSelectedMatchup2(initialPlayer2[0].Matchup);
    }
  }, [selectedPlayer1, selectedPlayer2]);

  const handlePlayerChange1 = (event: SelectChangeEvent) => {
    setSelectedPlayer1(event.target.value);
  };

  const handlePlayerChange2 = (event: SelectChangeEvent) => {
    setSelectedPlayer2(event.target.value);
  };

  const aggregateData = (
    matchup: string,
    playerHandle: string,
    isFirstChart: boolean
  ) => {
    const player = historicalData[playerHandle];
    if (!player) return { labels: [], datasets: [] };

    // Specific matchup data
    const matchupData = player.find((d) => d.Matchup === matchup);
    if (!matchupData) return { labels: [], datasets: [] };

    // Generate labels and datasets
    const labels = matchupData.WinRates.map((rate) => rate.Interval);
    const datasets = [
      {
        label: `Win Rate for ${playerHandle} - ${matchupData.TotalGames} Games`,
        data: matchupData.WinRates.map((rate) => parseFloat(rate.WinRate)),
        backgroundColor: isFirstChart
          ? "rgba(54, 162, 235, 0.2)" // Light blue -- chart 1
          : "rgba(75, 192, 192, 0.2)", // Light green -- chart 2
        borderColor: isFirstChart
          ? "rgba(54, 162, 235, 1)" // Dark blue -- chart 1
          : "rgba(75, 192, 192, 1)", // Dark green -- chart 2
        borderWidth: 1,
      },
    ];

    return { labels, datasets };
  };

  const chartProps1 = aggregateData(selectedMatchup1, selectedPlayer1, true);
  const chartProps2 = aggregateData(selectedMatchup2, selectedPlayer2, false);

  const options = (playerHandle: string, selectedMatchup: string) => ({
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: "x" as const,
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
          label: (context: TooltipItem<"bar">) => {
            if (!playerHandle || !selectedMatchup) {
              return `Win Rate: ${context.raw}%`;
            }

            // Find player data
            const playerData = historicalData[playerHandle];
            if (!playerData) {
              return `Win Rate: ${context.raw}%`;
            }

            // Find matchup data
            const matchupData = playerData.find(
              (m) => m.Matchup === selectedMatchup
            );
            if (!matchupData) {
              return `Win Rate: ${context.raw}%`;
            }

            // Find interval data
            const interval = context.label;
            const intervalData = matchupData.WinRates.find(
              (rate) => rate.Interval === interval
            );

            if (!intervalData) {
              return `Win Rate: ${context.raw}%`;
            }

            const totalGames = intervalData.TotalGames || 0;
            const winRate = context.raw;

            return `Win Rate: ${winRate}% | Total Games: ${totalGames}`;
          },
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
        min: 0,
        max: 100,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#e5e7eb",
        },
      },
    },
  });

  const allMatchups1 = Array.from(
    new Set(historicalData[selectedPlayer1]?.map((d) => d.Matchup) || [])
  );

  const allMatchups2 = Array.from(
    new Set(historicalData[selectedPlayer2]?.map((d) => d.Matchup) || [])
  );

  return (
    <Fade in={true} timeout={500}>
      {isXS ? (
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            maxWidth: 600,
            margin: "auto",
            marginTop: 8,
            backgroundColor: "#374151",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#ffffff",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Increase your screen size to view the chart
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "flex-start",
            padding: "20px",
            backgroundColor: "#1f2937",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* First Chart */}
          <Box
            sx={{
              width: "49%",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            <Select
              value={selectedPlayer1}
              onChange={handlePlayerChange1}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#374151",
                    color: "#e5e7eb",
                  },
                },
              }}
              sx={{
                marginBottom: "20px",
                color: "#e5e7eb",
                backgroundColor: "#374151",
                borderRadius: "4px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(54, 162, 235, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "& .MuiSvgIcon-root": { color: "rgba(54, 162, 235, 1)" },
              }}
            >
              {Object.entries(historicalData).map(([handle]) => (
                <MenuItem key={handle} value={handle}>
                  {handle}
                </MenuItem>
              ))}
            </Select>

            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {allMatchups1.map((matchup) => (
                <Button
                  key={matchup}
                  variant="outlined"
                  onClick={() => setSelectedMatchup1(matchup)}
                  sx={{
                    color: "rgba(54, 162, 235, 1)",
                    textTransform: "none",
                    borderColor:
                      selectedMatchup1 === matchup
                        ? "rgba(54, 162, 235, 1)"
                        : "transparent",
                    backgroundColor: "#374151",
                    "&:hover": { borderColor: "rgba(54, 162, 235, 1)" },
                  }}
                >
                  {matchup}
                </Button>
              ))}
            </div>
            <div style={{ height: "500px" }}>
              <Bar
                data={chartProps1}
                options={options(selectedPlayer1, selectedMatchup1)}
              />
            </div>
          </Box>

          {/* Second Chart */}
          <Box
            sx={{
              width: "49%",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            <Select
              value={selectedPlayer2}
              onChange={handlePlayerChange2}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#374151",
                    color: "#e5e7eb",
                  },
                },
              }}
              sx={{
                marginBottom: "20px",
                color: "#e5e7eb",
                backgroundColor: "#374151",
                borderRadius: "4px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(75, 192, 192, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "& .MuiSvgIcon-root": { color: "rgba(75, 192, 192, 1)" },
              }}
            >
              {Object.entries(historicalData).map(([handle]) => (
                <MenuItem key={handle} value={handle}>
                  {handle}
                </MenuItem>
              ))}
            </Select>

            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {allMatchups2.map((matchup) => (
                <Button
                  key={matchup}
                  variant="outlined"
                  onClick={() => setSelectedMatchup2(matchup)}
                  sx={{
                    color: "rgba(75, 192, 192, 1)",
                    textTransform: "none",
                    borderColor:
                      selectedMatchup2 === matchup
                        ? "rgba(75, 192, 192, 1)"
                        : "transparent",
                    backgroundColor: "#374151",
                    "&:hover": { borderColor: "rgba(75, 192, 192, 1)" },
                  }}
                >
                  {matchup}
                </Button>
              ))}
            </div>
            <div style={{ height: "500px" }}>
              <Bar
                data={chartProps2}
                options={options(selectedPlayer2, selectedMatchup2)}
              />
            </div>
          </Box>
        </Box>
      )}
    </Fade>
  );
};

export default VSChart;
