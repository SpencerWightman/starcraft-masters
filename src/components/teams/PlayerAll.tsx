import React from "react";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { EmojiEvents, Star } from "@mui/icons-material";
import Image from "next/image";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerAll: React.FC<{
  player: PlayerSummary;
  onClick: () => void;
}> = ({ player, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 2,
      gap: 2,
      backgroundColor: "#1E293B",
      borderRadius: "8px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 1,
        paddingRight: 0,
        alignSelf: "end",
      }}
    >
      {/* Achievements */}
      <Tooltip title="Champion" arrow placement="right">
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#FFD700" }} />
          <Typography variant="body2" sx={{ color: "#FFD700" }}>
            {player.achievements.champion}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip title="Runner-Up" arrow placement="right">
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#b0bec5" }} />
          <Typography variant="body2" sx={{ color: "#f3f4f6" }}>
            {player.achievements.runnerUp}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip title="RO4" arrow placement="right">
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#CD7F32" }} />
          <Typography variant="body2" sx={{ color: "#CD7F32" }}>
            {player.achievements.ro4}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
    {/* Name, Appearances */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title={player.id} arrow>
          <Typography
            variant="h6"
            sx={{ color: "#f3f4f6", fontWeight: "bold" }}
          >
            {player.name}
          </Typography>
        </Tooltip>
        <Tooltip title="Appearances" arrow>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star sx={{ color: "#10b981" }} />
            <Typography variant="body2" sx={{ color: "#C0C0C0" }}>
              {player.appearances}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
      <Image
        src={player.image}
        alt={player.name}
        width={120}
        height={120}
        style={{ borderRadius: "8px", objectFit: "cover" }}
      />
    </Box>
  </Paper>
);

export default PlayerAll;
