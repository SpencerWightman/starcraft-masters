"use client";

import { useEffect, useState } from "react";

type LeaderboardEntry = {
  username: string;
  points: number;
};

const CACHE_KEY = "leaderboard_cache";
const CACHE_EXPIRATION_KEY = "leaderboard_cache_expiration";
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function fetchLeaderboardFromApi(): Promise<LeaderboardEntry[]> {
  const response = await fetch("/api/leaderboard");
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  const data = await response.json();
  return data.leaderboard;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const now = Date.now();

      // Check for cached data in localStorage
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

      if (
        cachedData &&
        cacheExpiration &&
        now < parseInt(cacheExpiration, 10)
      ) {
        // Use cached data if valid
        setLeaderboard(JSON.parse(cachedData));
      } else {
        try {
          // Fetch new data from the API
          const freshData = await fetchLeaderboardFromApi();

          // Update localStorage with fresh data
          localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
          localStorage.setItem(
            CACHE_EXPIRATION_KEY,
            (now + CACHE_EXPIRATION_MS).toString()
          );

          setLeaderboard(freshData);
        } catch (error) {
          console.error("Error loading leaderboard:", error);
        }
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.points} points
          </li>
        ))}
      </ul>
    </div>
  );
}
