"use client";

import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import PlayerGrid from "@/components/teams/PlayerGrid";
import { selectPlayerDraft } from "@/utils/selectPlayerDraft";
import { deselectPlayerDraft } from "@/utils/deselectPlayerDraft";
import PlayerDraft from "@/components/teams/PlayerDraft";
import PlayerDraftChart from "@/components/teams/PlayerDraftChart";
import PlayerDraftDetails from "@/components/teams/PlayerDraftDetails";
import playerSummariesJson from "data/draftData15-18.json";
import { PlayerSummaries, PlayerSummary } from "@/app/types/teamTypes";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const PlayerList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const playerList: PlayerSummary[] = Object.values(playerSummaries);

  const [selectedPlayers, setSelectedPlayers] = useState<PlayerSummary[]>([]);
  const [tierMaxSlots, setTierMaxSlots] = useState<Record<number, number>>({
    0: 2,
    1: 3,
    2: 3,
    3: 3,
    4: 4,
  });

  const groupedPlayers = playerList.reduce(
    (acc, player) => {
      if (acc[`${player.tier}`]) {
        acc[`${player.tier}`].push(player);
      }
      return acc;
    },
    { 0: [], 1: [], 2: [], 3: [], 4: [] } as Record<string, PlayerSummary[]>
  );

  const addPlayerToDraft = (player: PlayerSummary) => {
    const isAlreadySelected = selectedPlayers.some(
      (selectedPlayer) => selectedPlayer.player.handle === player.player.handle
    );

    if (isAlreadySelected) {
      return deselectPlayerDraft(player, setSelectedPlayers, setTierMaxSlots);
    }

    return selectPlayerDraft(
      player,
      setSelectedPlayers,
      setTierMaxSlots,
      tierMaxSlots
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        marginRight: {
          xs: 0,
          md: "0.8rem",
        },
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
            flexDirection: "column",
            gap: 1,
          }}
        >
          <PlayerDraft
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setTierMaxSlots={setTierMaxSlots}
          />
          <PlayerDraftDetails selectedPlayers={selectedPlayers} />
          {!isMobile && (
            <>
              <PlayerDraftChart
                selectedPlayers={selectedPlayers}
                widthProp="500px"
              />
            </>
          )}
        </Box>
      </Box>

      <PlayerGrid
        groupedPlayers={groupedPlayers}
        onPlayerClick={addPlayerToDraft}
        selectedPlayers={selectedPlayers}
        maxSlots={tierMaxSlots}
      />
    </Box>
  );
};

export default PlayerList;
