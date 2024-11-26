"use client";

import React, { useState } from "react";
import { Box, IconButton, Grid2 } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import PlayerDetails from "../../components/teams/PlayerDetails";
import PlayerDraft from "../../components/teams/PlayerDraft";
import { PlayerSummaries, PlayerSummary } from "../types/teamTypes";
import PlayerAll from "../../components/teams/PlayerAll";
import playerSummariesJson from "data/playerSummaries.json";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const PlayerList: React.FC = () => {
  const [expandedPlayerIds, setExpandedPlayerIds] = useState<string[]>([]);
  const [draftTeam, setDraftTeam] = useState<Record<string, PlayerSummary[]>>({
    "Tier 1": [],
    "Tier 2": [],
    "Tier 3": [],
    "Tier 4": [],
  });

  const handlePlayerClick = (player: PlayerSummary) => {
    setExpandedPlayerIds((prev) =>
      prev.includes(player.id)
        ? prev.filter((id) => id !== player.id)
        : [...prev, player.id]
    );
  };

  const handleToggleSelect = (player: PlayerSummary) => {
    setDraftTeam((prev) => {
      const tier = player.tier;
      const currentTierPlayers = prev[tier] || [];

      if (currentTierPlayers.find((p) => p.id === player.id)) {
        return {
          ...prev,
          [tier]: currentTierPlayers.filter((p) => p.id !== player.id),
        };
      }

      if (currentTierPlayers.length < 2) {
        return {
          ...prev,
          [tier]: [...currentTierPlayers, player],
        };
      }

      return prev;
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Player Draft */}
      <Box sx={{ marginBottom: 4 }}>
        <PlayerDraft selectedPlayers={draftTeam} />
      </Box>

      {/* Player List */}
      <Grid2 container spacing={3}>
        {Object.entries(playerSummaries).map(([key, player]) => (
          <Grid2
            key={key}
            sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" } }}
          >
            <Box
              sx={{
                position: "relative",
                userSelect: "none",
              }}
            >
              <IconButton
                onClick={() => handleToggleSelect(player)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  color: Object.values(draftTeam).some((players) =>
                    players.some((p) => p.id === player.id)
                  )
                    ? "#FFD700"
                    : "#f3f4f6",
                }}
              >
                {Object.values(draftTeam).some((players) =>
                  players.some((p) => p.id === player.id)
                ) ? (
                  <CheckCircle />
                ) : (
                  <Cancel />
                )}
              </IconButton>

              {expandedPlayerIds.includes(player.id) ? (
                <PlayerDetails
                  player={player}
                  onClick={() => handlePlayerClick(player)}
                />
              ) : (
                <PlayerAll
                  player={player}
                  onClick={() => handlePlayerClick(player)}
                />
              )}
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default PlayerList;
