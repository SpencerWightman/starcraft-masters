"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import PlayerDraftChart from "../../components/teams/PlayerDraftChart";
import PlayerDraftDetails from "../../components/teams/PlayerDraftDetails";
import PlayerSavedTeam from "../../components/teams/PlayerSavedTeam";
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

  if (status === "unauthenticated") {
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
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            color: "#ffffff",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          Log in to save your team draft and compete in Brood War League
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link href="/profile" passHref>
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign up / Login
            </Typography>
          </Link>
        </Box>
      </Paper>
    );
  }

  if (!filteredPlayers.length) {
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
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            color: "#ffffff",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          Save a team draft to compete in Brood War League
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link href="/draft" passHref>
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Draft
            </Typography>
          </Link>
        </Box>
      </Paper>
    );
  }

  return (
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
          flexDirection: {
            xs: "column",
            md: "row",
          },
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
  );
};

export default Team;
