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

export type WinRateInterval = {
  Interval: string;
  WinRate: string;
  TotalGames: number;
};

export type MatchupStats = {
  Matchup: string;
  TotalGames: number;
  WinRates: WinRateInterval[];
};

export type PlayerSummary = {
  player: {
    id: number;
    name: string;
    race: string;
    handle: string;
  };
  achievements: {
    champion: number;
    runnerUp: number;
    ro4: number;
  };
  tier: number;
  stats: MatchupStats[];
};

export type PlayerSummaries = Record<string, PlayerSummary>;
