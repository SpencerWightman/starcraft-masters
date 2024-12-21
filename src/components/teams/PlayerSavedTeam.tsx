import React from "react";
import { Box, Typography, Grid2, Paper } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

const PlayerSavedTeam: React.FC<{
  selectedPlayers: string[];
}> = ({ selectedPlayers }) => {
  const { user, error } = useUser();

  if (error || !user) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 4,
          backgroundColor: "#374151",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "rgba(243, 244, 246, 0.6)", fontWeight: "bold" }}
        >
          Something went wrong. Try again in a moment.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Grid2
        container
        sx={{
          backgroundColor: "#374151",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#374151",
            borderRadius: "8px",
            textAlign: "left",
            userSelect: "none",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "rgba(243, 244, 246, 0.6)",
                fontSize: 28,
                userSelect: "none",
                lineHeight: 1,
              }}
            >
              {String(user["https://broodwarleague.com/nickname"] || "User")}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            paddingRight: 1,
            paddingLeft: 1,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gridTemplateRows: "auto",
            width: "100%",
            "& > div": {
              minWidth: "76px",
            },
          }}
        >
          {selectedPlayers.map((player, slotIndex) => {
            return (
              <Box
                key={slotIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#374151",
                  borderRadius: "8px",
                  marginBottom: 2,
                  height: "10px",
                  userSelect: "none",
                }}
              >
                <Typography
                  sx={{
                    color: slotIndex === 14 ? "#94A3B8" : "#10b981",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: 20,
                    userSelect: "none",
                  }}
                >
                  {`${player}`}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Grid2>
    </Box>
  );
};

export default PlayerSavedTeam;
