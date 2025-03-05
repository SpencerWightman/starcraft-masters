import { PlayerSummary } from "@/app/types/teamTypes";

export const selectPlayerDraft = (
  player: PlayerSummary,
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>,
  setTierMaxSlots: React.Dispatch<React.SetStateAction<Record<number, number>>>,
  maxTierSlots: Record<number, number>
) => {
  if (maxTierSlots[player.tier] === 0) {
    return;
  }

  setTierMaxSlots((prev) => {
    const tierSlotLimit = { ...prev };
    const selectedPlayerTier = player.tier;

    tierSlotLimit[selectedPlayerTier] = Math.max(
      0,
      tierSlotLimit[selectedPlayerTier] - 1
    );

    return tierSlotLimit;
  });

  setSelectedPlayers((prev) => [...prev, player]);
};
