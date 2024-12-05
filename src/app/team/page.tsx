"use client";

import React, { useState, useEffect } from "react";
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
  const [tierMaxSlots, setTierMaxSlots] = useState<Record<number, number>>({
    0: 2,
    1: 5,
    2: 8,
    3: 11,
    4: 15,
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

    const defaultSlots: Record<number, number> = {
      0: 2,
      1: 5,
      2: 8,
      3: 11,
      4: 15,
    };

    if (isAlreadySelected) {
      setSelectedPlayers((prev) =>
        prev.filter(
          (selectedPlayer) =>
            selectedPlayer.player.handle !== player.player.handle
        )
      );
      setTierMaxSlots((prev) => {
        const updatedSlots = { ...prev };

        const lowerTiers = [];
        for (let tier = player.tier - 1; tier >= 0; tier--) {
          lowerTiers.push({ tier, value: updatedSlots[tier] });
        }

        type ValueGroups = { [key: number]: number[] };

        const valueGroups = lowerTiers.reduce<ValueGroups>(
          (groups, { tier, value }) => {
            if (!groups[value]) {
              groups[value] = [];
            }
            groups[value].push(tier);
            return groups;
          },
          {}
        );

        let shouldReturn = false;

        Object.values(valueGroups).forEach((tiers) => {
          if (tiers.length > 1) {
            shouldReturn = true;
            tiers.forEach((tier) => {
              updatedSlots[tier] = Math.min(
                updatedSlots[tier] + 1,
                defaultSlots[tier]
              );
            });
          }
        });

        if (shouldReturn) {
          return updatedSlots;
        }

        if (updatedSlots[player.tier] <= defaultSlots[player.tier - 4]) {
          updatedSlots[player.tier - 1] = Math.min(
            updatedSlots[player.tier - 1] + 1,
            defaultSlots[player.tier - 1]
          );
          updatedSlots[player.tier - 2] = Math.min(
            updatedSlots[player.tier - 2] + 1,
            defaultSlots[player.tier - 2]
          );
          updatedSlots[player.tier - 3] = Math.min(
            updatedSlots[player.tier - 3] + 1,
            defaultSlots[player.tier - 3]
          );
          updatedSlots[player.tier - 4] = Math.min(
            updatedSlots[player.tier - 4] + 1,
            defaultSlots[player.tier - 4]
          );
        } else if (updatedSlots[player.tier] <= defaultSlots[player.tier - 3]) {
          updatedSlots[player.tier - 1] = Math.min(
            updatedSlots[player.tier - 1] + 1,
            defaultSlots[player.tier - 1]
          );
          updatedSlots[player.tier - 2] = Math.min(
            updatedSlots[player.tier - 2] + 1,
            defaultSlots[player.tier - 2]
          );
          updatedSlots[player.tier - 3] = Math.min(
            updatedSlots[player.tier - 3] + 1,
            defaultSlots[player.tier - 3]
          );
        } else if (updatedSlots[player.tier] <= defaultSlots[player.tier - 2]) {
          updatedSlots[player.tier - 1] = Math.min(
            updatedSlots[player.tier - 1] + 1,
            defaultSlots[player.tier - 1]
          );
          updatedSlots[player.tier - 2] = Math.min(
            updatedSlots[player.tier - 2] + 1,
            defaultSlots[player.tier - 2]
          );
        } else if (updatedSlots[player.tier] <= defaultSlots[player.tier - 1]) {
          updatedSlots[player.tier - 1] = Math.min(
            updatedSlots[player.tier - 1] + 1,
            defaultSlots[player.tier - 1]
          );
        }

        return updatedSlots;
      });

      setTierMaxSlots((prev) => {
        const updatedSlots = { ...prev };
        Object.keys(updatedSlots).forEach((key) => {
          const tier = parseInt(key, 10);
          if (tier >= player.tier) {
            updatedSlots[tier] += 1;
          }
        });
        return updatedSlots;
      });

      return;
    }

    if (tierMaxSlots[player.tier] === 0) return;

    setTierMaxSlots((prev) => {
      const updatedSlots = { ...prev };

      const lowerTiers = [];
      for (let tier = player.tier - 1; tier >= 0; tier--) {
        lowerTiers.push({ tier, value: updatedSlots[tier] });
      }

      type ValueGroups = { [key: number]: number[] };

      const valueGroups = lowerTiers.reduce<ValueGroups>(
        (groups, { tier, value }) => {
          if (!groups[value]) {
            groups[value] = [];
          }
          groups[value].push(tier);
          return groups;
        },
        {}
      );

      let shouldReturn = false;

      Object.values(valueGroups).forEach((tiers) => {
        if (tiers.length > 1) {
          shouldReturn = true;
          tiers.forEach((tier) => {
            updatedSlots[tier] = Math.max(updatedSlots[tier] - 1, 0);
          });
        }
      });

      if (shouldReturn) {
        return updatedSlots;
      }

      if (updatedSlots[player.tier] <= defaultSlots[player.tier - 4]) {
        updatedSlots[player.tier - 1] = Math.max(
          updatedSlots[player.tier - 1] - 1,
          0
        );
        updatedSlots[player.tier - 2] = Math.max(
          updatedSlots[player.tier - 2] - 1,
          0
        );
        updatedSlots[player.tier - 3] = Math.max(
          updatedSlots[player.tier - 3] - 1,
          0
        );
        updatedSlots[player.tier - 4] = Math.max(
          updatedSlots[player.tier - 4] - 1,
          0
        );
      } else if (updatedSlots[player.tier] <= defaultSlots[player.tier - 3]) {
        updatedSlots[player.tier - 1] = Math.max(
          updatedSlots[player.tier - 1] - 1,
          0
        );
        updatedSlots[player.tier - 2] = Math.max(
          updatedSlots[player.tier - 2] - 1,
          0
        );
        updatedSlots[player.tier - 3] = Math.max(
          updatedSlots[player.tier - 3] - 1,
          0
        );
      } else if (updatedSlots[player.tier] <= defaultSlots[player.tier - 2]) {
        updatedSlots[player.tier - 1] = Math.max(
          updatedSlots[player.tier - 1] - 1,
          0
        );
        updatedSlots[player.tier - 2] = Math.max(
          updatedSlots[player.tier - 2] - 1,
          0
        );
      } else if (updatedSlots[player.tier] <= defaultSlots[player.tier - 1]) {
        updatedSlots[player.tier - 1] = Math.max(
          updatedSlots[player.tier - 1] - 1,
          0
        );
      }

      return updatedSlots;
    });

    setTierMaxSlots((prev) => {
      const updatedSlots = { ...prev };
      Object.keys(updatedSlots).forEach((key) => {
        const tier = parseInt(key, 10);
        if (tier >= player.tier) {
          updatedSlots[tier] = Math.max(0, updatedSlots[tier] - 1);
        }
      });
      return updatedSlots;
    });
    setSelectedPlayers((prev) => [...prev, player]);
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
        marginRight: "0.8rem",
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
          <PlayerDraftDetails selectedPlayers={selectedPlayers} />
          {/* <PlayerDraftChart /> */}
        </Box>
      </Box>

      <PlayerTable
        groupedPlayers={groupedPlayers}
        onPlayerClick={addPlayerToDraft}
        selectedPlayers={selectedPlayers}
        maxSlots={tierMaxSlots}
      />
    </Box>
  );
};

export default PlayerList;
