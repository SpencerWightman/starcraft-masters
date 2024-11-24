"use client";
import { Star, EmojiEvents } from "@mui/icons-material";
import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import playerSummaries from "data/playerSummaries.json";
import playerRecent from "data/playerRecents.json";

const tierColors: Record<string, string> = {
  "3": "#064e3b",
  "1": "#9F7C48",
};

type PlayerRecent = Record<string, (string | number)[][]>;

const Players: React.FC = () => {
  const recentData: PlayerRecent = playerRecent;

  return (
    <Box
      p={4}
      sx={{
        display: "flex",
        gap: 3,
      }}
    >
      <Box flex={1}>
        {Object.entries(playerSummaries).map(([key, player]) => {
          const recentMatches = recentData[player.id] || [];

          return (
            <Paper
              key={key}
              elevation={0}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr",
                alignItems: "center",
                gap: 2,
                padding: 2,
                backgroundColor: "transparent",
              }}
            >
              {/* Column 1 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "#f3f4f6" }}>
                  {player.id}
                </Typography>
                <Image
                  src={player.image}
                  alt={player.name}
                  width={220}
                  height={0}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Column 2 */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginTop: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#f3f4f6",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {player.name}
                  </Typography>
                  {/* Appearances */}
                  <Tooltip title="Appearances" arrow>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Star sx={{ color: "#C0C0C0" }} />
                      <Typography variant="body2" sx={{ color: "#C0C0C0" }}>
                        {player.appearances}
                      </Typography>
                    </Box>
                  </Tooltip>

                  {/* Achievements */}
                  <Tooltip title="Champion" arrow>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <EmojiEvents sx={{ color: "#FFD700" }} />
                      <Typography variant="body2" sx={{ color: "#FFD700" }}>
                        {player.achievements.champion}
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Runner-Up" arrow>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <EmojiEvents sx={{ color: "#b0bec5" }} />{" "}
                      <Typography variant="body2" sx={{ color: "#f3f4f6" }}>
                        {player.achievements.runnerUp}
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="RO4" arrow>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <EmojiEvents sx={{ color: "#CD7F32" }} />{" "}
                      <Typography variant="body2" sx={{ color: "#CD7F32" }}>
                        {player.achievements.ro4}
                      </Typography>
                    </Box>
                  </Tooltip>
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
                </Box>
                <Table
                  size="small"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "transparent",
                    border: "1px solid #f3f4f6",
                    borderRadius: "4px",
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: "#f3f4f6" }}>
                        <strong>Matchup</strong>
                      </TableCell>
                      <TableCell sx={{ color: "#f3f4f6" }}>
                        <strong>Games</strong>
                      </TableCell>
                      <TableCell sx={{ color: "#f3f4f6" }}>
                        <strong>Wins</strong>
                      </TableCell>
                      <TableCell sx={{ color: "#f3f4f6" }}>
                        <strong>Losses</strong>
                      </TableCell>
                      <TableCell sx={{ color: "#f3f4f6" }}>
                        <strong>Win Rate</strong>
                      </TableCell>
                    </TableRow>
                    {Object.entries(player.stats).map(([matchup, data]) => (
                      <TableRow key={matchup}>
                        <TableCell sx={{ color: "#f3f4f6" }}>
                          {matchup}
                        </TableCell>
                        <TableCell sx={{ color: "#f3f4f6" }}>
                          {data.games}
                        </TableCell>
                        <TableCell sx={{ color: "#f3f4f6" }}>
                          {data.wins}
                        </TableCell>
                        <TableCell sx={{ color: "#f3f4f6" }}>
                          {data.losses}
                        </TableCell>
                        <TableCell sx={{ color: "#f3f4f6" }}>
                          {data.winRate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              {/* Column 3 */}
              <Box>
                <Table
                  size="small"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "transparent",
                    border: "1px solid #f3f4f6",
                    borderRadius: "4px",
                    width: "350px",
                    maxWidth: "100%",
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        sx={{
                          color: "#f3f4f6",
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "4px",
                        }}
                      >
                        SSL Autumn '24
                      </TableCell>
                    </TableRow>
                    {recentMatches.map(
                      ([result, stage, opponent, seconds], idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            backgroundColor:
                              result === "win" ? "#06402B" : "#900C3F",
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "#f3f4f6",
                              padding: "4px",
                              textAlign: "left",
                              width: "80px",
                            }}
                          >
                            {stage}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#f3f4f6",
                              padding: "4px",
                              textAlign: "center",
                            }}
                          >
                            {opponent}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#f3f4f6",
                              padding: "4px",
                              textAlign: "right",
                              width: "60px",
                            }}
                          >
                            {`${Math.floor(Number(seconds) / 60)}:${String(
                              Number(seconds) % 60
                            ).padStart(2, "0")}`}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default Players;
