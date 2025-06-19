import { useState, useEffect } from 'react';
import { getTeamDetails, getEventDetails } from '../lib/wagers';
import { TeamSnapshot, EventSnapshot } from '../lib/wagers';

// Define types for our cache entries
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Create shared memory caches for teams and events
// These are outside of the hooks to persist across component renders
const teamCache = new Map<string, CacheEntry<TeamSnapshot>>();
const eventCache = new Map<string, CacheEntry<EventSnapshot>>();

// Cache TTL in milliseconds (24 hours)
const CACHE_TTL = 24 * 60 * 60 * 1000;

/**
 * Hook to fetch and cache team data
 * @param teamId - The ID of the team to fetch
 * @param sportType - The type of sport (soccer, basketball, etc.)
 * @returns The team data from cache or API
 */
export function useCachedTeam(teamId: number | undefined | null, sportType: string) {
  const [team, setTeam] = useState<TeamSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no teamId or sportType, don't do anything
    if (!teamId || !sportType) {
      setTeam(null);
      return;
    }

    const fetchTeam = async () => {
      // Create a cache key based on teamId and sportType
      const cacheKey = `${sportType}-team-${teamId}`;

      // Check if we have cached data
      const cachedEntry = teamCache.get(cacheKey);
      if (cachedEntry) {
        const now = Date.now();
        // Check if the cache entry is still valid (not expired)
        if (now - cachedEntry.timestamp < CACHE_TTL) {
          console.log(`Using cached team data for ${sportType} team ${teamId}`);
          setTeam(cachedEntry.data);
          return;
        } else {
          // If expired, remove from cache
          console.log(`Team cache expired for ${sportType} team ${teamId}`);
          teamCache.delete(cacheKey);
        }
      }

      // If we reach here, we need to fetch the data
      setLoading(true);
      setError(null);

      try {
        const teamData = await getTeamDetails(teamId, sportType);
        if (teamData) {
          // Convert to TeamSnapshot format
          const teamSnapshot: TeamSnapshot = {
            id: teamId,
            name: teamData.name,
            logo: teamData.logo
          };

          // Update the cache
          teamCache.set(cacheKey, {
            data: teamSnapshot,
            timestamp: Date.now()
          });

          setTeam(teamSnapshot);
        } else {
          throw new Error(`Team data not found for ${sportType} team ${teamId}`);
        }
      } catch (err) {
        console.error(`Error fetching team data for ${sportType} team ${teamId}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId, sportType]);

  return { team, loading, error };
}

/**
 * Hook to fetch and cache event data
 * @param eventId - The ID of the event to fetch
 * @param sportType - The type of sport (soccer, basketball, etc.)
 * @returns The event data from cache or API
 */
export function useCachedEvent(eventId: number | undefined | null, sportType: string) {
  const [event, setEvent] = useState<EventSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no eventId or sportType, don't do anything
    if (!eventId || !sportType) {
      setEvent(null);
      return;
    }

    const fetchEvent = async () => {
      // Create a cache key based on eventId and sportType
      const cacheKey = `${sportType}-event-${eventId}`;

      // Check if we have cached data
      const cachedEntry = eventCache.get(cacheKey);
      if (cachedEntry) {
        const now = Date.now();
        // Check if the cache entry is still valid (not expired)
        if (now - cachedEntry.timestamp < CACHE_TTL) {
          console.log(`Using cached event data for ${sportType} event ${eventId}`);
          setEvent(cachedEntry.data);
          return;
        } else {
          // If expired, remove from cache
          console.log(`Event cache expired for ${sportType} event ${eventId}`);
          eventCache.delete(cacheKey);
        }
      }

      // If we reach here, we need to fetch the data
      setLoading(true);
      setError(null);

      try {
        const eventData = await getEventDetails(eventId, sportType);
        if (eventData) {
          // Convert to EventSnapshot format
          const eventSnapshot: EventSnapshot = {
            id: eventId,
            name: eventData.name,
            league: {
              name: eventData.league,
              logo: eventData.leagueLogo
            },
            date: eventData.date,
            time: eventData.time,
            timezone: "UTC" // Default timezone
          };

          // Update the cache
          eventCache.set(cacheKey, {
            data: eventSnapshot,
            timestamp: Date.now()
          });

          setEvent(eventSnapshot);
        } else {
          throw new Error(`Event data not found for ${sportType} event ${eventId}`);
        }
      } catch (err) {
        console.error(`Error fetching event data for ${sportType} event ${eventId}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, sportType]);

  return { event, loading, error };
}

/**
 * Function to manually clear the entire cache
 */
export function clearCache() {
  teamCache.clear();
  eventCache.clear();
  console.log('Cache cleared');
}

/**
 * Function to manually add team data to cache (useful for testing or prefetching)
 */
export function cacheTeam(teamId: number, sportType: string, data: TeamSnapshot) {
  const cacheKey = `${sportType}-team-${teamId}`;
  teamCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}

/**
 * Function to manually add event data to cache (useful for testing or prefetching)
 */
export function cacheEvent(eventId: number, sportType: string, data: EventSnapshot) {
  const cacheKey = `${sportType}-event-${eventId}`;
  eventCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}