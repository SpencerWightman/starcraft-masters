"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PlayerTable from "../../components/teams/PlayerListTable";
import PlayerDraft from "../../components/teams/PlayerDraft";
import PlayerDraftChart from "../../components/teams/PlayerDraftChart";
import PlayerDraftDetails from "../../components/teams/PlayerDraftDetails";
import playerSummariesJson from "data/draftData15-18.json";
import { PlayerSummaries, PlayerSummary } from "../types/teamTypes";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const PlayerList: React.FC = () => {
  const playerList: PlayerSummary[] = Object.values(playerSummaries);

  const [selectedPlayers, setSelectedPlayers] = useState<PlayerSummary[]>([]);
  const [viewMode, setViewMode] = useState<"details" | "chart">("details");

  const addPlayerToDraft = (player: PlayerSummary) => {
    const selectedPlayersInTier = selectedPlayers.reduce((acc, p) => {
      acc[p.tier] = (acc[p.tier] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const maxSlots: Record<number, number> = {
      0: 2,
      1: 5,
      2: 8,
      3: 11,
      4: 14,
    };

    const maxPlayers = 14;

    const isAlreadySelected = selectedPlayers.some(
      (selectedPlayer) => selectedPlayer.player.handle === player.player.handle
    );

    if (isAlreadySelected) {
      setSelectedPlayers((prev) =>
        prev.filter(
          (selectedPlayer) =>
            selectedPlayer.player.handle !== player.player.handle
        )
      );
      return;
    }

    const totalSelectedPlayers = selectedPlayers.length;

    if (totalSelectedPlayers >= maxPlayers) {
      return;
    }

    const playerTier = player.tier;
    const selectedTiers = selectedPlayers.map((p) => p.tier);
    let lowestTier = Math.min(...selectedTiers);
    lowestTier = lowestTier === 0 ? 1 : lowestTier;

    if (playerTier === 0) {
      let cumulativeSelectedPlayers = 0;
      for (let i = lowestTier; i >= 0; i--) {
        cumulativeSelectedPlayers += selectedPlayersInTier[i] || 0;
      }

      if (
        cumulativeSelectedPlayers >= maxSlots[lowestTier] ||
        selectedPlayersInTier[0] === 2
      ) {
        return;
      }
    } else {
      let cumulativeSelectedPlayers = 0;
      for (let i = playerTier; i >= 0; i--) {
        cumulativeSelectedPlayers += selectedPlayersInTier[i] || 0;
      }

      if (cumulativeSelectedPlayers >= maxSlots[playerTier]) {
        return;
      }
    }

    setSelectedPlayers((prev) => [...prev, player]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: {
              xs: "1 1 100%",
              md: "3 1 60%",
            },
          }}
        >
          <PlayerDraft selectedPlayers={selectedPlayers} />
        </Box>

        <Box
          sx={{
            flex: {
              xs: "1 1 100%",
              md: "2 1 40%",
            },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Toggle */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Button
              variant={viewMode === "details" ? "contained" : "outlined"}
              onClick={() => setViewMode("details")}
              sx={{
                backgroundColor:
                  viewMode === "details" ? "#10b981" : "transparent",
                color: viewMode === "details" ? "#fff" : "#10b981",
                "&:hover": {
                  backgroundColor: "#10b981",
                  color: "#fff",
                },
              }}
            >
              Details
            </Button>
            <Button
              variant={viewMode === "chart" ? "contained" : "outlined"}
              onClick={() => setViewMode("chart")}
              sx={{
                backgroundColor:
                  viewMode === "chart" ? "#10b981" : "transparent",
                color: viewMode === "chart" ? "#fff" : "#10b981",
                "&:hover": {
                  backgroundColor: "#10b981",
                  color: "#fff",
                },
              }}
            >
              Chart
            </Button>
          </Box>

          {/* Toggle Components */}
          {viewMode === "details" ? (
            <PlayerDraftDetails selectedPlayers={selectedPlayers} />
          ) : (
            <PlayerDraftChart />
          )}
        </Box>
      </Box>
      <PlayerTable
        players={playerList}
        onPlayerClick={addPlayerToDraft}
        selectedPlayers={selectedPlayers}
      />
    </Box>
  );
};

export default PlayerList;
