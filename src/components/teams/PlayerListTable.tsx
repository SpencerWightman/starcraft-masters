import React from "react";
import { Typography, Box, IconButton, Tooltip, Grid2 } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { PlayerSummary } from "@/app/types/teamTypes";
import PlayerDetails from "./PlayerDetails";

const PlayerTable: React.FC<{
  players: PlayerSummary[];
  onPlayerClick: (player: PlayerSummary) => void;
  selectedPlayers: PlayerSummary[];
}> = ({ players, onPlayerClick, selectedPlayers }) => {
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

  return (
    <Box>
      <Grid2 container spacing={2}>
        {/* Tiers 0-3 */}
        {["tier0", "tier1", "tier2", "tier3"].map((tier, index) => (
          <Grid2
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
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
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(243, 244, 246, 0.6)",
                  fontSize: 28,
                  marginBottom: 2,
                  lineHeight: 1,
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
                    <Typography
                      sx={{
                        color: "#f3f4f6",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#FFD700",
                        },
                      }}
                      onClick={() => onPlayerClick(player)}
                    >
                      {player.player.handle}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {isSelected && (
                        <IconButton size="small">
                          <CheckCircleIcon sx={{ color: "#FFD700" }} />
                        </IconButton>
                      )}
                      <Tooltip
                        title={<PlayerDetails player={player} />}
                        arrow
                        placement="top"
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
                          />
                        </IconButton>
                      </Tooltip>
                      <IconButton size="small">
                        <ShowChartIcon sx={{ color: "#E3AF66" }} />
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
          size={{
            xs: 12,
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
                color: "rgba(243, 244, 246, 0.6)",
                fontSize: 28,
                marginBottom: 2,
              }}
            >
              Tier 4
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-start",
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
                      flex: {
                        xs: "0 1 100%",
                        sm: "0 1 calc(50% - 16px)",
                        md: "0 1 calc(25% - 16px)",
                      },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom: "1px solid #52525b",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#f3f4f6",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#FFD700",
                        },
                      }}
                      onClick={() => onPlayerClick(player)}
                    >
                      {player.player.handle}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {isSelected && (
                        <IconButton size="small">
                          <CheckCircleIcon sx={{ color: "#FFD700" }} />
                        </IconButton>
                      )}
                      <Tooltip
                        title={<PlayerDetails player={player} />}
                        arrow
                        placement="top"
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
                          />
                        </IconButton>
                      </Tooltip>
                      <IconButton size="small">
                        <ShowChartIcon sx={{ color: "#E3AF66" }} />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PlayerTable;
