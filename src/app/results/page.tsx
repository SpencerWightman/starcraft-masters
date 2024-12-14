"use client";

import { useQuery } from "@tanstack/react-query";

type LeaderboardEntry = {
  username: string;
  points: number;
};

async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const response = await fetch("/api/leaderboard");

  if (!response.ok) {
    throw new Error(`Failed to fetch leaderboard: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data.leaderboard)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.leaderboard.map((entry: any) => ({
      username: entry.username || "Unknown",
      points: entry.points || 0,
    }));
  }

  return [];
}

export default function Leaderboard() {
  const {
    data: leaderboard,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 86400000,
    gcTime: 86400000, // 24 hr
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Failed to load leaderboard: {error.message}</div>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard?.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.points} points
          </li>
        ))}
      </ul>
    </div>
  );
}
