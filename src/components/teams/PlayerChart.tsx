import React from "react";
import { Paper, Typography } from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerChart: React.FC<{
  player: PlayerSummary;
}> = ({ player }) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 2,
      gap: 2,
      backgroundColor: "#1E293B",
      borderRadius: "8px",
    }}
  >
    {" "}
    <Typography variant="body2" sx={{ color: "#FFD700" }}>
      {player.achievements.champion}
    </Typography>
  </Paper>
);

export default PlayerChart;
