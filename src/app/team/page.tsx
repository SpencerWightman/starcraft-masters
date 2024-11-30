import React from "react";
import { Box } from "@mui/material";
import PlayerTable from "../../components/teams/PlayerListTable";
import PlayerDraft from "../../components/teams/PlayerDraft";
import playerSummariesJson from "data/draftData15-18.json";
import { PlayerSummaries, PlayerSummary } from "../types/teamTypes";

const playerSummaries: PlayerSummaries = playerSummariesJson;
const selectedPlayers: Record<string, PlayerSummary[]> = {};

const PlayerList: React.FC = () => {
  const playerList: PlayerSummary[] = Object.values(playerSummaries);

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {" "}
      <PlayerDraft selectedPlayers={selectedPlayers} />
      <PlayerTable players={playerList} />
    </Box>
  );
};

export default PlayerList;
