"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import PlayerDraftChart from "@/components/teams/PlayerDraftChart";
import PlayerDraftDetails from "@/components/teams/PlayerDraftDetails";
import PlayerSavedTeam from "@/components/teams/PlayerSavedTeam";
import { PlayerSummary } from "@/app/types/teamTypes";
import playerSummariesJson from "data/draftData15-18.json";
import { PlayerSummaries } from "@/app/types/teamTypes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const Team: React.FC = () => {
  const [fantasyTeam, setFantasyTeam] = useState<string[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerSummary[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { status } = useSession();

  useEffect(() => {
    const savedTeam = localStorage.getItem("FantasyTeam");
    const team = savedTeam ? JSON.parse(savedTeam) : [];
    setFantasyTeam(team);

    const filtered = Object.values(playerSummaries).filter((player) =>
      team.includes(player.player.handle)
    );
    setFilteredPlayers(filtered);
  }, []);

  return (
    <Fade in={status !== "loading"} timeout={500}>
      {status === "unauthenticated" ? (
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 600,
            margin: "auto",
            marginTop: 4,
            backgroundColor: "#374151",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              color: "rgba(243, 244, 246, 0.6)",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Log in and save a draft and compete in Brood War League
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Link href="/profile" passHref>
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  variant: "contained",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#10b981",
                  color: "#ffff",
                  borderRadius: "4px",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                SIGN UP / LOGIN
              </Typography>
            </Link>
          </Box>
        </Paper>
      ) : !filteredPlayers.length ? (
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 600,
            margin: "auto",
            marginTop: 4,
            backgroundColor: "#374151",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 1,
              color: "rgba(243, 244, 246, 0.6)",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Save a team draft to compete in Brood War League
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "block",
              marginBottom: 2,
              color: "rgba(243, 244, 246, 0.6)",
              textAlign: "center",
            }}
          >
            (or login on the browser where you saved your team)
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Link href="/draft" passHref>
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  variant: "contained",
                  backgroundColor: "#10b981",
                  color: "#ffff",
                  borderRadius: "4px",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                DRAFT
              </Typography>
            </Link>
          </Box>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              maxWidth: 1200,
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                minWidth: "300px",
                height: "100%",
              }}
            >
              <PlayerSavedTeam selectedPlayers={fantasyTeam} />
            </Box>
            <Box
              sx={{
                flex: 1,
                minWidth: "300px",
              }}
            >
              <PlayerDraftDetails selectedPlayers={filteredPlayers} />
            </Box>
          </Box>
          {!isMobile && (
            <Box sx={{ marginBottom: 6 }}>
              <PlayerDraftChart
                selectedPlayers={filteredPlayers}
                widthProp="1200px"
              />
            </Box>
          )}
        </Box>
      )}
    </Fade>
  );
};

export default Team;
