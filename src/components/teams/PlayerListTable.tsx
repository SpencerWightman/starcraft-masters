"use client";

import React, { useState } from "react";
import { Paper, Typography, Box, IconButton, Grid2 } from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";
import PlayerDetails from "./PlayerDetails";
import PlayerChart from "./PlayerChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShowChart from "@mui/icons-material/ShowChart";

const PlayerTable: React.FC<{
  players: PlayerSummary[];
}> = ({ players }) => {
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerSummary | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const groupedPlayers = players.reduce(
    (acc, player) => {
      if (acc[`tier${player.tier}`]) {
        acc[`tier${player.tier}`].push(player);
      }
      return acc;
    },
    { tier0: [], tier1: [], tier2: [], tier3: [], tier4: [] } as Record<
      string,
      PlayerSummary[]
    >
  );

  const handleDetailsMouseEnter = (player: PlayerSummary) => {
    setHoveredPlayer(player);
    setIsDetailsOpen(true);
  };

  const handleDetailsMouseLeave = () => {
    setHoveredPlayer(null);
    setIsDetailsOpen(false);
  };

  const handleChartMouseEnter = (player: PlayerSummary) => {
    setHoveredPlayer(player);
    setIsChartOpen(true);
  };

  const handleChartMouseLeave = () => {
    setHoveredPlayer(null);
    setIsChartOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "#1E293B",
        }}
      >
        <Grid2 container spacing={2}>
          {["tier0", "tier1", "tier2", "tier3", "tier4"].map((tier, index) => (
            <Grid2
              key={index}
              sx={{
                flexGrow: 1,
                flexBasis: {
                  xs: "100%",
                  sm: "45%",
                  md: "30%",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "45%",
                  md: "30%",
                },
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#374151",
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#f3f4f6",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  {`Tier ${index}`}
                </Typography>

                {/* List */}
                {groupedPlayers[tier].map((player, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom:
                        idx !== groupedPlayers[tier].length - 1
                          ? "1px solid #52525b"
                          : "none",
                    }}
                  >
                    {/* Name */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        key={idx}
                        sx={{
                          color: "#f3f4f6",
                          cursor: "pointer",
                        }}
                      >
                        {player.player.handle}
                      </Typography>
                    </Box>

                    {/* Icons */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <IconButton size="small">
                        <AccountCircleIcon
                          sx={{
                            color:
                              player.player.race === "Terran"
                                ? "#3b82f6"
                                : player.player.race === "Protoss"
                                ? "#10b981"
                                : player.player.race === "Zerg"
                                ? "#ef4444"
                                : "#f3f4f6",
                          }}
                          onMouseEnter={() => handleDetailsMouseEnter(player)}
                          onMouseLeave={handleDetailsMouseLeave}
                        />
                      </IconButton>
                      <IconButton size="small">
                        <ShowChart
                          sx={{ color: "#E3AF66" }}
                          onMouseEnter={() => handleChartMouseEnter(player)}
                          onMouseLeave={handleChartMouseLeave}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Paper>

      {/* Modal */}
      {isDetailsOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: "8px",
          }}
        >
          {hoveredPlayer && <PlayerDetails player={hoveredPlayer} />}
        </Box>
      )}
      {isChartOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: "8px",
          }}
        >
          {hoveredPlayer && <PlayerChart player={hoveredPlayer} />}
        </Box>
      )}
    </>
  );
};

export default PlayerTable;
