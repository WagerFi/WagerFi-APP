import { useState, useEffect, useCallback } from 'react';
import { Game } from '../types/sports';
import {
  getTodayDate,
  fetchMLBGames,
  fetchSoccerGames,
  fetchNBAGames,
  fetchNHLGames
} from '../lib/dailyGames';

/**
 * Custom hook to fetch today's games
 * This hook will fetch games once when initialized
 */
export function useTodayGames() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<{ [sportId: string]: Game[] }>({});

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`Fetching all games for ${getTodayDate()}`);

      // Fetch games for each sport in parallel
      const [mlbGames, soccerGames, nbaGames, nhlGames] = await Promise.all([
        fetchMLBGames(),
        fetchSoccerGames(),
        fetchNBAGames(),
        fetchNHLGames()
      ]);

      // Combine all games by sport type
      const allGames = {
        baseball: mlbGames,
        soccer: soccerGames,
        basketball: nbaGames,
        hockey: nhlGames
      };

      // Count total games fetched
      const totalGames = Object.values(allGames).reduce((total, games) => total + games.length, 0);
      console.log(`🏆 Fetched ${totalGames} total games across all sports`);

      // Log each sport's count for debugging
      Object.entries(allGames).forEach(([sport, sportGames]) => {
        console.log(`${sport}: ${sportGames.length} games`);
      });

      setGames(allGames);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return {
    isLoading,
    error,
    games,
    refreshGames: fetchGames,
    todayDate: getTodayDate()
  };
}