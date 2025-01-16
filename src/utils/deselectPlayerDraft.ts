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

  setSelectedPlayers((prev) =>
    prev.filter(
      (selectedPlayer) => selectedPlayer.player.handle !== player.player.handle
    )
  );

  function maxRangeSum(dynamicTier: number, playerTier: number) {
    let runningCount = 0;

    let skip = false;

    for (let tier = dynamicTier; tier <= playerTier; tier++) {
      runningCount += tierCounts[tier];
      if (tier === playerTier) {
        runningCount--;
      }
      console.log(tier, runningCount, defaultSlots[tier]);
      if (runningCount >= defaultSlots[tier]) {
        skip = true;
        break;
      }
    }

    return skip;
  }

  setTierMaxSlots((prev) => {
    const availableSlots = { ...prev };

    // Update lower tiers
    for (let tier = 0; tier < player.tier; tier++) {
      if (maxRangeSum(tier, player.tier)) {
        continue;
      }

      if (availableSlots[tier] + 1 <= defaultSlots[tier])
        availableSlots[tier]++;
    }

    // Update higher tiers and self
    [0, 1, 2, 3, 4].map((tier) => {
      if (tier >= player.tier) {
        if (availableSlots[tier] + 1 <= defaultSlots[tier])
          availableSlots[tier]++;
      }
    });

    return availableSlots;
  });
};
