"use client";

import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type LeaderboardEntry = {
  username: string;
  points: number;
};

const CACHE_KEY = "leaderboard_cache";
const CACHE_EXPIRATION_KEY = "leaderboard_cache_expiration";
const CACHE_LAST_UPDATED_KEY = "leaderboard_last_updated";
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

async function fetchLeaderboardFromApi(): Promise<LeaderboardEntry[]> {
  const response = await fetch("/api/leaderboard");
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  const data = await response.json();
  return data.leaderboard;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const loadLeaderboard = async () => {
      const now = Date.now();

      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);
        const lastUpdatedCache = localStorage.getItem(CACHE_LAST_UPDATED_KEY);

        if (
          cachedData &&
          cacheExpiration &&
          now < parseInt(cacheExpiration, 10)
        ) {
          setLeaderboard(JSON.parse(cachedData));
          setLastUpdated(lastUpdatedCache || "Unknown");
        } else {
          const freshData = await fetchLeaderboardFromApi();
          const updatedTime = new Date().toLocaleString();

          localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
          localStorage.setItem(
            CACHE_EXPIRATION_KEY,
            (now + CACHE_EXPIRATION_MS).toString()
          );
          localStorage.setItem(CACHE_LAST_UPDATED_KEY, updatedTime);

          setLeaderboard(freshData);
          setLastUpdated(updatedTime);
        }
      } catch {
        setError("Failed to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
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
        <Typography
          variant="h6"
          sx={{ color: "rgba(243, 244, 246, 0.6)", fontWeight: "bold" }}
        >
          Loading leaderboard...
        </Typography>
      </Paper>
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
        <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "rgba(243, 244, 246, 0.6)",
          textAlign: "center",
          fontWeight: "bold",
          padding: "1rem",
        }}
      >
        SSL Winter 2025 Leaderboard
      </Typography>

      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#9ca3af",
          }}
        >
          Last updated: {lastUpdated}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {leaderboard.map((entry, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid #2d3748",
                "&:last-child": { borderBottom: "none" },
                backgroundColor: index % 2 === 0 ? "#2f3e51" : "#374151",
              }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#e5e7eb",
                      }}
                    >
                      {entry.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9ca3af",
                      }}
                    >
                      {entry.points} points
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default LeaderboardPage;
