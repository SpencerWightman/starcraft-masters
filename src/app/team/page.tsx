"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import PlayerTable from "../../components/teams/PlayerListTable";
import PlayerDraft from "../../components/teams/PlayerDraft";
import playerSummariesJson from "data/draftData15-18.json";
import { PlayerSummaries, PlayerSummary } from "../types/teamTypes";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const PlayerList: React.FC = () => {
  const playerList: PlayerSummary[] = Object.values(playerSummaries);

  const [selectedPlayers, setSelectedPlayers] = useState<PlayerSummary[]>([]);
  const addPlayerToDraft = (player: PlayerSummary) => {
    const tierCounts = selectedPlayers.reduce((acc, p) => {
      acc[p.tier] = (acc[p.tier] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Check if player selected
    const isAlreadySelected = selectedPlayers.some(
      (selectedPlayer) => selectedPlayer.player.handle === player.player.handle
    );

    if (isAlreadySelected) {
      // Remove player if selected
      setSelectedPlayers((prev) =>
        prev.filter(
          (selectedPlayer) =>
            selectedPlayer.player.handle !== player.player.handle
        )
      );
    } else {
      // Add player if constraints are met
      if (
        // Tier selection limits
        selectedPlayers.length >= 14 ||
        (player.tier === 0 && (tierCounts[0] || 0) >= 2) ||
        (player.tier === 1 && (tierCounts[1] || 0) >= 3) ||
        (player.tier === 2 && (tierCounts[2] || 0) >= 3) ||
        (player.tier === 3 && (tierCounts[3] || 0) >= 7) ||
        (player.tier === 4 && (tierCounts[4] || 0) >= 14)
      ) {
        return;
      }

      setSelectedPlayers((prev) => [...prev, player]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <PlayerDraft selectedPlayers={selectedPlayers} />
      <PlayerTable
        players={playerList}
        onPlayerClick={addPlayerToDraft}
        selectedPlayers={selectedPlayers}
      />
    </Box>
  );
};

export default PlayerList;
