"use client";

import React, { useState } from "react";
import {
  Button,
  Tooltip as MuiTooltip,
  IconButton,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
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
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
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
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
        },
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

  return <Line data={chartData} options={options} />;
};

const LowBaseCharts: React.FC = () => {
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");

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
        title: "<= 2 Base Win/Loss Percentages (Players)",
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
        title: "<= 2 Base Win/Loss Percentages (Matchups)",
        tooltipData,
      };
    }
  };

  const chartProps = getChartProps();

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant={chartType === "Players" ? "contained" : "outlined"}
          onClick={() => setChartType("Players")}
          sx={{ mx: 1 }}
        >
          Players
        </Button>
        <Button
          variant={chartType === "Matchups" ? "contained" : "outlined"}
          onClick={() => setChartType("Matchups")}
          sx={{ mx: 1 }}
        >
          Matchups
        </Button>
        <MuiTooltip
          title={
            <div>
              <Typography variant="body2" component="span">
                Win Percent: the number of wins that occurred while the winning
                player was on 1-2 bases.
              </Typography>
              <Typography variant="body2" component="span">
                Loss Percent: the number of losses that occurred while the
                winning player was 1-2 bases.
              </Typography>
              <Typography variant="body2" component="span">
                A 3rd base must have been completed and on location for at least
                1 minute prior to the end of the match to be counted; 45 seconds
                in ZvZ.
              </Typography>
            </div>
          }
          sx={{ mx: 1 }}
        >
          <IconButton>
            <InfoIcon color="primary" />
          </IconButton>
        </MuiTooltip>
      </div>
      <LowBaseChart
        labels={chartProps.labels}
        datasets={chartProps.datasets}
        title={chartProps.title}
        tooltipData={chartProps.tooltipData}
      />
    </div>
  );
};

export default LowBaseCharts;
