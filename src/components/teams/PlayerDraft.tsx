import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerDraft: React.FC<{
  selectedPlayers: PlayerSummary[];
}> = ({ selectedPlayers }) => {
  return (
    <Box>
      <Grid2
        container
        sx={{
          padding: 2,
          backgroundColor: "#374151",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "rgba(243, 244, 246, 0.6)",
            fontSize: 28,
            marginBottom: 2,
            userSelect: "none",
            lineHeight: 1,
            width: "100%",
          }}
        >
          Team
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(7, 1fr)",
            },
            gridTemplateRows: "auto",
            width: "100%",
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
                  backgroundColor: "#374151",
                  borderRadius: "8px",
                  minHeight: "80px",
                }}
              >
                {player ? (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#f3f4f6",
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
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
