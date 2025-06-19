import { Game } from '../types/sports';
import { fetchSportsApi } from '../hooks/useSportSearch';
import { format } from 'date-fns';

// Interface for the cached data structure
interface CachedGames {
  date: string; // YYYY-MM-DD format
  games: {
    [sportId: string]: Game[];
  };
  timestamp: number;
}

// Local storage key for the cached games
const CACHED_GAMES_KEY = 'wagerfi_daily_games';

/**
 * Gets today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Checks if the cached data is still valid (from today)
 */
const isCacheValid = (cache: CachedGames | null): boolean => {
  if (!cache) return false;

  const todayDate = getTodayDate();
  return cache.date === todayDate;
};

/**
 * Loads games from cache if available and valid
 */
export const loadCachedGames = (): CachedGames | null => {
  try {
    const cachedData = localStorage.getItem(CACHED_GAMES_KEY);
    if (!cachedData) return null;

    const parsedCache = JSON.parse(cachedData) as CachedGames;
    if (!isCacheValid(parsedCache)) return null;

    return parsedCache;
  } catch (error) {
    console.error('Error loading cached games:', error);
    return null;
  }
};

/**
 * Saves games to the cache
 */
export const saveGamesToCache = (games: { [sportId: string]: Game[] }): void => {
  try {
    const cacheData: CachedGames = {
      date: getTodayDate(),
      games,
      timestamp: Date.now()
    };

    localStorage.setItem(CACHED_GAMES_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving games to cache:', error);
  }
};

/**
 * Fetches MLB games for today
 */
export const fetchMLBGames = async (): Promise<Game[]> => {
  try {
    const today = getTodayDate();
    console.log(`Fetching MLB games for date: ${today}`);

    const data = await fetchSportsApi('games', {
      league: 1,
      season: 2025,
      date: today
    }, 'baseball');

    if (!data.response || !Array.isArray(data.response)) {
      console.error('Invalid response format from MLB API');
      return [];
    }

    // Transform API response to Game objects
    const games: Game[] = data.response.map((item: any) => {
      // Parse date and format time
      const gameDate = new Date(item.date);

      // Extract all innings scores if available
      const homeInnings = item.scores?.home?.innings || {};
      const awayInnings = item.scores?.away?.innings || {};
      const inningDetails = Object.keys(homeInnings).reduce((acc: any, inningNum) => {
        acc[inningNum] = {
          home: homeInnings[inningNum],
          away: awayInnings[inningNum]
        };
        return acc;
      }, {});

      return {
        id: item.id,
        date: format(gameDate, 'yyyy-MM-dd'), // Use date-fns format
        time: gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: item.timestamp || Math.floor(gameDate.getTime() / 1000),
        timezone: item.timezone || "UTC",
        status: {
          long: item.status.long,
          short: item.status.short,
          elapsed: item.status.elapsed
        },
        league: {
          id: item.league.id,
          name: item.league.name,
          country: 'USA',
          logo: item.league.logo,
          round: item.league.round || 'Regular Season',
          season: item.league.season
        },
        homeTeam: {
          id: item.teams.home.id,
          name: item.teams.home.name,
          logo: item.teams.home.logo,
          winner: item.scores.home.winner
        },
        awayTeam: {
          id: item.teams.away.id,
          name: item.teams.away.name,
          logo: item.teams.away.logo,
          winner: item.scores.away.winner
        },
        goals: {
          home: item.scores.home.total,
          away: item.scores.away.total
        },
        scores: {
          halftime: {
            home: item.scores.home.innings?.[4] || null, // Using 4th inning as midpoint
            away: item.scores.away.innings?.[4] || null
          },
          fulltime: {
            home: item.scores.home.total,
            away: item.scores.away.total
          },
          extratime: {
            home: null,
            away: null
          },
          penalty: {
            home: null,
            away: null
          }
        },
        venue: {
          id: item.stadium?.id || null,
          name: item.stadium?.name || 'Unknown Venue',
          city: item.stadium?.city || 'Unknown City',
          capacity: item.stadium?.capacity || null,
          surface: item.stadium?.surface || null,
          location: item.stadium?.location || null
        },
        weather: {
          temperature: item.weather?.temperature?.celsius || null,
          description: item.weather?.description || null,
          wind: item.weather?.wind?.speed || null
        },
        referee: item.referee || null,
        inningDetails: inningDetails,
        attendance: item.attendance || null
      };
    });

    return games;
  } catch (error) {
    console.error('Error fetching MLB games:', error);
    return [];
  }
};

/**
 * Fetches soccer games for today
 */
export const fetchSoccerGames = async (): Promise<Game[]> => {
  try {
    const today = getTodayDate();
    console.log(`Fetching next 10 soccer games`);

    const data = await fetchSportsApi('fixtures', {
      next: 10
    }, 'soccer');

    if (!data.response || !Array.isArray(data.response)) {
      console.error('Invalid response format from Soccer API');
      return [];
    }

    // Transform API response to Game objects
    const games: Game[] = data.response.map((fixture: any) => {
      const fixtureDate = new Date(fixture.fixture.date);

      return {
        id: fixture.fixture.id,
        date: format(fixtureDate, 'yyyy-MM-dd'), // Use date-fns format
        time: fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: fixture.fixture.timestamp,
        timezone: fixture.fixture.timezone,
        status: {
          long: fixture.fixture.status.long,
          short: fixture.fixture.status.short,
          elapsed: fixture.fixture.status.elapsed
        },
        league: {
          id: fixture.league.id,
          name: fixture.league.name,
          country: fixture.league.country,
          logo: fixture.league.logo,
          round: fixture.league.round,
          season: fixture.league.season
        },
        homeTeam: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo,
          winner: fixture.teams.home.winner
        },
        awayTeam: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo,
          winner: fixture.teams.away.winner
        },
        goals: {
          home: fixture.goals.home,
          away: fixture.goals.away
        },
        scores: {
          halftime: {
            home: fixture.score.halftime.home,
            away: fixture.score.halftime.away
          },
          fulltime: {
            home: fixture.score.fulltime.home,
            away: fixture.score.fulltime.away
          },
          extratime: {
            home: fixture.score.extratime.home,
            away: fixture.score.extratime.away
          },
          penalty: {
            home: fixture.score.penalty.home,
            away: fixture.score.penalty.away
          }
        },
        venue: {
          id: fixture.fixture.venue?.id,
          name: fixture.fixture.venue?.name || 'Unknown Venue',
          city: fixture.fixture.venue?.city || 'Unknown City'
        },
        referee: fixture.fixture.referee || 'TBA'
      };
    });

    return games;
  } catch (error) {
    console.error('Error fetching soccer games:', error);
    return [];
  }
};

/**
 * Fetches NBA games for today
 */
export const fetchNBAGames = async (): Promise<Game[]> => {
  try {
    const today = getTodayDate();
    console.log(`Fetching next 10 NBA games`);

    const data = await fetchSportsApi('games', {
      league: 12,
      season: '2024-2025',
      next: 10
    }, 'basketball');

    if (!data.response || !Array.isArray(data.response)) {
      console.error('Invalid response format from NBA API');
      return [];
    }

    // Transform API response to Game objects
    const games: Game[] = data.response.map((item: any) => {
      const gameDate = new Date(item.date);

      return {
        id: item.id,
        date: format(gameDate, 'yyyy-MM-dd'), // Use date-fns format
        time: gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Math.floor(gameDate.getTime() / 1000),
        timezone: "UTC",
        status: {
          long: item.status.long,
          short: item.status.short,
          elapsed: null
        },
        league: {
          id: item.league.id,
          name: item.league.name,
          country: 'USA',
          logo: item.league.logo,
          round: item.league.round || 'Regular Season',
          season: item.league.season
        },
        homeTeam: {
          id: item.teams.home.id,
          name: item.teams.home.name,
          logo: item.teams.home.logo,
          winner: item.scores.home.winner
        },
        awayTeam: {
          id: item.teams.away.id,
          name: item.teams.away.name,
          logo: item.teams.away.logo,
          winner: item.scores.away.winner
        },
        goals: {
          home: item.scores.home.total,
          away: item.scores.away.total
        },
        scores: {
          halftime: {
            home: item.scores.home.quarter_1 + (item.scores.home.quarter_2 || 0),
            away: item.scores.away.quarter_1 + (item.scores.away.quarter_2 || 0)
          },
          fulltime: {
            home: item.scores.home.total,
            away: item.scores.away.total
          },
          extratime: {
            home: null,
            away: null
          },
          penalty: {
            home: null,
            away: null
          }
        },
        venue: {
          id: null,
          name: typeof item.venue === 'string' ? item.venue : 'Unknown Venue',
          city: 'Unknown City',
          state: null,
          country: 'USA'
        },
        referee: null
      };
    });

    return games;
  } catch (error) {
    console.error('Error fetching NBA games:', error);
    return [];
  }
};

/**
 * Fetches NHL games for today
 */
export const fetchNHLGames = async (): Promise<Game[]> => {
  try {
    const today = getTodayDate();
    console.log(`Fetching NHL games for date: ${today}`);

    const data = await fetchSportsApi('games', {
      league: 57,
      season: '2024',
      date: today
    }, 'hockey');

    if (!data.response || !Array.isArray(data.response)) {
      console.error('Invalid response format from NHL API');
      return [];
    }

    // Transform API response to Game objects
    const games: Game[] = data.response.map((item: any) => {
      const gameDate = new Date(item.date);

      // Extract periods if available - use optional chaining and nullish coalescing
      const periods = {
        period1: {
          home: item.scores?.home?.period1 ?? null,
          away: item.scores?.away?.period1 ?? null
        },
        period2: {
          home: item.scores?.home?.period2 ?? null,
          away: item.scores?.away?.period2 ?? null
        },
        period3: {
          home: item.scores?.home?.period3 ?? null,
          away: item.scores?.away?.period3 ?? null
        },
        overtime: {
          home: item.scores?.home?.overtime ?? null,
          away: item.scores?.away?.overtime ?? null
        },
        shootout: {
          home: item.scores?.home?.shootout ?? null,
          away: item.scores?.away?.shootout ?? null
        }
      };

      // Safely access scores with fallbacks to prevent null reference errors
      const homeTotal = item.scores?.home?.total ?? 0;
      const awayTotal = item.scores?.away?.total ?? 0;

      return {
        id: item.id,
        date: format(gameDate, 'yyyy-MM-dd'), // Use date-fns format
        time: gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: item.timestamp || Math.floor(gameDate.getTime() / 1000),
        timezone: item.timezone || "UTC",
        status: {
          long: item.status?.long || 'Not Started',
          short: item.status?.short || 'NS',
          elapsed: item.status?.elapsed || null
        },
        league: {
          id: item.league.id,
          name: item.league.name,
          country: item.league.country || 'International',
          logo: item.league.logo,
          round: item.league.round || 'Regular Season',
          season: item.league.season
        },
        homeTeam: {
          id: item.teams.home.id,
          name: item.teams.home.name,
          logo: item.teams.home.logo,
          winner: item.teams.home.winner
        },
        awayTeam: {
          id: item.teams.away.id,
          name: item.teams.away.name,
          logo: item.teams.away.logo,
          winner: item.teams.away.winner
        },
        goals: {
          home: homeTotal,
          away: awayTotal
        },
        scores: {
          halftime: {
            home: periods.period2.home, // Using period 2 as "halftime" equivalent
            away: periods.period2.away
          },
          fulltime: {
            home: homeTotal,
            away: awayTotal
          },
          extratime: {
            home: periods.overtime.home,
            away: periods.overtime.away
          },
          penalty: {
            home: periods.shootout.home,
            away: periods.shootout.away
          }
        },
        venue: {
          id: item.arena?.id || null,
          name: item.arena?.name || 'Unknown Venue',
          city: item.arena?.city || 'Unknown City',
          capacity: item.arena?.capacity || null,
          state: item.arena?.state || null,
          country: item.arena?.country || null
        },
        referee: item.officials && item.officials.length > 0 ? item.officials[0] : null,
        periods: periods,
        attendance: item.attendance || null,
        standings: {
          home: item.standings?.home || null,
          away: item.standings?.away || null
        },
        shootout: item.shootout || null,
        powerplay: item.powerplay || null,
        penalties: item.penalties || null
      };
    });

    return games;
  } catch (error) {
    console.error('Error fetching NHL games:', error);
    return [];
  }
};

/**
 * Fetches MMA fights for today
 */
export const fetchMMAFights = async (): Promise<Game[]> => {
  try {
    const today = getTodayDate();
    console.log(`Fetching MMA fights for date: ${today}`);

    // For MMA, we need to fetch events that occur today
    const data = await fetchSportsApi('events', {
      date: today
    }, 'mma');

    if (!data.response || !Array.isArray(data.response)) {
      console.error('Invalid response format from MMA API');
      return [];
    }

    // Collect all fight IDs from events
    const eventIds = data.response.map((event: any) => event.id);

    if (eventIds.length === 0) {
      return [];
    }

    // For each event, fetch the fights
    const fightsPromises = eventIds.map(async (eventId: number) => {
      const fightsData = await fetchSportsApi('fights', {
        event: eventId
      }, 'mma');

      return fightsData.response || [];
    });

    const fightsResults = await Promise.all(fightsPromises);
    const allFights = fightsResults.flat();

    // Transform API response to Game objects
    const games: Game[] = allFights.map((fight: any, index) => {
      const fightDate = new Date(fight.date);

      // Get fighter details
      const fighter1 = fight.fighters?.first || {};
      const fighter2 = fight.fighters?.second || {};

      return {
        id: fight.id || index + 10000, // Use index as backup ID
        date: format(fightDate, 'yyyy-MM-dd'), // Use date-fns format
        time: fightDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: fight.timestamp || Math.floor(fightDate.getTime() / 1000),
        timezone: fight.timezone || "UTC",
        status: {
          long: fight.status?.long || 'Not Started',
          short: fight.status?.short || 'NS',
          elapsed: null
        },
        league: {
          id: 0,
          name: 'MMA',
          country: 'International',
          logo: undefined,
          round: fight.is_main ? 'Main Event' : 'Undercard',
          season: new Date().getFullYear()
        },
        homeTeam: {
          id: fighter1.id || 0,
          name: fighter1.name || 'Unknown Fighter',
          logo: fighter1.logo || null,
          winner: false
        },
        awayTeam: {
          id: fighter2.id || 0,
          name: fighter2.name || 'Unknown Fighter',
          logo: fighter2.logo || null,
          winner: false
        },
        goals: {
          home: 0,
          away: 0
        },
        scores: {
          halftime: {
            home: null,
            away: null
          },
          fulltime: {
            home: 0,
            away: 0
          },
          extratime: {
            home: null,
            away: null
          },
          penalty: {
            home: null,
            away: null
          }
        },
        venue: {
          id: null,
          name: 'Unknown Venue',
          city: 'Unknown City',
          capacity: null
        },
        referee: null,
        fight: {
          title: fight.title || false,
          titleName: fight.slug || null,
          method: null,
          methodType: null,
          roundEnd: null,
          timeEnd: null,
          totalRounds: 3,
          weight: {
            class: fight.category || null,
            pounds: null,
            kilograms: null
          }
        }
      };
    });

    return games;
  } catch (error) {
    console.error('Error fetching MMA fights:', error);
    return [];
  }
};

/**
 * Fetches all games for today across different sports
 * and saves them to cache
 */
export const fetchAllTodayGames = async (): Promise<{ [sportId: string]: Game[] }> => {
  console.log('Fetching all games for today');

  try {
    // Fetch games for each sport in parallel
    const [mlbGames, soccerGames, nbaGames, nhlGames, mmaFights] = await Promise.all([
      fetchMLBGames(),
      fetchSoccerGames(),
      fetchNBAGames(),
      fetchNHLGames(),
      fetchMMAFights()
    ]);

    // Combine all games by sport type
    const allGames = {
      baseball: mlbGames,
      soccer: soccerGames,
      basketball: nbaGames,
      hockey: nhlGames,
      mma: mmaFights
    };

    // Save to cache
    saveGamesToCache(allGames);

    return allGames;
  } catch (error) {
    console.error('Error fetching all games:', error);
    return {};
  }
};