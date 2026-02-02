export const revalidate = 10;

import Link from "next/link";
import { ChevronLeft, ChevronRight, EmojiEvents } from "@mui/icons-material";
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
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";
import {
  currentSeasonName,
  leaderboardSeason,
  season21QualifiedPlayers,
} from "@/constants/constants";

type LeaderboardEntry = {
  username: string;
  points: number;
  team: string[];
};

const history: LeaderboardsBySeason = leaderboardJson;

type TrophyColorKey = "gold" | "silver" | "bronze";

const trophyPalette: Record<TrophyColorKey, string> = {
  gold: "#d4af37",
  silver: "#c0c0c0",
  bronze: "#cd7f32",
};

const defaultTrophyOrder: TrophyColorKey[] = ["gold", "silver", "bronze"];

const seasonalTrophies: Record<
  string,
  Partial<Record<string, TrophyColorKey>>
> = {
  "20": {
    zelevin: "gold",
    huhuh: "silver",
    beaverciv: "bronze",
  },
  "19": {
    lurkerbomb: "gold",
    mob: "silver",
    zelevin: "bronze",
    fiik: "bronze",
    nozh: "bronze",
  },
};

const seasonNumberByName: Record<string, string> = {
  [currentSeasonName]: leaderboardSeason,
  "ASL Season 20": "20",
  "ASL Season 19": "19",
};

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const { season } = await searchParams;
  const historical = Object.keys(history).sort((a, b) => {
    const aNum = Number(seasonNumberByName[a] ?? 0);
    const bNum = Number(seasonNumberByName[b] ?? 0);
    return bNum - aNum;
  });
  const seasons = [currentSeasonName, ...historical];
  const selected = seasons.includes(season ?? "") ? season! : currentSeasonName;
  const selectedSeasonNumber = seasonNumberByName[selected];

  const idx = seasons.indexOf(selected);
  const prev = idx < seasons.length - 1 ? seasons[idx + 1] : null;
  const next = idx > 0 ? seasons[idx - 1] : null;

  let leaderboard: LeaderboardEntry[];
  if (selected === currentSeasonName) {
    const res = await fetch("https://www.broodwarleague.com/api/leaderboard");

    if (!res.ok) {
      return (
        <PaperPlaceholder message="Leaderboard failed to fetch. Try again soon." />
      );
    }

    leaderboard = (await res.json()) as LeaderboardEntry[];
  } else {
    leaderboard = history[selected] ?? [];
  }

  const hasNoData = leaderboard.length === 0;

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
          {selected}
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

      {hasNoData ? (
        <PaperPlaceholder
          message={`${currentSeasonName} has not yet started.`}
        />
      ) : (
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
                    align="center"
                    sx={{
                      width: 40,
                      padding: "8px",
                      borderBottom: "none",
                    }}
                  >
                    {(() => {
                      if (
                        !selectedSeasonNumber ||
                        !seasonalTrophies[selectedSeasonNumber]
                      ) {
                        return null;
                      }

                      const usernameKey = entry.username.toLowerCase();
                      const manualColorKey = selectedSeasonNumber
                        ? seasonalTrophies[selectedSeasonNumber]?.[usernameKey]
                        : undefined;
                      const defaultColorKey =
                        manualColorKey === undefined &&
                        i < defaultTrophyOrder.length
                          ? defaultTrophyOrder[i]
                          : undefined;
                      const colorKey = manualColorKey ?? defaultColorKey;

                      if (!colorKey) return null;

                      return (
                        <EmojiEvents
                          aria-label={`${colorKey} trophy`}
                          sx={{
                            color: trophyPalette[colorKey],
                            fontSize: "1.25rem",
                            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.4))",
                          }}
                        />
                      );
                    })()}
                  </TableCell>

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
                        color:
                          selected === currentSeasonName &&
                          season21QualifiedPlayers.includes(member)
                            ? "#E49B0F"
                            : "rgba(243,244,246,0.6)",
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
      )}
    </Box>
  );
}
