"use client";

import React, { useState } from "react";
import { Typography, Box, IconButton, Grid2 } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { PlayerSummary } from "@/app/types/teamTypes";
import PlayerDetails from "./PlayerDetails";
import PlayerChart from "./PlayerChart";

const PlayerTable: React.FC<{
  players: PlayerSummary[];
  onPlayerClick: (player: PlayerSummary) => void;
  selectedPlayers: PlayerSummary[];
}> = ({ players, onPlayerClick, selectedPlayers }) => {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {["tier0", "tier1", "tier2", "tier3"].map((tier, index) => (
          <Grid2
            key={index}
            sx={{
              flexGrow: 1,
              flexBasis: "24%",
              maxWidth: "24%",
            }}
          >
            <Box
              sx={{
                padding: 2,
                backgroundColor: "#374151",
                borderRadius: "8px",
                textAlign: "left",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#f3f4f6",
                  fontWeight: "bold",
                  marginBottom: 2,
                  userSelect: "none",
                }}
              >
                {`Tier ${index}`}
              </Typography>
              {groupedPlayers[tier].map((player, idx) => {
                const isSelected = selectedPlayers.some(
                  (selectedPlayer) =>
                    selectedPlayer.player.handle === player.player.handle
                );

                return (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom: "1px solid #52525b",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#f3f4f6",
                          cursor: "pointer",
                          userSelect: "none",
                          "&:hover": {
                            color: "#FFD700",
                          },
                        }}
                        onClick={() => onPlayerClick(player)}
                      >
                        {player.player.handle}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      {isSelected && (
                        <IconButton size="small">
                          <CheckCircleIcon sx={{ color: "#FFD700" }} />
                        </IconButton>
                      )}
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
                          onMouseLeave={() => handleDetailsMouseLeave()}
                        />
                      </IconButton>
                      <IconButton size="small">
                        <ShowChartIcon
                          sx={{ color: "#E3AF66" }}
                          onMouseEnter={() => handleChartMouseEnter(player)}
                          onMouseLeave={() => handleChartMouseLeave()}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid2>
        ))}

        {/* Tier 4 */}
        <Grid2
          container
          sx={{
            display: "flex",
            justifyContent: "left",
            flexGrow: 1,
            flexBasis: "80%",
            maxWidth: "80%",
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
                userSelect: "none",
              }}
            >
              Tier 4
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {groupedPlayers["tier4"].map((player, idx) => {
                const isSelected = selectedPlayers.some(
                  (selectedPlayer) =>
                    selectedPlayer.player.handle === player.player.handle
                );

                return (
                  <Box
                    key={idx}
                    sx={{
                      flex: "0 1 calc(33% - 8px)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom: "1px solid #52525b",
                      borderRight: "1px solid #52525b",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#f3f4f6",
                          cursor: "pointer",
                          userSelect: "none",
                          "&:hover": {
                            color: "#FFD700", // Gold color on hover
                          },
                        }}
                        onClick={() => onPlayerClick(player)}
                      >
                        {player.player.handle}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      {isSelected && (
                        <IconButton size="small">
                          <CheckCircleIcon sx={{ color: "#FFD700" }} />
                        </IconButton>
                      )}
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
                          onMouseLeave={() => handleDetailsMouseLeave()}
                        />
                      </IconButton>
                      <IconButton size="small">
                        <ShowChartIcon
                          sx={{ color: "#E3AF66" }}
                          onMouseEnter={() => handleChartMouseEnter(player)}
                          onMouseLeave={() => handleChartMouseLeave()}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      {/* Details */}
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

      {/* Chart */}
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
    </Box>
  );
};

export default PlayerTable;
