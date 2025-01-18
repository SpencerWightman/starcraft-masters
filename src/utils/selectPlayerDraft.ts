import { PlayerSummary } from "@/app/types/teamTypes";

export const selectPlayerDraft = (
  player: PlayerSummary,
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>,
  setTierMaxSlots: React.Dispatch<React.SetStateAction<Record<number, number>>>,
  // defaultSlots: Record<number, number>,
  maxTierSlots: Record<number, number>,
  selectedPlayers: PlayerSummary[]
) => {
  const tierCounts: { [key: string]: number } = {};
  ["0", "1", "2", "3", "4"].map((tier) => {
    const selectedCount = selectedPlayers.filter(
      (selectedPlayer) => `${selectedPlayer.tier}` === tier
    ).length;

    tierCounts[tier] = selectedCount;
  });

  if (maxTierSlots[player.tier] === 0) {
    return;
  }

  setTierMaxSlots((prev) => {
    const tierSlotLimit = { ...prev };
    const selectedPlayerTier = player.tier;

    for (let outerTier = 0; outerTier <= 4; outerTier++) {
      // Own tier
      if (outerTier === selectedPlayerTier) {
        tierSlotLimit[outerTier]--;
        continue;
      }

      // Higher tiers
      if (outerTier > selectedPlayerTier) {
        tierSlotLimit[outerTier] = Math.max(0, tierSlotLimit[outerTier] - 1);
        continue;
      }

      // Otherwise handle lower tiers
      if (tierSlotLimit[selectedPlayerTier] === tierSlotLimit[outerTier]) {
        tierSlotLimit[outerTier] = Math.max(0, tierSlotLimit[outerTier] - 1);
      }
    }

    return tierSlotLimit;
  });

  setSelectedPlayers((prev) => [...prev, player]);
};
