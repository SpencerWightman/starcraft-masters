import { PlayerSummary } from "@/app/types/teamTypes";

export const selectPlayerDraft = (
  player: PlayerSummary,
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>,
  setTierMaxSlots: React.Dispatch<React.SetStateAction<Record<number, number>>>,
  defaultSlots: Record<number, number>,
  tierMaxSlots: Record<number, number>
) => {
  if (tierMaxSlots[player.tier] === 0) return;

  setTierMaxSlots((prev) => {
    const availableSlots = { ...prev };

    // Update lower tiers
    if (availableSlots[player.tier] <= defaultSlots[player.tier - 4]) {
      availableSlots[player.tier - 1] = Math.max(
        availableSlots[player.tier - 1] - 1,
        0
      );
      availableSlots[player.tier - 2] = Math.max(
        availableSlots[player.tier - 2] - 1,
        0
      );
      availableSlots[player.tier - 3] = Math.max(
        availableSlots[player.tier - 3] - 1,
        0
      );
      availableSlots[player.tier - 4] = Math.max(
        availableSlots[player.tier - 4] - 1,
        0
      );
    } else if (availableSlots[player.tier] <= defaultSlots[player.tier - 3]) {
      availableSlots[player.tier - 1] = Math.max(
        availableSlots[player.tier - 1] - 1,
        0
      );
      availableSlots[player.tier - 2] = Math.max(
        availableSlots[player.tier - 2] - 1,
        0
      );
      availableSlots[player.tier - 3] = Math.max(
        availableSlots[player.tier - 3] - 1,
        0
      );
    } else if (availableSlots[player.tier] <= defaultSlots[player.tier - 2]) {
      availableSlots[player.tier - 1] = Math.max(
        availableSlots[player.tier - 1] - 1,
        0
      );
      availableSlots[player.tier - 2] = Math.max(
        availableSlots[player.tier - 2] - 1,
        0
      );
    } else if (availableSlots[player.tier] <= defaultSlots[player.tier - 1]) {
      availableSlots[player.tier - 1] = Math.max(
        availableSlots[player.tier - 1] - 1,
        0
      );
    }

    // Update higher tiers and self
    [0, 1, 2, 3, 4].map((tier) => {
      if (tier >= player.tier) {
        availableSlots[tier] = Math.max(availableSlots[tier] - 1, 0);
      }
    });

    return availableSlots;
  });

  // Set team draft display
  setSelectedPlayers((prev) => [...prev, player]);
};
