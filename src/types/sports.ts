export interface TeamResult {
  id: number;
  name: string;
  country: string;
  logo?: string;
  record?: string; // Added for MMA fighters
  weightClass?: string; // Added for MMA fighters
  height?: string; // Added for MMA fighters
  reach?: string; // Added for MMA fighters
  age?: number; // Added for MMA fighters
  nickname?: string; // Added for fighter display
  stance?: string; // Added for fighter info
  gender?: string; // Added for fighter info
}

export interface TeamInGame {
  id: number;
  name: string;
  logo?: string;
  winner?: boolean;
}

export interface Score {
  home: number | null;
  away: number | null;
}

export interface Scores {
  halftime: Score;
  fulltime: Score;
  extratime: Score;
  penalty: Score;
}

export interface Venue {
  id?: number | null;
  name: string;
  city: string;
  capacity?: number | null;
  surface?: string | null;
  location?: string | null;
  state?: string | null;
  country?: string | null;
}

export interface Weather {
  temperature?: number | null;
  description?: string | null;
  wind?: number | null;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo?: string;
  round: string;
  season: number;
}

export interface InningDetail {
  [inning: string]: {
    home: number | null;
    away: number | null;
  };
}

export interface Game {
  id: number;
  date: string;
  time: string;
  timestamp: number; // This will always be ensured in our code
  timezone: string;
  status: {
    long: string;
    short: string;
    elapsed?: number | null;
  };
  league: League;
  homeTeam: TeamInGame;
  awayTeam: TeamInGame;
  goals: Score;
  scores: Scores;
  venue: Venue;
  referee?: string | null;
  weather?: Weather;
  inningDetails?: InningDetail;
  attendance?: number | null;
  periods?: any; // For hockey periods
  quarters?: any; // For basketball quarters
  standings?: any; // For team standings/records
  timeRemaining?: string | null; // For games in progress
  currentQuarter?: number | null; // For basketball games
  currentPeriod?: number | null; // For hockey games
  fight?: {
    title?: boolean;
    titleName?: string | null;
    method?: string | null;
    methodType?: string | null;
    roundEnd?: number | null;
    timeEnd?: string | null;
    totalRounds?: number;
    weight?: {
      class?: string | null;
      pounds?: number | null;
      kilograms?: number | null;
    }
  };
  fighter1?: {
    id: number;
    name: string;
    image?: string | null;
    record?: string | null;
    roundsWon?: number;
  };
  fighter2?: {
    id: number;
    name: string;
    image?: string | null;
    record?: string | null;
    roundsWon?: number;
  };
}