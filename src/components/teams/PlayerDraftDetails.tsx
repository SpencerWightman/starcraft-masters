import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  TableHead,
} from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerDraftDetails: React.FC<{
  selectedPlayers: PlayerSummary[];
}> = ({ selectedPlayers }) => {
  const possibleMatchups = ["vsAll", "vsZ", "vsT", "vsP"];

  const combinedStats = selectedPlayers.reduce((acc, player) => {
    Object.entries(player.stats).forEach(([matchup, stats]) => {
      if (!acc[matchup]) {
        acc[matchup] = { games: 0, wins: 0, losses: 0 };
      }
      acc[matchup].games += stats.games;
      acc[matchup].wins += stats.wins;
      acc[matchup].losses += stats.losses;
    });
    return acc;
  }, {} as Record<string, { games: number; wins: number; losses: number }>);

  possibleMatchups.forEach((matchup) => {
    if (!combinedStats[matchup]) {
      combinedStats[matchup] = { games: 0, wins: 0, losses: 0 };
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 2,
        gap: 2,
        backgroundColor: "#374151",
        borderRadius: "8px",
        flex: 1,
        overflow: "auto",
        marginBottom: 2,
      }}
    >
      {/* Stats */}
      <Table
        size="small"
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          userSelect: "none",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 16,
              }}
            >
              Matchup
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 16,
              }}
            >
              Games
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 16,
              }}
            >
              Wins
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 16,
              }}
            >
              Losses
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 16,
              }}
            >
              Win Rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(combinedStats).map(([matchup, stats]) => {
            const winRate =
              stats.games > 0
                ? ((stats.wins / stats.games) * 100).toFixed(2)
                : "0.00";
            return (
              <TableRow key={matchup}>
                <TableCell sx={{ color: "#f3f4f6", fontSize: 16 }}>
                  {matchup}
                </TableCell>
                <TableCell sx={{ color: "#f3f4f6", fontSize: 16 }}>
                  {stats.games}
                </TableCell>
                <TableCell sx={{ color: "#f3f4f6", fontSize: 16 }}>
                  {stats.wins}
                </TableCell>
                <TableCell sx={{ color: "#f3f4f6", fontSize: 16 }}>
                  {stats.losses}
                </TableCell>
                <TableCell sx={{ color: "#f3f4f6", fontSize: 16 }}>
                  {winRate}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PlayerDraftDetails;
