import React from "react";
import { Paper, Typography } from "@mui/material";

const PlayerMaps: React.FC<{}> = () => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      backgroundColor: "#374151",
      borderRadius: "8px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography variant="body2" sx={{ color: "#FFD700" }}>
      "yo"
    </Typography>
  </Paper>
);

export default PlayerMaps;
