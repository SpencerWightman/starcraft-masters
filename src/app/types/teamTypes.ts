export type MatchupStats = {
  games: number;
  wins: number;
  losses: number;
  winRate: string;
};

export type Achievements = {
  champion: number;
  runnerUp: number;
  ro4: number;
};

export type PlayerSummary = {
  name: string;
  id: string;
  race: string;
  tier: string;
  stats: {
    vsAll: MatchupStats;
    vsP: MatchupStats;
    vsT: MatchupStats;
    vsZ: MatchupStats;
  };
  appearances: string;
  achievements: Achievements;
  image: string;
};

export type PlayerSummaries = Record<string, PlayerSummary>;

export type RecentMatch = (string | number)[];
export type PlayerRecent = Record<string, RecentMatch[]>;
