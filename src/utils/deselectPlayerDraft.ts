import { PlayerSummary } from "@/app/types/teamTypes";

export const deselectPlayerDraft = (
  player: PlayerSummary,
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>,
  setTierMaxSlots: React.Dispatch<React.SetStateAction<Record<number, number>>>
) => {
  setTierMaxSlots((prev) => {
    const tierSlotLimit = { ...prev };
    const deselectedPlayerTier = player.tier;

    tierSlotLimit[deselectedPlayerTier]++;

    return tierSlotLimit;
  });

  setSelectedPlayers((prev) =>
    prev.filter(
      (selectedPlayer) => selectedPlayer.player.handle !== player.player.handle
    )
  );
};
