"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Fade,
  CircularProgress,
} from "@mui/material";

type LeaderboardEntry = {
  username: string;
  points: number;
  team: string[];
};

async function fetchLeaderboardFromApi(): Promise<LeaderboardEntry[]> {
  const response = await fetch("/api/leaderboard");
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  const data = await response.json();
  return data.leaderboard;
}

const Leaderboard: React.FC = () => {
  const {
    data: leaderboard,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboardFromApi,
    staleTime: 5000,
    gcTime: 20000,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress sx={{ color: "#10b981" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 4,
          backgroundColor: "#374151",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#10b981", fontWeight: "bold" }}>
          Something went wrong. Try again soon.
        </Typography>
      </Paper>
    );
  }

  return (
    <Fade in={!isLoading} timeout={500}>
      <Box
        sx={{
          backgroundColor: "#1f2937",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "rgba(243, 244, 246, 0.6)",
            textAlign: "center",
            fontWeight: "bold",
            padding: "1rem",
          }}
        >
          SSL Spring 2025 Leaderboard
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            margin: "1rem auto",
            maxWidth: "95%",
            overflowX: "auto",
          }}
        >
          <Table
            sx={{
              tableLayout: "auto",
              width: "100%",
              minWidth: 650,
              backgroundColor: "#1f2937",
            }}
          >
            <TableBody sx={{ backgroundColor: "#1f2937" }}>
              {leaderboard?.map((entry, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#2f3e51" : "#374151",
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      color: "#10b981",
                      borderBottom: "none",
                      padding: "8px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {entry.points}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: "#e5e7eb",
                      borderBottom: "none",
                      padding: "8px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {entry.username}
                  </TableCell>
                  {entry.team.map((member, memberIndex) => (
                    <TableCell
                      key={memberIndex}
                      align="left"
                      sx={{
                        color: "rgba(243, 244, 246, 0.6)",
                        borderBottom: "none",
                        padding: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {member}
                    </TableCell>
                  ))}
                  {Array.from({ length: 4 - entry.team.length }).map((_, i) => (
                    <TableCell
                      key={`placeholder-${i}`}
                      align="center"
                      sx={{
                        backgroundColor: "#2f3e51",
                        borderBottom: "none",
                        padding: "8px",
                      }}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  );
};

export default Leaderboard;
