"use client";

import React, { useState } from "react";
import {
  Button,
  Tooltip as MuiTooltip,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  Fade,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Placeholder } from "@/utils/placeholder";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TooltipItem,
  Legend,
} from "chart.js";

import data from "data/lowBaseResults.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  title: string;
  tooltipData: (index: number, datasetLabel: string, value: number) => string;
}

const LowBaseChart: React.FC<ChartProps> = ({
  labels,
  datasets,
  title,
  tooltipData,
}) => {
  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label;
            const value = context.raw as number;
            const index = context.dataIndex;
            return tooltipData(index, label || "", value);
          },
        },
      },
    },
  };

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ color: "#10b981", marginBottom: "1rem", textAlign: "center" }}
      >
        {title}
      </Typography>
      <Line data={chartData} options={options} />
    </div>
  );
};

const LowBaseCharts: React.FC = () => {
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");
  const isXS = useMediaQuery("(max-width:600px)");

  const getChartProps = () => {
    if (chartType === "Players") {
      const labels = data.players.map((item) => item.name);
      const datasets = [
        {
          label: "Win Percent",
          data: data.players.map((item) => item.twoBaseWinPercent),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Loss Percent",
          data: data.players.map((item) => item.twoBaseLossPercent),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Difference Percent",
          data: data.players.map((item) => item.diffPercent),
          borderColor: "rgba(200, 200, 200, 1)",
          backgroundColor: "rgba(200, 200, 200, 1)",
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
        },
      ];
      const tooltipData = (
        index: number,
        datasetLabel: string,
        value: number
      ) => {
        const item = data.players[index];
        if (!item) {
          return `${datasetLabel}: ${value}% (No data available)`;
        }

        if (datasetLabel === "Win Percent") {
          return `${datasetLabel}: ${value}% (${item.twoBaseWins}/${item.totalWinGames} wins)`;
        } else if (datasetLabel === "Loss Percent") {
          return `${datasetLabel}: ${value}% (${item.twoBaseLosses}/${item.totalLossGames} losses)`;
        } else {
          return `${datasetLabel}: ${value}%`;
        }
      };

      return {
        labels,
        datasets,
        title: "<= 2 Base Win/Loss Percentage",
        tooltipData,
      };
    } else {
      const labels = data.matchups.map((item) => item.matchup);
      const datasets = [
        {
          label: "Win Percent",
          data: data.matchups.map((item) => item.twoBaseWinPercent),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Loss Percent",
          data: data.matchups.map((item) => item.twoBaseLossPercent),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Difference Percent",
          data: data.matchups.map((item) => item.diffPercent),
          borderColor: "rgba(200, 200, 200, 1)",
          backgroundColor: "rgba(200, 200, 200, 1)",
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
        },
      ];
      const tooltipData = (
        index: number,
        datasetLabel: string,
        value: number
      ) => {
        const item = data.matchups[index];
        if (!item) {
          return `${datasetLabel}: ${value}% (No data available)`;
        }

        if (datasetLabel === "Win Percent") {
          return `${datasetLabel}: ${value}% (${item.twoBaseWins}/${item.totalWinGames} wins)`;
        } else if (datasetLabel === "Loss Percent") {
          return `${datasetLabel}: ${value}% (${item.twoBaseLosses}/${item.totalLossGames} losses)`;
        } else {
          return `${datasetLabel}: ${value}%`;
        }
      };

      return {
        labels,
        datasets,
        title: "<= 2 Base Win/Loss Percentage",
        tooltipData,
      };
    }
  };

  const chartProps = getChartProps();

  return (
    <Fade in={true} timeout={500}>
      {isXS ? (
        <Placeholder message="Increase your screen size to view the chart" />
      ) : (
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            marginTop: "1rem",
            padding: "20px",
            backgroundColor: "#1f2937",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: {
              xs: "100%",
              sm: "600px",
              md: "900px",
              lg: "1100px",
              xl: "1400px",
            },
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
            <Button
              variant="outlined"
              onMouseEnter={() => setChartType("Players")}
              sx={{
                color: "#10b981",
                borderColor:
                  chartType === "Players" ? "#10b981" : "transparent",
                backgroundColor: "#374151",
                "&:hover": { borderColor: "#10b981" },
              }}
            >
              Players
            </Button>
            <Button
              variant="outlined"
              onMouseEnter={() => setChartType("Matchups")}
              sx={{
                color: "#10b981",
                borderColor:
                  chartType === "Matchups" ? "#10b981" : "transparent",
                backgroundColor: "#374151",
                "&:hover": { borderColor: "#10b981" },
              }}
            >
              Matchups
            </Button>
            <MuiTooltip
              title={
                <div>
                  <Typography variant="body2" component="span">
                    SSL Autumn 2024. Loss Percent is when the winning
                    opponent/race used only 1-2 bases. A 3rd base must be
                    complete and on location for at least 1 minute to be
                    counted; 45 seconds in ZvZ.
                  </Typography>
                </div>
              }
            >
              <IconButton>
                <InfoIcon
                  sx={{
                    color: "#374151",
                    "&:hover": { color: "#10b981" },
                  }}
                />
              </IconButton>
            </MuiTooltip>
          </div>
          <LowBaseChart
            labels={chartProps.labels}
            datasets={chartProps.datasets}
            title={chartProps.title}
            tooltipData={chartProps.tooltipData}
          />
        </Box>
      )}
    </Fade>
  );
};

export default LowBaseCharts;
