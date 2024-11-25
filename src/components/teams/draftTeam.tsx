import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { PlayerSummary } from "@/app/types/teamTypes";

const DraftTeam: React.FC<{ selectedPlayers: PlayerSummary[] }> = ({
  selectedPlayers,
}) => (
  <Box sx={{ padding: 2, backgroundColor: "#2D3748", borderRadius: "8px" }}>
    <Typography variant="h5" sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
      Draft Team
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {selectedPlayers.map((player) => (
        <Box
          key={player.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#1E293B",
            padding: 2,
            borderRadius: "8px",
          }}
        >
          <Image
            src={player.image}
            alt={player.name}
            width={50}
            height={50}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
          <Typography variant="h6" sx={{ color: "#f3f4f6" }}>
            {player.name}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default DraftTeam;
