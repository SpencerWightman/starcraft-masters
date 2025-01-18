import { PlayerSummary } from "@/app/types/teamTypes";

export const deselectPlayerDraft = (
  player: PlayerSummary,
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>,
  setTierMaxSlots: React.Dispatch<React.SetStateAction<Record<number, number>>>,
  defaultSlots: Record<number, number>,
  selectedPlayers: PlayerSummary[]
) => {
  const tierCounts: { [key: string]: number } = {};
  ["0", "1", "2", "3", "4"].map((tier) => {
    const selectedCount = selectedPlayers.filter(
      (selectedPlayer) => `${selectedPlayer.tier}` === tier
    ).length;

    tierCounts[tier] = selectedCount;
  });

  setTierMaxSlots((prev) => {
    const tierSlotLimit = { ...prev };
    const deselectedPlayerTier = player.tier;

    for (let outerTier = 4; outerTier >= 0; outerTier--) {
      // Own tier
      if (outerTier === deselectedPlayerTier) {
        tierSlotLimit[outerTier]++;
        continue;
      }

      // Higher tiers
      if (outerTier > deselectedPlayerTier) {
        tierSlotLimit[outerTier] = Math.min(
          defaultSlots[outerTier],
          tierSlotLimit[outerTier] + 1
        );
        continue;
      }

      // Otherwise handle lower tiers
      if (tierSlotLimit[outerTier] <= tierSlotLimit[deselectedPlayerTier]) {
        if (
          tierSlotLimit[outerTier] + 1 <= tierSlotLimit[outerTier + 1] &&
          tierSlotLimit[outerTier] + 1 <=
            defaultSlots[outerTier] - (tierCounts[outerTier - 1] ?? 0)
        ) {
          if (
            tierSlotLimit[outerTier] + 1 + tierCounts[outerTier] <=
            defaultSlots[outerTier]
          ) {
            tierSlotLimit[outerTier] = Math.min(
              defaultSlots[outerTier],
              tierSlotLimit[outerTier] + 1
            );
          }
        }
      }
    }

    return tierSlotLimit;
  });

  setSelectedPlayers((prev) =>
    prev.filter(
      (selectedPlayer) => selectedPlayer.player.handle !== player.player.handle
    )
  );
};
