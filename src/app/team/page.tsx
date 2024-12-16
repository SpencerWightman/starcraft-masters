"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import PlayerDraftChart from "../../components/teams/PlayerDraftChart";
import PlayerDraftDetails from "../../components/teams/PlayerDraftDetails";
import PlayerSavedTeam from "../../components/teams/PlayerSavedTeam";
import { PlayerSummary } from "@/app/types/teamTypes";
import playerSummariesJson from "data/draftData15-18.json";
import { PlayerSummaries } from "../types/teamTypes";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const PlayerList: React.FC = () => {
  const savedTeam = localStorage.getItem("FantasyTeam");
  const fantasyTeam = savedTeam ? JSON.parse(savedTeam) : [];
  console.log(savedTeam);
  const filteredPlayers: PlayerSummary[] = Object.values(
    playerSummaries
  ).filter((player) => fantasyTeam.includes(player.player.handle));

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
            color: "#6b7280",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          Log in to save your team draft and compete in Brood War League
        </Typography>
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
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 4,
          width: "100%",
          maxWidth: 1200,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: "300px",
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

      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <PlayerDraftChart selectedPlayers={filteredPlayers} />
      </Box>
    </Box>
  );
};

export default PlayerList;
