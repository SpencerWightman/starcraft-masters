import { season19QualifiedPlayers } from "@/constants/constants";
import { fetchLeaderboard } from "@/utils/leaderboard";
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export const revalidate = 60; // Revalidation interval

type LeaderboardEntry = {
  username: string;
  points: number;
  team: string[];
};

const LeaderboardPage = async () => {
  try {
    const leaderboard: LeaderboardEntry[] = await fetchLeaderboard();

    return (
      <Box
        sx={{
          backgroundColor: "#1f2937",
          maxWidth: "100vw",
          overflowX: "hidden",
          paddingBottom: "2rem",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "rgba(243, 244, 246, 0.6)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ASL Spring 2025 Leaderboard
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            margin: "1rem auto",
            backgroundColor: "#1f2937",
            maxWidth: "95%",
            overflowX: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table sx={{ tableLayout: "auto", width: "100%", minWidth: 650 }}>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#2f3e51" : "#374151",
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
                  {entry.team.map((member, memberIndex) => (
                    <TableCell
                      key={memberIndex}
                      align="left"
                      sx={{
                        color: season19QualifiedPlayers.includes(member)
                          ? "#b39910"
                          : "rgba(243, 244, 246, 0.6)",
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
  } catch {
    return (
      <PaperPlaceholder message="Something went wrong. Reload the page in a minute." />
    );
  }
};

export default LeaderboardPage;
