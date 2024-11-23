"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import LowBasePlayerChart from "./lowBasePlayerChart";
import LowBaseMUChart from "./lowBaseMuChart";

const LowBaseChartController: React.FC = () => {
  const [chartType, setChartType] = useState<"Players" | "Matchups">("Players");

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
          Races
        </Button>
      </div>

      <div>
        {chartType === "Players" && <LowBasePlayerChart />}
        {chartType === "Matchups" && <LowBaseMUChart />}
      </div>
    </div>
  );
};

export default LowBaseChartController;
