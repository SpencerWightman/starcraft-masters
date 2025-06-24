import React from "react";
import { EmojiEvents } from "@mui/icons-material";
import {
  Paper,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerDetails: React.FC<{
  player: PlayerSummary;
}> = ({ player }) => (
<Paper
  sx={{
    p: 2,
    bgcolor: "#1f2937",
    borderRadius: "8px 8px 0 0",
  }}
>
    {/* Name, Achievements */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "transparent",
        userSelect: "none",
      }}
    >
      <Tooltip
        title={
          <span style={{ userSelect: "none" }}>{player.player.handle}</span>
        }
        arrow
      >
        <Typography variant="h6" sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
          {player.player.name}
        </Typography>
      </Tooltip>
      <Tooltip
        title={<span style={{ userSelect: "none" }}>Champion</span>}
        arrow
        placement="bottom"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#FFD700" }} />
          <Typography variant="body2" sx={{ color: "#FFD700" }}>
            {player.achievements.champion}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={<span style={{ userSelect: "none" }}>Runner-Up</span>}
        arrow
        placement="bottom"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#b0bec5" }} />
          <Typography variant="body2" sx={{ color: "#f3f4f6" }}>
            {player.achievements.runnerUp}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={<span style={{ userSelect: "none" }}>RO4</span>}
        arrow
        placement="bottom"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#CD7F32" }} />
          <Typography variant="body2" sx={{ color: "#CD7F32" }}>
            {player.achievements.ro4}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  </Paper>
);

export default PlayerDetails;
