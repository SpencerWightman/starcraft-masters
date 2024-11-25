import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { PlayerSummary, RecentMatch } from "@/app/types/teamTypes";

const ExpandedView: React.FC<{
  player: PlayerSummary;
  recentMatches: RecentMatch[];
}> = ({ player }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 2,
      backgroundColor: "#1E293B",
      borderRadius: "8px",
    }}
  >
    <Typography
      variant="h4"
      sx={{ color: "#f3f4f6", fontWeight: "bold", textAlign: "center" }}
    >
      {player.name}
    </Typography>
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
        {/* Table Rows */}
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
  </Box>
);

export default ExpandedView;
