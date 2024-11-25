import React from "react";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { EmojiEvents, Star } from "@mui/icons-material";
import Image from "next/image";
import { PlayerSummary } from "@/app/types/teamTypes";

const tierColors: Record<string, string> = {
  "3": "#064e3b",
  "1": "#9F7C48",
};

const CollapsedView: React.FC<{
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
    {/* Achievements */}
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
      <Tooltip title="Champion" arrow placement="right">
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#FFD700" }} />
          <Typography variant="body2" sx={{ color: "#FFD700" }}>
            {player.achievements.champion}
          </Typography>
        </Box>
      </Tooltip>
      {/* Repeat for Runner-Up and RO4 */}
    </Box>
    {/* Tier, Name, Appearances */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Tier" arrow>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: tierColors[player.tier] || "#064e3b",
              color: "#f3f4f6",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {player.tier}
          </Box>
        </Tooltip>
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
            <Star sx={{ color: "#89CFF0" }} />
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

export default CollapsedView;
