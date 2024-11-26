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
  player: PlayerSummary;
  onClick: () => void;
}> = ({ player, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 2,
      gap: 2,
      backgroundColor: "#1E293B",
      borderRadius: "8px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {/* Name */}
    <Typography
      variant="h6"
      sx={{
        color: "#f3f4f6",
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
      }}
    >
      {player.name}
    </Typography>

    {/* Stats */}
    <Table
      size="small"
      sx={{
        backgroundColor: "transparent",
        border: "1px solid #f3f4f6",
        borderRadius: "4px",
        width: "100%",
      }}
    >
      {/* Table */}
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
            Matchup
          </TableCell>
          <TableCell sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
            Games
          </TableCell>
          <TableCell sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
            Wins
          </TableCell>
          <TableCell sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
            Losses
          </TableCell>
          <TableCell sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
            Win Rate
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(player.stats).map(([matchup, stats]) => (
          <TableRow key={matchup}>
            <TableCell sx={{ color: "#f3f4f6" }}>{matchup}</TableCell>
            <TableCell sx={{ color: "#f3f4f6" }}>{stats.games}</TableCell>
            <TableCell sx={{ color: "#f3f4f6" }}>{stats.wins}</TableCell>
            <TableCell sx={{ color: "#f3f4f6" }}>{stats.losses}</TableCell>
            <TableCell sx={{ color: "#f3f4f6" }}>{stats.winRate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default PlayerDraftDetails;
