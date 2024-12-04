import React from "react";
import { EmojiEvents, Star } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  Box,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  Tooltip,
} from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";

const PlayerDetails: React.FC<{
  player: PlayerSummary;
}> = ({ player }) => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      backgroundColor: "#1e293b",
      borderRadius: "8px",
    }}
  >
    {/* Name, Appearances, Achievements */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "transparent",
        userSelect: "none",
      }}
    >
      <Tooltip
        title={
          <span style={{ userSelect: "none" }}>{player.player.handle}</span>
        }
        arrow
      >
        <Typography variant="h6" sx={{ color: "#f3f4f6", fontWeight: "bold" }}>
          {player.player.name}
        </Typography>
      </Tooltip>
      <Tooltip
        title={<span style={{ userSelect: "none" }}>Appearances</span>}
        arrow
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Star sx={{ color: "#10b981" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#C0C0C0",
            }}
          >
            {player.appearances}
          </Typography>
        </Box>
      </Tooltip>

      <Tooltip
        title={<span style={{ userSelect: "none" }}>Champion</span>}
        arrow
        placement="bottom"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#FFD700" }} />
          <Typography variant="body2" sx={{ color: "#FFD700" }}>
            {player.achievements.champion}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={<span style={{ userSelect: "none" }}>Runner-Up</span>}
        arrow
        placement="bottom"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#b0bec5" }} />
          <Typography variant="body2" sx={{ color: "#f3f4f6" }}>
            {player.achievements.runnerUp}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={<span style={{ userSelect: "none" }}>RO4</span>}
        arrow
        placement="bottom"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmojiEvents sx={{ color: "#CD7F32" }} />
          <Typography variant="body2" sx={{ color: "#CD7F32" }}>
            {player.achievements.ro4}
          </Typography>
        </Box>
      </Tooltip>
    </Box>

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

export default PlayerDetails;
