"use client";

import React, { useMemo, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import PlayerGrid from "@/components/teams/PlayerGrid";
import PlayerDraft from "@/components/teams/PlayerDraft";
import PlayerDraftChart from "@/components/teams/PlayerDraftChart";
import playerSummariesJson from "data/historicalData.json";
import { PlayerSummaries, PlayerSummary } from "@/app/types/teamTypes";
import { allocateSlots } from "@/utils/allocateSlots";

const playerSummaries: PlayerSummaries = playerSummariesJson;

const PlayerList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const playerList: PlayerSummary[] = Object.values(playerSummaries);

  const [selectedPlayers, setSelectedPlayers] = useState<PlayerSummary[]>([]);

  const { remaining: tierMaxSlots } = useMemo(
    () => allocateSlots(selectedPlayers),
    [selectedPlayers]
  );

  const groupedPlayers = playerList.reduce(
    (acc, player) => {
      if (acc[`${player.tier}`]) {
        acc[`${player.tier}`].push(player);
      }
      return acc;
    },
    { 0: [], 1: [], 2: [], 3: [], 4: [] } as Record<string, PlayerSummary[]>
  );

  const togglePlayer = (player: PlayerSummary) => {
    setSelectedPlayers((prev) => {
      const already = prev.some(
        (p) => p.player.handle === player.player.handle
      );
      const next = already
        ? prev.filter((p) => p.player.handle !== player.player.handle)
        : [...prev, player];

      const { ok } = allocateSlots(next);
      return ok ? next : prev;
    });
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
          />
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
        onPlayerClick={togglePlayer}
        selectedPlayers={selectedPlayers}
        maxSlots={tierMaxSlots}
      />
    </Box>
  );
};

export default PlayerList;
