import React from "react";
import { Typography, Box, IconButton, Tooltip, Grid2 } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { PlayerSummary } from "@/app/types/teamTypes";
import PlayerDetails from "./PlayerDetails";
import PlayerChart from "./PlayerChart";

const PlayerGrid: React.FC<{
  groupedPlayers: Record<string, PlayerSummary[]>;
  onPlayerClick: (player: PlayerSummary) => void;
  selectedPlayers: PlayerSummary[];
  maxSlots: Record<number, number>;
}> = ({ groupedPlayers, onPlayerClick, selectedPlayers, maxSlots }) => {
  const cumulativeFree = (tier: number) =>
    Object.entries(maxSlots)
      .filter(([k]) => Number(k) <= tier)
      .reduce((sum, [, free]) => (sum + free) as number, 0);

  return (
    <Box>
      <Grid2 container spacing={2}>
        {/* Tiers 0-3 */}
        {["0", "1", "2", "3"].map((tier, index) => {
          const total = cumulativeFree(index);
          return (
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
                      marginBottom: 2,
                      lineHeight: 1,
                      textAlign: "left",
                      userSelect: "none",
                    }}
                  >
                    {`Tier ${index}`}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(243, 244, 246, 0.6)",
                      fontSize: 14,
                      marginBottom: 2,
                      lineHeight: 1,
                      textAlign: "right",
                      userSelect: "none",
                    }}
                  >
                    {`${total}`}
                  </Typography>
                </Box>
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
                        cursor: "pointer",
                        "&:hover": {
                          "@media (min-width:600px)": {
                            "& > .handle": {
                              color: "#10b981",
                            },
                          },
                        },
                      }}
                      onClick={() => onPlayerClick(player)}
                    >
                      <Typography
                        className="handle"
                        sx={{
                          color: isSelected ? "#10b981" : "#f3f4f6",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        {player.player.handle}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip
                          title={
                            <Box
                              sx={{
                                display: { xs: "none", md: "block" },
                              }}
                            >
                              <PlayerDetails player={player} />
                              <PlayerChart player={player} />
                            </Box>
                          }
                          placement="bottom"
                          leaveDelay={200}
                          slotProps={{
                            tooltip: {
                              sx: {
                                backgroundColor: "transparent",
                                maxWidth: "none",
                                boxShadow: "none",
                                padding: 0,
                              },
                            },
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
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Grid2>
          );
        })}

        {/* Tier 4 */}
        <Grid2
          size={{
            xs: 12,
          }}
        >
          <Box
            sx={{
              paddingLeft: 2,
              paddingTop: 2,
              paddingBottom: 2,
              backgroundColor: "#374151",
              borderRadius: "8px",
              textAlign: "left",
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
                  marginBottom: 2,
                  lineHeight: 1,
                  userSelect: "none",
                  textAlign: "left",
                }}
              >
                {`Tier 4`}
              </Typography>
              <Typography
                className="handle"
                variant="h6"
                sx={{
                  color: "rgba(243, 244, 246, 0.6)",
                  fontSize: 14,
                  marginBottom: 2,
                  lineHeight: 1,
                  textAlign: "right",
                  paddingRight: 2,
                  userSelect: "none",
                }}
              >
                {`${cumulativeFree(4)}`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              {groupedPlayers["4"].map((player, idx) => {
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
                        md: "0 1 calc(20% - 16px)",
                      },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom: "1px solid #52525b",
                      borderRight: "1px solid #52525b",
                      cursor: "pointer",
                      "&:hover": {
                        "@media (min-width:600px)": {
                          "& > .handle": {
                            color: "#10b981",
                          },
                        },
                      },
                    }}
                    onClick={() => onPlayerClick(player)}
                  >
                    <Typography
                      className="handle"
                      sx={{
                        color: isSelected ? "#10b981" : "#f3f4f6",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      {player.player.handle}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip
                        title={
                          <Box
                            sx={{
                              display: { xs: "none", md: "block" },
                            }}
                          >
                            <PlayerDetails player={player} />{" "}
                            <PlayerChart player={player} />
                          </Box>
                        }
                        placement="bottom"
                        leaveDelay={200}
                        slotProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: "transparent",
                              maxWidth: "none",
                              boxShadow: "none",
                              padding: 0,
                            },
                          },
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
                          />
                        </IconButton>
                      </Tooltip>
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

export default PlayerGrid;
