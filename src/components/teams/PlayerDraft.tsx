import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import Image from "next/image";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerDraft: React.FC<{
  selectedPlayers: Record<string, PlayerSummary[]>;
}> = ({ selectedPlayers }) => {
  const tiers = ["1", "2", "3", "4"];

  return (
    <Box>
      <Grid2 container spacing={3}>
        {tiers.map((tier) => (
          <Grid2 key={tier}>
            <Box
              sx={{
                backgroundColor: "#1E293B",
                padding: 2,
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#f3f4f6", fontWeight: "bold", marginBottom: 2 }}
              >
                {tier}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {/* Slots */}
                {[...Array(2)].map((_, slotIndex) => {
                  const player = selectedPlayers[tier]?.[slotIndex];
                  return (
                    <Box
                      key={slotIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        backgroundColor: player ? "#1F2937" : "#334155",
                        padding: 2,
                        borderRadius: "8px",
                        minHeight: "80px",
                      }}
                    >
                      {player ? (
                        <>
                          <Image
                            src={player.image}
                            alt={player.name}
                            width={50}
                            height={50}
                            style={{ borderRadius: "8px", objectFit: "cover" }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: "#f3f4f6", fontWeight: "bold" }}
                          >
                            {player.name}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          sx={{ color: "#94A3B8", fontStyle: "italic" }}
                        >
                          Empty Slot
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default PlayerDraft;
