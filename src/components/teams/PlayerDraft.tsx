import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerDraft: React.FC<{
  selectedPlayers: PlayerSummary[];
}> = ({ selectedPlayers }) => {
  return (
    <Box>
      <Grid2
        sx={{
          padding: 2,
          backgroundColor: "#374151",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#f3f4f6", fontWeight: "bold", marginBottom: 2 }}
        >
          Team
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
          }}
        >
          {[...Array(14)].map((_, slotIndex) => {
            const player = selectedPlayers[slotIndex];
            return (
              <Box
                key={slotIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  backgroundColor: "#374151",
                  padding: 2,
                  borderRadius: "8px",
                  minHeight: "80px",
                }}
              >
                {player ? (
                  <Typography
                    variant="h6"
                    sx={{ color: "#f3f4f6", fontWeight: "bold" }}
                  >
                    {player.player.handle}
                  </Typography>
                ) : (
                  <Typography sx={{ color: "#94A3B8", fontStyle: "italic" }}>
                    Empty
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Grid2>
    </Box>
  );
};

export default PlayerDraft;
