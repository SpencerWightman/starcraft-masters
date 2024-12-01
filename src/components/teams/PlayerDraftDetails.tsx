import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
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
    <Paper
      elevation={3}
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
                fontSize: 18,
              }}
            >
              Matchup
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 18,
              }}
            >
              Games
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 18,
              }}
            >
              Wins
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 18,
              }}
            >
              Losses
            </TableCell>
            <TableCell
              sx={{
                color: "#f3f4f6",
                fontSize: 18,
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
                <TableCell sx={{ color: "#f3f4f6" }}>{matchup}</TableCell>
                <TableCell sx={{ color: "#f3f4f6" }}>{stats.games}</TableCell>
                <TableCell sx={{ color: "#f3f4f6" }}>{stats.wins}</TableCell>
                <TableCell sx={{ color: "#f3f4f6" }}>{stats.losses}</TableCell>
                <TableCell sx={{ color: "#f3f4f6" }}>{winRate}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PlayerDraftDetails;
