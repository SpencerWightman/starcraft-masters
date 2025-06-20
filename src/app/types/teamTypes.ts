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

export type RecapType = Record<
  string,
  {
    dateTime: string;
    gameData: Record<
      string,
      {
        player1supply: string;
        player2supply: string;
      }
    >;
    org: string;
    orgSeason: number;
    orgXtra: number;
    player1: string;
    player2: string;
    race1: string;
    race2: string;
    winner: string;
  }
>;

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

export interface LeaderboardEntryWithRank {
  username: string;
  points: number;
  team: string[];
  rank: number;
  total: number;
}

export type LeaderboardsBySeason = Record<
  string,
  LeaderboardEntryWithRank[]
>;