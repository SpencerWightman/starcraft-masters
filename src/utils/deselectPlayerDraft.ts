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

    for (let outerTier = 0; outerTier <= 4; outerTier++) {
      // Own tier
      if (outerTier === deselectedPlayerTier) {
        tierSlotLimit[outerTier]++;
        continue;
      }

      // Higher tiers
      if (
        outerTier > deselectedPlayerTier &&
        tierSlotLimit[outerTier] + 1 + tierCounts[outerTier] <=
          defaultSlots[outerTier]
      ) {
        tierSlotLimit[outerTier]++;
        continue;
      }

      // Lower tiers
      let runningCount = -1;
      let skip = false;

      for (let innerTier = 0; innerTier <= deselectedPlayerTier; innerTier++) {
        runningCount += tierCounts[innerTier];

        if (
          (runningCount + tierSlotLimit[outerTier] + 1 >
            defaultSlots[outerTier] ||
            tierSlotLimit[outerTier] + 1 + runningCount >
              defaultSlots[outerTier]) &&
          true
        ) {
          skip = true;
          break;
        }
      }

      if (!skip) tierSlotLimit[outerTier]++;
    }
    return tierSlotLimit;
  });

  setSelectedPlayers((prev) =>
    prev.filter(
      (selectedPlayer) => selectedPlayer.player.handle !== player.player.handle
    )
  );
};
