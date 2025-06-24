import { PlayerSummary } from "@/app/types/teamTypes";

const BASE_SLOTS: number[] = [2, 3, 3, 3, 4];

export type TierSlots = Record<number, number>;

export function allocateSlots(selected: PlayerSummary[]): {
  ok: boolean;
  remaining: TierSlots;
} {
  const remaining = [...BASE_SLOTS];
  const picks = [...selected].sort((a, b) => b.tier - a.tier);

  for (const p of picks) {
    let taken = false;
    for (let t = p.tier; t >= 0; t--) {
      if (remaining[t] > 0) {
        remaining[t]--;
        taken = true;
        break;
      }
    }
    if (!taken) return { ok: false, remaining: asRecord(remaining) };
  }

  return { ok: true, remaining: asRecord(remaining) };
}

function asRecord(arr: number[]): TierSlots {
  return arr.reduce((acc, n, i) => ({ ...acc, [i]: n }), {} as TierSlots);
}
