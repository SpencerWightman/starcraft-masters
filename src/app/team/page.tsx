"use client";
import React, { useState } from "react";
import { Box, Modal, Grid2, IconButton, Paper } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import DraftTeam from "../../components/teams/draftTeam";
import CollapsedView from "../../components/teams/collapsedView";
import ExpandedView from "../../components/teams/expandedView";
import {
  PlayerSummaries,
  PlayerSummary,
  PlayerRecent,
  RecentMatch,
} from "../types/teamTypes";
import playerSummariesJson from "data/playerSummaries.json";
import playerRecentJson from "data/playerRecents.json";

const playerSummaries: PlayerSummaries = playerSummariesJson;
const playerRecent: PlayerRecent = playerRecentJson;

const PlayerList: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerSummary | null>(
    null
  );
  const [recentMatches, setRecentMatches] = useState<RecentMatch[]>([]);
  const [draftTeam, setDraftTeam] = useState<PlayerSummary[]>([]);

  const handlePlayerClick = (player: PlayerSummary) => {
    setSelectedPlayer(player);
    setRecentMatches(playerRecent[player.id] || []);
  };

  const handleToggleSelect = (player: PlayerSummary) => {
    setDraftTeam((prev) =>
      prev.find((p) => p.id === player.id)
        ? prev.filter((p) => p.id !== player.id)
        : [...prev, player]
    );
  };

  const handleCloseModal = () => setSelectedPlayer(null);

  return (
    <Box sx={{ padding: 4 }}>
      <DraftTeam selectedPlayers={draftTeam} />
      <Grid2 container spacing={3}>
        {Object.entries(playerSummaries).map(([key, player]) => (
          <Grid2
            key={key}
            sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" } }}
          >
            <Paper sx={{ position: "relative", padding: 2, gap: 2 }}>
              <IconButton
                onClick={() => handleToggleSelect(player)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  color: draftTeam.some((p) => p.id === player.id)
                    ? "#FFD700"
                    : "#f3f4f6",
                }}
              >
                {draftTeam.some((p) => p.id === player.id) ? (
                  <CheckCircle />
                ) : (
                  <Cancel />
                )}
              </IconButton>
              <CollapsedView
                player={player}
                onClick={() => handlePlayerClick(player)}
              />
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      <Modal open={!!selectedPlayer} onClose={handleCloseModal}>
        <Box
          sx={{ backgroundColor: "#1E293B", padding: 4, borderRadius: "8px" }}
        >
          {selectedPlayer && (
            <ExpandedView
              player={selectedPlayer}
              recentMatches={recentMatches}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PlayerList;
