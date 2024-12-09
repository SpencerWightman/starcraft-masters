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

export type DurationWinRate = {
  Interval: string;
  WinRate: string;
};

export type MatchupDurationStats = {
  Matchup: string;
  TotalGames: number;
  WinRates: DurationWinRate[];
};

export type PlayerSummary = {
  player: {
    id: number;
    name: string;
    race: string;
    handle: string;
  };
  achievements: Achievements;
  stats: {
    vsAll?: MatchupStats;
    vsP?: MatchupStats;
    vsT?: MatchupStats;
    vsZ?: MatchupStats;
  };
  duration: MatchupDurationStats[];
  tier: number;
  appearances: number;
};

export type PlayerSummaries = PlayerSummary[];
