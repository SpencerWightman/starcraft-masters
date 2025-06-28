import Link from "next/link";
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import leaderboardJson from "data/leaderboards.json";
import { LeaderboardsBySeason } from "@/app/types/teamTypes";

type LeaderboardEntry = {
  username: string;
  points: number;
  team: string[];
};

const history: LeaderboardsBySeason = leaderboardJson;

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const { season } = await searchParams;
  const historical = Object.keys(history);
  const seasons = ["ASL Summer 2025", ...historical];
  const selected = seasons.includes(season ?? "") ? season! : "ASL Summer 2025";

  const idx = seasons.indexOf(selected);
  const prev = idx < seasons.length - 1 ? seasons[idx + 1] : null;
  const next = idx > 0 ? seasons[idx - 1] : null;

  let leaderboard: LeaderboardEntry[];
  if (selected === "ASL Summer 2025") {
    const res = await fetch("/api/leaderboard");
    if (!res.ok) {
      return (
        <PaperPlaceholder message="Failed to load ASL Summer 2025 leaderboard. Try again in a minute." />
      );
    }

    leaderboard = (await res.json()) as LeaderboardEntry[];
  } else {
    leaderboard = history[selected] ?? [];
  }

  return (
    <Box
      sx={{
        backgroundColor: "#1f2937",
        userSelect: "text",
        paddingBottom: "2rem",
        minHeight: "100vh",
      }}
    >
      {/* nav */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {prev ? (
          <IconButton
            component={Link}
            href={`/leaderboard?season=${encodeURIComponent(prev)}`}
            size="small"
            sx={{ color: "rgba(243,244,246,0.6)" }}
          >
            <ChevronLeft />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        )}

        <Typography
          variant="h5"
          component="h1"
          sx={{
            mx: 4,
            color: "rgba(243,244,246,0.6)",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {selected === "ASL Summer 2025" ? "ASL Summer 2025" : selected}
        </Typography>

        {next ? (
          <IconButton
            component={Link}
            href={`/leaderboard?season=${encodeURIComponent(next)}`}
            size="small"
            sx={{ color: "rgba(243,244,246,0.6)" }}
          >
            <ChevronRight />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        )}
      </Box>

      {/* table */}
      <TableContainer
        component={Paper}
        sx={{
          margin: "1rem auto",
          backgroundColor: "#1f2937",
          maxWidth: "95%",
          overflowX: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Table sx={{ tableLayout: "auto", width: "100%", minWidth: 650 }}>
          <TableBody>
            {leaderboard.map((entry, i) => (
              <TableRow
                key={entry.username}
                sx={{
                  backgroundColor: i % 2 === 0 ? "#2f3e51" : "#374151",
                  cursor: "default",
                }}
              >
                <TableCell
                  align="left"
                  sx={{
                    color: "#10b981",
                    padding: "8px",
                    borderBottom: "none",
                  }}
                >
                  {entry.points}
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "#e5e7eb",
                    padding: "8px",
                    borderBottom: "none",
                  }}
                >
                  {entry.username}
                </TableCell>

                {entry.team.map((member, mi) => (
                  <TableCell
                    key={mi}
                    align="left"
                    sx={{
                      color: "rgba(243,244,246,0.6)",
                      padding: "8px",
                      borderBottom: "none",
                    }}
                  >
                    {member}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
